import "./preHome.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Landing from "../../components/landing/Landing";

const PreHome = () => {
	const [showAnimation, setShowAnimation] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setShowAnimation(false);
		}, 0);
	}, []);

	return (
		<>
			{showAnimation ? (
				<>
					<div className="h-screen w-screen flex justify-center items-center bg-custom-dark font-devcombold text-[80px] text-custom-green">
						<TypeAnimation
							sequence={[
								"Connect",
								100,
								"Collab",
								100,
								"Develop",
								100,
								"Devcom.",
								100,
							]}
							wrapper="p"
							speed={0.01}
							style={{ fontSize: "2em", display: "inline-block", fill: "none" }}
							repeat={0}
						/>
					</div>
				</>
			) : (
				<Landing />
			)}
		</>
	);
};

export default PreHome;
