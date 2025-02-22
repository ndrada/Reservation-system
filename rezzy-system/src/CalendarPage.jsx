import React, { useState } from "react";
import "./CalendarPage.css";

const CalendarPage = ({ onDateSelect, onTimeSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    // Example times for demonstration
    const times = ["5:15 PM", "6:00 PM", "7:30 PM"];

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setAvailableTimes(times); 
        onDateSelect(date); 
    };

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

        
                    {selectedDate && (
                        <div className="available-times">
                            <h5>Showing available times for {selectedDate}</h5>
                            <div className="time-list">
                                {availableTimes.map((time, index) => (
                                    <button
                                        key={index}
                                        className={`time-button ${selectedTime === time ? "selected-time" : ""}`}
                                        onClick={() => handleTimeClick(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="button-area">
                    <button className="confirm-button" disabled={!selectedTime} onClick={() => console.log("Confirmed:", selectedDate, selectedTime)}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
