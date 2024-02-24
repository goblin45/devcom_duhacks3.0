import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

import NavBar from "../../constants/NavBar";
import ProfileBG from "../profile/ProfileBG";
import profileimg from "../../assets/profile.png";
import "../profile/profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileRegistration = () => {

  const navigate = useNavigate();

  const [_id, set_id] = useState()

  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState(undefined);

  useEffect(() => {
    const user = localStorage.getItem('devcomUser')
    if (user) {
      set_id(user)
    }
    if (!_id) {
      navigate(-1)
    }
  }, [])


  const handleSaveDetails = async () => {
    try {
      if (!education || !profession || !country || !state || !city || !pin) {
        toast.error("Fill all details");
        return;
      }
      const data = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/user/update/${_id}`, {
        education, profession, country, state, city, pin
      });
      if (!data?.data?.result) {
        toast.error("Update failed");
        return;
      }
      toast.success("Updated successfully");
      navigate('/home');

    } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
}

return (
  <div className="nav-blur noscroll w-screen h-screen overflow-y-auto">
    <ProfileBG />
    <NavBar currentPath={window.location.pathname} />
    <div className="noscroll absolute pt-20 w-full h-full flex flex-col items-center justify-start gap-20 font-devcom z-0 overflow-y-auto">
      <section className="profile-hero-1 w-full h-[calc(100vh-15rem)] flex-grow-0 flex-shrink-0 flex items-center">
        <div className="about-me w-1/4 h-full px-3 py-32 flex flex-col items-center gap-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Education
            </label>
            <input
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              type="text"
              className="mt-1 h-14 w-100 text-sm p-2 border font-sm bg-transparent border-custom-green text-custom-green"
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Profession
            </label>
            <input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              type="text"
              className="mt-1 h-14 w-100 text-sm p-2 border font-sm bg-transparent border-custom-green text-custom-green"
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 h-14 w-100 text-sm p-2 border font-sm bg-transparent border-custom-green text-custom-green"
              style={{ width: "300px" }}
            >
              <option>select country</option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Aland Islands</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AS">American Samoa</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AI">Anguilla</option>
              <option value="AQ">Antarctica</option>
              <option value="AG">Antigua and Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AW">Aruba</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BM">Bermuda</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="CK">Cook Islands</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HM">Heard Island and Mcdonald Islands</option>
              <option value="VA">Holy See (Vatican City State)</option>
              <option value="HN">Honduras</option>
              <option value="HK">Hong Kong</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IR">Iran, Islamic Republic of</option>
              <option value="IQ">Iraq</option>
              <option value="IE">Ireland</option>
              <option value="IM">Isle of Man</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JE">Jersey</option>
              <option value="JO">Jordan</option>
              <option value="KZ">Kazakhstan</option>
              <option value="KE">Kenya</option>
              <option value="KI">Kiribati</option>
              <option value="KP">
                Korea, Democratic People's Republic of
              </option>
              <option value="KR">Korea, Republic of</option>
              <option value="XK">Kosovo</option>
              <option value="KW">Kuwait</option>
              <option value="KG">Kyrgyzstan</option>
              <option value="LA">Lao People's Democratic Republic</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libyan Arab Jamahiriya</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MO">Macao</option>
              <option value="MK">
                Macedonia, the Former Yugoslav Republic of
              </option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MH">Marshall Islands</option>
              <option value="MQ">Martinique</option>
              <option value="MR">Mauritania</option>
              <option value="MU">Mauritius</option>
              <option value="YT">Mayotte</option>
              <option value="MX">Mexico</option>
              <option value="FM">Micronesia, Federated States of</option>
              <option value="MD">Moldova, Republic of</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MS">Montserrat</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="AN">Netherlands Antilles</option>
              <option value="NC">New Caledonia</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Niger</option>
              <option value="NG">Nigeria</option>
              <option value="NU">Niue</option>
              <option value="NF">Norfolk Island</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PW">Palau</option>
              <option value="PS">Palestinian Territory, Occupied</option>
              <option value="PA">Panama</option>
              <option value="PG">Papua New Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PN">Pitcairn</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="PR">Puerto Rico</option>
              <option value="QA">Qatar</option>
              <option value="RE">Reunion</option>
              <option value="RO">Romania</option>
              <option value="RU">Russian Federation</option>
              <option value="RW">Rwanda</option>
              <option value="BL">Saint Barthelemy</option>
              <option value="SH">Saint Helena</option>
              <option value="KN">Saint Kitts and Nevis</option>
              <option value="LC">Saint Lucia</option>
              <option value="MF">Saint Martin</option>
              <option value="PM">Saint Pierre and Miquelon</option>
              <option value="VC">Saint Vincent and the Grenadines</option>
              <option value="SO">Somalia</option>
              <option value="ZA">South Africa</option>
              <option value="GS">
                South Georgia and the South Sandwich Islands
              </option>
              <option value="SS">South Sudan</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudan</option>
              <option value="SR">Suriname</option>
              <option value="SJ">Svalbard and Jan Mayen</option>
              <option value="SZ">Swaziland</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center ">
          <div className="h-full w-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40rem"
              height="40rem"
            >
              <circle
                cx="20rem"
                cy="20rem"
                r="14.56rem"
                stroke="#5BD45C"
                opacity="0.4"
                fill="none"
              />
              <circle
                cx="20rem"
                cy="20rem"
                r="10.88rem"
                stroke="#5BD45C"
                opacity="0.6"
                fill="none"
              />
              <circle
                cx="20rem"
                cy="20rem"
                r="7.22rem"
                stroke="#5BD45C"
                opacity="1"
                fill="none"
              />
              {/* <circle cx="20rem" cy="20rem" r="1px" stroke="#fff" opacity="1" fill="none"/> */}

              <image
                href={profileimg}
                x="10rem"
                y="10rem"
                width="20rem"
                height="20rem"
              />
            </svg>
          </div>
        </div>
        <div className="about-me w-1/4 h-full px-3 py-32 flex flex-col items-center gap-6">
          <div>
            <label className="block text-sm font-medium text-white">
              State
            </label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              className="mt-1 h-14 w-100 text-sm p-2 border font-sm bg-transparent border-custom-green text-custom-green"
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              City
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="mt-1 h-14 w-100 text-sm p-2 border font-sm bg-transparent border-custom-green text-custom-green"
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Pincode
            </label>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="text"
              className="mt-1 h-14 w-100 text-sm p-2 border font-sm bg-transparent border-custom-green text-custom-green"
              style={{ width: "300px" }}
            />
          </div>
        </div>
      </section>
      <button
        onClick={handleSaveDetails}
        className="mt-0 h-14 flex justify-center items-center shadow-custom bg-green-500 text-b1f0db text-2xl font-devcom hover:cursor-pointer backdrop-blur-md"
        style={{ width: "200px" }}
      >
        Save details
      </button>
    </div>
  </div>
);
};

export default ProfileRegistration;
