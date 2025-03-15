import React, { useState, useEffect } from "react";
import "./CalendarPage.css";

const CalendarPage = ({ onDateSelect, onTimeSelect, partySize }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [timeFrequency, setTimeFrequency] = useState(30);
    const [maxPeople, setMaxPeople] = useState(8);
    const [lastReservationTime, setLastReservationTime] = useState("20:30");

    // fetch settings on load
    useEffect(() => {
        fetch("https://rezzy-staff-app.onrender.com/settings")
        .then((res) => res.json())
        .then((data) => {
            setTimeFrequency(data.time_frequency === "hourly" ? 60 : 30);
            setMaxPeople(data.max_people);
            setLastReservationTime(data.last_reservation_time);
        })
        .catch((error) => console.error("error fetching settings:", error));
    }, []);

    //generate the next 28 days
    const generateDates = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        const datesArray = [...Array(28)].map((_, i) => {
            const futureDate = new Date(today.getTime());
            futureDate.setDate(today.getDate() + i);
            return futureDate.toISOString().split("T")[0];
        });

        return datesArray;
    };

    //generate time slots based on time frequency
    const generateTimeSlots = () => {
        let startTime = new Date(`2025-03-01T17:30:00`); //5:30PM default start
        let endTime = new Date(`2025-03-01T${lastReservationTime}`);
        let slots = [];

        while (startTime <= endTime) {
            const formatted = startTime.toTimeString().split(" ")[0];
            slots.push(formatted);
            startTime.setMinutes(startTime.getMinutes() + timeFrequency);
        }


        return slots;
    }

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate; 
    
            fetch(`https://rezzy-staff-app.onrender.com/reservations?date=${formattedDate}`)
            .then((res) => res.json())
            .then((data) => {
                const takenTimes = data.reduce((acc, res) => {
                    acc[res.time] = (acc[res.time] || 0) + res.party_size;
                    return acc;
                    },
                {});


                const timeSlots = generateTimeSlots().filter((time) => {
                    const bookedPeople = takenTimes[time] || 0;
                    const reqSpace = (partySize ?? 1);
                    return bookedPeople + reqSpace <= maxPeople;
                });
                setAvailableTimes(timeSlots);
            })
            .catch((error) => console.error("Error fetching reservations:", error));
        }
    }, [selectedDate, partySize, maxPeople, timeFrequency]);
    
    const formatTime = (time) => {
        if (!time) return "";
        let [hour, minute] = time.split(":");
        let period = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; // conversion to am/pm
        return `${hour}:${minute} ${period}`;
      };
      
    // handle date selection
    const handleDateClick = (date) => {
        console.log("clicked date (raw):", date);

        const parsedDate = new Date(date);
        console.log("parsed date:", parsedDate.toISOString());

        setSelectedDate(date);
        onDateSelect(date); 
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
                            {generateDates().map((date, i) => (
                                console.log(`rendering button for date: ${date} (index: ${i})`),
                                <button
                                key={i}
                                className={`date-button ${selectedDate === date ? "selected" : ""}`}
                                onClick={() => handleDateClick(date)}
                                >
                                    {/* {new Date(date).toLocaleDateString("en-US", {month:"numeric", day:"numeric"})} */}
                                    {date.split("-").slice(1).join("/")}
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
