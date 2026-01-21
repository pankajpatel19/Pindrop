import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-10 space-y-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[200px]" area-busy="true" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Kanban Columns Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((col) => (
          <div key={col} className="space-y-4">
            <Skeleton className="h-8 w-[150px]" /> {/* Column Title */}
            <div className="bg-zinc-100 p-4 rounded-lg space-y-4 min-h-[500px]">
              <Skeleton className="h-[120px] w-full rounded-xl" />
              <Skeleton className="h-[120px] w-full rounded-xl" />
              <Skeleton className="h-[120px] w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
