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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Rick and Morty Dex</h1>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      {isLoading && <LoadingGrid />}
      {error && <ErrorMessage message={error.message} />}
      
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