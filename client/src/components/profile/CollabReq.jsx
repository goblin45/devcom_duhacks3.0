import { useState, useEffect } from 'react'

const CollabReq = () => {

    const [currentlyShowing, setCurrentlyShowing] = useState('sent')

    return (
        <div className="absolute top-20 left-0 h-[calc(100vh-10rem)] w-full px-10 pt-12 pb-4 flex">
            <div
                id="collabreq-left-panel"
                className="w-2/6 h-full px-2 flex flex-col justify-start items-start gap-16"
            >
                <p className="font-devcombold font-extrabold text-5xl xl:text-6xl text-custom-green">
                    Collab Requests
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
                id="collabreq-right-panel"
                className='border h-fit w-4/6 py-10'
            >

            </div>
        </div>
    )
}

export default CollabReq