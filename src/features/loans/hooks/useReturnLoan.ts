import { useMutation, useQueryClient } from "@tanstack/react-query";
import { returnLoan } from "@/services/loan.service";

export const useReturnLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loanId: number) => returnLoan(loanId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-loans"],
      });
    },
  });
};
