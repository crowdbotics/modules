# Upgrading your scaffold version

This document will guide you in upgrading the React Native scaffold of your app from version 1.1.0 to version 2.0.0.

## Requirements

Before we start please make sure that you meet the requirements:

- node
- yarn
- git
- python 3.8 (use [pyenv](https://github.com/pyenv/pyenv) or other solution for managing multiple python versions)
- pipenv

Please note that the script depends on running `pipenv install` successfully, this means that you should have Python correctly [configured in your PATH](https://cookiecutter.readthedocs.io/en/2.0.2/installation.html#unix-and-macos).

### MacOS specific instructions

Add `~/.local/bin`, and PostgreSQL's bin directory, to your `PATH` variable:

```
# File: ~/.zshrc
export PATH=$HOME/.local/bin:$PATH
export PATH=/library/postgresql/15/bin:$PATH
```

## Perfoming the upgrade

Create a new branch and run the command:

```
cd your-repo-dir
git checkout -b upgrade-scaffold
npx crowdbotics/modules
```

And choose the "Upgrade my scaffold" option:

```
$ npx crowdbotics/modules
? What do you want to do? (Use arrow keys)
❯ Upgrade my scaffold (1.1.0 -> 2.0.0)
  Undo all changes
  Remove all diff files
  Quit
  Print cookiecutter context (debug)
  Clear local cache (debug)
```

## Upgrade review and resolving divergences manually

Pay special attention to this section:

> Check files integrity and upgrade to new versions

> ✅ App.js

> ⚠ package.json - Failed integrity check. Refer to the new version package.new.json and it's diff.

For each file that couldn't get upgraded automatically we provide you the new version side-by-side with your current version for comparison, and also a comparison between your current version and the original version when you initially created your app. The three files together help you make an informed decision of which changes you need to carry over to the new version of the file and which are not important.

Let's go over an example with `package.json`.

```shell
$ pwd
/your-repo

$ cat package.json.diff
```

```diff
# File: /your-repo/package.json
# Original: /your-repo/build/crowdbotics/build/v1/your-repo/package.json
#
# This is a git diff between your local version of the file and the scaffold
# original. Go over all the changes displayed here and consider which ones
# you would like to bring to the new version of this file:
# package.new.json.
#
# When you finish replace your package.json with package.new.json.

diff --git a/your-repo/package.json b/your-repo/package.json
index fea5ce4..30580d7 100644
--- a/your-repo/build/crowdbotics/build/v1/your-repo/package.json
+++ b/your-repo/package.json
@@ -12,44 +12,45 @@
     "web:build": "./node_modules/.bin/webpack --config ./webpack.config.js --color --mode production"
   },
   "dependencies": {
-    "react": "17.0.1",
-    "react-native": "0.64.4",
-    "axios": "^0.21.1",
+    "@modules/articles": "file:./modules/articles/",
     "@react-native-community/masked-view": "^0.1.10",
     "@react-navigation/native": "^5.9.3",
-    "react-native-gesture-handler": "^1.10.3",
-    "react-native-reanimated": "~2.4.1",
-    "react-native-safe-area-context": "^3.2.0",
-    "react-native-screens": "^2.18.1",
     "@react-navigation/stack": "^5.14.3",
-    "redux": "^4.0.5",
-    "react-redux": "^7.2.2",
     "@reduxjs/toolkit": "^1.5.0",
+    "axios": "^0.21.1",
+    "react": "17.0.1",
+    "react-dom": "^17.0.0",
+    "react-native": "0.64.4",
     "react-native-dotenv": "^2.5.3",
-    "react-native-responsive-screen": "^1.4.2",
     "react-native-elements": "^3.3.1",
-    "react-native-vector-icons": "^8.1.0",
-    "react-dom": "^17.0.0",
+    "react-native-gesture-handler": "^1.10.3",
     "react-native-radio-buttons-group": "^2.2.11",
-    "react-native-web": "^0.18.2"
+    "react-native-reanimated": "~2.4.1",
+    "react-native-responsive-screen": "^1.4.2",
+    "react-native-safe-area-context": "^3.2.0",
+    "react-native-screens": "^2.18.1",
+    "react-native-vector-icons": "^8.1.0",
+    "react-native-web": "^0.18.2",
+    "react-redux": "^7.2.2",
+    "redux": "^4.0.5"
   },
   "devDependencies": {
     "@babel/core": "^7.12.9",
     "@babel/runtime": "^7.12.5",
     "@react-native-community/eslint-config": "^2.0.0",
     "babel-jest": "^26.6.3",
+    "babel-loader": "^8.2.5",
+    "babel-plugin-import-glob-meta": "github:crowdbotics/babel-plugin-import-glob-meta",
+    "babel-plugin-react-native-web": "^0.18.2",
     "eslint": "7.14.0",
+    "html-webpack-plugin": "^5.5.0",
     "jest": "^26.6.3",
     "metro-react-native-babel-preset": "^0.64.0",
     "react-test-renderer": "17.0.1",
-    "babel-plugin-import-glob-meta": "github:crowdbotics/babel-plugin-import-glob-meta",
-    "babel-loader": "^8.2.5",
     "url-loader": "^4.1.1",
     "webpack": "^5.73.0",
     "webpack-cli": "^4.10.0",
-    "webpack-dev-server": "^4.9.3",
-    "babel-plugin-react-native-web": "^0.18.2",
-    "html-webpack-plugin": "^5.5.0"
+    "webpack-dev-server": "^4.9.3"
   },
   "jest": {
     "preset": "react-native"
@@ -66,4 +67,4 @@
       "last 1 safari version"
     ]
   }
-}
\ No newline at end of file
+}
```

The diff shows us that our file diverged from the original version, more specifically one dependency got added (the other diffs here are only lines reordering):

```diff
+    "@modules/articles": "file:./modules/articles/",
```

This means that we have to add the same dependency to `package.new.json` and replace the old file, i.e. with yarn:

```shell
mv package.new.json package.json
yarn add file:./modules/articles
git add package.json yarn.lock
```

Then you can move to the next `.diff` file, until you cover all of them. We included an option to "Remove all diff files" in the command if you'd like to cleanup all of the diff files at once.

## Something went wrong

You can always undo all the changes that the "Upgrade my scaffold" introduced and start over fresh - run the command and select the option "Undo all changes".

If you face any issues or bugs with the upgrade tool, please run the option "Print cookiecutter context (debug)" and post the output of it in Slack. Please include relevant logs for the issues you encountered, if any.

## Finishing the upgrade

After resolving all diffs manually, make sure you git add/commit and push to the remote.

Open a Pull Request for the branch you just pushed and ask your teammates for a review.

You are all set!
