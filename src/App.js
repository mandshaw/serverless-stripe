import React from "react";
import { useState } from "react";
import { Jumbotron, Button, Alert, Spinner } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import CheckoutForm from "./CheckoutForm";
import { StripeProvider } from "react-stripe-elements";

const App = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const hidePaymentForm = () => setShowPaymentForm(false);
  const startPayment = () => setPaymentProcessing(true);
  const markCompleted = () => {
    setPaymentCompleted(true);
    setPaymentProcessing(false);
  };

  const handleClick = ev => {
    setShowPaymentForm(true);
  };

  const button = (
    <Button variant="primary" onClick={handleClick}>
      Pay Now
    </Button>
  );

  const form = (
    <CheckoutForm
      startPayment={startPayment}
      hidePaymentForm={hidePaymentForm}
      markCompleted={markCompleted}
    />
  );

  const spinner = <Spinner animation="border" />;

  const complete = (
    <Alert variant="success">
      <Alert.Heading>Payment Successful</Alert.Heading>
      <p>
        Aww yeah, you successfully called a Netlify Function and made a Payment
        using Stripe. Go you
      </p>
    </Alert>
  );

  const output = () => {
    if (!showPaymentForm && !paymentProcessing && !paymentCompleted) {
      return button;
    } else if (showPaymentForm && !paymentProcessing && !paymentCompleted) {
      return form;
    } else if (!showPaymentForm && paymentProcessing && !paymentCompleted) {
      return spinner;
    } else if (!showPaymentForm && !paymentProcessing && paymentCompleted) {
      return complete;
    }
  };

  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
      <div>
        <AppNavbar />
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            We are going to see how we can use Netlify Functions to call Stripe
          </p>
          <div>{output()}</div>
        </Jumbotron>
      </div>
    </StripeProvider>
  );
};

export default App;
