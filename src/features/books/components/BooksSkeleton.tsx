export const BooksSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-32 rounded-2xl bg-muted animate-pulse"
        />
      ))}
    </div>
  )
}