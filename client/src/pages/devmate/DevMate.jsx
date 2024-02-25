import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import './devMate.css'

import NavBar from "../../constants/NavBar"
import ChatBG from "../chat/ChatBG"
import ChatFinder from "../../components/devmate/ChatFinder"

import { DummyDevMateChatArray } from "../../data/DummyDevMate"
import { DevMateAiIconSVG, NewChatAiIconSVG } from "../../assets/ForDevMate"
import AIChatContainer from "../../components/devmate/AIChatContainer"

const DevMate = () => {

    // NECESSARIES FOR SETTING UP CHAT

    const searchParams = new URLSearchParams()
    const [conversation, setConversation] = useState(null)

    useEffect(() => {
        if (searchParams?.id) {
            DummyDevMateChatArray?.map((conv) => {
                if (conv.id === searchParams.id) {
                    setConversation(conv)
                }
            })
        } 
    }, [])

    const updateConversation = (id, request) => {
        // const conversation.id 
    }

    return (
        <>
            <NavBar/>
            <ChatBG/>
            <div className="absolute pt-20 w-full h-full flex items-center justify-start gap-20 font-devcom z-0 overflow-hidden">
                <div className="w-full h-full px-10 py-12 flex items-center justify-between gap-4">
                    <div className="w-1/4 h-full">
                        <div className="h-full flex flex-col justify-between gap-2">
                            <div className="h-[14%] w-full flex items-center justify-between overflow-hidden gap-2">
                                <div className="devmate-containers h-full rounded-lg flex flex-1 justify-center items-center gap-2 p-2 cursor-pointer hover:bg-custom-hover">
                                    <DevMateAiIconSVG/>
                                    <span className="text-white text-xl">DevMate</span>
                                </div>
                                <div className="devmate-containers h-full rounded-lg flex flex-1 justify-center items-center gap-2 p-2 cursor-pointer hover:bg-custom-hover">
                                    <NewChatAiIconSVG/>
                                    <span className="text-white text-xl">New Chat</span>
                                </div>
                            </div>
                            <div className="devmate-containers h-[86%] w-full pb-5 rounded-lg">
                                <ChatFinder 
                                    type={'newer'}
                                    conversation={conversation}
                                    setConversation={setConversation}
                                />
                                <ChatFinder 
                                    type={'older'}
                                    conversation={conversation}
                                    setConversation={setConversation}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="devmate-containers w-3/4 h-full rounded-lg">
                        <AIChatContainer 
                            conversation={conversation}
                            updateConversation={updateConversation}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DevMate