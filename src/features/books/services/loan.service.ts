import { axiosInstance as api } from "@/lib/axios";

export interface Loan {
  id: number;
  bookId?: number;
  status: string;
  borrowedAt?: string;
  dueDate?: string;

  book?: {
    id: number;
    title: string;
    author?: string | { name: string };
  };
}

export interface LoansResponse {
  success?: boolean;
  message?: string;
  data?: Loan[];
  loans?: Loan[];
}

export async function getLoans(): Promise<LoansResponse> {
  const { data } = await api.get("/loans/my");
  return data;
}

export async function returnLoan(loanId: number) {
  const { data } = await api.patch(`/loans/${loanId}/return`);
  return data;
}

export async function borrowBook(bookId: number) {
  const { data } = await api.post("/loans", {
    bookId,
  });

  return data;
}
