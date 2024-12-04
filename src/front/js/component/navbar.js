import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const location = useLocation();

	const shouldShowSignOutButton = store.token && location.pathname === "/private";

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{shouldShowSignOutButton && (
						<button onClick={() => { actions.clearToken(); navigate("/login"); }} className="btn btn-danger">
							Sign out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
