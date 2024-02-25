import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import axios from "axios";
import {
  HackathonContentArrowBg,
  HackathonContentOuterDivSVG,
} from "../../assets/ForHackathonContent";
import { BlackArrowIconSVG } from "../../assets/ForHackathonContent";
import { BehanceIconSvg, GitHubIconSvg } from "../../assets/ForHackathonCard";
import HomeBG from "../home/HomeBG";
import NavBar from "../../constants/NavBar";
import toast from "react-hot-toast";

const HackathonDetails = () => {
  const [hasJoined, setHasJoined] = useState(false);
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState({});
  const navigate = useNavigate();

  const handleOpenHackathon = (hackathonId) => {
    setSearchActive(true);
    setCurrentOpenHackathon(hackathonId);
  };

  const handleJoinHackathon = async () => {
    try {
      const data = await axios.post();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/post/${id}`);
        if (!data?.data?.result) {
          toast.error("failed to load");
        }
        console.log(data?.data?.result);
        toast.success("Loaded hacakthons");
        setCardDetails(data?.data?.result);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong");
      }
    };

    fetchData();
  }, []);

  // date formats
  const startDateFormatted = moment(cardDetails?.startDate).format("MMM DD");
  const endDateFormatted = moment(cardDetails?.endDate).format("MMM DD");

  console.log(startDateFormatted, endDateFormatted);

  return (
    <>
      <HomeBG />
      <NavBar currentPath={""} />

      <div
        style={{
          display: "grid",
          placeContent: "center",
          paddingTop: "10%",
        }}
      >
        <div className="h-[503px] w-[808px] flex relative top-3/5 left-3/5 font-devcom">
          <HackathonContentOuterDivSVG />
          <div className="absolute top-0 left-0 flex items-center justify-center">
            <HackathonContentArrowBg />
            <div
              className="absolute top-6 left-5 hover:cursor-pointer"
              onClick={() => navigate("/hackathons")}
            >
              <BlackArrowIconSVG />
            </div>
          </div>
          <div className="absolute w-11/12 h-[108px] right-0 flex justify-between items-center px-10">
            <div className="flex flex-col justify-center gap-1">
              <span className="text-3xl text-white">
                {cardDetails?.hackathonName}
              </span>
              <span className="date text-white">
                {startDateFormatted} - {endDateFormatted}
              </span>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div
                className="repo-link-bg h-12 w-12 rounded-full flex items-center justify-center hover:cursor-pointer"
                onClick={() => {}}
              >
                <GitHubIconSvg />
              </div>
              <div
                className="repo-link-bg h-12 w-12 rounded-full flex items-center justify-center hover:cursor-pointer"
                onClick={() => {}}
              >
                <BehanceIconSvg />
              </div>
            </div>
          </div>
          <div className="hackathon-desc-color border border-custom-green w-11/12 h-2/3 absolute right-0 bottom-[60px] px-5 py-3 flex flex-col gap-6">
            <p className="hackathon-desc-color h-24 w-full text-white">
              Diversion 2k24 is the annual flagship event of the ACM student
              chapter of IEM Kolkata ✨ The previous edition was the first and
              only in-person MLH hackathon in West Bengal which was a grand
              success with over 400 participants and 20+ judges and mentors from
              different parts of the country.
            </p>
            <div className="rules flex flex-col gap-1">
              <span className="font-devcombold  text-white font-bold">
                Rules
              </span>
              <ul className="text-white">
                <li>
                  Follow the
                  <span className="pl-1 underline font-devcombold font-bold hover:cursor-pointer">
                    Code of Conduct
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-devcombold font-bold text-white">
                Entry Fee
              </span>
              <span className="text-white">Free</span>
            </div>
            <div className="flex justify-start items-center gap-3">
              <span className="card-footer--tags px-2 bg rounded text-custom-green">
                {cardDetails?.mode}
              </span>
              <span className="card-footer--tags px-2 bg rounded text-custom-green">
                {cardDetails?.status}
              </span>
            </div>
          </div>
          <div className="absolute right-16 bottom-[13px] py-1 px-4 bg-custom-green rounded-md text-lg hover:cursor-pointer"
          onClick={() => {
              if (hasJoined) {
                setHasJoined(false);
                toast.success("Left hackathon");
              } else {
                setHasJoined(true);
                toast.success("Joined hackathon");
              }
            }}
          >
            {hasJoined ? "Leave" : "Join now"}
          </div>
        </div>
      </div>
    </>
  );
};

export default HackathonDetails;
