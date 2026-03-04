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

export const getLoans = async (): Promise<LoansResponse> => {
const { data } = await api.get("/loans/my");

console.log("LOANS API RESPONSE:", data);

return data;
};

export const returnLoan = async (loanId: number) => {
console.log("RETURN LOAN ID:", loanId);

const { data } = await api.patch(`/loans/${loanId}/return`);

console.log("RETURN API RESPONSE:", data);

return data;
};
