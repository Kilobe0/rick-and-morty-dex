// src/components/LoadMoreButton.tsx
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isFetching: boolean;
}

export default function LoadMoreButton({ onClick, disabled, isFetching }: LoadMoreButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled || isFetching} size="lg">
      {isFetching ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        'Load More'
      )}
    </Button>
  );
}