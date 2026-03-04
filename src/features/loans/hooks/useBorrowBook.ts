import { useMutation, useQueryClient } from "@tanstack/react-query";
import { borrowBook } from "@/services/borrow.service";

export function useBorrowBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: number) => borrowBook(bookId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["my-loans"] });
    },
  });
}