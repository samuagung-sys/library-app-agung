import { useQuery } from "@tanstack/react-query";
import { getLoans } from "@/features/books/services/loan.service";
import type { Loan } from "@/features/books/services/loan.service";

export type NormalizedLoan = Loan & {
  bookId: number;
  borrowedAt?: string;
};

export const useLoans = () => {
  return useQuery<NormalizedLoan[]>({
    queryKey: ["my-loans"],
    queryFn: async () => {
      const res: any = await getLoans();

      console.log("LOANS FULL RESPONSE:", res);

      const loans: Loan[] =
        res?.data?.loans ??
        res?.data ??
        [];

      console.log("PARSED LOANS:", loans);

      const normalized = loans
  .map((loan: Loan & { borrowedAt?: string }) => ({
    ...loan,
    bookId: loan.bookId ?? loan.book?.id ?? 0,
  }))
  .sort(
    (a, b) =>
      new Date(b.borrowedAt ?? 0).getTime() -
      new Date(a.borrowedAt ?? 0).getTime()
  );

  return normalized;
    },
  });
};