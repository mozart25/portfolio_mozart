import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const About = () => {

    return (
        <div className="bg-white">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12">
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Me</h2>

                    <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
                        <li>
                            <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                                <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                                    <img className="object-cover shadow-lg rounded-lg" src="/images/profile.jpg" alt="profile-image" />
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="space-y-4">
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>Seung Joon Lee</h3>
                                            <p className="text-indigo-600">Frontend Developer</p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500">Name: 이승준</p>
                                            <p className="text-gray-500">Email: mozartlee28@gmail.com</p>
                                            <p className="text-gray-500">H.P: 010-7164-7180</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;