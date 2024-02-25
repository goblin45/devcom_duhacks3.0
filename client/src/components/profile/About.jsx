import { useState, useEffect } from 'react'

import profileimg from "../../assets/profile.png"

import { DummyUser, DummyUserData } from "../../data/DummyUser"
import { skillSetSvgs } from '../../assets/SkillSetSVGs';

const About = () => {

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

    return (
        <section className="profile-hero-1 w-full h-[calc(100vh-5rem)] flex-grow-0 flex-shrink-0 flex items-center pt-28">
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
    )
}

export default About