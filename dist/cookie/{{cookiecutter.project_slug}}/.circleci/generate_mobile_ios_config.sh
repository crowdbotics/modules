#!/bin/bash
set -o pipefail

mkdir configs/
cat << EOF > configs/generated_config.yml
{% raw -%}
version: 2.1

parameters:
  mobile_lane:
    type: string
    default: ""

jobs:
  node:
    working_directory: ~/build
    docker:
      - image: cimg/node:18.16.0
    steps:
      - checkout

      - restore_cache:
          key: yarn-v1-{{ checksum "yarn.lock" }}-{{ arch }}

      - restore_cache:
          key: node-v1-{{ checksum "package.json" }}-{{ arch }}

      - run: yarn install

      - save_cache:
          key: yarn-v1-{{ checksum "yarn.lock" }}-{{ arch }}
          paths:
            - ~/.cache/yarn

      - save_cache:
          key: node-v1-{{ checksum "package.json" }}-{{ arch }}
          paths:
            - node_modules

      - persist_to_workspace:
          root: ~/build
          paths:
            - node_modules

      - run:
          name: Webhook Failed
          command: bash .circleci/webhook_callback.sh "failure"
          when: on_fail

  appetize:
    macos:
      xcode: "14.1.0"
    resource_class: macos.x86.medium.gen2
    working_directory: ~/build

    # use a --login shell so our "set Ruby version" command gets picked up for later steps
    shell: /bin/bash --login -o pipefail

    steps:
      - add_ssh_keys:
          fingerprints:
{%- endraw %}
            - '{{cookiecutter.ssh_key_fingerprint}}'
{% raw %}
      - checkout

      - restore_cache:
          key: yarn-v1-{{ checksum "yarn.lock" }}-{{ arch }}

      - restore_cache:
          key: node-v1-{{ checksum "package.json" }}-{{ arch }}

      # not using a workspace here as Node and Yarn versions
      # differ between our macOS executor image and the Docker containers above
      - run: yarn install

      - save_cache:
          key: yarn-v1-{{ checksum "yarn.lock" }}-{{ arch }}
          paths:
            - ~/.cache/yarn

      - save_cache:
          key: node-v1-{{ checksum "package.json" }}-{{ arch }}
          paths:
            - node_modules

      - restore_cache:
          keys:
            - &gem-cache gem-cache-v1-{{ arch }}-{{ .Branch }}-{{ checksum "Gemfile.lock" }}
            - gem-cache-v1-{{ arch }}-{{ .Branch }}
            - gem-cache-v1

      - run:
          name: Run bundle config and install
          command: |
            bundle lock --add-platform ruby
            bundle config set --local deployment 'true'
            bundle install

      - save_cache:
          key: *gem-cache
          paths:
            - vendor/bundle

      - restore_cache:
          key: 1-pods-{{ checksum "ios/Podfile.lock" }}
          paths:
            - ios/Pods

      - run:
          name: Install MacOS ffi
          command: gem inst ffi -v '1.15.1' -- --disable-system-libffi
          working_directory: ios

      - run:
          name: Update CocaPods dependencies
          command: bundle exec pod install --verbose
          working_directory: ios
          timeout: 1200

      - save_cache:
          key: 1-pods-{{ checksum "ios/Podfile.lock" }}
          paths:
            - ios/Pods

      - run:
          name: Populate EnvFile
          command: env >> .env

      - run:
          name: Build and upload to appetize.io
          command: bundle exec fastlane deploy_appetize
          working_directory: ios
      
      - store_artifacts:
          path: /tmp/fastlane_build/app.zip

      - run:
          name: Webhook Success
          command: bash .circleci/webhook_callback.sh "success"
          when: on_success

      - run:
          name: Webhook Failed
          command: bash .circleci/webhook_callback.sh "failure"
          when: on_fail

  ios:
    macos:
      xcode: "14.1.0"
    resource_class: macos.x86.medium.gen2
    working_directory: ~/build

    # use a --login shell so our "set Ruby version" command gets picked up for later steps
    shell: /bin/bash --login -o pipefail

    steps:
      - add_ssh_keys:
          fingerprints:
{%- endraw %}
            - '{{cookiecutter.ssh_key_fingerprint}}'
{% raw %}
      - checkout

      - restore_cache:
          key: yarn-v1-{{ checksum "yarn.lock" }}-{{ arch }}

      - restore_cache:
          key: node-v1-{{ checksum "package.json" }}-{{ arch }}

      # not using a workspace here as Node and Yarn versions
      # differ between our macOS executor image and the Docker containers above
      - run: yarn install

      - save_cache:
          key: yarn-v1-{{ checksum "yarn.lock" }}-{{ arch }}
          paths:
            - ~/.cache/yarn

      - save_cache:
          key: node-v1-{{ checksum "package.json" }}-{{ arch }}
          paths:
            - node_modules

      - restore_cache:
          keys:
            - &gem-cache gem-cache-v1-{{ arch }}-{{ .Branch }}-{{ checksum "Gemfile.lock" }}
            - gem-cache-v1-{{ arch }}-{{ .Branch }}
            - gem-cache-v1

      - run:
          name: Run bundle config and install
          command: |
            bundle lock --add-platform ruby
            bundle config set --local deployment 'true'
            bundle install

      - save_cache:
          key: *gem-cache
          paths:
            - vendor/bundle

      - restore_cache:
          key: 1-pods-{{ checksum "ios/Podfile.lock" }}
          paths:
            - ios/Pods

      - run:
          name: Install MacOS ffi
          command: gem inst ffi -v '1.15.1' -- --disable-system-libffi
          working_directory: ios

      - run:
          name: Update CocaPods dependencies
          command: bundle exec pod install --verbose
          working_directory: ios
          timeout: 1200

      - save_cache:
          key: 1-pods-{{ checksum "ios/Podfile.lock" }}
          paths:
            - ios/Pods

      - run:
          name: Populate EnvFile
          command: env >> .env

      - run:
          name: Run tests
          command: bundle exec fastlane tests
          working_directory: ios

      - run:
          name: Set up test results
          working_directory: ios
          command: |
            mkdir -p test-results/fastlane test-results/xcode
            mv fastlane/report.xml test-results/fastlane
            mv fastlane/test_output/report.junit test-results/xcode/junit.xml

      - run:
          name: Create and push a new $MOBILE_LANE build to App Store
          command: bundle exec fastlane $MOBILE_LANE
          working_directory: ios

      - store_artifacts:
          path: ios/app-release.ipa

      - run:
          name: Webhook Success
          command: bash .circleci/webhook_callback.sh "success"
          when: on_success

      - run:
          name: Webhook Failed
          command: bash .circleci/webhook_callback.sh "failure"
          when: on_fail

workflows:
  version: 2.1
  node-appetize:
    when: 
      equal: [ deploy_appetize, << pipeline.parameters.mobile_lane >> ]
    jobs:
      - node
      - appetize:
          requires:
            - node
      
  node-ios:
    when: 
      or:
        - equal: [ beta, << pipeline.parameters.mobile_lane >> ]
        - equal: [ upload_release, << pipeline.parameters.mobile_lane >> ]
    jobs:
      - node
      - ios:
          requires:
            - node
{%- endraw %}
EOF