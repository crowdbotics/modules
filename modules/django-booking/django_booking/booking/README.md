# Crowdbotics Booking Component - Backend

This module contains all needed resources to get the Booking component for React
Native mobile client.

## Custom/Generic Booking Models:

List of generic models to create a custom booking app.

* **Booking Model**
* **BookingPlan Model**
* **BookingPenalty Model**
* **BookingDetails Model**

### 1. Booking Model

Booking model will save the following information.
 * **`user`** : Model will get the user as foreign key who has created a booking
 * **`quantity`**: In case of booking of hotels rooms or tickets quantity is the number rooms or tickets that a user is going to book.
 * **`Venue`**:  Venue will be the location on which a hotel or cinema/theater or car rental store.
 * **`address`**: Brief address with the name the booked place.



### 2. BookingPlan Model

A generic model for plans or offers that are offered to the booker.
BookingPlan model saves the following information about the plan:
* **`plane`** : The title for the plan
 * **`quantity`**: Description of the plan.
 * **`charges`**: The amount that a costumer will be charged with after availing the plan.


 ### 3. BookingPenalty Model

This model save the information about the charges or penalities that a user will have to pay in case of booking cancellation or refund.
BookingPenalty Model has following fields:
* **`title`** : The title for the penalty plan.
 * **`description`**: Description of the penalty plan.
 * **`charge`**: The amount that a costumer will be charged with in case of booking cancellation.

 ### 4. BookingDetails Model
The model will be saving the booking details that the user has booked with the booking plan that he/she has selected and penalty charges from `BookingPlan Model` and ` BookingPenalty Model`. 
BookingDetails Model consist of:
* **`STATUS`** : Status of the booking. It can be [`Pending` | `Accepted` | `Declined` | `Delivered` | `Occupied` | `Canceled` | `Not Available`] .
* **`booking`**: User, quantity and venue from the `Booking Model`.
* **`plan`**: Booking plane selected for the booking from the `BookingPlan Model`.
* **`penalty`**: Penalty plan to be applied in case booking cancellation from `BookingPenalty Model`.
* **`identity_number`**: A unique booking number for the current booking.
* **`type`**: Type of the booking.
* **`description`**: Description for the current booking.
* **`occupancy`**: The maximum number of user that availing the booking. In case of booking a hotel room, Occupancy will be number of people can stay in a room. In case of renting a car, maximum people can use that car.
* **`from_date`**: The date from the user can use the booked service .
* **`to_date`**: The date to the user can use the booked service .
* **`status`**: Status for the service. For example status for hotel rooms are cars if available or not.


### API End-points Table (Custom/Generic)

List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/booking/booking/` | object `{quantity, venue, address}` | `quantity` is the number rooms or tickets. `Venue` the location and `address` is the brief address with booker name. |
| `/modules/booking/penalties/` | object `{title, description, charge'}` | Will accept `title`, `description` and `charge` for the penalty plan in `POST` request. Will return the same fields in `GET` request. |
| `/modules/booking/plans/` | object `{plan, description, charges'}` | Will accept `plan`, as title for the plan `description` and `charges` against that plan `POST` request. Will return the same fields in `GET` request.|
| `/modules/booking/booking-details/` | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request. |
| `/modules/booking/create-booking/` | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request to create a booking. |



## Booking with Shopify API's:
Shopify Admin API's and Shopify Storefront API's  are being used to create booking. 
`X-Shopify-Storefront-Access-Token` and `X-Shopify-Access-Token` are needed to use Shopify API's. Here is the process to get these tokens: 

1. Login to [shopify.dev]('https://shopify.dev/') and you will be redirected to shopify partners dashboard.
2. Select the Stores tab from the sidebar. A new window will appear. Click on `Add Store ` button.
3. Select the store type, click on `Save` button. Your store will created.
4. Login to your store and Click on `Settings` Button on bottom-left corner.
5. Select the `Apps and sales channels` tab and then click `Develop app for your store` button to create app for your store.
6. Enter the name of your app and hit `Create app` button. Install your app by clicking `Install app` button.
7. Select the `configuration` tab and Click on `Edit` button of `Admin API Integration`. Select the scoops for your app. Click `Edit` button of` Storefront API integration` and select the scoops for your app. click `Save` button.
8. Select the `API Credentials` tab and now you can see your `X-Shopify-Storefront-Access-Token`,  `X-Shopify-Access-Token` and `API keys`.


### Creating Cart and Adding Line_Items:
To add the booking into cart a booking `variantId` will be and `quantity` will be needed.
`your-shop-name.myshopify.com/api/{api_version}/graphql.json/` Shopify GraphQL API is used to add the booking into cart.

*NOTE: You can se your store url by clicking `Settings` tab at shopify admin panel.*

**Payload**:
```
{
    "lines": [
                {
                "quantity": 2,
                "merchandiseId": "gid://shopify/ProductVariant/45605661606119",
                "attributes": [{ "key": "to_date", "value": "2022-10-02" },{ "key": "from_date", "value": "2022-10-03" } ,{ "key": "address", "value": "Avenfield apartment, london"}]
                },
                {
                "quantity": 3,
                "merchandiseId": "gid://shopify/ProductVariant/45605670879463",
                "attributes": { "key": "address", "value": "New York, USA" }
                }
            ]
}
```

* **quantity**: `quantity` can be the number of hotels rooms, cars or tickets that a user is going to book.
* **merchandiseId**: `merchandiseId` will be the variant id  of a hotel room, car or ticket that a user is going to book.  More details is given below about the product variant.
* **attributes**: `attributes` the additional information about the hotel room, car or ticket can be added to rhe cart as a key:value pair.


### Setting Product/Booking Variants
Shopify allows to add up to 100 variants per product and options compared to other platforms.\
Add any of the variant to the product/booking on shopify admin panel at the time of the it's creation. 
Product can be added in these four variants:
* Size
* Color
* Style
* Material


***Example***

**1. Booking a hotel room**
In case of booking hotel rooms. Rooms can be of different sizes and styles.

1. `Size` Variant can be used to set the size of rooms. Room can have `1` or `2` beds.
2. `Style` Variant can be used to define if room is in `Traditional design`, or `Classic`.

**2. Rent a car**
In case of renting car, Cars can be of different sizes and colors.

1. `Size` Variant can be used to set the size of car. Car can `2` or `4` seater.
2. `Color` Variant can be used to define color of the car.












 







