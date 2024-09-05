import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
	// const handleSearch = () => {
	// 	console.log("elolo");
	// };
	return (
		<div className="w-80 flex items-center justify-center px-4 bg-sky-100 rounded-md">
			<input
				type="text"
				value={value}
				onChange={onChange}
				placeholder="Search bar"
				className=" px-5 mb-3 w-full h-4 text-sm bg-transparent py-3 mr-3 outline-none"
			/>
			{value && <IoMdClose className="text-x1 text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />}

			<FaMagnifyingGlass className="text-x1 text-slate-500 cursor-pointer hover:text-black mr-3" onClick={handleSearch} />
		</div>
	);
}

export default SearchBar;
