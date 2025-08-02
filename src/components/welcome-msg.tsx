"use client"

import { useUser } from "@clerk/nextjs"

export const WelcomeMsg = () => {
    const { user, isLoaded } = useUser();
    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-white font-sans">
                Welcome Back , <span className="text-blue-950">{isLoaded ? "" : " "}{ user?.firstName}</span>!
            </h2>
            <p className="text-md lg:text-xl text-zinc-200 font-sans font-light">
                This is your financial overview report💸
            </p>
        </div>
    )
    
}