"use client";

import { z } from "zod/v4";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

const formSchema = z.object({
  payee: z.string().min(1, "Payee is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
  accountId: z.string().min(1, "Account is required"),
  categoryId: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: Partial<FormValues>;
  //eslint@typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const accountsQuery = useGetAccounts();
  const categoriesQuery = useGetCategories();

  const accounts = accountsQuery.data || [];
  const categories = categoriesQuery.data || [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payee: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      accountId: "",
      categoryId: "",
      notes: "",
      ...defaultValues,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount);
    
    const submitData = {
      payee: values.payee,
      amount: Math.round(amount * 100), // Convert to paise
      date: new Date(values.date),
      accountId: values.accountId,
      categoryId: values.categoryId || null,
      notes: values.notes || null,
    };
    
    onSubmit(submitData);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        
        {/* Payee */}
        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Grocery Store, Restaurant, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (₹)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  disabled={disabled}
                  placeholder="e.g. 150.50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Account */}
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Select
                disabled={disabled}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category (optional)</FormLabel>
              <Select
                disabled={disabled}
                value={field.value || ""}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">No category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder="Add any additional notes..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create Transaction"}
        </Button>

        {/* Delete Button */}
        {!!id && (
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            className="w-full"
            disabled={disabled}
          >
            <Trash className="size-4 mr-2" />
            Delete Transaction
          </Button>
        )}
      </form>
    </Form>
  );
};