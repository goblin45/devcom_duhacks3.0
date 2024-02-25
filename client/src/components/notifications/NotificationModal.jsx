import { useEffect, useState } from 'react'

import './notificationModal.css'

import { DummyNotificationsArray } from "../../data/DummyNotifications"
import { AcceptUserIcon, RejectUserIcon } from '../../assets/ForNavBar'

const NotificationModal = () => {

    const [notificationsArray, setNotificationsArray] = useState([])

    useEffect(() => {
        setNotificationsArray([...DummyNotificationsArray])
    }, [])

    const acceptConnectUserRequest = (index) => {
        setNotificationsArray(array => [...array.filter((_, ind) => ind !== index)])
    }

    const declineConnectUserRequest = (index) => {
        setNotificationsArray(array => [...array.filter((_, ind) => ind !== index)])
    }

    const acceptCollabUserRequest = (index) => {
        setNotificationsArray(array => [...array.filter((_, ind) => ind !== index)])
    }

    const declineCollabUserRequest = (index) => {
        setNotificationsArray(array => [...array.filter((_, ind) => ind !== index)])
    }

    return (
        <div 
            id="notification-modal"
            className="absolute top-14 border border-custom-green h-96 w-[380px] p-2 rounded flex flex-col justify-start items-center text-white overflow-auto bg-custom-dark cursor-default"
        >
            {
                (notificationsArray?.length === 0) ? 
                    <span className='w-full h-full flex justify-center items-center text-custom-gray'>
                        You have no notifications.
                    </span>
                :
                    notificationsArray?.map((notification, index) => {
                        return (
                            <div className='w-full p-4 text-custom-gray' key={index}>
                                {
                                    (notification.type === 'connect_request') ? 
                                        <div className='flex justify-between items-center'>
                                            <p className='font-devcom w-4/5'>
                                                {notification.user} wants to connect.
                                            </p>
                                            <p className='flex justify-between items-center gap-4'>
                                                <span
                                                    className='notification-action-button cursor-pointer hover:bg-custom-hover p-1 rounded'
                                                    onClick={() => acceptConnectUserRequest(index)}
                                                >
                                                    <AcceptUserIcon/>
                                                </span>
                                                <span
                                                    className='notification-action-button cursor-pointer hover:bg-custom-hover p-1 rounded'
                                                    onClick={() => declineConnectUserRequest(index)}
                                                >
                                                    <RejectUserIcon/>
                                                </span>
                                            </p>
                                        </div>
                                    :
                                        <div className='flex flex-col gap-2'>
                                            <div className="w-full flex">
                                                <p> 
                                                    {notification.user} wants to collab on your project "{notification.project}".
                                                </p>
                                            </div>
                                            <div className="w-full flex justify-evenly items-center">
                                                <span 
                                                    className='notification-action-button w-24 py-1 flex justify-center items-center border rounded-lg border-custom-green text-custom-green cursor-pointer'
                                                    onClick={() => acceptCollabUserRequest(index)}
                                                >
                                                    Accept
                                                </span>
                                                <span 
                                                    className='notification-action-button w-24 py-1 flex justify-center items-center border rounded-lg border-custom-red text-custom-red cursor-pointer'
                                                    onClick={() => declineCollabUserRequest(index)}
                                                >
                                                    Reject
                                                </span>

                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default NotificationModal