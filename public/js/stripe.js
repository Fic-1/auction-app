/* eslint-disable */

import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51OUuIUBhYQwhtBdpefIQnW6Nsn4TFQh9ezwLyra1a1ugaAY1Og40fYiQNZbwoiursdFpCg9WfmCIp7M7JZu8Sz9H00HVEnECJS',
);

export const checkoutProduct = async (productId) => {
  try {
    // 1) Get the session from the API endpoint
    const session = await axios(
      `/api/v1/checkouts/checkout-session/${productId}`,
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
