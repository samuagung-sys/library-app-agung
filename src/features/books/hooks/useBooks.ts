import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/services/books.service";
import type { Book } from "@/types/book";

export function useBooks(search: string = "") {
  return useQuery<Book[]>({
    queryKey: ["books", search],
    queryFn: async () => {
      const data = await getBooks(search);

      // 🛡️ HARD GUARD — pastikan selalu array
      if (Array.isArray(data)) {
        return data;
      }

      console.warn("Books response is not array:", data);
      return [];
    },
  });
}