"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-accounts";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  onChange: (value?: string) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const AccountSelect = ({
  value,
  onChange,
  disabled,
  placeholder = "Select account"
}: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const accountQuery = useGetAccounts();
  const mutation = useCreateAccount();

  const onCreateAccount = () => {
    if (!query.trim()) return;
    
    mutation.mutate({
      name: query.trim(),
    }, {
      onSuccess: () => {
        setQuery("");
        setOpen(false);
      }
    });
  };

  const accounts = accountQuery.data?.data || [];
  const selectedAccount = accounts.find((account) => account.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedAccount ? selectedAccount.name : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search accounts..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {accountQuery.isLoading ? "Loading accounts..." : "No accounts found."}
            </CommandEmpty>
            {!accountQuery.isLoading && (
              <CommandGroup>
                {accounts.map((account) => (
                  <CommandItem
                    key={account.id}
                    value={account.name}
                    onSelect={() => {
                      onChange(account.id === value ? undefined : account.id);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === account.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {account.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {query && 
             !accountQuery.isLoading && 
             !accounts.find(account => 
              account.name.toLowerCase().includes(query.toLowerCase())
            ) && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={onCreateAccount}
                    disabled={mutation.isPending}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create "{query}"
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};