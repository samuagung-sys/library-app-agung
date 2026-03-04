import { useBooks } from "../hooks/useBooks";
import { BooksSkeleton } from "./BooksSkeleton";
import { BooksError } from "./BooksError";
import { BooksEmpty } from "./BooksEmpty";
import { BookCard } from "./BookCard";
import type { Book } from "@/types/book";

type BooksGridProps = {
  search?: string;
  category?: string;
};

export function BooksGrid({
  search = "",
  category = "",
}: BooksGridProps) {
  const { data, isLoading, isError, refetch } = useBooks(search);

  // 🛡️ HARD GUARD — pastikan selalu array
  const safeBooks: Book[] = Array.isArray(data) ? data : [];

  const keyword = search.toLowerCase().trim();
  const categoryKeyword = category.toLowerCase().trim();

  const filteredBooks: Book[] = safeBooks.filter((book: Book) => {
    const matchSearch =
      !keyword ||
      book.title?.toLowerCase().includes(keyword) ||
      (typeof book.author === "string"
        ? book.author.toLowerCase().includes(keyword)
        : book.author?.name?.toLowerCase().includes(keyword));

    const matchCategory =
      !categoryKeyword ||
      book.category?.name?.toLowerCase() === categoryKeyword;

    return matchSearch && matchCategory;
  });

  if (isLoading) return <BooksSkeleton />;

  if (isError) return <BooksError onRetry={refetch} />;

  if (!filteredBooks.length)
    return <BooksEmpty search={search} category={category} />;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {filteredBooks.map((book: Book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}