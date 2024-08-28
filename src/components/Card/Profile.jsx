import React from "react";
import { getInitials } from "../../utils/helper";

function Profile({ onLogout }) {
	return (
		<div className="flex items-center gap-3">
			<div className="flex items-center justify-center bg-gray-400 w-12 h-12 rounded-full font-medium text-sm">
				{getInitials("Thanh Phuong")}
			</div>
			<div>
				<button className="text-sm underline" onClick={onLogout}>
					{" "}
					Logout
				</button>
			</div>
		</div>

		// <details className="dropdown ">
		// 	<summary className="btn m-1"> </summary>
		// 	<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
		// 		<li>
		// 			<a>Item 1</a>
		// 		</li>
		// 		<li>
		// 			<a>Item 2</a>
		// 		</li>
		// 	</ul>
		// </details>
	);
}

export default Profile;
