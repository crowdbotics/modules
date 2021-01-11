# Article List and Detail

## Setup

Open `/src/navigator/mainNavigator.js` and import the stack navigator defined in `navigator.js`.

```javascript
import Articles from "../features/<module_directory>/navigator";
```

And then add it to the navigation:

```javascript
//@BlueprintImportInsertion
Articles: {
  screen: Articles
},
```

Open `store/services.js` and update the `baseURL` with your application's URL followed by `/modules/articles` which is the endpoint.

Add the module reducer and saga to your `/src/store/index.js` file:

1. Add the imports

```javascript
import articlesReducer from "../features/<module_directory>/store/reducers";
import articlesSagas from "../features/<module_directory>/store/sagas";
```

2. Add the reducer

```
   combineReducers({
     apiReducer: apiReducer,
     customReducer: customReducer,
+    articlesReducer: articlesReducer
   }),
```

3. Add the root saga

```
  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(customRootSaga);
+ sagaMiddleware.run(articlesSagas);
```
