// App.js
import React from 'react';
import { Elements } from 'react-stripe-elements';
import MobileRechargeForm from './MobileRechargeForm';


function App() {

  
  return (
    <div className="App">
      {
console.log("bbbbbbbb")
      }
      <Elements>
        <MobileRechargeForm />
      </Elements>
    </div>
  );
}

export default App;

