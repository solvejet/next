// src/components/ui/Skeleton.tsx
export function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Hero Section Skeleton */}
      <div className="h-8 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
      <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-700" />

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="h-48 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
            <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Card Skeleton Component
export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="h-24 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
        <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-700" />
      </div>
    </div>
  );
}
