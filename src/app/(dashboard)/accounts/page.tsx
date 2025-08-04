"use client";

import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
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
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";



export default function AccountsPage() {
  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];
  const deleteAccounts = useBulkDeleteAccounts();

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if(accountsQuery.isLoading) {
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader>
                <Skeleton className="h-8 w-48"/>
            </CardHeader>
            <CardContent>
                <div className="h-[500px] w-full flex items-center justify-center">
                    <Loader2  className="size-6 text-slate-300 animate-spin" />
                </div>
            </CardContent>
         </Card>
        </div>
    )
  }
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="bg-white mt-2 border-none drop-shadow-sm ">
            <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl line-clamp-1 font-semibold text-zinc-900">Accounts Page</CardTitle>

            <Button onClick={newAccount.onOpen} size="sm" variant="outline" className=" p-4  rounded-xl outline-none font-semibold transition-all duration-300 ease-linear group shadow-md hover:bg-blue-500 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent backdrop-blur-md">
                <Plus className="size-4" />
                Add New

            </Button>
             </CardHeader>

             <CardContent>
                <DataTable 
                filterkey="name" 
                columns={columns} 
                data={accounts} 
                onDelete={(row) => {
                    const ids = row.map((r) => r.original.id)
                    deleteAccounts.mutate({ ids });
                }} 
                disabled={isDisabled} 
                />
             </CardContent>
        </Card>
        </div>
    );

}
