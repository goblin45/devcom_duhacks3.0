import HomeBG from "../../pages/home/HomeBG";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<>
		<HomeBG />
		<div className="absolute font-devcombold text-3xl w-full h-16 flex items-center justify-center ">
			<span className="text-white">Devcom.</span>
		</div>
		<div className="absolute h-full w-full pt-20 pb-20 bg-transparent flex items-center justify-center">
			<div className="flex flex-col gap-4 items-center">
			<span className="font-devcombold text-7xl text-custom-green">
				Welcome to Devcom
			</span>
			<span className="text-3xl font-devcom text-white">
				A platform to - Connect, Collaborate, Develop
			</span>
			<Link
				to="/login"
				className="h-16 w-2/5 mt-12 flex justify-center items-center shadow-custom bg-green-500 text-b1f0db text-3xl font-devcom hover:cursor-pointer backdrop-blur-md"
			>
				Start collab
			</Link>
			<span className="text-1xl font-devcom text-gray-400">
				Not on DevCom yet?{" "}
				<Link to="/signup">
					<span className="text-white">Get Started Now</span>
				</Link>
			</span>
			</div>
		</div>
		</>
	);
};

export default Landing;
