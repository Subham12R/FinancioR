import { z } from "zod/v4";


import { useOpenTransaction } from "../hooks/use-open-transaction";

import { insertTransactionSchema } from "@/db/schema";
import { TransactionForm } from "./transaction-form";
import { useGetTransactions } from "../api/use-get-transactions";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
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
const formSchema = insertTransactionSchema.pick({
    payee: true,   
});

type FormValues = z.input<typeof formSchema>;
export const EditTransactionSheet = () => {
    
    const { isOpen, onClose, id } = useOpenTransaction();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure",
        "You are about to delete the transaction"
    );

    const transactionQuery = useGetTransactions();
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id); 
    const isLoading = transactionQuery.isLoading;
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
    const defaultValues = transactionQuery.data ? {
        payee: transactionQuery.data.data.payee
    } : {
        payee: ""
    }
    
    return (
        <>
        <ConfirmDialog />
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>Edit Transaction</SheetTitle>
                    <SheetDescription>
                        Edit an existing Transaction
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </div>
                ): (
                    
                    <TransactionForm id={id} onSubmit={onSubmit} disabled={isPending} default Values={defaultValues} onDelete={onDelete} />
                )}
            </SheetContent>
        </Sheet>
        </>
    )
};
