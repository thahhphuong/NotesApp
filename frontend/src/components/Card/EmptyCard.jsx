import React from "react";

function EmptyCard({ src, message }) {
	return (
		<div className="flex flex-col justify-center items-center mt-20">
			<img src={src} alt="a" className="w-60" />
			<p className="w-1/2 text-sm font-medium text-slate-700 text-center  leading-7 mt-5"> {message}</p>
		</div>
	);
}

export default EmptyCard;
