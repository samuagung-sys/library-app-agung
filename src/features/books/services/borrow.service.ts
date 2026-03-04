import { axiosInstance as api } from "@/lib/axios";

export async function borrowBook(bookId: number) {
  const { data } = await api.post("/loans", {
    bookId,
  });

  return data;
}
