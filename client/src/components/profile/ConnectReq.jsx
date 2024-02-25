import { useState, useEffect } from 'react'

import { DummyPendingConnectionRequestsArray, DummyPastConnectionRequestsArray } from '../../data/DummyConnectRequests';
import { CancelConnectUserIconSVG } from '../../assets/ForProfile';

const ConnectReq = () => {

    const [currentlyShowing, setCurrentlyShowing] = useState('sent')

    const TimeGap = (date) => {
		
		const postTime = new Date(date);
		const currTime = new Date();

		// year ago
		let yearsGap = currTime.getFullYear() - postTime.getFullYear();
		if (yearsGap > 0) {
		return `${yearsGap} year${yearsGap > 1 ? "s" : ""} ago`;
		}

		// months ago
		let monthsGap = currTime.getMonth() - postTime.getMonth();
		if (monthsGap > 0) {
		return `${monthsGap} month${monthsGap > 1 ? "s" : ""} ago`;
		}

		// weeks ago
		let daysGap = currTime.getDate() - postTime.getDate();
		if (daysGap > 7) {
		return `${Math.round(daysGap / 7)} week${
			Math.round(daysGap / 7) > 1 ? "s" : ""
		} ago`;
		}

		// days ago
		if (daysGap > 0) {
		return `${daysGap} day${daysGap > 1 ? "s" : ""} ago`;
		}

		// hours ago
		let hoursGap = currTime.getHours() - postTime.getHours();
		if (hoursGap > 0) {
		return `${hoursGap} hour${hoursGap > 1 ? "s" : ""} ago`;
		}

		// minutes ago
		let minutesGap = currTime.getMinutes() - postTime.getMinutes();
		if (minutesGap > 0) {
		return `${minutesGap} minute${minutesGap > 1 ? "s" : ""} ago`;
		}

		// seconds ago
		let secondsGap = currTime.getSeconds() - postTime.getSeconds();
		return `${secondsGap} second${secondsGap > 1 ? "s" : ""} ago`;
	};

    const ConnectReqCard = ({card}) => {
        return (
            <div className='w-72 h-32 rounded-lg bg-[#1E1E1E]'>
                <div className="flex h-[65%] w-full p-2 gap-2 items-center justify-center">
                    <img 
                        className='h-12 w-12 rounded-full'
                        src={card.dp} alt="" 
                    />
                    <div className="flex flex-col w-full">
                        <p className='text-2xl text-white truncate'>
                            {card.username}
                        </p>
                        <p className='text-sm font-devcomthin text-[#5C5757] truncate'>
                            {card.bio}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full px-4 py-2 h-[35%]">
                    <span className='text-[#5C5757]'>
                        {TimeGap(card.timestamp)}
                    </span>
                    <div className="px-5 py-1 bg-custom-green rounded-md text-black flex items-center justify-center gap-1">
                        <CancelConnectUserIconSVG/>
                        <span className=''>Cancel</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="noscroll absolute top-16 left-0 h-[calc(100vh-4rem)] w-full px-10 pt-12 pb-4 flex overflow-hidden font-devcom">
            <div
                id="connectreq-left-panel"
                className="w-2/6 h-full px-2 flex flex-col justify-start items-start gap-16"
            >
                <p className="font-devcombold font-extrabold text-5xl xl:text-6xl text-custom-green">
                    Connection Requests
                </p>
                <div className="flex gap-5">
                    <div 
                        className={`border ${(currentlyShowing === 'sent') ? 'border-custom-green text-custom-green' : 'border-custom-gray text-custom-gray'} rounded-lg px-3 py-1 bg-[#D9D9D9] bg-opacity-10 cursor-pointer`}
                        onClick={() => setCurrentlyShowing('sent')}
                    >
                        Sent
                    </div>
                    <div 
                        className={`border ${(currentlyShowing === 'received') ? 'border-custom-green text-custom-green' : 'border-custom-gray text-custom-gray'} rounded-lg px-3 py-1 bg-[#D9D9D9] bg-opacity-10 cursor-pointer`}
                        onClick={() => setCurrentlyShowing('received')}
                    >
                        Received
                    </div>
                </div>
            </div>
            <div 
                id="connectreq-right-panel"
                className='relative h-full w-4/6 pb-10 overflow-auto noscroll flex flex-col gap-10'
            >
                <div className='h-fit w-full flex flex-col gap-4'>
                    <span className='font-devcom text-custom-gray'>Pending requests:</span>
                    <div className="w-full grid grid-cols-3 gap-4">
                        {
                            DummyPendingConnectionRequestsArray.map((request, index) => {
                                return (
                                    <ConnectReqCard card={request} key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='h-fit w-full flex flex-col gap-4'>
                    <span className='font-devcom text-custom-gray '>Older requests:</span>
                    <div className="w-full grid grid-cols-3 gap-4">
                        {
                            DummyPastConnectionRequestsArray.map((request, index) => {
                                return (
                                    <ConnectReqCard card={request} key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectReq