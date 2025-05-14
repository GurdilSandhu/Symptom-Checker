import React from 'react';
import SymptomChecker from './SymptomChecker';
import AppointmentBooking from './AppointmentBooking';
import '../styles/AfterLogin.css';

const AfterLogin = () => {
  return (
    <div className="after-login-container">
      <div className="left">
        <SymptomChecker />
      </div>
      <div className="right">
        <AppointmentBooking />
      </div>
    </div>
  );
};

export default AfterLogin;
