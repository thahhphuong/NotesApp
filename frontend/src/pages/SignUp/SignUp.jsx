import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Password/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axisoInstance from "../../utils/aixosInstance";
import { BASE_URL } from "../../utils/constants";

const SignUp = () => {
	const navigite = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSignup = async (e) => {
		e.preventDefault();
		if (!name) {
			setError("Please enter your name");
			return;
		}
		if (!validateEmail(email) && email) {
			setError("Please enter your email");
			return;
		}
		if (!password) {
			setError("Please enter your password");
			return;
		}
		setError("");

		try {
			const response = await axisoInstance.post(`${BASE_URL}/register`, {
				email: email,
				fullName: name,
				password: password,
			});
			if (response.data) {
				localStorage.setItem("token", data.accessToken);
				navigite("/");
			}
		} catch (error) {
			setError(error);
		}
	};
	return (
		<>
			<Navbar />
			<div className="flex items-center justify-center mt-28">
				<div className="w-96 border rounded bg-white px-7 py-10">
					<form onSubmit={handleSignup}>
						<h4 className="text-2xl mb-7"> SignUp </h4>
						<input
							type="text"
							placeholder="Email"
							className="border-[1.5px] px-5 mb-3 w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Name"
							className="border-[1.5px] px-5 mb-3 w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
						{error && <p className="text-red-600"> {error}</p>}
						<button type="submit" className="btn-primary">
							{" "}
							Create an account{" "}
						</button>
						<p>
							{" "}
							Have an account?{" "}
							<Link to={"/login"} className="text-red-400 underline">
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default SignUp;
