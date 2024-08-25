import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Password/PasswordInput";
import { validateEmail } from "../../utils/helper";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
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
