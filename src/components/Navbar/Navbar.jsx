import React from "react";
import Profile from "../Card/Profile";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navigite = useNavigate();
	const onLogout = () => {
		navigite("/login");
	};
	return (
		<div className="navbar bg-white items-center justify-between px-6 py-2">
			<h2 className="btn btn-ghost text-xl">NotesApp</h2>
			<Profile onLogout={onLogout} />
		</div>
	);
}

export default Navbar;
