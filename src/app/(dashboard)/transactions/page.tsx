"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

export default function TransactionsPage() {
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data?.data || [];
  const deleteTransactions = useBulkDeleteTransactions();

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="bg-white mt-2 border-none drop-shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl line-clamp-1 font-semibold text-zinc-900">
            Transactions Page
          </CardTitle>
          <Button 
            onClick={newTransaction.onOpen} 
            size="sm" 
            variant="outline" 
            className="p-4 rounded-xl outline-none font-semibold transition-all duration-300 ease-linear group shadow-md hover:bg-blue-500 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent backdrop-blur-md"
          >
            <Plus className="size-4" />
            Add New
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable 
            filterkey="payee" 
            columns={columns} 
            data={transactions} 
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }} 
            disabled={isDisabled} 
          />
        </CardContent>
      </Card>
    </div>
  );
}