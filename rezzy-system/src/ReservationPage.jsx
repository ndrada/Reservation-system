import React, { useState } from "react";
import "./ReservationPage.css";
import CalendarPage from "./CalendarPage";

const ReservationPage = ({onSubmit}) => {
    const [counter, setCounter] = useState(1); 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = () => {
        const fullName = `${firstName} ${lastName}`;
        onSubmit(fullName, counter);
    };

    useEffect(() => { 
        fetch("http://localhost:5000/settings")
        .then((res) => res.json())
        .then((data) => {
            setMaxPeple(data.max_people);
        })
        .catch((error) => console.error("error fetching settings",error));
    }, []);

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
                                <label htmlFor="firstName">First name</label>
                                <input 
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="last-name-container">
                                <label htmlFor="lastName">Last name</label>
                                <input 
                                type="text" 
                                name="lastName" 
                                id="lastName" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="phone">
                            <label htmlFor="phone">Phone</label>
                            <input 
                            type="tel" 
                            name="phone" 
                            id="phone" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
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
                                onClick={() => setCounter((prev) => Math.min(prev + 1, maxPeple))}
                                disabled={counter >= 8}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="button-area">
                    <button className="submit-button" onClick={handleSubmit}>
                        Pick a date
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationPage;
