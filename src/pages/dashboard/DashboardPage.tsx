import { BooksGrid } from "@/features/books/components/BooksGrid";
import { LogoutButton } from "@/components/LogoutButton";
import { useState } from "react";
import SearchBooks from "@/features/books/components/SearchBooks";

export function DashboardPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <SearchBooks onSearch={setSearch} />
        <LogoutButton />
      </div>

      <BooksGrid search={search} />

    </div>
  );
}