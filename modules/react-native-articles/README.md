# Article Module Frontend
In this module users can view the articles list and read a specific article.

## Scope Features
The following are the key features in scope for this module.
2. Ability to get a list of the articles
3. Ability to get a specific article

## Install Required Dependencies/Packages
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. Copy all the packages from the `dependencies` section and past them in your project's main `package.json` file, and run this command.
  ```
  yarn install
  ```
## API Calling Methods
All the api calling methods reside in `store/api.js` file.

* **articleList**
`articleList` method used to retrieve the list of articles.

* **articleRead**
`articleRead` method is used return a specific article details.

## Setup Installation

Open `modules/articles/store/api.js` and update the `baseURL` with your application's URL followed by `/modules/articles` which is the endpoint (ie. demo0122202101-24002.botics.com/modules/articles). The initial piece is your project name and the numeric piece is your project number.

## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Articles from "@modules/articles";

const { title, navigator, slice } = Articles;
```
2. You can call a module directly by importing navigator without going through any routing. You can also pass props to that module as well.

```javascript
import { modules } from '@modules';
const Articles = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Articles />;
```
## View responses
User can view responses

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
