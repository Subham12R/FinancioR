'use client'
import { Loader2 } from "lucide-react";
import { ClerkLoaded, SignUp, ClerkLoading } from "@clerk/nextjs";


export default function SignUpPage() {
    return (
        <>
        
        <main className="flex min-h-screen w-full items-center justify-center bg-[#102C57]">
            <div className="card-section flex flex-row flex-1 w-full max-w-5xl bg-blue-500 rounded-xl">
            <div className=" flex h-full w-full justify-center p-5">

            </div>
            <div className="h-full">  
            <ClerkLoaded>
            <SignUp path="/sign-up"/>
            </ClerkLoaded>
            <ClerkLoading><Loader2 className="animate-spin text-muted-foreground" /></ClerkLoading>
            </div> 
            </div>
        </main>
        </>
    );
}