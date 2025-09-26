// src/app/character/[id]/page.tsx
import { getCharacterById } from '@/lib/api';
import Image from 'next/image';

interface DetailPageProps {
  params: { id: string };
}

// Metadata dinâmico para SEO
export async function generateMetadata({ params }: DetailPageProps) {
  const character = await getCharacterById(Number(params.id));
  return {
    title: `${character.name} | Rick and Morty Dex`,
    description: `Details about ${character.name}`,
  };
}

export default async function CharacterDetailPage({ params }: DetailPageProps) {
  const character = await getCharacterById(Number(params.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-shrink-0">
          <Image
            src={character.image}
            alt={character.name}
            width={400}
            height={400}
            className="rounded-full border-4 border-cyan-400 shadow-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-2">{character.name}</h1>
          <p className="text-xl text-gray-400 mb-4">
            {character.status} - {character.species}
          </p>
          {/* Adicionar mais informações aqui */}
          {/* Ex: Origem, localização, episódios, etc. (requereria chamadas a outros endpoints) */}
        </div>
      </div>
    </div>
  );
}