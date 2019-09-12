// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  require("dotenv").config();
  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 999,
      currency: "eur"
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret: paymentIntent.client_secret })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
