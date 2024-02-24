import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import EmailValidater from 'email-validator'

import HomeBG from "../home/HomeBG";
import SignupFooter from "../../components/signup/SignupFooter";
import { WhiteArrowIconSVG } from "../../assets/ForChat";
import { AvatarModels } from "../../assets/AvatarModels";

const SignUp = () => {
	const navigate = useNavigate();
	// const [user, setuser] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [currentlyAccepting, setCurrentlyAccepting] = useState('username')
	const [modelIndex, setModelIndex] = useState(0)
	const [error, setError] = useState('')
	const [prompt, setPrompt] = useState('')

	const signupUser = async(confirmedPassword) => {
		try {
			if (confirmedPassword !== password) {
				setError('passwords did not match')
				return
			}
			const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/register`, {
				email,
				username,
				password,
				avatarIndex: modelIndex
			});
			if (!data?.data) {
				console.log("err");
				toast.error("Registration failed");
				return;
			}
			console.log(data?.data);
			toast.success(data?.data?.message);
			localStorage.setItem("token", data?.data?.token);
			localStorage.setItem("devcomUser",JSON.stringify(data?.data?.user));
			if (data?.data?.user?.completedDetails === false) {
				navigate("/details");
			} else {
				navigate("/home");
			}
		} catch (err) {
			if (err.response.status == 422 || err.response.status === 400) {
				setError('our server is facing issues right now; please try again later')
			} else {
				toast.error("Something went wrong!");
			}
		}
	}

	const handleAcceptProfileData = (data) => {
		if (data?.length === 0) {
			setError(`${currentlyAccepting} cannot be empty`)
			return
		}
		switch(currentlyAccepting) {
			case 'username':
				if (data.length < 5 || data.length > 20) {
					setError('username must be between 5 to 20 characters')
					return
				}
				setUsername(data)
				setCurrentlyAccepting('email')
				break
			case 'email':
				if (!EmailValidater.validate(data)) {
					setError('must provide a valid e-mail address')
					return
				}
				setEmail(data)
				setCurrentlyAccepting('password')
				break
			case 'password':
				if (data.length < 8) {
					setError('password must be at least 8 characters long')
					return
				}
				setPassword(data)
				setCurrentlyAccepting('confirm_password')
				break
		}
	}

	const decreaseCurrenlyAccepting = () => {
		switch(currentlyAccepting) {
			case 'confirm_password':
				setCurrentlyAccepting('password')
				break
			case 'password':
				setCurrentlyAccepting('email')
				break
			case 'email':
				setCurrentlyAccepting('username')
		}
	}

	const updatePrompt = () => {
		switch(currentlyAccepting) {
			case 'username':
				setPrompt('what should we call you?')
				break
			case 'email':
				setPrompt('how should we reach out to you?')
				break
			case 'password':
				setPrompt("enter password (make sure it's a strong one & secret)")
				break
			case 'confirm_password':
				setPrompt("re-enter your password (so that we can know it's you)")
				break
		}
	}

	useEffect(() => {
		updatePrompt()
	}, [currentlyAccepting])

	const abs = (num1) => {
		return (num1 >= 0) ? num1 : -num1;
	}

	const changeModelIndex = (incr) => {
		setModelIndex(index => abs(index + (AvatarModels.length + incr)) % AvatarModels.length)
	}

	return (
		<>
			<HomeBG />
			<div className="absolute font-devcombold text-3xl pt-10 w-full h-full flex flex-col items-center justify-center display-column">
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
						
						<div className="flex flex-col justify-center items-center gap-5">
							<div className=" h-full w-full flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="40rem" height="40rem">
									<circle cx="20rem" cy="20rem" r="18.22rem" stroke="#5BD45C" opacity="0.2" fill="none"/>
									<circle cx="20rem" cy="20rem" r="14.56rem" stroke="#5BD45C" opacity="0.4" fill="none"/>
									<circle cx="20rem" cy="20rem" r="10.88rem" stroke="#5BD45C" opacity="0.6" fill="none"/>
									<circle cx="20rem" cy="20rem" r="7.22rem" stroke="#5BD45C" opacity="1" fill="none"/>
								</svg>
								<div className="absolute top-0 w-full h-full flex items-center justify-center gap-52">
									<div 
										className="cursor-pointer"
										onClick={() => changeModelIndex(-1)}
									>
										<i className='bx bxs-chevron-left text-9xl text-custom-green'></i>
									</div>
									<div className="relative flex items-center justify-center">
										{
											AvatarModels[modelIndex]
										}
									</div>
									<div 
										className="cursor-pointer"
										onClick={() => changeModelIndex(1)}
									>
										<i className='bx bxs-chevron-right text-9xl text-custom-green'></i>
									</div>
								</div>
							</div>
						</div>
						
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
										{prompt}
									</span>
								</>
						}
					</div>

					<SignupFooter 
						currentlyAccepting={currentlyAccepting}
						handleAcceptProfileData={handleAcceptProfileData}
						signupUser={signupUser}
						setError={setError}
					/>
				</div>
			</div>
		</>
	);
};

export default SignUp;
