"use client";

import { z } from "zod/v4";

import { useNewTransaction } from "../hooks/use-new-transaction";
import { useCreateTransaction } from "../api/use-create-transaction";
import { insertTransactionSchema } from "@/db/schema";
import { TransactionForm } from "./transaction-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = z.object({
  payee: z.string().min(1, "Payee is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.coerce.date(),
  accountId: z.string().min(1, "Account is required"),
  categoryId: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const mutation = useCreateTransaction();

  const onSubmit = (values: FormValues) => {
    const submitData = {
      payee: values.payee,
      amount: parseInt(values.amount), // Should already be converted to paise in form
      date: values.date,
      accountId: values.accountId,
      categoryId: values.categoryId || null,
      notes: values.notes || null,
    };

    mutation.mutate(submitData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create a new transaction to track your finances.
          </SheetDescription>
        </SheetHeader>
        <TransactionForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            payee: "",
            amount: "",
            date: new Date(),
            accountId: "",
            categoryId: "",
            notes: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};