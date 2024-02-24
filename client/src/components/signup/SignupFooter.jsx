import {useState, useEffect} from 'react'

const SignupFooter = ({ currentlyAccepting, handleAcceptProfileData, signupUser, setError }) => {
    const [data, setData] = useState('')
    const [focusOnInput, setFocusOnInput] = useState(true)
    const [cursorShow, setCursorShow] = useState(false)

    const handleSubmitClick = () => {
        if (currentlyAccepting === 'confirmedPassword') {
            signupUser(data)
        }
        handleAcceptProfileData(data)
    }

    useEffect(() => {
        setData('')
        setFocusOnInput(true)
        setCursorShow(true)
    }, [currentlyAccepting])

    const restoreFocus = () => {
        setFocusOnInput(true)
    }

    const inputAlphabets = (letter) => {
        setData(data => data + letter)
        setError('')
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    const pressBackspace = () => {
        setData(data => data?.slice(0, data.length - 1))
        setError('')
    }

    // const pressEnter = () => {
    //     handleSubmitClick()
    // }

    const handleSearchInputEnter = (e) => {
        const allowedKeys = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '_', '=', '<', '>', '/', '|', "\\", ';', ':', '?', '.'
        ]
        if (allowedKeys.includes(e.key)) {
            inputAlphabets(e.key)
            return
        } 
        if (e.key === 'Backspace') {
            pressBackspace()
            return 
        } 
        // if (e.key === 'Enter' || e.key == 'enter') {
        //     pressEnter()
        //     return
        // }
    }

    useEffect(() => {
        if (focusOnInput) {
            document.addEventListener('keydown', handleSearchInputEnter)
            // document.addEventListener('keydown', pressEnter)
        } else {
            document.removeEventListener('keydown', handleSearchInputEnter)
            // document.removeEventListener('keydown', pressEnter)
        }
        return () => {
            document.removeEventListener('keydown', handleSearchInputEnter)
            // document.removeEventListener('keydown', pressEnter)
        }
    }, [focusOnInput])

    const handleFocusingOnClick = (e) => {
        if (e.target.id === 'signup-input-box' || document.getElementById('signup-input-box').contains(e.target)) {
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
                id='signup-input-box'
                className={`h-16 w-full pr-20 py-2 border-2 px-4 border-custom-green focus:outline-none flex items-center bg-custom-dark text-white font-devcom text-2xl overflow-x-auto hover:cursor-pointer`}
                onClick={() => restoreFocus()}
            >
                <span className='prompt-text px-2 mx-2 rounded hover:cursor-text'>
                    /{currentlyAccepting}:
                </span>
                <span className='hover:cursor-text'>
                    {
                        (currentlyAccepting === 'password' || currentlyAccepting === 'confirm_password') ?
                            <>
                                {
                                    Array(data?.length).fill(0).map((_,index) => {
                                        return (
                                            <span key={index}>*</span>
                                        )
                                    })
                                }
                            </>
                        :
                            <>{data}</>
                    }
                </span>
                {
                    (focusOnInput) && 
                        <span className={`${cursorShow ? 'inline-block' : 'hidden'} text-white`}> | </span>
                }
            </div>
            <div 
                className='h-16 w-1/5 flex justify-center items-center shadow-custom text-white text-3xl font-devcom hover:cursor-pointer backdrop-blur-md'
                onClick={() => handleSubmitClick()}
            >
                {
                    (currentlyAccepting === 'confirm_password') ?
                        <span>Signup</span>
                    :
                        <span>next</span>
                }
            </div>

        </div>
    )
}

export default SignupFooter