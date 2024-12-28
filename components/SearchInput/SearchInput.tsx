"use client";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export function SearchInput({ handleSearch, value }: SearchInputProps) {
  return (
    <div className="w-full">
      <Input
        placeholder="Buscar nota..."
        className="outline-none pl-4 bg-transparent"
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
}