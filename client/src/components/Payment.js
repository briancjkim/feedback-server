import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payment extends React.Component {
  render() {
    return (
      <StripeCheckout
        name={"feedback"}
        description="$5 for 5 credit"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn ">Add Credit</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payment);
