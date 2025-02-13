import React, { useState } from "react";
import "./ReservationArea.css";

const ReservationApp = () => {
    const [counter, setCounter] = useState(1); // Corrected useState

    const handleClick = () => {
        console.log("Submit clicked! Party size:", counter);
        // Add form submission logic here
    };

    return (
        <div className="app-container">
            <div className="header">
                <h5>Logo here</h5>
            </div>
            <div className="app-area">
                <div className="reservations-area">
                    <div className="reservations-form">
                        <div className="name-container">
                            <div className="first-name-container">
                                <label htmlFor="firstName">First name</label> {/* Corrected htmlFor */}
                                <input type="text" name="firstName" id="firstName" />
                            </div>
                            <div className="last-name-container">
                                <label htmlFor="lastName">Last name</label> {/* Corrected htmlFor */}
                                <input type="text" name="lastName" id="lastName" />
                            </div>
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label> {/* Corrected htmlFor */}
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="phone">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" />
                        </div>
                    </div>
                    <div className="party-size">
                        <h4>Number of people</h4>
                        <div className="counter">
                            <button
                                className="minus-button"
                                onClick={() => setCounter((prev) => Math.max(prev - 1, 1))}
                                disabled={counter === 1}
                            >
                                -
                            </button>
                            <div className="number-section">
                                <p className="number">{counter}</p>
                            </div>
                            <button
                                className="plus-button"
                                onClick={() => setCounter((prev) => prev + 1)}
                                disabled={counter === 8}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="button-area">
                    <button className="submit-button" onClick={handleClick}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationApp;
