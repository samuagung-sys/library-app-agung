import { useMutation, useQueryClient } from "@tanstack/react-query";
import { borrowBook } from "@/services/borrow.service";

export function useBorrowBook() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bookId: number) => borrowBook(bookId),

    onSuccess: () => {
      // refresh books list (update stock)
      queryClient.invalidateQueries({ queryKey: ["books"] });

      // refresh loans page
      queryClient.invalidateQueries({ queryKey: ["my-loans"] });
    },
  });

  return mutation;
}