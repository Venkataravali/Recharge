
// MobileRechargeForm.js
import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';


function MobileRechargeForm(props) {
  const [provider, setProvider] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleRecharge = async () => {
    try {
      const { token } = await props.stripe.createToken();
      const response = await axios.post('http://localhost:5000/api/recharge', {
  provider,
  mobileNumber,
  token: token.id,
});
console.log("bbbbbbb",response)

      alert(`Recharge successful! Transaction ID: ${response.data.transactionId}`);
    } catch (error) {
      alert('Recharge failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Mobile Recharge</h2>
      <label>Select Network Provider:</label>
      <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)} />
      <br />
      <label>Mobile Number:</label>
      <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
      <br />
      <label>Payment Details:</label>
      <CardElement />
      <br />
      <button onClick={handleRecharge}>Recharge Now</button>
    </div>
  );
}

export default injectStripe(MobileRechargeForm);
