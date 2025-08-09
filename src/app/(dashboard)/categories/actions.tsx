"use client";

import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useConfirm } from "@/hooks/use-confirm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string;
}
export const Actions = ({ id } : Props) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure",
        "You are about to delete the transaction"
    );
    const deleteMutation = useDeleteCategory(id);
    const { onOpen } = useOpenCategory();
    const handleDelete = async () => {
        const ok = await confirm();
        if(ok){
            deleteMutation.mutate();
        }
    }
    return (
     <>
     <ConfirmDialog />
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-2">
                <MoreHorizontal />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="flex items-center px-2 gap-2 bg-white border py-3 rounded-2xl ">
            <DropdownMenuItem
            className="flex items-center bg-blue-50 border hover:bg-blue-500 p-2 rounded-lg hover:text-white transition-all duration-300 ease-linear focus:outline-2 outline-blue-200"
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id) }><Edit className="size-4 mr-2"/>Edit
            </DropdownMenuItem>
          <DropdownMenuItem 
          className="flex items-center bg-red-100 border hover:bg-red-500 p-2 rounded-lg hover:text-white transition-all duration-300 ease-linear focus:outline-2 outline-red-200"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}><Trash className="size-4 mr-2"/>Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
     </DropdownMenu>
     </>
    );
};