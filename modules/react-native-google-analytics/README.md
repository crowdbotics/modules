# Google Analytics(firebase) Module
The Google Analytics(firebase) Module is a React Native-based module that allows the user to get insight into how users engage with his app and app’s marketing performance on his firebase dashboard.


## Installation
1. On the Firebase console, add a new Android application and enter your projects details. The "Android package name" must match your local projects package name which can be found inside of the manifest tag within the /android/app/src/main/AndroidManifest.xml file within your project.

2. Download the google-services.json file and place it inside of your project at the following location: /android/app/google-services.json.

3. Add the google-services plugin inside of your /android/build.gradle file:
```
buildscript {
    repositories {
   
    google()  // Google's Maven repository

  }

  dependencies {

    classpath 'com.google.gms:google-services:4.3.10'
   
  }
}

  allprojects {

  repositories {

    google()  // Google's Maven repository

  }
}
```

4. Lastly, execute the plugin by adding the following lines of code to your /android/app/build.gradle file:

```
apply plugin: 'com.google.gms.google-services'

dependencies {

  implementation platform('com.google.firebase:firebase-bom:30.1.0')
  implementation 'com.google.firebase:firebase-analytics'

}
```

## Events

### Custom Events
Below is an example showing how a custom event can be logged. Please be aware that primitive data types or arrays of primitive data types are logged in your Firebase Analytics console.

#### logEvent
Log a custom event with optional params. Note that there are various limits that applied to event parameters.
```
logEvent('event-name', {
    id: number,
    item: string,
    description: array,
    size: string,
  });
```

### Predefined Events
Analytics provides a number of event methods that are common among different types of apps, including retail and e-commerce, travel, and gaming apps. Predefined Events have predefined names and parameters. Here is list of predefined events with their parameters.

#### 1. logAddPaymentInfo
This event signifies that a user has submitted their payment information to your app.

```
logAddPaymentInfo({
coupon: string,
currency: string,      //Purchase currency in 3 letter ISO_4217 format. E.g. USD.
items: array,
payment_type: string,
value: number
});
```
#### 2. logAddShippingInfo
This event signifies that a user has submitted their shipping information.  
```
logAddShippingInfo({
coupon: string,
currency: string,
items: array,
shipping_tier: string,
value: number
});
```
#### 3. logAddToCart
This event signifies that a user has added product to cart. 
```
logAddToCart({
currency: string,
items: array,
value: number
});

```
#### 4. logAddToWishlist
This event signifies that a user has added product to wishlist.  
```
logAddToWishlist({
currency: string,
items: array,
value: number
});
```

#### 5. logBeginCheckout
 This event signifies that a user has begun the process of checking out.  
```
logBeginCheckout({
coupon: string,
currency: string,
items: array,
value: number
});
```
#### 6. logCampaignDetails
 og this event to supply the referral details of a re-engagement campaign.  
```
logCampaignDetails({
aclid: string,
campaign: string,
content: string,
cp1: string,
medium: string,
source: string,
term: string
});
```
#### 7. logEarnVirtualCurrency
 This event tracks the awarding of virtual currency in your app.  
```
logEarnVirtualCurrency({
value: number,
virtual_currency_name: string
});
```

#### 8. logGenerateLead
Log this event when a lead has been generated in the app to understand the efficacy of your install and re-engagement campaigns.  
```
logGenerateLead(
currency: string,
value: number
)
```
#### 9. logJoinGroup
Log this event when a user joins a group such as a guild, team or family.  
```
logJoinGroup({
group_id: string
});
```
#### 10. logLevelEnd
Log this event when a level ends in your game.
```
logLevelEnd({
level: number,
success: string
});
```
#### 11. logLevelStart
Log this event when a level starts in your gaming app.
```
logLevelStart({
level: number
});
```
#### 12. logLevelUp
This event signifies that a player has leveled up in your gaming app. 
```
logLevelUp({
character: string,
level: number
});
```
#### 13. logLogin
Apps with a login feature can report this event to signify that a user has logged in. 
```
logLogin({
method: string
});
```
#### 14. logPostScore
Log this event when the user posts a score in your gaming app. 
```
logPostScore({
character: string,
level: number,
score: number
});
```
#### 15. logPurchase
This event signifies that an item(s) was purchased by a user. 
```
logPurchase({
affiliation: string,
coupon: string,
currency: string,
items: array,
shipping: number,
tax: number,
transaction_id: string,
value: number
});
```
#### 16. logRefund
This event signifies that a refund was issued. 
```
logRefund({
affiliation: string,
coupon: string,
currency: string,
items: array,
shipping: number,
tax: number,
transaction_id: string,
value: number
});
```
#### 17. logRemoveFromCart
This event signifies that a user has removed product from cart. 
```
logRemoveFromCart({
currency: string,
items: array,
value: number
});
```
#### 18. logScreenView
Sets or clears the screen name and class the user is currently viewing. 
```
logScreenView({
screen_class: string,
screen_name: string
});
```
#### 19. logSearch
 Apps that support search features can use this event to contextualize search operations by supplying the appropriate, corresponding parameters. This event can help you identify the most popular content in your app.
```
logSearch({
destination: string,
end_date: string,           //Expected date format 'YYYY-MM-DD'.
number_of_nights: number,
number_of_passengers: number,
number_of_rooms: number,
origin: string,
search_term: string,
start_date: string,
travel_class: string
});
```
#### 20. logSelectContent
 This general purpose event signifies that a user has selected some content of a certain type in an app.  
```
logSelectContent({
content_type: string,
item_id: string
});
```
#### 21. logSelectItem
 This event signifies that an item was selected by a user from a list. Use this event to discover the most popular items selected. 
```
logSelectItem({
content_type: string,
item_list_id: string,
item_list_name: string,
items : array
});
```
#### 22. logSelectPromotion
 This event signifies that a user has selected a promotion offer.  
```
logSelectPromotion({
creative_name: string,
creative_slot: string,
items : array,
location_id: string,
promotion_id: string,
promotion_name: string
});
```
#### 23. logShare 
Apps with social features can log the Share event to identify the most viral content.  
```
logShare({
content_type: string,
item_id: string,
method: string
});
```
#### 24. logSignUp
This event indicates that a user has signed up for an account in your app. 
```
logSignUp({
method: string
});
```
#### 25. logSpendVirtualCurrency
This event tracks the sale of virtual goods in your app and can help you identify which virtual goods are the most popular objects of purchase. 
```
logSpendVirtualCurrency({
item_name: string,
value: number,
virtual_currency_name: string
});
```
#### 26. logTutorialBegin
This event signifies the start of the on-boarding process in your app.  
```
logTutorialBegin();
```
#### 27. logTutorialComplete
Use this event to signify the user's completion of your app's on-boarding process.  
```
logTutorialComplete();
```
#### 28. logUnlockAchievement
Log this event when the user has unlocked an achievement in your game.  
```
logUnlockAchievement({
  achievement_id: string
});
```
#### 30. logViewCart
This event signifies that a user has viewed their cart. Use this to analyze your purchase funnel.  
```
logViewCart({
currency: string,
items: array,
value: number
});
```
#### 31. logViewItem
This event signifies that some content was shown to the user. This content may be a product, a screen or just a simple image or text.  
```
logViewItem({
currency: string,
items: array,
value: number
});
```
#### 32. logViewItemList
Log this event when the user has been presented with a list of items of a certain category.  
```
logViewItemList({
item_list_id: string,
item_list_name: string,
items: array
});
```
#### 33. logViewPromotion
This event signifies that a promotion was shown to a user.  
```
logViewPromotion({
creative_name: string,
creative_slot: string,
items : array,
location_id: string,
promotion_id: string,
promotion_name: string
});
```
#### 34. logViewSearchResults
 Log this event when the user has been presented with the results of a search.  
```
logViewSearchResults({
search_term: string
});
```
#### 35. resetAnalyticsData
 Clears all analytics data for this instance from the device and resets the app instance ID.  
```
resetAnalyticsData();
```
#### 36. setAnalyticsCollectionEnabled
 If true, allows the device to collect analytical data and send it to Firebase.
```
setAnalyticsCollectionEnabled(boolean);
```
#### 37. setDefaultEventParameters
Adds parameters that will be set on every event logged from the SDK, including automatic ones.
```
setDefaultEventParameters({
  [key: string]: any 
  });
```
#### 38. setSessionTimeoutDuration
Sets the duration of inactivity that terminates the current session.
```
setSessionTimeoutDuration(milliseconds: number);
```
#### 39. setUserId
Gives a user a unique identification.
```
setUserId(id: string);
```
#### 40. setUserProperties
Sets multiple key/value pairs of data on the current user. Each Firebase project can have up to 25 uniquely named (case-sensitive) user properties.
```
setUserProperties({
  [key: string]: string | null
  });
```
#### 41. setUserProperty
Sets a key/value pair of data on the current user. Each Firebase project can have up to 25 uniquely named (case-sensitive) user properties.
```
setUserProperty(name: string, value: string);
```

#### 42. getAppInstanceId
Retrieve the app instance id of the application.
```
getAppInstanceId();
```

### Reserved Events
Once you have integrated Google Analytics Firebase SDK in your app, a number of events are automatically reported to Firebase. These event names are called as 'Reserved Events'.

1. ad_activeview
2. ad_click
3. ad_impression
4. d_query
5. adunit_exposure	
6. app_background
7. app_clear_data
8. app_remove	
9. app_store_refund	
10. app_store_subscription_cancel
11. app_store_subscription_convert	
12. app_store_subscription_renew	
13. app_update
14. app_upgrade
15. dynamic_link_app_update
16. dynamic_link_first_open
17. error
18. dynamic_link_app_open
19. first_open
20. first_visit
21.	in_app_purchase
22.	notification_dismiss
23. notification_foreground
24. notification_open
25. notification_receive
26. ad_exposure
27. os_update
28.	session_start
29.	session_start_with_rollout
30. user_engagement
31. ad_reward	

### Disable Auto-Initialization
1. Analytics can be further configured to disable auto collection of Analytics data. This is possible by setting the below noted property on the firebase.json file at the root of your project directory.

project-root/firebase.json
```
{
  "react-native": {
    "analytics_auto_collection_enabled": false
  }
}
```
2. To re-enable analytics (e.g. once you have the users consent), call the setAnalyticsCollectionEnabled method:
```
setAnalyticsCollectionEnabled(true)
```
### Disable screenview tracking
Automatic screenview reporting can be turned off/on through google_analytics_automatic_screen_reporting_enabled property of firebase.json file.
```
{
  "react-native": {
    "google_analytics_automatic_screen_reporting_enabled": false
  }
}
```
