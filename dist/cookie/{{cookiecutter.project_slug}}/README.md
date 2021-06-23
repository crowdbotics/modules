# {{cookiecutter.project_slug}}

Welcome to your new Crowdbotics app.

## What is Crowdbotics?
Crowdbotics is an easy way to build software applications of all kinds.  You can build production, high-caliber software applications in minutes, rather than weeks or months, even if you're not a software developer.

The reason this works is that most software applications and features we want to build are similar to applications that have been built before. We've crawled hundreds of thousands of public code repositories to teach the Crowdbotics engine how to create software.

As a result, Crowdbotics can generate new applications automatically in a standardized way.

### Useful Links
<p>
  <a href="https://app.crowdbotics.com/">App Dashboard</a>
  ·
  <a href="https://knowledge.crowdbotics.com/">Knowledgebase</a>
  ·
  <a href="https://knowledge.crowdbotics.com/crowdbotics-developer-training">Developer Training</a>
  ·
  <a href="https://discuss.crowdbotics.com/">Forum</a>
  ·
  <a href="https://crowdbotics.slack.com/archives/CGSAV319V">Tech Support</a>
</p> 

## Table of Contents
1. [Project Description](#project-description)
2. [Project Structure](#project-structure)
3. [Getting Started: Frontend](#getting-started-frontend)
   - [Installation](#installation)
   - [Running with Fastlane](#running-with-fastlane)
     - [Android](#android-1)
     - [iOS](#ios-1)
     - [React Native Web](#react-native-web)
4. [Getting Started: Backend](backend#readme)
5. [License](#license)

## Project Description

{{cookiecutter.project_description}}

## Project Structure

    .
    ├── ...
    ├── android                 # Android native files
    ├── backend                 # Django backend REST API
    ├── ios                     # iOS native files
    ├── modules                 # Modules
    ├── public                  
    ├── screens                 
    ├── store                   # Application state storage
    ├── ...
    ├── README.md
    └── ...

# Getting started: Frontend

This section outlines instructions on setting up a local development environment for the frontend of your application.

## Installation

### Metro

After cloning the repo, install the dependencies locally with [Yarn](https://yarnpkg.com/):

```sh
yarn install
```

Start your [Metro](https://facebook.github.io/metro/) server:

```sh
npx react-native start
```

### Android

```sh
npx react-native run-android
```

### iOS

```sh
pod install --repo-update --project-directory=ios
npx react-native run-ios
```

### Setup react-native-vector-icons

Follow instructions at their [README.md](https://github.com/oblador/react-native-vector-icons/blob/master/README.md#installation)

## Running with Fastlane

[Fastlane](https://fastlane.tools/) makes testing, building, and deploying apps
easier.

Install fastlane globally (`npm i -g fastlane` or `yarn i -g fastlane`).
Android and iOS dependencies are the same as React Native CLI.

All fastlane commands are run from the platform directory. For example, Android
commands must be run from `android/`. Fastlane should be executed using `bundle exec` to ensure dependencies are managed correctly.

The commands for Android and iOS are the same:

- Run tests: `bundle exec fastlane tests`
- Local build: `bundle exec fastlane build`
- Build and upload a beta (requires signing): `bundle exec fastlane beta`
- Build or promote a release: `bundle exec fastlane deploy`

### Android

Publish an Android app you must first create an app in the Play Console and
manually upload an APK. After the first upload run `bundle exec fastlane supply init` from `android/` to sync with the Play store. All future releases will be
uploaded automatically.

Android uses tracks. A beta release will build the app and upload to the beta
track. Deploying will promote from beta to production.

### iOS

CB developers must follow fastlane's [codesigning guide](https://codesigning.guide/) for using match.
Match will automatically sign iOS builds.

New CB developers should get access to the codesigning repo and run `bundle exec fastlane match development` from `ios/`.

Not a CB developer? Create an [Apple developer](https://developer.apple.com)
and follow the instructions on [codesigning guide](https://codesigning.guide/)
to setup your certificates.

## React Native Web

It is to build and deploy your app as web platform which run on browser

Please follow the steps

- please run `yarn web-build`
- the web_build folder is generated and copied to backend/ automatically. please commit/push the web_build folder to git

# License
Disclaimer: The scaffold and everything in it is open and free to use as long as you comply with the [license](LICENSE). We promise to do our best to improve the code and fix bugs.

Some apps do call for extra code; we can cover unique use cases and help you build a custom application on our platform.

Created with ❤️ by [Crowdbotics](https://www.crowdbotics.com/)
