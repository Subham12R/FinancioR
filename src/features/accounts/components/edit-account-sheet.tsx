import { z } from "zod/v4";


import { useOpenAccount } from "../hooks/use-open-account";

import { insertAccountSchema } from "@/db/schema";
import { AccountForm } from "./account-form";
import { useGetAccount } from "../api/use-get-account";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({
    name: true,   
});

type FormValues = z.input<typeof formSchema>;
export const EditAccountSheet = () => {
    
    const { isOpen, onClose, id } = useOpenAccount();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure",
        "You are about to delete the transaction"
    );

    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id); 
    const isLoading = accountQuery.isLoading;
    const isPending = editMutation.isPending || deleteMutation.isPending;
    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    }   

    const onDelete = async () => {
        const ok = await confirm();
        if(ok){
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    }
    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.data.name
    } : {
        name: ""
    }
    
    return (
        <>
        <ConfirmDialog />
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>Edit Account</SheetTitle>
                    <SheetDescription>
                        Edit an existing account
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </div>
                ): (
                    
                    <AccountForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} onDelete={onDelete} />
                )}
            </SheetContent>
        </Sheet>
        </>
    )
};
