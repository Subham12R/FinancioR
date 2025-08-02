import { cn } from "@/lib/utils";
import { Button } from "./button";
import Link from "next/link";


type Props = {
    href: string;
    label: string;
    isActive?: boolean;

}

export const NavButton = ({
    href,
    label,
    isActive,
}: Props) => {
    return (
        <Button asChild
        size="sm" 
        variant="secondary"
        className={cn("border-2 p-5  rounded-full outline-none font-semibold transition-all duration-300 ease-linear group shadow-md hover:bg-blue-300/30 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent backdrop-blur-md",
        isActive 
        ? "bg-white/30 border-white/90 text-white "
        : "bg-white/5 border-blue-400/30 text-blue-400 " )}>
            <Link href={href}>
            {label}
            </Link>
        </Button>
    )
};