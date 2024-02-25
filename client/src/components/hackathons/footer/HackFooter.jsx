import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './hackFooter.css'

const HackFooter = ({searchActive, setSearchActive}) => {

    const promptArray = [
        {
            header: '/domain',
            desc: 'find hackathons on your domain'
        },
        {
            header: '/mode',
            desc: 'to choose mode of hackathon'
        },
        {
            header: '/open',
            desc: 'registration open'
        },
        {
            header: '/closed',
            desc: 'registration closed'
        },
        {
            header: '/time',
            desc: 'this week, this month, next month etc.'
        },
        {
            header: '/help',
            desc: 'dor any queries or help you need'
        }
    ]

    // NECESSARIES FOR SEARCH AND DEBOUNCE
    
    const [currentPromptArray, setCurrentPromptArray] = useState(promptArray)
    const [searchFocusActive, setSearchFocusActive] = useState(false)
    const [cursorShow, setCursorShow] = useState(false)

    // Blinking of cursor

    const cursorBlink = () => {
        setCursorShow(cursor => !cursor)
    }

    useEffect(() => {
        let timeoutId
        if (searchFocusActive) {
            timeoutId = setTimeout(() => {
                cursorBlink()
            }, 800)
        } else {
            setCursorShow(false)
        }
        return () => {
            clearTimeout(timeoutId)
        }
    }, [cursorShow, searchFocusActive])

    // Focusing on search bar

    const removeFocus = () => {
        setSearchFocusActive(false)
    }

    const restoreFocus = () => {
        setCursorShow(true)
        setSearchFocusActive(true)
    }

    const [slashActive, setSlashActive] = useState(false)

    const handleFocusingOnClick = (e) => {
        if (e.target.id === 'search-input-box') {
            restoreFocus()
            setSlashPromptOpen(true)
            // setSlashActive(true)
        } else {
            removeFocus()
            setSlashPromptOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleFocusingOnClick)
        return () => {
            document.removeEventListener('click', handleFocusingOnClick)
        }
    }, [])

    // Slash prompt popup

    const [slashPromptOpen, setSlashPromptOpen] = useState(false)

    const toggleSlashPrompt = () => {
        setSlashPromptOpen(open => !open)
    }

    const handleSlashPressToFocus = (e) => {
        if (e.key === '/') {
            toggleSlashPrompt()
            restoreFocus()
            console.log('toggled')
            setCurrentPrompt('/')
            setSlashActive(true)
        }
    }

    useEffect(() => {
        if (!searchFocusActive) {
            document.addEventListener('keydown', handleSlashPressToFocus)
        } else {
            document.removeEventListener('keydown', handleSlashPressToFocus)
        }
        return () => {
            document.removeEventListener('keydown', handleSlashPressToFocus)
        }
    }, [searchFocusActive])

    // Handle input in search bar
    
    const [currentPrompt, setCurrentPrompt] = useState('')
    const [currentText, setCurrentText] = useState('')
    const [searchTextArray, setSearchTextArray] = useState([])

    const inputAlphabets = (letter) => {
        if (slashActive) {
            setCurrentPrompt(prompt => prompt + letter)
            
        } else {
            setCurrentText(text => text + letter)
            console.log(currentText)
        }
    }

    const selectPromptByClick = (index) => {
        if (searchTextArray.length > 0) {
            setSearchTextArray([...searchTextArray, {type: 'prompt', content: currentPromptArray[index].header + ' :'}])
        } else {
            setSearchTextArray([{type: 'prompt', content: currentPromptArray[index].header + ' :'}])
        }
        setSlashActive(false)
        setCurrentPrompt('')
        setSlashPromptOpen(false)
        setSearchFocusActive(true)
    }

    const pressEnter = () => {
        if (slashPromptOpen) {
            if (searchTextArray?.length > 0) {
                setSearchTextArray([...searchTextArray, {type: 'prompt', content: currentPromptArray[highlightedPromptIndex].header + ' :'}])
            } else {
                setSearchTextArray([{type: 'prompt', content: currentPromptArray[highlightedPromptIndex].header + ' :'}])
            }
            setCurrentPrompt('')
            setSlashActive(false)
            setSlashPromptOpen(false)
        } 
    }

    const pressBackspace = () => {
        if (slashActive) {
            setSlashPromptOpen(true)
            if (currentPrompt?.length > 0) {
                setCurrentPrompt(prompt => prompt.slice(0, prompt.length - 1))
                if (currentPrompt.length === 1) {
                    setSlashActive(false)
                } 
            } else {
                if (searchTextArray.length > 0) {
                    setCurrentText(searchTextArray[searchTextArray.length - 1].content)
                    setSlashActive(false)
                    setSearchTextArray(array => array.pop())
                }
            }
        } else {
            if (currentText?.length > 0) {
                setCurrentText(text => text.slice(0, text.length - 1))
            } else {
                if (searchTextArray?.length > 0) {
                    setCurrentPrompt(searchTextArray[searchTextArray.length - 1].content)
                    setSlashActive(true)
                    setSearchTextArray(array => array.pop())
                }
            }
        }
    }

    const pressSlash = () => {
        setSlashPromptOpen(true)
        if (!slashActive) {
            if (currentText.length > 0 && searchTextArray.length > 0) {
                setSearchTextArray([...searchTextArray, {type: 'normal', content: currentText}])
            }
        }
        setCurrentText('')
        setCurrentPrompt('/')
        setSlashActive(true)
    }

    const handleSearchInputEnter = (e) => {
        const allowedKeys = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            ',', ':', ' '
        ]
        if (e.key === '/') {
            pressSlash()
            return 
        }
        if (allowedKeys.includes(e.key)) {
            inputAlphabets(e.key)
            return
        }
        if (e.key === 'Enter') {
            pressEnter() 
            return
        }
        if (e.key === 'Backspace') {
            pressBackspace()
            return 
        }
    }

    const [highlightedPromptIndex, setHighlightedPromptIndex] = useState(0)

    useEffect(() => {
        if (searchFocusActive) {
            document.addEventListener('keydown', handleSearchInputEnter)
            console.log('prompt :', currentPrompt, '\ntext :', currentText, '\narray :', searchTextArray)
        } else {
            document.removeEventListener('keydown', handleSearchInputEnter)
        }
        return () => {
            document.removeEventListener('keydown', handleSearchInputEnter)
        }
    }, [slashActive, searchFocusActive, highlightedPromptIndex, currentPrompt, currentText, currentPromptArray])

    // Handle dynamic prompt array

    // const [highlightedPromptIndex, setHighlightedPromptIndex] = useState(0)

    const handlePromptArrayChange = () => {
        setCurrentPromptArray([...promptArray.filter(prompt => 
            prompt.header.includes(currentPrompt))]
        )
    }

    useEffect(() => {
        handlePromptArrayChange()
    }, [currentPrompt])

    const handleHighlightSelector = (e) => {
        if (e.key === 'ArrowUp' || e.key === '38') {
            if (highlightedPromptIndex > 0) {
                setHighlightedPromptIndex((index) => index - 1)
            }
        } else if (e.key === 'ArrowDown' || e.key === '40') {
            if (highlightedPromptIndex < currentPromptArray.length - 1) {
                setHighlightedPromptIndex((index) => index + 1)
            }
        }
    }

    useEffect(() => {
        setHighlightedPromptIndex(0)
    }, [currentPromptArray])

    useEffect(() => {
        document.addEventListener('keydown', handleHighlightSelector)
        return () => {
            document.removeEventListener('keydown', handleHighlightSelector)
        }
    }, [highlightedPromptIndex])

    const placeHolder = 'type "/" to see the menu'

    // Search start
    const handleSearch = () => {
        setSearchActive(true)
    }

    return (
        <>
            {
                (slashPromptOpen && currentPromptArray?.length > 0) && 
                    (
                        <div className="slash-prompt-box min-w-fit absolute left-10 bottom-24 z-20 h-auto px-6 py-4 bg-zinc-800 flex flex-col justify-evenly items-center font-devcom">
                            {
                                currentPromptArray.map((option, index) => (
                                    <div className={`min-w-full flex justify-between rounded pl-2 items-center ${(index === highlightedPromptIndex)  ? 'bg-zinc-700 hover:cursor-pointer hover:bg-zinc-800' : 'hover:cursor-pointer hover:bg-zinc-800 active:bg-zinc-700' }`} 
                                        key={index}
                                        onClick={() => selectPromptByClick(index)}
                                    >
                                        <span 
                                            className="w-1/3 text-custom-green text-start text-xl"
                                        >
                                            {option.header}
                                        </span>
                                        <span 
                                            className="w-2/3 whitespace-nowrap text-zinc-500 text-sm font-thin text-start"
                                        >
                                            {option.desc}
                                        </span>
                                    </div>
                                ))
                            } 
                        </div>
                    )
            }
            <div className={`absolute left-0 bottom-0 z-10 w-full h-24 px-10 flex justify-between items-center gap-5 ${(searchActive) ? 'bg-custom-dark shadow-top-dark' : 'bg-transparent'}`}>
                <div 
                    id='search-input-box'
                    className={`h-16 w-full ${(setSearchTextArray?.length > 0 || currentPrompt?.length > 0 || currentText?.length > 0) ? 'pl-5' : 'pl-20'} pr-20 py-2 border-2 border-custom-green focus:outline-none flex items-center bg-custom-dark text-white font-devcom text-2xl overflow-x-auto`}
                    onClick={() => restoreFocus()}
                >
                    {
                        (searchTextArray?.length === 0 && currentPrompt?.length === 0 && currentText.length === 0) &&
                            (
                                <span className='absolute pl-10 text-zinc-600'>
                                    {placeHolder}
                                </span> 
                            )
                    }
                    {
                        (searchTextArray?.length > 0) && searchTextArray?.map((item, index) => {
                            return (
                                <div key={index}>
                                    {
                                        (item.type === 'prompt') ?
                                            (
                                                <span className='prompt-text mx-2 px-2 rounded'>{item.content}</span>
                                            )
                                        :
                                            (
                                                <span className='mx-1'>{item.content}</span>
                                            )
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        (slashActive) ? 
                            (   
                                <span className='prompt-text mx-2 px-2 rounded'>{currentPrompt}</span>
                            )
                        :
                            (
                                <span className=''>{currentText}</span>
                            )
                    }
                    {
                        (searchFocusActive) && 
                            <span className={`${cursorShow ? 'inline-block' : 'hidden'} text-white`}> | </span>
                    }
                </div>
                {
                    (searchTextArray?.length === 0 && currentText.length === 0 && currentPrompt.length === 0) && 
                        (
                            <span className="absolute left-[4.5rem] font-devcom font-extrabold text-3xl text-custom-green">
                                /
                            </span>
                        )
                }
                <div 
                    className='h-16 w-1/5 flex justify-center items-center shadow-custom text-white text-3xl font-devcom hover:cursor-pointer backdrop-blur-md'
                    onClick={() => handleSearch()}
                >
                    search
                </div>
            </div>
        </>    
    )
}

export default HackFooter