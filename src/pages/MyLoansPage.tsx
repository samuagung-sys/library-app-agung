import { useLoans } from "@/features/loans/hooks/useLoans";
import { useReturnLoan } from "@/features/loans/hooks/useReturnLoan";

export default function MyLoansPage() {
  const { data: loans = [], isLoading, isError, error } = useLoans();
  const returnMutation = useReturnLoan();

  if (isLoading) {
    return <div className="p-6">Loading loans...</div>;
  }

  if (isError) {
  return (
    <div className="p-6 text-red-500">
      Failed to load loans
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

  if (loans.length === 0) {
    return (
      <div className="p-6">
        You have no borrowed books
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        My Borrowed Books
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loans.map((loan) => (
          <div
            key={loan.id}
            className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">
              {loan.book?.title ?? "Unknown Book"}
            </h2>

            <p className="text-sm text-gray-500">
              Author:{" "}
              {typeof loan.book?.author === "string"
                ? loan.book.author
                : loan.book?.author?.name ?? "-"}
            </p>

            {/* STATUS BADGE */}
            <div className="mt-2">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  loan.status === "BORROWED"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {loan.status}
              </span>
            </div>

            {/* BORROW DATE */}
            <p className="text-sm mt-2">
              Borrowed At:{" "}
              {loan.borrowedAt
                ? new Date(loan.borrowedAt).toLocaleDateString()
                : "-"}
            </p>

            {/* DUE DATE */}
            <p className="text-sm">
              Due Date:{" "}
              {loan.dueDate
                ? new Date(loan.dueDate).toLocaleDateString()
                : "-"}
            </p>

            {/* RETURN BUTTON */}
            {loan.status === "BORROWED" && (
              <button
                onClick={() => {
  console.log("RETURN CLICKED", loan.id);
  returnMutation.mutate(loan.id);
}}
                className="mt-3 text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Return Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}