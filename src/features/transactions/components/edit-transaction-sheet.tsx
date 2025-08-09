import { z } from "zod/v4";

import { useOpenTransaction } from "../hooks/use-open-transaction";
import { TransactionForm } from "./transaction-form";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transactions";
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

export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction. This action cannot be undone."
    );

    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id); 
    
    const isLoading = transactionQuery.isLoading;
    const isPending = editMutation.isPending || deleteMutation.isPending;
    
    const onSubmit = (values: any) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };   

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    const defaultValues = transactionQuery.data ? {
        payee: transactionQuery.data.payee,
        amount: (transactionQuery.data.amount / 100).toString(), // Convert from paise
        date: transactionQuery.data.date instanceof Date 
            ? transactionQuery.data.date.toISOString().split('T')[0]
            : new Date(transactionQuery.data.date).toISOString().split('T')[0],
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId || "",
        notes: transactionQuery.data.notes || "",
    } : {
        payee: "",
        amount: "",
        date: new Date().toISOString().split('T')[0],
        accountId: "",
        categoryId: "",
        notes: "",
    };
    
    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Transaction</SheetTitle>
                        <SheetDescription>
                            Edit an existing transaction
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <TransactionForm 
                            id={id} 
                            onSubmit={onSubmit} 
                            disabled={isPending} 
                            defaultValues={defaultValues} 
                            onDelete={onDelete} 
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};