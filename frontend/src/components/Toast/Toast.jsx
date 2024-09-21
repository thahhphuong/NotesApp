import React from "react";
import { ToastContainer, toast } from "react-toastify";

function Toast({ isShow, message, type, onClose }) {
	// message = "messagemessage";
	const showToastMessage = () => {
		toast.success(message || "messagemessage");
	};
	return (
		<>
			<button onClick={showToastMessage}>Notify</button>
			<ToastContainer position="top-right" autoClose={5000} />
		</>
	);
}

export default Toast;
