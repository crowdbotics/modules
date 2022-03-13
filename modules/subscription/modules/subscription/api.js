import { getGlobalOptions } from "@options";


const global = getGlobalOptions(); 
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value
const token = "Token da27ae41bacbe05d36c73b0aa13ad404e8115660"
// FIXME: Make this call with Authorization
// Right now there is no login in this module but when this feture will be added
// there will be a user profile added make changes accordingly
export const fetchPaymentSheetParams = async (price_tier) => {
    const response = await fetch(`${BASE_URL}/modules/subscription/buy_subscription_plan/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
        "price_tier": price_tier
        })
    });

    const { customer, paymentIntent, ephemeralKey } = await response.json();
    __DEV__ && console.log('response', { paymentIntent, ephemeralKey, customer, response })
    return {
        paymentIntent,
        ephemeralKey,
        customer,
    };
};

export const fetchPlans = async () => {
    const response = await fetch(`${BASE_URL}/modules/subscription/get_subscription_plans/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    return response
};
