import {useState, useEffect, useRef} from 'react'

import './chatBody.css'

import SentMessage from '../messages/sent/SentMessage'
import ReceivedMessage from '../messages/received/ReceivedMessage'
import { WhiteArrowIconSVG } from '../../../assets/ForChat'

const ChatBody = ({chat}) => {

    const chatBodyRef = useRef(null)
    const [isScrollingUp, setIsScrollingUp] = useState(false)

    const showFromBottom = () => {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        document.removeEventListener('scroll', handleChatScroll)
        document.removeEventListener('wheel', handleChatScroll)
        setIsScrollingUp(false)
    }

    useEffect(() => {
        showFromBottom()
    }, [chat])

    const handleChatScroll = () => {
        if (chatBodyRef.current.scrollHeight - chatBodyRef.current.scrollTop > 400) {
            setIsScrollingUp(true)
        }
        else {
            setIsScrollingUp(false)
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleChatScroll)
        document.addEventListener('wheel', handleChatScroll)
        return () => {
            document.removeEventListener('scroll', handleChatScroll)
            document.removeEventListener('wheel', handleChatScroll)
        }
    }, [])

    return (
        <>
            <div 
                className='custom-scrollbar relative top-16 h-[calc(100%-8rem)] w-full overflow-y-auto'
                ref={chatBodyRef}
            >
                <div className="flex flex-col justify-end px-4 py-3 gap-3">
                    {
                        chat?.map((message, index) => {
                            if (message.sender === 'you') {
                                return (
                                    <div    
                                        className="w-full h-fit flex justify-end items-center pr-4"
                                        key={index}
                                    >
                                        <SentMessage message={message}/>
                                    </div>
                                )
                            } else {
                                return (
                                    <div 
                                        className="w-full h-fit flex justify-start items-center pl-4"
                                        key={index}
                                    >
                                        <ReceivedMessage message={message}/>
                                    </div>
                                )
                            }
                        })  
                    }
                </div>
            </div>
            {
                isScrollingUp && 
                    <div 
                        className="arrow-bg absolute bottom-20 right-10 w-10 h-10 rounded-full flex justify-center items-center -rotate-90 z-20 cursor-pointer"
                        onClick={() => showFromBottom()}
                    >
                        <WhiteArrowIconSVG/>
                    </div>
            }
        </>
    )
}

export default ChatBody