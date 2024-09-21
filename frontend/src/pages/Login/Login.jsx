import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Password/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axisoInstance from "../../utils/aixosInstance";
import { BASE_URL } from "../../utils/constants";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigite = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!validateEmail(email) && email) {
			setError("Invalid email");
			return;
		}
		if (!password) {
			setError("Invalid password");
			return;
		}
		setError("");
		// TODO: API CALL
		try {
			const response = await axisoInstance.post(`${BASE_URL}/login`, {
				email: email,
				password: password,
			});
			const { data } = response.data;
			// set token to local
			if (data) {
				localStorage.setItem("token", data.token);
				navigite("/");
			}
		} catch (error) {
			if (error.response.data.message) {
				setError(error.response.data.message);
			} else {
				setError("Some thing was wrong in login ");
			}
		}
	};
	return (
		<>
			<Navbar />
			<div className="flex items-center justify-center mt-28">
				<div className="w-96 border rounded bg-white px-7 py-10">
					<form onSubmit={handleLogin}>
						<h4 className="text-2xl mb-7"> Login </h4>
						<input
							type="text"
							placeholder="Email"
							className="border-[1.5px] px-5 mb-3 w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
						{error && <p className="text-red-600"> {error}</p>}
						<button type="submit" className="btn-primary">
							{" "}
							Login{" "}
						</button>
						<p>
							{" "}
							Not account yet?{" "}
							<Link to={"/signup"} className="text-red-400 underline">
								Create an account
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
