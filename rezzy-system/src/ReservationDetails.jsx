import React, { useState } from "react";
import "./ReservationDetails.css";

const ReservationDetails = ({ reservationData, onConfirm }) => {
    return (
        <div className="app-container">
            <div className="header">
                <h5>Logo here</h5>
            </div>
            <div className="app-area">
                <div className="reservations-details-area">
                    <div className="reservation-details-header">
                        <h4>Reservation Details</h4>
                    </div>
                    <div className="details">
                        <div className="res-name">
                            <p>Name </p><h4>{reservationData.name}</h4>
                        </div>
                        <div className="res-date">
                            <p>Date </p><h4>{reservationData.selectedDate}</h4>
                        </div>
                        <div className="res-time">
                            <p>Time </p><h4>{reservationData.selectedTime}</h4>
                        </div>
                        <div className="res-size">
                            <p>Party size </p><h4>{reservationData.partySize}</h4>
                        </div>
                    </div>
                    <div className="notes">
                        <h5>Add special notes (optional)</h5>
                        <textarea
                            placeholder="Celebrating something special? Dining with kids? Allergies?"
                            value={reservationData.notes}
                            onChange={(e) => onConfirm({ ...reservationData, notes: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                <div className="button-area">
                    <button className="submit-button" onClick={() => onConfirm(reservationData)}>Reserve</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationDetails;
