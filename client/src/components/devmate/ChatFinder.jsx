import { useState, useEffect } from "react"

import { ShareIconSVG, HorizontalThreeDotsSVG, RenameIconSVG, DeleteIconSVG } from "../../assets/ForDevMate"

import { DummyDevMateChatArray } from "../../data/DummyDevMate"

const ChatFinder = ({type, conversation, setConversation}) => {
    const [optionModalOpen, setOptionModalOpen] = useState(false)

    const today = new Date()
    const lastFollow = (type === 'older') ? 'Month' : 'Week'

    const handleOptionModalCloseOnOutsideClick = (e) => {
        // const optionModal = document.getElementById('ai-chat-option-modal')
        if (e.target.matches('#ai-chat-option-modal') || e.target.closest('.ai-chat-option-modal--options')) {
            return
        } else {
            setTimeout(() => {
                setOptionModalOpen(false)
            }, 1)
        }
    }

    useEffect(() => {
        if (optionModalOpen) {
            setTimeout(() => {
                document.addEventListener('click', handleOptionModalCloseOnOutsideClick)
            }, 1)
        } else {
            setTimeout(() => {
                document.removeEventListener('click', handleOptionModalCloseOnOutsideClick)
            }, 1)
        }
        return () => {
            document.removeEventListener('click', handleOptionModalCloseOnOutsideClick)
        }
    }, [optionModalOpen])

    return (
        <div className="last-month flex flex-col justify-start items-center w-full min-h-40 max-h-52 mt-5">
            <span className="custom-dark-gray text-sm">Last {lastFollow}</span>
            <div className="noscroll relative w-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2">
                {
                    DummyDevMateChatArray?.map((conv, index) => {
                        return (
                            <div 
                                className={`relative h-full w-full rounded py-1 px-2 cursor-pointer ${(conv.id === conversation?.id) && 'devmate-highlighted-chat'}`}
                                key={index}
                                onClick={() => setConversation(conv)}
                            >
                                <p className={`${(conv.id === conversation?.id) ? 'w-3/4 whitespace-nowrap overflow-hidden' : 'w-full truncate'} h-full text-white text-sm font-devcomthin`}>{conv.displayMsg}</p>
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-neutral-900 from-40% rounded"></div>
                                {
                                    (conv.id === conversation?.id) && 
                                        <div className="absolute top-0 right-0 w-1/4 h-full flex justify-end items-center gap-1 px-5">
                                            <div 
                                                className="relative px-[2px] h-[90%] flex items-center justify-center rounded hover:bg-custom-hover active:opacity-80"
                                                onClick={() => setOptionModalOpen(true)}
                                            >
                                                <HorizontalThreeDotsSVG/>
                                                {
                                                    (optionModalOpen && conversation?.id === conv.id) &&
                                                        <div 
                                                            id="ai-chat-option-modal"
                                                            className={`option-modal-bg absolute top-full w-24 h-16 border-white z-50 rounded p-1 flex flex-col gap-1`}
                                                        >
                                                            <div 
                                                                className="ai-chat-option-modal--options h-1/2 w-full flex justify-start items-center px-1 gap-2 cursor-pointer rounded  hover:bg-custom-hover"
                                                                onClick={() => {}}
                                                            >
                                                                <RenameIconSVG/>
                                                                <span className="custom-dark-gray text-sm">Rename</span>
                                                            </div>
                                                            <div 
                                                                className="ai-chat-option-modal--options h-1/2 w-full flex justify-start items-center px-1 gap-2 cursor-pointer rounded  hover:bg-custom-hover"
                                                                onClick={() => {}}
                                                            >
                                                                <DeleteIconSVG/>
                                                                <span className='text-custom-red text-sm'>Delete</span>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                            <div className="px-[2px] h-[90%] flex justify-center items-center rounded hover:bg-custom-hover active:opacity-80">
                                                <ShareIconSVG/>
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChatFinder