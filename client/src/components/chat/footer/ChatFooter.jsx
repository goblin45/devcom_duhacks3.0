import { useState, useEffect } from 'react'

import './chatFooter.css'

import { AttachIconSVG, MicIconSVG, SendIconSVG } from '../../../assets/ForChat'

const ChatFooter = ({sendMessage}) => {

    const [textVal, setTextVal] = useState('')

    const handleNewMessage = () => {
        sendMessage(textVal)
        setTextVal('')
    }

    // enter press not working
    const sendOnEnterPress = (e) => {
        if (e.key === 'Enter' || e.key === 'enter') {
            // console.log('enter')
            if (textVal?.length > 0) {
                handleNewMessage()
            }
        }
    }

    // useEffect(() => {
    //     document.getElementById('chat-footer').addEventListener('keydown', sendOnEnterPress)
    //     // console.log('listener added')
    //     return () => {
    //         document.getElementById('chat-footer').removeEventListener('keydown', sendOnEnterPress)
    //     }
    // }, [])

    return (
        <div id='chat-footer' className='absolute bottom-0 h-16 w-full px-4 flex items-center'>
            <div className="w-5/6 h-full relative flex items-center">
                <input 
                    className='w-full border-2 border-custom-green rounded-xl px-2 py-2 bg-transparent focus:outline-none'
                    type='text'
                    placeholder='Type a message...'
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    onKeyDown={sendOnEnterPress}
                />
                <div className='absolute right-3 hover:cursor-pointer'>
                    <AttachIconSVG/>
                </div>
            </div>  
            <div className="w-1/6 h-full px-5 flex justify-start gap-12 items-center">
                <div className="icon-bg w-12 h-12 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-zinc-400">
                    <MicIconSVG/>
                </div>
                <div 
                    className='icon-bg w-12 h-12 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-zinc-400'
                    onClick={() => handleNewMessage()}
                >
                    <SendIconSVG/>
                </div>
            </div>

        </div>
    )
}

export default ChatFooter