import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

import NavBar from "../../constants/NavBar"
import ChatBG from "./ChatBG"

import './chat.css'

import { DummyChatArray } from "../../data/DummyChat"
import { DummyContactsArray } from "../../data/DummyContacts"
import ChatHeader from '../../components/chat/header/ChatHeader'
import ChatBody from '../../components/chat/body/ChatBody'
import ChatFooter from '../../components/chat/footer/ChatFooter'

const Chat = () => {

    const [selectedContactIndex, setSelectedContactIndex] = useState(0)
    const [selectedChatId, setSelectedChatId] = useState(100)
    const [selectedChat, setSelectedChat] = useState({})

    const location = useLocation()

    useEffect(() => {
        if (location.state !== null) {
            setSelectedChatId(location.state.chatId)
        }
    }, [])

    useEffect(() => {
        setSelectedChatId(DummyContactsArray[selectedContactIndex].chatId)
    }, [ ,selectedContactIndex])

    const updateCurrentChat = () => {
        DummyChatArray.map((chat) => {
            if (chat.chatId === selectedChatId) {
                setSelectedChat(chat)
            }
        })
    }

    useEffect(() => {
        updateCurrentChat()
    }, [ ,selectedChatId])

    const sendMessage = (text) => {
        const date = new Date()
        const newMessage = {
            sender: 'you',
            message: text,
            timestamp: `${date.getHours()}:${(date.getMinutes().toString().length > 1) ? date.getMinutes() : `0${date.getMinutes()}` }`
        }
        const updatedChat = {
            chatId: selectedChatId,
            history: [...selectedChat.history, newMessage]
        }
        setSelectedChat(updatedChat)
    }

    return (
        <>
            <ChatBG/>
            <NavBar/>
            <div className="absolute pt-20 w-full h-full flex flex-col items-center justify-start gap-20 font-devcom z-0">
                <div className="w-full h-full px-10 py-12 flex items-center justify-between">
                    <div className="custom-scrollbar w-1/4 h-full overflow-y-auto">
                        <div className="w-full h-full flex flex-col justify-start gap-3 pl-2 pr-4">
                            {
                                DummyContactsArray.map((contact, index) => {
                                    return (
                                        <div 
                                            className={`contact-card w-full py-2 px-4 rounded-lg ${(selectedContactIndex === index) && 'border-2'} border-custom-green flex items-center justify-start gap-4 relative hover:cursor-pointer`} 
                                            key={index}
                                            onClick={() => {setSelectedContactIndex(index)}}
                                        >
                                            <img 
                                                src={contact.dp}
                                                className="h-14 w-14 rounded-full overflow-hidden" 
                                            />
                                            <div className="h-full w-[calc(100%-4.5rem)] pb-1 flex flex-col jusity-between">
                                                <span className="text-white text-xl">
                                                    {contact.user}
                                                </span>
                                                <span className="w-full text-gray-500 text-xs pr-2 truncate">
                                                    {contact.lastMessage.text}
                                                </span>
                                            </div>
                                            <span className="absolute bottom-[2px] right-2 text-gray-500 text-xs font-thin z-10">
                                                {contact.lastMessage.timestamp}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    <div className="chat-section w-3/4 h-full pl-4 mr-6 flex flex-col relative text-white">
                        <ChatHeader user={DummyContactsArray[selectedContactIndex]}/>
                        <ChatBody chat={selectedChat?.history} />
                        <ChatFooter sendMessage={sendMessage}/> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat