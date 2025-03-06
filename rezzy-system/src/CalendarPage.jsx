import React, { useState, useEffect } from "react";
import "./CalendarPage.css";

const CalendarPage = ({ onDateSelect, onTimeSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    // Function to fetch available times when a date is selected
    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate; 
    
            fetch(`http://localhost:5000/reservations?date=${formattedDate}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data); // ✅ debugging Log
                const takenTimes = data.map((res) => res.time);
                const allTimes = ["17:30:00", "18:30:00", "19:00:00", "20:00:00"];
                const freeTimes = allTimes.filter((time) => !takenTimes.includes(time));
                setAvailableTimes(freeTimes);
            })
            .catch((error) => console.error("Error fetching reservations:", error));
        }
    }, [selectedDate]);
    
    const formatTime = (time) => {
        if (!time) return "";
        let [hour, minute] = time.split(":");
        let period = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; // conversion to am/pm
        return `${hour}:${minute} ${period}`;
      };
      
    // handle date selection
    const handleDateClick = (day) => {
        const formattedDate = `2025-03-${String(day).padStart(2, "0")}`; // february
        setSelectedDate(formattedDate);
        onDateSelect(formattedDate); 
      };
      
    // handle time selection
    const handleTimeClick = (time) => {
        setSelectedTime(time);
        onTimeSelect(time);
    };

    return (
        <div className="app-container">
            <div className="header">
                <h5>Logo here</h5>
            </div>
            <div className="app-area">
                <div className="calendar-area">
                    <div className="calendar-header">
                        <h4>Pick a date</h4>
                    </div>

                    {/* calendar section */}
                    <div className="calendar">
                        <div className="calendar-grid">
                            {[...Array(30)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`date-button ${selectedDate === i + 1 ? "selected" : ""}`}
                                    onClick={() => handleDateClick(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* available times section */}
                    {selectedDate && (
                        <div className="available-times">
                            <h5>Showing available times for {selectedDate}</h5>
                            <div className="time-list">
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((time, index) => (
                                        <button
                                            key={index}
                                            className={`time-button ${selectedTime === time ? "selected-time" : ""}`}
                                            onClick={() => handleTimeClick(time)}
                                        >
                                            {formatTime(time)}
                                        </button>
                                    ))
                                ) : (
                                    <p>No available times</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirm Button */}
                <div className="button-area">
                    <button
                        className="confirm-button"
                        disabled={!selectedTime}
                        onClick={() => console.log("Confirmed:", selectedDate, selectedTime)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
