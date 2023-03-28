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
      - image: reactnativecommunity/react-native-android:5.4
    resource_class: "medium+"
    environment:
      - TERM: "dumb"
      - ADB_INSTALL_TIMEOUT: 10
      - _JAVA_OPTIONS: "-XX:+UnlockExperimentalVMOptions -XX:+UseContainerSupport"
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
          name: Add key.json file
          working_directory: android
          command:  |
            echo "$GOOGLE_PLAY_CONSOLE_API_KEY" | base64 --decode > key.json

      - run:
          name: Add my-upload-key.keystore file
          working_directory: android
          command:  |
            cd app
            echo "$MYAPP_UPLOAD_STORE_FILE" | base64 --decode > my-upload-key.keystore

      - run:
          name: Deploy appetize and build
          command: |
            if [ $MOBILE_LANE == "internal" ]; then
              bundle exec fastlane deploy_and_build
            fi
          working_directory: android

      - store_artifacts:
          path: android/app/build/outputs/apk/release/app-release.apk

      - store_artifacts:
          path: android/app/build/outputs/bundle/release/app-release.aab

      - run:
          name: Create and push a new $MOBILE_LANE build to Play Store
          command: bundle exec fastlane $MOBILE_LANE
          working_directory: android


      - run:
          name: get android metadata
          command:  |
            if [ $MOBILE_LANE == "production" ]; then
              git config --global user.email "team@crowdbotics.com"
              git config --global user.name "Crowdbotics"
              rm -rf fastlane/metadata
              git add fastlane/metadata
              git commit -m "CI Work: remove metadata and screenshots to download new one"
              git push -q https://$GITHUB_WRITE_TOKEN@github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME.git master
              bundle exec fastlane supply init
              git add fastlane/metadata app/build.gradle fastlane/README.md
              git commit -m "CI Work: metadata and screenshots updated"
              git push -q https://$GITHUB_WRITE_TOKEN@github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME.git master
            fi
          working_directory: android

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