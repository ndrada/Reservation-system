import React, { useState } from 'react';
import ReservationPage from './ReservationPage';
import CalendarPage from './CalendarPage';
import ReservationDetails from './ReservationDetails';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    name: "",
    partySize: 1,
    selectedDate: null,
    selectedTime: null,
    notes: "",
  });

  // Step 1: Handle submission from Reservation Page
  const handleReservationSubmit = (name, partySize) => {
    setReservationData((prev) => ({ ...prev, name, partySize }));
    setStep(2);
  };

  // Step 2: Handle date selection and move to time selection
  const handleDateSelect = (date) => {
    setReservationData((prev) => ({ ...prev, selectedDate: date }));
  };

  // Step 3: Handle time selection and move to details page
  const handleTimeSelect = (time) => {
    setReservationData((prev) => ({ ...prev, selectedTime: time }));
    setStep(3);
  };

  // Step 4: Handle confirmation and move to final confirmation page
  const handleConfirm = (data) => {
    setReservationData(data);
    console.log("Final Reservation Data:", data);
    setStep(4);
  };

  return (
    <div className="app-container">
      {step === 1 && <ReservationPage onSubmit={handleReservationSubmit} />}
      {step === 2 && (
        <CalendarPage 
          onDateSelect={handleDateSelect}
          onTimeSelect={handleTimeSelect}
          reservationData={reservationData}
        />
      )}
      {step === 3 && (
        <ReservationDetails 
          reservationData={reservationData}
          onConfirm={handleConfirm}
        />
      )}
      {step === 4 && (
        <div className="confirmation">
          <h2>Reservation Confirmed!</h2>
          <p>Thank you, {reservationData.name}! Your reservation for {reservationData.partySize} people on {reservationData.selectedDate} at {reservationData.selectedTime} is confirmed.</p>
        </div>
      )}
    </div>
  );
}

export default App;
