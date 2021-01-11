# Article List and Detail

## Requirements

This module requires `react-native-maps`.

## Setup

Open '/src/navigator/mainNavigator.js' and add the the stack navigator defined in 'navigator.js'.

Open 'store/services.js' and update the `baseURL` with your application's URL followed by `/modules/articles` which is the endpoint.

Add the module reducer and saga to your '/src/store/index.js' file:

1. Add the imports

```
import articlesReducer from '../features/<module_directory>/store/reducers'
import articlesSagas from '../features/<module_directory>/store/sagas'
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
+  sagaMiddleware.run(articlesSagas);
```
