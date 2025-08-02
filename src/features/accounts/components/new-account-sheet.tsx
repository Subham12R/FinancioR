import { useNewAccount } from "../hooks/use-new-accounts";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export const NewAccountSheet = () => {
    
    const { isOpen, onClose } = useNewAccount();

    return (

        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to manage your finances.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
};