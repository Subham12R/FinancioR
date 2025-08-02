import { Loader2 } from "lucide-react";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { WelcomeMsg } from "./welcome-msg";

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-blue-700 to to-blue-500 px-4 py-8 lg:px-14 pb-36 h-full overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between mb-14 w-full">
                    <div className="flex items-center lg:gap-16 w-full justify-between">
                        <HeaderLogo />
                        <div className="flex items-center gap-4">
                        <Navigation />
                        <div className=" backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-2 shadow-md flex items-center justify-center">
                        <ClerkLoaded>      
                        <UserButton afterSignOutUrl="/sign-in" />
                        </ClerkLoaded>
                        <ClerkLoading><Loader2 className="animate-spin text-blue-500" /></ClerkLoading>
                        </div>
                        </div>
                    </div>
                </div>
                <WelcomeMsg />
            </div>
            

        </header>
    );
};