import React from "react";
import { useState } from "react";
import { injectStripe, Elements } from "react-stripe-elements";
import { Form, Button, Alert } from "react-bootstrap";
import CardSection from "./CardSection";
import axios from "axios";

const RawForm = props => {
  const [error, setError] = useState();
  const handleSubmit = async ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    const form = ev.target;
    const userDetails = {
      name: form.elements.formBasicName.value,
      email: form.elements.formBasicEmail.value
    };
    try {
      const paymentIntentClientSecret = await axios(
        "/.netlify/functions/createPaymentIntent"
      );
      const { paymentIntent, error } = await props.stripe.handleCardPayment(
        paymentIntentClientSecret.data.client_secret,
        {
          payment_method_data: {
            billing_details: {
              ...userDetails
            }
          }
        }
      );
      if (error) {
        setError(error);
        console.log(error);
      } else {
        console.log(paymentIntent);
        props.hidePaymentForm();
        props.startPayment();
        setTimeout(props.markCompleted, 1000);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const paymentError = (
    <Alert variant="danger">
      <Alert.Heading>Error collecting Payment</Alert.Heading>
      <p>{error ? error.message : ""}</p>
    </Alert>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="First and Last Name" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="formCardDetails">
        <Form.Label>Card Details</Form.Label>
        <CardSection />
      </Form.Group>
      {error ? paymentError : ""}
      <Button variant="primary" type="submit">
        Pay €9.99
      </Button>
    </Form>
  );
};

const InjectedForm = injectStripe(RawForm);

function CheckoutForm(props) {
  return (
    <Elements>
      <InjectedForm {...props} />
    </Elements>
  );
}

export default CheckoutForm;
