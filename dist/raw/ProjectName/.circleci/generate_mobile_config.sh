#!/bin/bash
set -o pipefail

mkdir configs/
cat << EOF > configs/generated_config.yml
{% raw -%}
version: 2.1
jobs:
  node:
    working_directory: ~/build
    docker:
      - image: cimg/node:14.19
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

      #- run:
      #    name: jest tests
      #    command: |
      #      mkdir -p test-results/jest
      #      yarn run test
      #    environment:
      #      JEST_JUNIT_OUTPUT: test-results/jest/junit.xml

      - persist_to_workspace:
          root: ~/build
          paths:
            - node_modules

      #- store_test_results:
      #    path: test-results

      #- store_artifacts:
      #    path: test-results

      - run:
          name: Webhook Failed
          command: bash .circleci/webhook_callback.sh "failure"
          when: on_fail

  android:
    working_directory: ~/build
    docker:
      - image: reactnativecommunity/react-native-android:3.2
    resource_class: "medium+"
    environment:
      - TERM: "dumb"
      - ADB_INSTALL_TIMEOUT: 10
      - _JAVA_OPTIONS: "-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap"
      - GRADLE_OPTS: '-Dorg.gradle.daemon=false -Dorg.gradle.jvmargs="-XX:+HeapDumpOnOutOfMemoryError"'
      - BUILD_THREADS: 2
    steps:
      - checkout:
          path: ~/build

      - attach_workspace:
          at: ~/build

      - restore_cache:
          key: bundle-v1-{{ checksum "Gemfile.lock" }}-{{ arch }}

      - run:
          command: bundle install

      - save_cache:
          key: bundle-v1-{{ checksum "Gemfile.lock" }}-{{ arch }}
          paths:
            - vendor/bundle

      #- run:
      #    name: Run tests
      #    command: |
      #      mkdir -p test-results/fastlane
      #      bundle exec fastlane test
      #      mv fastlane/report.xml test-results/fastlane

      #- store_test_results:
      #    path: test-results

      #- store_artifacts:
      #    path: test-results

      - run:
          name: Populate EnvFile
          command: env >> .env

      - run:
          name: Add upload-key.keystore file
          working_directory: android
          command:  |
            cd app
            echo "$ANDROID_KEYSTORE" | base64 --decode > upload-key.keystore

      - run:
          name: Build and upload to appetize.io
          command: bundle exec fastlane deploy_appetize
          working_directory: android

      - store_artifacts:
          path: android/app/build/outputs/apk/release/app-release.apk

      - run:
          name: create a new android app bundle build
          command: bundle exec fastlane build_aab
          working_directory: android

      - store_artifacts:
          path: android/app/build/outputs/bundle/release/app-release.aab

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
      xcode: "13.0.0"
    working_directory: ~/build

    # use a --login shell so our "set Ruby version" command gets picked up for later steps
    shell: /bin/bash --login -o pipefail

    steps:
      - add_ssh_keys:
          fingerprints:
{%- endraw %}
            - 'ProjectSSHKeyFingerPrint'
{% raw %}
      - checkout

      - run:
          name: Check if app has a paid plan
          command: |
            if [ "$HAS_PAID_PLAN" != 1 ]; then
              exit 1
            fi

      - run:
          name: set Ruby version
          command: echo "ruby-2.5" > ~/.ruby-version

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
          key: bundle-v1-{{ checksum "Gemfile.lock" }}-{{ arch }}

      - run:
          command: bundle install

      - save_cache:
          key: bundle-v1-{{ checksum "Gemfile.lock" }}-{{ arch }}
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

      #- store_test_results:
      #    path: ios/test-results

      #- store_artifacts:
      #    path: ios/test-results

      # - run:
      #     name: Build and upload to appetize.io
      #     command: bundle exec fastlane deploy_appetize
      #     working_directory: ios

      # - store_artifacts:
      #     path: /tmp/fastlane_build/app.zip

      - run:
          name: Create a new beta build for TestFlight
          command: bundle exec fastlane create_build
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
  node-android-ios:
    jobs:
      - node
      - android:
          requires:
            - node
      - ios:
          requires:
            - node
{%- endraw %}
EOF