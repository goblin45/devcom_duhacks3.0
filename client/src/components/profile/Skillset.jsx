import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2'
import { useState, useEffect, useRef } from 'react'
  
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

import NavBar from "../../constants/NavBar"
import profileimg from "../../assets/profile.png"

import { DummyUser, DummyUserData } from "../../data/DummyUser"
import { skillSetSvgs } from '../../assets/SkillSetSVGs';
import { ProjectExpCard, WorkExpCard, WorkExpCardTag, coloredSvgsForProjectCard } from "../../assets/ForProfile"
import { BehanceIconSvg, GitHubIconSvg } from '../../assets/ForHackathonCard';

const Skillset = () => {
    const radiiSet = [
        "7.22rem", "10.88rem", "14.56rem", "18.22rem", "21.72rem" 
    ]

    const randomPosition = (index) => {
        const radiiSetNum = [
            7.22, 10.88, 14.56, 18.22, 21.72
        ]
        let minAngle = 0, maxAngle = Math.PI * 2
        let randomAngle = Math.random() * (maxAngle - minAngle)
        const position = {
            x: radiiSetNum[index] * Math.cos(randomAngle),
            y: radiiSetNum[index] * Math.sin(randomAngle)
        }
        return position
    }

    // NECESSARIES FOR CHART  
    
    const chartRef = useRef(null)

    const [skillDataArray, setSkillDataArray] = useState([
        10, 12, 14, 16, 18
    ])
    const [chartHeight, setChartHeight] = useState()

    useEffect(() => {
        setTimeout(() => {
            setChartHeight(chartRef.current.height)
        }, 50)
    }, [])

    const data = {
        labels: Array(skillDataArray?.length).fill(' '),
        datasets: [
            {
                label: '',
                data: skillDataArray,
                backgroundColor: [
                    'rgba(91, 212, 92, 0.12)'
                ],
                borderColor: 'rgba(91, 212, 92, 0.44)',
                borderWidth: 1
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            hover: {
                mode: null
            }
        },
        scales: {
            r: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
        }
    }

    const findMaxInArray = (array) => {
        let max = Number.MIN_SAFE_INTEGER
        for (let i = 0; i < array.length; i++) {
            if (max < array[i]) {
                max = array[i]
            }
        }
        return max
    }

    const [maxInDataArray, setMaxInDataArray] = useState(findMaxInArray(skillDataArray))

    useEffect(() => {
        setMaxInDataArray(findMaxInArray(skillDataArray))
    }, [skillDataArray])

    const getChartSvgPosition = (index) => {
        let unitHeight = (chartHeight / 2) / maxInDataArray
        let segmentAngle = Math.PI * 2 / skillDataArray.length
        let position = {
            x: (unitHeight * skillDataArray[index] * 3 / 5) * Math.cos(((index + 0.5) * segmentAngle) - Math.PI / 2),
            y: (unitHeight * skillDataArray[index] * 3 / 5) * Math.sin(((index + 0.5) * segmentAngle) - Math.PI / 2)
        }
        return position
    }

    return (
        <>
            <div className="noscroll absolute pt-20 w-full h-full flex flex-col items-center justify-start gap-20 font-devcom z-0 overflow-y-auto">
                <section className="profile-hero-1 w-full h-[calc(100vh-5rem)] flex-grow-0 flex-shrink-0 flex items-center">
                    <div className="about-me w-1/4 h-full px-10 py-32 flex flex-col items-center gap-16">
                        <div className="w-full flex flex-col gap-2">
                            <p className="text-custom-green">About me</p>
                            <p className="text-custom-gray text-left">
                                {DummyUserData.about}
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <p className="text-custom-green">Location</p>
                            <p className="text-left" style={{color: '#D9D9D9'}}>
                                {DummyUserData.location}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex items-center justify-center relative">
                        <div className="h-full w-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40rem" height="40rem">
                                {/* <circle cx="20rem" cy="20rem" r="21.72rem" stroke="#5BD45C" opacity="0.05" fill="none"/> */}
                                <circle cx="20rem" cy="20rem" r="18.22rem" stroke="#5BD45C" opacity="0.2" fill="none"/>
                                <circle cx="20rem" cy="20rem" r="14.56rem" stroke="#5BD45C" opacity="0.4" fill="none"/>
                                <circle cx="20rem" cy="20rem" r="10.88rem" stroke="#5BD45C" opacity="0.6" fill="none"/>
                                <circle cx="20rem" cy="20rem" r="7.22rem" stroke="#5BD45C" opacity="1" fill="none"/>
                                {/* <circle cx="20rem" cy="20rem" r="1px" stroke="#fff" opacity="1" fill="none"/> */}
                            
                                <image href={profileimg} className='z-40' x="10rem" y="10rem" width="20rem" height="20rem" />
                            </svg>
                            
                        </div>
                        <div className="absolute w-10 h-10 z-10">
                            {
                                DummyUserData.skillSet.map((skill, index) => {
                                    let position = randomPosition(index)
                                    return (
                                        <>
                                            {                                        
                                                (index < 4) &&
                                                    <div className="absolute border border-custom-green rounded-full w-16 h-16 p-2 z-10 flex items-center justify-center" key={index} style={{
                                                        transform: `translateX(${position.x}rem) translateY(${position.y}rem)`
                                                    }}>
                                                        {skillSetSvgs[skill]}
                                                    </div>
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                    <div className="w-1/4 h-full px-10 py-32 flex flex-col items-center gap-16">
                        <div className="w-full flex flex-col gap-2">
                            <p className="text-custom-green">Portfolio</p>
                            <p className="text-left underline hover:cursor-pointer hover:text-sky-900" style={{color: '#D9D9D9'}}>
                                {DummyUserData.portfolio}
                            </p>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <p className="text-custom-green">Hack Streak</p>
                            <div className="grid grid-cols-11 gap-1">
                                {
                                    Array(44).fill().map((_, index) => {
                                        return (
                                            <div key={index}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height={26} width={26}>
                                                    <circle cx="13" cy="13" r="10" fill={`${(index % 2 !== 0) ? '#5BD45C' : '#42403b'}`}/>
                                                </svg>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <section className="profile-hero-2 w-full min-h-[calc(100vh-5rem)] max-h-fit flex justify-between flex-grow-0 flex-shrink-0 items-start px-12 overflow-auto">
                    <div 
                        className="chart w-[30rem] h-[30rem] mt-10 flex items-center justify-center"
                    >
                        <PolarArea 
                            ref={chartRef}
                            data={data}
                            options={options}
                            className='h-full w-full flex justify-center items-center'
                        />
                        <div className="absolute w-10 h-10">
                            {
                                DummyUserData.skillSet.map((skill, index) => {
                                    let position = getChartSvgPosition(index)
                                    return (
                                        <div 
                                            className='absolute border border-custom-green w-16 h-16 rounded-full flex justify-center items-center'
                                            key={index}
                                            style={{
                                                transform: `translateX(calc(${position.x - 16}px)) translateY(calc(${position.y - 16}px))`
                                            }}
                                        >
                                            {skillSetSvgs[skill]}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-3/5 min-h-full max-h-fit p-10 flex flex-col justify-start items-center gap-10">
                        <div className="w-full h-fit grid grid-cols-3">
                            <div className="w-1/4 h-full flex flex-col gap-4">
                                <span className='text-white text-2xl'>Projects</span>
                                <span className='font-devcombold text-5xl text-custom-green'>
                                    {
                                        (DummyUserData.totalProjects > 10) ? `${DummyUserData.totalProjects}` : `0${DummyUserData.totalProjects}` 
                                    }
                                </span>
                            </div>
                            <div className="w-1/4 h-full flex flex-col gap-4">
                                <span className='text-white text-2xl'>Hackathons</span>
                                <span className='font-devcombold text-5xl text-custom-green'>
                                    {
                                        (DummyUserData.totalHackathons > 10) ? `${DummyUserData.totalHackathons}` : `0${DummyUserData.totalHackathons}` 
                                    }
                                </span>
                            </div>
                            <div className="w-1/4 h-full flex flex-col gap-4">
                                <span className='text-white text-2xl'>Collabs</span>
                                <span className='font-devcombold text-5xl text-custom-green'>
                                    {
                                        (DummyUserData.totalCollabs > 10) ? `${DummyUserData.totalCollabs}` : `0${DummyUserData.totalCollabs}` 
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-col gap-5">
                            <span className='text-2xl text-white'>Experiences</span>
                            <div className="h-[228px] grid grid-cols-3 ">
                                {
                                    DummyUserData.internshipsArray.map((internship, index) => {
                                        return (
                                            <div className='relative w-fit h-fit flex' key={index}>
                                                <WorkExpCard/>
                                                <div className="absolute w-full h-fit flex justify-end">
                                                    <WorkExpCardTag/>
                                                    <span className='absolute px-3 text-right w-full text-white text-xs font-thin'>Intern</span>
                                                </div>
                                                <div className="absolute internship-card-content w-full h-full py-10 px-6 flex flex-col justify-between">
                                                    <div className="flex flex-col">
                                                        <p className='w-full line-clamp-3 text-ellipsis overflow-hidden text-custom-green'>
                                                            {internship.jobTitle}
                                                        </p>
                                                        <span className='text-xs font-thin text-gray-500'>
                                                            @{internship.organization}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className='text-xs font-thin text-gray-500'>Tech:</span>
                                                        <div className="flex gap-[5px]">
                                                            {
                                                                internship.stackRequired.map((tech, index) =>
                                                                    <span className='w-full text-xs text-sky-400' key={index}>
                                                                        {tech} 
                                                                        {
                                                                            (index !== internship.stackRequired.length - 1) && ','
                                                                        }
                                                                    </span>    
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-col gap-5">
                            <span className='text-2xl text-white'>Projects</span>
                            <div className="grid grid-cols-2">
                                {
                                    DummyUserData.projectsArray.map((project, index) => {
                                        return (
                                            <div className='relative w-fit h-fit flex' key={index}>
                                                <ProjectExpCard/>
                                                <div className="absolute project-card-content w-full h-full py-3 px-4 flex flex-col justify-between">
                                                    <div className="flex justify-between">
                                                        <div className='flex flex-col'>
                                                            <span className='text-custom-green font-devcombold'>
                                                                {project.title}
                                                            </span>
                                                            <span className='text-white text-sm'>
                                                                {project.desc}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col justify-between gap-3">
                                                            <GitHubIconSvg/>
                                                            <BehanceIconSvg/>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 justify-start items-end pt-2">
                                                        {
                                                            project.stackUsed.map((stack, index2) => {
                                                                return (
                                                                    <span className='w-10 h-10 ' key={index2}>
                                                                        {coloredSvgsForProjectCard[index2]}
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Skillset