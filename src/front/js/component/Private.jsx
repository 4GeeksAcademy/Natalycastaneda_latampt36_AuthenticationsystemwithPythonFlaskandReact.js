import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ email: "", isActive: false, password: "", id: null })

    const handlePrivateData = async () => {
    {
        try {
            const response = await fetch('https://silver-invention-9rvw47gw5743pw4-3001.app.github.dev/api/users', {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${store.token}`
                }
            })
                const body = await response.json()
                setUserData({ email: body.email, isActive: body.is_active, password: body.password, id: body.id
        })
    } catch (error) {
    }
    }
}
useEffect(() => {
    if (store.token === undefined && localStorage.getItem("token") == undefined) {
        navigate("/login")
        return;
    } if (store.token) {
        handlePrivateData()
    }
},
    [store.token])
return (
    <main className="d-flex flex-column gap-3 vh-100 align-items-center justify-content-center bg-dark text-light">
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title text-dark">{userData.email}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{userData.password}</h6>
                <p className="card-text">{userData.isActive ? <button className="btn btn-success p-3"></button> : <button className="btn btn-danger p-3"></button> }</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    </main>
);
};

export default Private;