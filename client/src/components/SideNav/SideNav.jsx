import React from "react";
import { Link, useNavigate } from "react-router";
import "./SideNav.css";

export default function SideNav() {
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		// TODO: wire actual logout logic (clear auth, token, redirect)
		// Placeholder behavior: navigate to login
		navigate("/login");
	};

	return (
		<nav className="side-nav" aria-label="Main navigation">
			<h1 className="side-nav-title">Health</h1>
			<ul className="side-nav-list">
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/profile">My Profile</Link>
				</li>
				<li>
					<a href="/dashboard#goals">Wellness Goals</a>
				</li>
				<li>
					<Link to="/health-info">Health Info</Link>
				</li>
				<li>
					<a
						href="#logout"
						onClick={handleLogout}
						className="logout-link"
					>
						Logout
					</a>
				</li>
			</ul>
		</nav>
	);
}
