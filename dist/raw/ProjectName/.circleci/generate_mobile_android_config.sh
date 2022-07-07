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

workflows:
  version: 2.1
  node-android:
    jobs:
      - node
      - android:
          requires:
            - node
{%- endraw %}
EOF