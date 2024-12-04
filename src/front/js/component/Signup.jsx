import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formStatus, setFormStatus] = useState({ loading: false, ready: false, message: null });
    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault();
        setFormStatus({ ...formStatus, loading: true, ready: false});

        try {
            const response = await fetch("https://silver-invention-9rvw47gw5743pw4-3001.app.github.dev/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                setFormStatus({ loading: false, ready: true, message: "User successfully created! you will be redirected to Log in." });
            } else {
                setFormStatus({ loading: false, ready: false, message: data.message || "Error creating user" });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            setFormStatus({ loading: false, message: "Server error. Please try again later." });
        }
    };

    useEffect(() => {
        if (formStatus.ready === true) {
            setTimeout (() => { navigate("/login")}, 1000) 
            
        }
    },[formStatus.ready])

    return (
        <main className="d-flex flex-column gap-3 vh-100 align-items-center justify-content-center">
            <h1>Sign up</h1>
            <form onSubmit={registerUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                {formStatus.loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <button type="submit" className="btn btn-primary">Submit</button>
                )}
                {formStatus.message && (
                    <div
                        className={`alert mt-3 ${formStatus.message.includes("successfully")? "alert-success": "alert-danger"}`}
                        role="alert"
                    >
                        {formStatus.message}
                    </div>
                )}
            </form>
        </main>
    );
};  

export default Signup;