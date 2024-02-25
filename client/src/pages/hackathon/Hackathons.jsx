import { useState, useEffect, useContext } from "react";

import axios from "axios";

import "./hackathons.css";

// bg
import HackathonsBG from "./HackathonsBG";

// svgs
import NavBar from "../../constants/NavBar";
import HackFooter from "../../components/hackathons/footer/HackFooter";
import HackathonOrProjectCard from "../../components/hackathons/cards/HackathonOrProjectCard";
import toast from "react-hot-toast";

const Hackathons = () => {
  // NECESSARIES FOR FETCHING DATA

  const [hackathonsData, setHackathonsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/post`);
        const data = response.data;
        setHackathonsData(data.result);
        toast.success("Fetched recent hackathons");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong");
      }
    };

    fetchData();
  }, []);

  const [searchActive, setSearchActive] = useState(false);
  const [currentOpenHackathon, setCurrentOpenHackathon] = useState(-1);

  const resetCurrentOpenHackathon = () => {
    setCurrentOpenHackathon(-1);
    setSearchActive(true);
  };

  return (
    <>
      <HackathonsBG />
      <NavBar currentPath={window.location.pathname} />
      <div className="bg-transparent absolute top-20 left-0 h-[calc(100vh-10rem)] px-10 pt-4 pb-4 w-full flex items-center justify-center gap-20">
        {searchActive && (
          <div
            id="hack2-left-panel"
            className="w-2/6 h-full px-2 flex flex-col justify-start items-start gap-16"
          >
            <p className="font-devcombold font-extrabold text-5xl xl:text-6xl text-custom-green">
              Recent Hackathons
            </p>
          </div>
        )}
          <>
            <div
              id="hackathon-cards-section"
              className={`h-full bg-transparent grid ${
                searchActive ? "grid-cols-2 w-4/6" : "grid-cols-3 w-full"
              } gap-8 overflow-y-auto`}
            >
              {hackathonsData?.length > 0 ? (
                hackathonsData?.map((item, index) => (
                  <HackathonOrProjectCard
                    cardDetails={item}
                    setSearchActive={setSearchActive}
                    setCurrentOpenHackathon={setCurrentOpenHackathon}
                    key={index}
                  />
                ))
              ) : (
                <>
                  <p>No posts are available</p>
                </>
              )}
            </div>
          </>
      </div>

      {currentOpenHackathon === -1 && (
        <HackFooter
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        />
      )}
    </>
  );
};

export default Hackathons;
