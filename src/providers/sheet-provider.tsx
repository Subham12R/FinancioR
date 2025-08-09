'use client';
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useEffect, useState } from "react";
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-account-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet";

export const SheetProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <NewCategorySheet />
            <EditCategorySheet />
            <NewAccountSheet />
            <EditAccountSheet />
            <NewTransactionSheet />
            <EditTransactionSheet />
        </>
    );
};