// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCharacters } from '@/lib/api';
import useDebounce from '@/hooks/useDebounce'; // Hook customizado

import SearchBar from '@/components/SearchBar';
import CharacterGrid from '@/components/CharacterGrid';
import LoadMoreButton from '@/components/LoadMoreButton';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingGrid from './loading'; // Componente de loading
import { SearchSlash } from 'lucide-react';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500); // 500ms de delay

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['characters', { search: debouncedSearch }],
    queryFn: getCharacters,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.next) {
        // Extrai o número da página da URL 'next'
        return new URL(lastPage.info.next).searchParams.get('page');
      }
      return undefined;
    },
    initialPageParam: "1",
  });

  const allCharacters = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Explore the Rick and Morty Universe</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover all your favorite characters from the multiverse. Search, filter, and explore detailed information about each character.
        </p>
      </div>
      
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      {isLoading && <LoadingGrid />}
      {error && <ErrorMessage message={error.message.includes("404") ? "Character not found" : "Something went wrong"} />}
      
      {!isLoading && !error && (
        <>
          <CharacterGrid characters={allCharacters} />
          <div className="flex justify-center mt-8">
            <LoadMoreButton
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              isFetching={isFetchingNextPage}
            />
          </div>
        </>
      )}
    </main>
  );
}