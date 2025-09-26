import { Skeleton } from "@/components/ui/skeleton"

export default function CharacterDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-shrink-0">
          <Skeleton className="w-[400px] h-[400px] rounded-full" />
        </div>
        <div className="text-center md:text-left space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </div>
  );
}