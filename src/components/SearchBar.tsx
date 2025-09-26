// src/components/SearchBar.tsx
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search characters..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 h-11 text-base" // Melhor espaçamento e tipografia
      />
    </div>
  );
}