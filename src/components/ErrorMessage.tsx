interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground px-6 py-4 rounded-lg" role="alert">
      <div className="flex items-center">
        <strong className="font-semibold mr-2">Error:</strong>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}