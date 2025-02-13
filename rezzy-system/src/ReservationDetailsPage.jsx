import React from "react";
import "./ReservationDetailsPage.css";

const ReservationDetailsPage = ({ reservationData, onConfirm }) => {
  return (
    <div className="app-container">
      <div className="reservation-details-area">
        <h4>Reservation details</h4>
        
        <div className="details">
          <p><strong>Name:</strong> {reservationData.name}</p>
          <p><strong>Date:</strong> {reservationData.date}</p>
          <p><strong>Time:</strong> {reservationData.time}</p>
          <p><strong>Party size:</strong> {reservationData.partySize}</p>
        </div>

        <div className="notes">
          <h5>Add special notes (optional)</h5>
          <textarea
            placeholder="Celebrating something special? Dining with kids? Allergies?"
            value={reservationData.notes}
            onChange={(e) => onConfirm({ ...reservationData, notes: e.target.value })}
          ></textarea>
        </div>

        <button className="reserve-button" onClick={() => onConfirm(reservationData)}>
          Reserve
        </button>
      </div>
    </div>
  );
};

export default ReservationDetailsPage;
