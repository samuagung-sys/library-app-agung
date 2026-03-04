type BooksEmptyProps = {
  search?: string;
  category?: string;
};

export function BooksEmpty({
  search = "",
  category = "",
}: BooksEmptyProps) {
  const isSearching = search.trim().length > 0;
  const isFiltering = category.trim().length > 0;

  let message = "No books available.";

  if (isSearching && isFiltering) {
    message = `No books found for "${search}" in ${category}.`;
  } else if (isSearching) {
    message = `No books found for "${search}".`;
  } else if (isFiltering) {
    message = `No books found in ${category}.`;
  }

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}