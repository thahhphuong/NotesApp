import React, { useState } from "react";
import Profile from "../Card/Profile";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Navbar({ userInfo, onSearchNote, handleOnclearSearch }) {
	const navigite = useNavigate();
	const [search, setSearch] = useState("");
	const onLogout = () => {
		navigite("/login");
	};
	const handleSearch = () => {
		if (search) {
			onSearchNote(search);
		}
	};
	const onClearSearch = () => {
		setSearch("");
		handleOnclearSearch();
	};
	return (
		<div className="navbar bg-white items-center justify-between px-6 py-2">
			<h2 className="btn btn-ghost text-xl">NotesApp</h2>

			<SearchBar value={search} onChange={(e) => setSearch(e.target.value)} handleSearch={handleSearch} onClearSearch={onClearSearch} />
			<Profile userInfo={userInfo} onLogout={onLogout} />
		</div>
	);
}

export default Navbar;
