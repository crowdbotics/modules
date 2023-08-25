## Django Booking backend configuration and information

## Module description

This Module will allow user to create reservations/booking for hotel rooms, cars, theater tickets, etc.
This is a generic module consisting only of the backend to create and retrieve bookings from Shopify.

Following are the scope features for this module:

- Create a booking.
- Add booking to cart
- Cancel booking
- Refund the booking

## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
SHOPIFY_STORE_URL="https://your-development-store.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="storefront personal token"
```

## 3rd party setup

Shopify Admin APIs and Shopify Storefront APIs are being used to create booking.
`X-Shopify-Storefront-Access-Token` and `X-Shopify-Access-Token` are needed to use Shopify APIs. Here is the process to
get these tokens:

- Login to [shopify.dev]('https://shopify.dev/') and you will be redirected to shopify partners dashboard.
- Select the Stores tab from the sidebar. A new window will appear. Click on `Add Store ` button.
- Select the store type, click on `Save` button. Your store will be created.
- Login to your store and Click on `Settings` Button on bottom-left corner.
- Select the `Apps and sales channels` tab and then click `Develop app for your store` button to create app for your
  store.
- Enter the name of your app and hit `Create app` button. Install your app by clicking `Install app` button.
- Select the `configuration` tab and Click on `Edit` button of `Admin API Integration`. Select the scoops for your app.
  Click `Edit` button of` Storefront API integration` and select the scoops for your app. click `Save` button.
- Select the `API Credentials` tab and now you can see
  your `X-Shopify-Storefront-Access-Token`,  `X-Shopify-Access-Token` and `API keys`.

![shopify](https://user-images.githubusercontent.com/76822297/228190942-bb2d0831-ce66-4a69-acb9-c67073ecceb9.png)

## Dependencies

No dependencies are used.

## API details

| Api Name                                          |                                                    Param                                                     | Description                                                                                                                                                                                                                       |
|---------------------------------------------------|:------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/booking/booking/` `POST`                |                                     object `{quantity, venue, address}`                                      | Will take the `quantity` is the number rooms or tickets. `venue` the location and `address` is the brief address with booker name.                                                                                                |
| `/modules/booking/booking/{id}/`  `PUT`           |                                     object `{quantity, venue, address}`                                      | Will take the `quantity` is the number rooms or tickets. `venue` the location and `address` is the brief address with booker name.                                                                                                |
| `/modules/booking/booking/{id}/`  `GET`           |                                            object `{booking_id}`                                             | Will take the `booking_id` and return details.                                                                                                                                                                                    |
| `/modules/booking/booking/{id}/`  `DELETE`        |                                            object `{booking_id}`                                             | Will take the `booking_id` and return 204 no content.                                                                                                                                                                             |
| `/modules/booking/penalties/`  `POST`             |                                    object `{title, description, charge}`                                     | Will accept `title`, `description` and `charge` for the penalty plan in `POST` request. Will return the same fields in `GET` request.                                                                                             |
| `/modules/booking/penalties/{id}/`  `PUT`         |                                    object `{title, description, charge}`                                     | Will accept `title`, `description` and `charge` for the penalty plan in `POST` request. Will return the same fields in `GET` request.                                                                                             |
| `/modules/booking/penalties/{id}/`   `GET`        |                                        object `{booking_penalty_id}`                                         | Will take the `booking_penalty_id` and return details.                                                                                                                                                                            |
| `/modules/booking/penalties/{id}/`   `DELETE`     |                                        object `{booking_penalty_id}`                                         | Will take the `booking_penalty_id` and return 204 no content.                                                                                                                                                                     |
| `/modules/booking/plans/` `POST`                  |                                    object `{plan, description, charges}`                                     | Will accept `plan`, as title for the plan `description` and `charges` against that plan `POST` request. Will return the same fields in `GET` request.                                                                             |
| `/modules/booking/plans/{id}/` `PUT`              |                                    object `{plan, description, charges}`                                     | Will accept `plan`, as title for the plan `description` and `charges` against that plan `POST` request. Will return the same fields in `GET` request.                                                                             |
| `/modules/booking/plans/{id}/` `GET`              |                                          object `{booking_plan_id}`                                          | Will take the `booking_plan_id` and return details.                                                                                                                                                                               |
| `/modules/booking/plans/{id}/` `DELETE`           |                                          object `{booking_plan_id}`                                          | Will take the `booking_plan_id` and return 204 no content..                                                                                                                                                                       |
| `/modules/booking/booking-details/` `POST`        | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id's of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request.                   |
| `/modules/booking/booking-details/{id}/` `PUT`    | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id's of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request.                   |
| `/modules/booking/booking-details/{id}/` `GET`    |                                         object `{bookig_detail_id}`                                          | Will take the `booking_detail_id` and return details. .                                                                                                                                                                           |
| `/modules/booking/booking-details/{id}/` `DELETE` |                                         object `{bookig_detail_id}`                                          | Will take the `booking_detail_id` and return 204 no content.                                                                                                                                                                      |
| `/modules/booking/create-booking/` `POST`         | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request to create a booking. |
| `/modules/booking/create-booking/{id}/` `PUT`     | object `{identity_number, type, description, occupancy, from_date, to_date, status, booking, penalty, plan}` | Will take the unique `identity_number` for the booking, `type`, `description` and `status` of the booking, id of the selected plan, booking and penalty as `plan`, `booking` and `penalty` in `POST` request to create a booking. |
| `/modules/booking/create-booking/{id}/` `GET`     |                                         object `{create_booking_id}`                                         | Will take the `create_booking_id` and return details.                                                                                                                                                                             |
| `/modules/booking/create-booking/{id}/` `DELETE`  |                                         object `{create_booking_id}`                                         | Will take the `create_booking_id` and return 204 no content.                                                                                                                                                                      |
| `/modules/booking/shopify/booking/` `POST`        |                                 [Create Booking Cart](#Create-cart-payload)                                  | Will return an shopify cart id and save it in database.                                                                                                                                                                           |
| `/modules/booking/shopify/booking/` `GET`         |               .ENV `SHOPIFY_STORE_URL`,`SHOPIFY_STOREFRONT_ACCESS_TOKEN` body_params `cart_id`               | Will return an shopify cart id details.                                                                                                                                                                                           |

#### Create Cart Payload:

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





