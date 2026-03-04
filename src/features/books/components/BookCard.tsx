import { useNavigate } from "react-router-dom";
import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  const authorName =
    typeof book.author === "string"
      ? book.author
      : (book.author?.name ?? "Unknown author");

  return (
    <div
      onClick={() => navigate(`/books/${book.id}`)}
      className="cursor-pointer rounded-xl border p-4 transition hover:shadow-md"
    >
      <h3 className="font-semibold line-clamp-2">{book.title}</h3>

      <p className="text-sm text-muted-foreground">{authorName}</p>

      <p className="text-xs text-muted-foreground">
        Published: {book.publishedYear ?? "-"}
      </p>
    </div>
  );
}
