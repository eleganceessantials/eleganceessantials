import React from "react";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );
}

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-pink-50 p-3">
      <Skeleton className="w-full aspect-[4/5] rounded-xl mb-4" />
      <div className="space-y-3 px-1 pb-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}
