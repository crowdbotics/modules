# Crowdbotics Booking Component - Backend

This module contains all needed resources to get the Booking component for React
Native mobile client. Module will allow user to create reservations/booking for hotel rooms, cars, theater tickets, etc.
This is a generic module consisting only of the backend to create and retrieve bookings from Shopify.

## Features

1. Create a booking.
2. Add booking to cart
3. Cancel booking
4. Refund the booking

## Installation

1. Update `.env` file with:

```
SHOPIFY_STORE_URL=https://your-development-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=storefront personal token
```

2. Run the following commands to get started:

```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Custom/Generic Booking Models:

List of generic models to create a custom booking app.

* **Booking Model**
* **BookingPlan Model**
* **BookingPenalty Model**
* **BookingDetails Model**

### 1. Booking Model

Booking model will save the following information.

* **`user`** : Model will get the user as foreign key who has created a booking
* **`quantity`**: In case of booking of hotels rooms or tickets quantity is the number rooms or tickets that a user is
  going to book.
* **`venue`**:  Venue will be the location on which a hotel or cinema/theater or car rental store.
* **`address`**: Brief address with the name the booked place.

***Example***

**1. Booking a hotel room**

1. `quantity` will be the number of the rooms that a user has booked
2. `venue`:  Venue will be the location on which a hotel

**2. Booking a ticket**

1. `quantity`: will be the number of the tickets that a user has booked
2. `venue`:  Venue will be the location theater/cinema

**2. Renting a car**

1. `quantity`: will be the number of the cars that a user has booked
2. `venue`:  Venue will be the location of the car rental store.

### 2. BookingPlan Model

A generic model for plans or offers that are offered to the booker.
BookingPlan model saves the following information about the plan:

* **`plan`** : The title for the plan
* **`description`**: Description of the plan.
* **`charges`**: The amount that a costumer will be charged with after availing the plan.

***Example***

**1. Plan for Booking a hotel room**

1. On three day stay user will have a discount of 10%.
2. On one week stay user will have a discount up to 15%.

**2. Booking a ticket**

1. If a user books four tickets will get one ticket free.

### 3. BookingPenalty Model

This model save the information about the charges or penalities that a user will have to pay in case of booking
cancellation or refund.
For example, a user has booked a room payed the charges for the room. On the exact date he/she didn't appear or cancels
the reservation. User will be charged with the 10% charged from the original amount.

BookingPenalty Model has following fields:

* **`title`** : The title for the penalty plan.
* **`description`**: Description of the penalty plan.
* **`charge`**: The amount that a costumer will be charged with in case of booking cancellation.

### 4. BookingDetails Model

The model will be saving the booking details that the user has booked with the booking plan that he/she has selected and
penalty charges from `BookingPlan Model` and ` BookingPenalty Model`.
BookingDetails Model consist of:

* **`STATUS`** : Status of the booking. It can
  be [`Pending` | `Accepted` | `Declined` | `Delivered` | `Occupied` | `Canceled` | `Not Available`] .
* **`booking`**: User, quantity and venue from the `Booking Model`.
* **`plan`**: Booking plane selected for the booking from the `BookingPlan Model`.
* **`penalty`**: Penalty plan to be applied in case booking cancellation from `BookingPenalty Model`.
* **`identity_number`**: A unique booking number for the current booking.
* **`type`**: Type of the booking.
* **`description`**: Description for the current booking.
* **`occupancy`**: The maximum number of user that availing the booking. In case of booking a hotel room, Occupancy will
  be number of people can stay in a room. In case of renting a car, maximum people can use that car.
* **`from_date`**: The date from the user can use the booked service .
* **`to_date`**: The date to the user can use the booked service .
* **`status`**: Status for the service. For example status for hotel rooms are cars if available or not.

### API End-points Table (Custom/Generic)

List of APIs endpoints with params needed for these apis.

| Api Name                                            |                                                    Param                                                     | Description                                                                                                                                                                                                                       |
|-----------------------------------------------------|:------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/booking/booking/` `{POST}`                |                                     object `{quantity, venue, address}`                                      | Will take the `quantity` is the number rooms or tickets. `venue` the location and `address` is the brief address with booker name.                                                                                                |
| `/modules/booking/booking/{id}/`  `{PUT}`           |                                     object `{quantity, venue, address}`                                      | Will take the `quantity` is the number rooms or tickets. `venue` the location and `address` is the brief address with booker name.                                                                                                |
| `/modules/booking/booking/{id}/`  `{GET}`           |                                            object `{booking_id}`                                             | Will take the `booking_id` and return details.                                                                                                                                                                                    |
| `/modules/booking/booking/{id}/`  `{DELETE}`        |                                            object `{booking_id}`                                             | Will take the `booking_id` and return 204 no content.                                                                                                                                                                             |
| `/modules/booking/penalties/`  `{POST}`             |                                    object `{title, description, charge}`                                     | Will accept `title`, `description` and `charge` for the penalty plan in `POST` request. Will return the same fields in `GET` request.                                                                                             |
| `/modules/booking/penalties/{id}/`  `{PUT}`         |                                    object `{title, description, charge}`                                     | Will accept `title`, `description` and `charge` for the penalty plan in `POST` request. Will return the same fields in `GET` request.                                                                                             |
| `/modules/booking/penalties/{id}/`   `{GET}`        |                                        object `{booking_penalty_id}`                                         | Will take the `booking_penalty_id` and return details.                                                                                                                                                                            |
| `/modules/booking/penalties/{id}/`   `{DELETE}`     |                                        object `{booking_penalty_id}`                                         | Will take the `booking_penalty_id` and return 204 no content.                                                                                                                                                                     |
| `/modules/booking/plans/` `{POST}`                  |                                    object `{plan, description, charges}`                                     | Will accept `plan`, as title for the plan `description` and `charges` against that plan `POST` request. Will return the same fields in `GET` request.                                                                             |
| `/modules/booking/plans/{id}/` `{PUT}`              |                                    object `{plan, description, charges}`                                     | Will accept `plan`, as title for the plan `description` and `charges` against that plan `POST` request. Will return the same fields in `GET` request.                                                                             |
| `/modules/booking/plans/{id}/` `{GET}`              |                                          object `{booking_plan_id}`                                          | Will take the `booking_plan_id` and return details.                                                                                                                                                                               |
| `/modules/booking/plans/{id}/` `{DELETE}`           |                                          object `{booking_plan_id}`                                          | Will take the `booking_plan_id` and return 204 no content..                                                                                                                                                                       |
| `/modules/booking/booking-details/` `{POST}`        | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id's of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request.                   |
| `/modules/booking/booking-details/{id}/` `{PUT}`    | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id's of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request.                   |
| `/modules/booking/booking-details/{id}/` `{GET}`    |                                         object `{bookig_detail_id}`                                          | Will take the `booking_detail_id` and return details. .                                                                                                                                                                           |
| `/modules/booking/booking-details/{id}/` `{DELETE}` |                                         object `{bookig_detail_id}`                                          | Will take the `booking_detail_id` and return 204 no content.                                                                                                                                                                      |
| `/modules/booking/create-booking/` `{POST}`         | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request to create a booking. |
| `/modules/booking/create-booking/{id}/` `{PUT}`     | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request to create a booking. |
| `/modules/booking/create-booking/{id}/` `{GET}`     |                                         object `{create_booking_id}`                                         | Will take the `create_booking_id` and return details.                                                                                                                                                                             |
| `/modules/booking/create-booking/{id}/` `{DELETE}`  |                                         object `{create_booking_id}`                                         | Will take the `create_booking_id` and return 204 no content.                                                                                                                                                                      |
| `/modules/booking/shopify/booking/` `{POST}`        |                          .ENV `SHOPIFY_STORE_URL`,`SHOPIFY_STOREFRONT_ACCESS_TOKEN`                          | Will return an shopify cart id and save it in database.                                                                                                                                                                           |
| `/modules/booking/shopify/booking/` `{GET}`         |               .ENV `SHOPIFY_STORE_URL`,`SHOPIFY_STOREFRONT_ACCESS_TOKEN` body_params `cart_id`               | Will return an shopify cart id details.                                                                                                                                                                                           |

## Booking with Shopify API's:

Shopify Admin API's and Shopify Storefront API's are being used to create booking.
`X-Shopify-Storefront-Access-Token` and `X-Shopify-Access-Token` are needed to use Shopify API's. Here is the process to
get these tokens:

1. Login to [shopify.dev]('https://shopify.dev/') and you will be redirected to shopify partners dashboard.
2. Select the Stores tab from the sidebar. A new window will appear. Click on `Add Store ` button.
3. Select the store type, click on `Save` button. Your store will created.
4. Login to your store and Click on `Settings` Button on bottom-left corner.
5. Select the `Apps and sales channels` tab and then click `Develop app for your store` button to create app for your
   store.
6. Enter the name of your app and hit `Create app` button. Install your app by clicking `Install app` button.
7. Select the `configuration` tab and Click on `Edit` button of `Admin API Integration`. Select the scoops for your app.
   Click `Edit` button of` Storefront API integration` and select the scoops for your app. click `Save` button.
8. Select the `API Credentials` tab and now you can see
   your `X-Shopify-Storefront-Access-Token`,  `X-Shopify-Access-Token` and `API keys`.

![shopify](https://user-images.githubusercontent.com/76822297/228190942-bb2d0831-ce66-4a69-acb9-c67073ecceb9.png)

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
                "merchandiseId": "gid://shopify/ProductVariant/11223344",
                "attributes": [{ "key": "to_date", "value": "2022-10-02" },{ "key": "from_date", "value": "2022-10-03" } ,{ "key": "address", "value": "Avenfield apartment, london"}]
                },
                {
                "quantity": 3,
                "merchandiseId": "gid://shopify/ProductVariant/55667788",
                "attributes": { "key": "address", "value": "New York, USA" }
                }
            ]
}
```

* **quantity**: `quantity` can be the number of hotels rooms, cars or tickets that a user is going to book.
* **merchandiseId**: `merchandiseId` will be the variant id of a hotel room, car or ticket that a user is going to book.
  More details is given below about the product variant.
* **attributes**: `attributes` the additional information about the hotel room, car or ticket can be added to rhe cart
  as a key:value pair.

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

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1dmzTBeBDrdrqQ78RMXkGwXoXsjOhJWs6O_yHfChoUm8/edit?usp=sharing),
which provides more information about the module's actual intentions.

## Postman Collection for Module APi Endpoints

Here is a collection of all the api endpoints for the module.
[Booking Postman Collection](https://drive.google.com/file/d/1Lg_ynN-NHnfS-Gyml2JAo5lve_MGwqEZ/view?usp=share_link)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
 







