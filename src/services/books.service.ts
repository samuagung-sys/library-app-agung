import { axiosInstance } from "@/lib/axios";
import type { Book } from "@/types/book";

// 🛡️ normalize khusus backend mentor
function normalizeBooksResponse(data: unknown): Book[] {
  if (!data || typeof data !== "object") {
    console.warn("Invalid books response:", data);
    return [];
  }

  const obj = data as any;

  // ✅ CASE UTAMA (backend kamu)
  if (Array.isArray(obj.data?.books)) {
    return obj.data.books;
  }

  // ✅ fallback umum
  if (Array.isArray(obj.data)) return obj.data;
  if (Array.isArray(obj.books)) return obj.books;
  if (Array.isArray(data)) return data;

  console.warn("Books response shape unknown:", data);
  return [];
}

export async function getBooks(search?: string): Promise<Book[]> {
  const res = await axiosInstance.get("/books", {
    params: {
      search,
    },
  });

  console.log("BOOKS RAW RESPONSE:", res.data);

  return normalizeBooksResponse(res.data);
}

export async function getBookById(id: string | number): Promise<Book> {
  const res = await axiosInstance.get(`/books/${id}`);

  console.log("BOOK DETAIL RAW RESPONSE:", res.data);

  const data = res.data?.data ?? res.data;

  if (!data || typeof data !== "object") {
    throw new Error("Invalid book detail response");
  }

  return data as Book;
}
