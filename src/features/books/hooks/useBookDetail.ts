import { useQuery } from "@tanstack/react-query";
import { getBookById } from "@/services/books.service";
import type { Book } from "@/types/book";

export function useBookDetail(id?: string) {
  return useQuery<Book>({
    queryKey: ["book-detail", id],
    queryFn: () => getBookById(id as string),
    enabled: !!id, // penting: tidak fetch kalau id kosong
  });
}
