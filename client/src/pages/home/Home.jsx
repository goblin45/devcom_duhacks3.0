import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// context
import { useContext } from "react";
import { UserContext } from "../../contexts/UserState";
import './home.css'
// svgs
import {
  ConnectSVG,
  CollabSvg,
  DevelopSvg,
  DevComGreenFilledSvg,
} from "../../assets/ForHome";

// components
import HomeBG from "./HomeBG";
import NavBar from "../../constants/NavBar";

const Home = () => {
  const userContext = useContext(UserContext);

  // NECESSARIES FOR NAVIGATION

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  return (
    <>
      <HomeBG />
      <NavBar currentPath={""} />
      {userContext.loggedIn === true && (
        <>
          {/* left nav panel */}
          <div className="absolute top-20 left-0 h-[calc(100vh-5rem)] w-56 px-auto flex flex-col justify-center items-center z-10 font-devcom">
            <div className="-mt-10 flex flex-col justify-evenly gap-4">
              <button
                className="py-2 px-4 flex justify-start items-center text-2xl rounded-2xl text-white hover:bg-custom-hover hover:cursor-pointer"
                onClick={() => handleNavigation("hackathons")}
              >
                hackathons
              </button>
              <button
                className="py-2 px-4 flex justify-start items-center text-2xl rounded-2xl text-white hover:bg-custom-hover hover:cursor-pointer"
                onClick={() => handleNavigation("articles")}
              >
                articles
              </button>
              <button
                className="py-2 px-4 flex justify-start items-center text-2xl rounded-2xl text-white hover:bg-custom-hover hover:cursor-pointer"
                onClick={() => handleNavigation("chat")}
              >
                chat
              </button>
            </div>
          </div>

          {/* right '/' press prompt */}
          <div className="fixed top-20 right-0 h-[calc(100vh-5rem)] w-fit flex items-center overflow-hidden">
            <p className="relative -translate-y-5 translate-x-32 -rotate-90 w-fit font-devcom text-2xl text-zinc-700 whitespace-nowrap ">
              press "/" anytime to start collab
            </p>
          </div>
        </>
      )}

      <div className="home-container absolute top-20 h-[calc(100vh-5rem)] w-full flex flex-col justify-center items-center gap-5">
        <div className="home-container-svgs flex flex-col justify-between items-start gap-2">
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              navigate("/connect");
            }}
          >
          <ConnectSVG />
        </div>
          <CollabSvg />
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              navigate("/hackathons");
            }}
          >
            <DevelopSvg />
          </div>
          <DevComGreenFilledSvg />
        </div>
        <p className="text-white text-3xl font-devcom">
          for all your hackathons and projects
        </p>
      </div>
    </>
  );
};

export default Home;
