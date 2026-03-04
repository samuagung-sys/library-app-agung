type BooksErrorProps = {
  onRetry?: () => void;
};

export function BooksError({ onRetry }: BooksErrorProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <p className="text-sm text-red-500">
        Failed to load books.
      </p>

      {onRetry && (
        <button
          onClick={() => onRetry()}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          Retry
        </button>
      )}
    </div>
  );
}