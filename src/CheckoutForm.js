import React from "react";
import { injectStripe, Elements } from "react-stripe-elements";
import { Form, Button } from "react-bootstrap";
import CardSection from "./CardSection";

const RawForm = props => {
  const handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    console.log(props);
    props.hidePaymentForm();
    props.startPayment();
    setTimeout(props.markCompleted, 1000);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicPassword">
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
      <Button variant="primary" type="submit">
        Pay
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
