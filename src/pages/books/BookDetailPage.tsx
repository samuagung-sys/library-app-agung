import { useParams } from "react-router-dom";
import { useBookDetail } from "@/features/books/hooks/useBookDetail";
import { useBorrowBook } from "@/features/loans/hooks/useBorrowBook";
import { useLoans } from "@/features/loans/hooks/useLoans";

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: book, isLoading, isError } = useBookDetail(id);
  const borrowMutation = useBorrowBook();
  const { data: loans = [] } = useLoans();

  const bookId = book?.id ? Number(book.id) : Number(id);

  const alreadyBorrowed = loans.some(
    (loan) =>
      (loan.bookId === bookId || loan.book?.id === bookId) &&
      loan.status === "BORROWED",
  );

  const outOfStock = (book?.availableCopies ?? 0) === 0;

  const handleBorrow = () => {
    if (!bookId) return;

    borrowMutation.mutate(bookId);
  };

  if (isLoading) {
    return <div className="p-6">Loading book detail...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load book detail</div>;
  }

  if (!book) {
    return <div className="p-6">Book not found</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>

      <p>
        Author:{" "}
        {typeof book.author === "string"
          ? book.author
          : (book.author?.name ?? "-")}
      </p>

      <p>Category: {book.category?.name ?? "-"}</p>
      <p>Published: {book.publishedYear ?? "-"}</p>
      <p>Available Copies: {book.availableCopies ?? 0}</p>

      {borrowMutation.isError && (
        <p className="text-red-500">Failed to borrow book</p>
      )}

      {borrowMutation.isSuccess && (
        <p className="text-green-600">Book borrowed successfully</p>
      )}

      {alreadyBorrowed && (
        <p className="text-red-500">You already borrowed this book</p>
      )}

      {outOfStock && (
        <p className="text-red-500">This book is currently out of stock</p>
      )}

      <button
        onClick={handleBorrow}
        disabled={alreadyBorrowed || outOfStock || borrowMutation.isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {alreadyBorrowed
          ? "Already Borrowed"
          : outOfStock
            ? "Out of Stock"
            : borrowMutation.isPending
              ? "Borrowing..."
              : "Borrow Book"}
      </button>
    </div>
  );
}
