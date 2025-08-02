'use client'
import { Loader2 } from "lucide-react";
import { ClerkLoaded, SignIn, ClerkLoading } from "@clerk/nextjs";


export default function SignInPage() {
    return (
        <>
        <main className="relative min-h-screen overflow-hidden flex justify-center items-center bg-[#102C57]">
            

            <div className="card-section flex flex-row flex-1 w-full max-w-5xl bg-blue-500 rounded-xl">
            <div className="h-full  w-full flex justify-center p-5">

            </div>
            <div className="h-full">  
            <ClerkLoaded>
            <SignIn path="/sign-in" />
            </ClerkLoaded>
            <ClerkLoading><Loader2 className="animate-spin text-muted-foreground" /></ClerkLoading>
            </div> 
            </div>
        </main>
        </>
    );
}