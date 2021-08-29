# {{cookiecutter.project_slug}}

Welcome to your new Crowdbotics app. This is a repository for a mobile application developed with Django and React Native, built with [Crowdbotics](https://crowdbotics.com)

## What is Crowdbotics?

Crowdbotics is an easy way to build software applications of all kinds.  You can build production, high-caliber software applications in minutes, rather than weeks or months, even if you're not a software developer.

The reason this works is that most software applications and features we want to build are similar to applications that have been built before. We've crawled hundreds of thousands of public code repositories to teach the Crowdbotics engine how to create software.

As a result, Crowdbotics can generate new applications automatically in a standardized way.

## Table of Contents

- [{{cookiecutter.project_slug}}](#cookiecutterproject_slug)
  - [What is Crowdbotics?](#what-is-crowdbotics)
  - [Table of Contents](#table-of-contents)
    - [Useful Links](#useful-links)
  - [Project Description](#project-description)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Modules (THIS SECTION IS AUTO-GENERATED, PLEASE DO NOT EDIT)](#modules-this-section-is-auto-generated-please-do-not-edit)
- [Getting Started: Backend](#getting-started-backend)
  - [Docker Setup (Recommended)](#docker-setup-recommended)
  - [Local Setup (Alternative to Docker)](#local-setup-alternative-to-docker)
    - [Installation](#installation)
    - [Getting Started](#getting-started)
- [Usage](#usage)
  - [Admin Panel](#admin-panel)
  - [API Documentation](#api-documentation)
- [Getting started: Frontend](#getting-started-frontend)
  - [Installation](#installation-1)
    - [Metro](#metro)
    - [Android](#android)
    - [iOS](#ios)
    - [Setup react-native-vector-icons](#setup-react-native-vector-icons)
  - [Running with Fastlane](#running-with-fastlane)
    - [Android](#android-1)
    - [iOS](#ios-1)
  - [React Native Web](#react-native-web)
- [License](#license)

### Useful Links

- [App Dashboard](https://app.crowdbotics.com/)
- [Knowledgebase](https://knowledge.crowdbotics.com/)
- [Developer Training](https://knowledge.crowdbotics.com/crowdbotics-developer-training)
- [Forum](https://discuss.crowdbotics.com/)
- [Tech Support](https://crowdbotics.slack.com/archives/CGSAV319V)

## Project Description

{{cookiecutter.project_description}}

## Project Structure

    .
    ├── .circleci
    │   ├── config.yml
    │   └── webhook_callback.sh
    ├── .github
    │   └── dependabot.yml
    ├── README.md
    ├── backend                              # Django backend REST API
    |   |-- ...
    │   ├── Dockerfile
    │   ├── Pipfile
    │   ├── docker-compose.override.yml
    │   ├── docker-compose.yml
    │   ├── home                            # Starter home app
    │   ├── manage.py
    │   ├── modules                         # Crowdbotics Modules app
    │   ├── static                          # Static assets
    │   ├── {{cookiecutter.project_slug}}   # Django project configurations
    │   ├── users                           # Starter users app
    │   └── web_build                       # React Native Web build
    ├── heroku.yml
    └── mobile
        ├── ...
        ├── App.js
        ├── android                         # Android native files
        ├── ios                             # iOS native files
        ├── modules                         # Modules
        ├── options
        ├── package.json
        ├── store                           # Application state storage
        └── ...

## Features

1. **Local Authentication** using email and password with [allauth](https://pypi.org/project/django-allauth/)
2. **Rest API** using [django rest framework](http://www.django-rest-framework.org/)
3. **Forgot Password**
4. [Bootstrap4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
5. Toast Notification
6. Inline content editor in homepage

## Modules (THIS SECTION IS AUTO-GENERATED, PLEASE DO NOT EDIT)

This section will show any installed modules you add from the Storyboard Modules section.

# Getting Started: Backend

Following are instructions on setting up your development environment.

The recommended way for running the project locally and for development is using Docker.

It's possible to also run the project without Docker.

## Docker Setup (Recommended)

This project is set up to run using [Docker Compose](https://docs.docker.com/compose/) by default. It is the recommended way. You can also use existing Docker Compose files as basis for custom deployment, e.g. [Docker Swarm](https://docs.docker.com/engine/swarm/), [kubernetes](https://kubernetes.io/), etc.

1. Install Docker:
   - Linux - [get.docker.com](https://get.docker.com/)
   - Windows or MacOS - [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Clone this repo and `cd {{cookiecutter.project_slug}}`
3. Make sure `Pipfile.lock` exists. If it doesn't, generate it with:

   ```sh
      $ docker run -it --rm -v "$PWD":/django -w /django python:3.7 pip3 install --no-cache-dir -q pipenv && pipenv lock
   ```

4. Use `.env.example` to create `.env`:
   ```sh
   $ cp .env.example .env
   ```
5. Update `.env` and `docker-compose.override.yml` replacing all `<placeholders>`

    Use `python -c 'from secrets import token_urlsafe; print("SECRET_KEY=" + token_urlsafe(50))'` to generate the random `SECRET_KEY`
6. Start up the containers:

   ```sh
    $ docker-compose up
   ```

   This will build the necessary containers and start them, including the web server on the host and port you specified in `.env`.

   Current (project) directory will be mapped with the container meaning any edits you make will be picked up by the container.

7. Seed the Postgres DB (in a separate terminal):
   ```sh
   $ docker-compose exec web python3 manage.py makemigrations
   $ docker-compose exec web python3 manage.py migrate
   ```
8. Create a superuser if required:
   ```sh
   $ docker-compose exec web python3 manage.py createsuperuser
   ```
   You will find an activation link in the server log output.

## Local Setup (Alternative to Docker)

1. [Postgresql](https://www.postgresql.org/download/)
2. [Python](https://www.python.org/downloads/release/python-365/)

### Installation

1. Install [pipenv](https://pypi.org/project/pipenv/)
2. Clone this repo and `cd {{cookiecutter.project_slug}}`
3. Run `pip install --user --upgrade pipenv` to get the latest pipenv version.
4. Run `pipenv --python 3.6`
5. Run `pipenv install`
6. Run `cp .env.example .env`
7. Update .env file `DATABASE_URL` with your `database_name`, `database_user`, `database_password`, if you use postgresql.
   Can alternatively set it to `sqlite:////tmp/my-tmp-sqlite.db`, if you want to use sqlite for local development.

### Getting Started

1. Run `pipenv shell`
2. Run `python manage.py makemigrations`
3. Run `python manage.py migrate`
4. Run `python manage.py runserver`

# Usage

## Admin Panel

Admin Panel can be accessed through http://localhost:8000/admin/. If you are the Project Owner, admin credentials can be generated from App > Settings on [Crowdbotics App Dashboard](https://app.crowdbotics.com/). If not, please request your PM or Project Owner to generate admin credentials and share with you.

## API Documentation

API Documentation is generated automatically and can be access through http://localhost:8000/api-docs/. Please make sure you are signed in to the admin panel before navigating to this page.

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
The use of code in this repository is governed by Crowdbotics [Terms and Conditions](https://www.crowdbotics.com/terms-of-service).

Created with ❤️ by [Crowdbotics](https://www.crowdbotics.com/)
