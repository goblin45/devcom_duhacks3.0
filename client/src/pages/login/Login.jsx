import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeBG from "../home/HomeBG";
import LoginFooter from "../../components/login/LoginFooter";
import axios from "axios";
import toast from "react-hot-toast";
import { LoginBlankSVG } from "../../assets/ForAuth";
import { WhiteArrowIconSVG } from "../../assets/ForChat";
import { AvatarModels } from "../../assets/AvatarModels";
import { AvatarFaceModels } from "../../assets/AvatarFaceModels";

import './login.css'

const Login = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [error, setError] = useState('')
	const [modelIndex, setModelIndex] = useState(0)

	const [currentlyAccepting, setCurrentlyAccepting] = useState('username')

	const loginUser = async(password) => {
		try {
			if (!password) {
				setError('password cannot be empty')
				return
			}
			console.log(username, password)
			const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login`, {
				username,
				password
			})
			navigate('/home')
			console.log(data?.data);
			toast.success(data?.data?.message);
			localStorage.setItem("token", data?.data?.token);
			localStorage.setItem("devcomUser",JSON.stringify(data?.data?.user));
		} catch (err) {
			if (err.response.status == 422 || err.response.status === 400) {
				setError('incorrect password; please try again')
			} else {
				toast.error("Something went wrong!");
			}
		}
	};

	// const handleUsername = async (username) => {
	// 	if (username?.length == 0) {
	// 		setError('username must not be empty')
	// 		return
	// 	}
	// 	try {
	// 		const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login/?part=1`, {username})
	// 		if (!data?.data) {
	// 			setError('must provide a valid username')
	// 			return
	// 		} 
	// 		setCurrentlyAccepting('password')
	// 	} catch (err) {
	// 		console.log(err)
	// 		toast.error("Something went wrong!")
	// 	}
	// }

	const handleUsername = async(username) => {
		if (username?.length === 0) {
			setError('username cannot be empty')
			return
		} 
		setCurrentlyAccepting('password')
		setUsername(username)
		setModelIndex(0)
	}

	const decreaseCurrenlyAccepting = () => {
		setCurrentlyAccepting('username')
	}

	return (
		<>
			<HomeBG/>
			<div className="absolute top-0 left-0 overflow-hidden h-screen w-screen font-devcom">
				<div className="w-full h-20 absolute left-0 top-0 flex items-center justify-center z-10">
					<div 	
						className="absolute left-8 flex justify-center items-center h-10 w-10 rounded hover:bg-custom-hover hover:cursor-pointer"
						onClick={() => navigate('/')}
					>
						<WhiteArrowIconSVG/>
					</div>
					<span className="font-devcombold text-white text-3xl">
						DevCom.
					</span>
				</div>
				<div className="absolute font-devcombold text-3xl py-20 w-full h-full flex flex-col items-center justify-center gap-10 display-column">
					{
						(currentlyAccepting === 'username') ?
							<>
								<LoginBlankSVG/>
								<span className="font-devcom text-sm text-gray-400">
									Not on DevCom yet?{" "}
									<Link to="/signup">
										<span className="text-white">Get Started Now</span>
									</Link>
								</span>
							</>
						:
							<div className="flex flex-col justify-center items-center gap-5">
								<div className="h-44 w-44 p-2 z-10 relative overflow-hidden border-2 border-custom-green rounded-full  shadow-custom-green shadow-all-sides">
									<div className="absolute -left-2 w-full h-full flex items-start justify-center">
										{
											AvatarModels[modelIndex]
										}
									</div>
								</div>
								<span className="font-devcombold text-5xl text-custom-green">
									{username}
								</span>
							</div>
					}
					
					
				</div>
				<div className="absolute bottom-24 left-16">
					{
						(error?.length > 0) ?
							<span className="text-xl text-red-500">
								{error}
							</span>
						:
							<>
								{
									(currentlyAccepting !== 'username') &&
										<span
											className="flex justify-center items-center gap-2 p-2 w-fit text-sm text-custom-green hover:cursor-pointer rounded hover:bg-custom-hover"
											onClick={() => decreaseCurrenlyAccepting()}
										>
											<span className="text-xl">
												&lt;--
											</span>
											change previous entry
										</span>
								}
								<span className="text-xl text-gray-500">
									{
										
									}
								</span>
							</>	
					}
				</div>

				<LoginFooter 
					currentlyAccepting={currentlyAccepting}
					handleUsername={handleUsername}
					loginUser={loginUser}
					setError={setError}
				/>
			</div>
		</>
	)
}

export default Login;


{/* <span className="font-devcombold text-7xl text-custom-green p-5">
	Login to Devcom
</span>

<div className="flex justify-center items-center p-5">
	<div className="rounded-md shadow-md">
		<div className="mb-4">
			<label className="block text-sm font-medium text-white">
				Email
			</label>
			<input
				className="mt-1 h-14 p-4 text-sm w-full border rounded-md font-sm bg-transparent text-custom-green"
				onChange={(e) => setEmail(e.target.value)}
				type="email"
				value={email}
				style={{ width: "480px" }}
			/>
		</div>
		<div className="mb-4">
			<label className="block text-sm font-medium text-white">
				Password
			</label>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="mt-1 h-14 text-sm p-4  w-full border rounded-md font-sm bg-transparent text-custom-green"
			/>
		</div>
		<button
			onClick={loginUser}
			className="h-16 w-full mt-12 flex justify-center items-center shadow-custom bg-green-500 font-medium hover:cursor-pointer backdrop-blur-md"
		>
			Login
		</button>
	</div>
</div> */}