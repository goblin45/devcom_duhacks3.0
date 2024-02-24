import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './loginFooter.css'

import { AvatarModels } from '../../assets/AvatarModels'

const LoginFooter = ({currentlyAccepting, handleUsername, loginUser, setError}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [focusOnInput, setFocusOnInput] = useState(true)
    const [cursorShow, setCursorShow] = useState(false)

    const handleSearchClick = () => {
        if (currentlyAccepting === 'username') {
            handleUsername(username)
        } else {
            loginUser(password)
        }
    }

    const restoreFocus = () => {
        setFocusOnInput(true)
    }

    const inputAlphabets = (letter) => {
        if (currentlyAccepting === 'username') {
            setUsername(username => username + letter)
        } else {
            setPassword(password => password + letter)
        }
        setError('')
    }

    const pressBackspace = () => {
        if (currentlyAccepting === 'username') {
            setUsername(username => username?.slice(0, username.length - 1))
        } else {
            setPassword(password => password?.slice(0, password.length - 1))
        }
        setError('')
    }

    const handleSearchInputEnter = (e) => {
        const allowedKeys = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '_', '=', '<', '>', '/', '|', "\\", ';', ':', '?'
        ]
        if (allowedKeys.includes(e.key)) {
            inputAlphabets(e.key)
            return
        }
        if (e.key === 'Backspace') {
            pressBackspace()
            return 
        }
    }

    useEffect(() => {
        if (focusOnInput) {
            document.addEventListener('keydown', handleSearchInputEnter)
        } else {
            document.removeEventListener('keydown', handleSearchInputEnter)
        }
        return () => {
            document.removeEventListener('keydown', handleSearchInputEnter)
        }
    }, [focusOnInput])

    const handleFocusingOnClick = (e) => {
        if (e.target.id === 'login-input-box' || document.getElementById('login-input-box').contains(e.target)) {
            setFocusOnInput(true)
        } else {
            setFocusOnInput(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleFocusingOnClick)
        return () => {
            document.removeEventListener('click', handleFocusingOnClick)
        }
    }, [])

    // Blinking of cursor

    const cursorBlink = () => {
        setCursorShow(cursor => !cursor)
    }

    useEffect(() => {
        let timeoutId
        if (focusOnInput) {
            timeoutId = setTimeout(() => {
                cursorBlink()
            }, 800)
        } else {
            setCursorShow(false)
        }
        return () => {
            clearTimeout(timeoutId)
        }
    }, [cursorShow, focusOnInput])

    return (
        <div className={`absolute left-0 bottom-0 z-10 w-full h-24 px-10 flex justify-between items-center gap-5 bg-transparent`}>
            <div 
                id='login-input-box'
                className={`h-16 w-full pr-20 py-2 border-2 px-4 border-custom-green focus:outline-none flex items-center bg-custom-dark text-white font-devcom text-2xl overflow-x-auto hover:cursor-pointer`}
                onClick={() => restoreFocus()}
            >
                <span className='prompt-text px-2 mx-2 rounded hover:cursor-text'>
                    {
                        (currentlyAccepting === 'username') ?
                            <>/username:</>
                        :
                            <>/password:</>
                    }
                </span>
                <span className='hover:cursor-text'>
                    {
                        (currentlyAccepting === 'username') ?
                            <>{username}</>
                        :
                            <>
                                {
                                    Array(password?.length).fill(0).map((_,index) => {
                                        return (
                                            <span key={index}>*</span>
                                        )
                                    })
                                }
                            </>
                    }
                </span>
                {
                    (focusOnInput) && 
                        <span className={`${cursorShow ? 'inline-block' : 'hidden'} text-white`}> | </span>
                }
            </div>
            <div 
                className='h-16 w-1/5 flex justify-center items-center shadow-custom text-white text-3xl font-devcom hover:cursor-pointer backdrop-blur-md'
                onClick={() => handleSearchClick()}
            >
                {
                    (currentlyAccepting === 'username') ?
                        <span>next</span>
                    :
                        <span>login</span>
                }
            </div>

        </div>
    )
}

export default LoginFooter