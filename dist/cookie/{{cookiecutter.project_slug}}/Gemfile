source 'https://rubygems.org'

# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby '>= 2.6.10'

gem 'cocoapods', '>= 1.11.3'
gem 'httpparty', '~> 0.2.0'
gem 'fastlane', '~> 2.212'

android_plugins_path = File.join(
  File.dirname(__FILE__), 'android', 'fastlane', 'Pluginfile'
)
eval_gemfile(android_plugins_path) if File.exist?(android_plugins_path)
ios_plugins_path = File.join(
  File.dirname(__FILE__), 'ios', 'fastlane', 'Pluginfile'
)
eval_gemfile(ios_plugins_path) if File.exist?(ios_plugins_path)
