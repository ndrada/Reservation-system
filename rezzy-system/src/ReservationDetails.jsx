import React, { useState } from "react";
import "./ReservationDetails.css";

const ReservationDetails = ({ reservationData, onConfirm }) => {
    const [notes, setNotes] = useState(reservationData.notes || "");

    const formatTime = (time) => {
        if (!time) return "";
        let [hour, minute] = time.split(":");
        let period = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; // converts to am/pm 
        return `${hour}:${minute} ${period}`;
      };
      
    // send reservation to backend
    const handleSubmitReservation = async () => {
        const reservation = {
            name: reservationData.name,
            partySize: reservationData.partySize,
            date: reservationData.selectedDate,
            time: reservationData.selectedTime,
            notes: notes, // use updated notes value
        };

        try {
            const response = await fetch("http://localhost:5000/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservation),
            });

            if (!response.ok) {
                throw new Error("Failed to create reservation");
            }

            const data = await response.json();
            console.log("Reservation saved:", data);
            onConfirm(reservation); // move to confirmation step
        } catch (error) {
            console.error("Error submitting reservation:", error);
        }
    };

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
                            <p>Time </p><h4>{formatTime(reservationData.selectedTime)}</h4>
                        </div>
                        <div className="res-size">
                            <p>Party size </p><h4>{reservationData.partySize}</h4>
                        </div>
                    </div>
                    <div className="notes">
                        <h5>Add special notes (optional)</h5>
                        <textarea
                            placeholder="Celebrating something special? Dining with kids? Allergies?"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="button-area">
                    <button className="submit-button" onClick={handleSubmitReservation}>
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationDetails;
