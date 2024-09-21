import React from "react";
import { getInitials } from "../../utils/helper";

function Profile({ onLogout, userInfo }) {
	return (
		<div className="flex items-center gap-3">
			<div className="flex items-center justify-center bg-gray-400 w-12 h-12 rounded-full font-medium text-sm">
				{getInitials(userInfo?.data?.fullName)}
			</div>
			<div>
				<button className="text-sm underline" onClick={onLogout}>
					{" "}
					Logout
				</button>
			</div>
		</div>
	);
}

export default Profile;
