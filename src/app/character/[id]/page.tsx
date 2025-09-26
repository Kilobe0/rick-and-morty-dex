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
            className="rounded-full border-4 border-purple-500 shadow-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-2">{character.name}</h1>
          <p className="text-xl text-gray-400 mb-4">
            {character.status} - {character.species}
          </p>
          
          {/* Informações detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-500 mb-2">Informações Básicas</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">ID:</span> {character.id}</p>
                  <p><span className="font-medium">Status:</span> {character.status}</p>
                  <p><span className="font-medium">Espécie:</span> {character.species}</p>
                  <p><span className="font-medium">Tipo:</span> {character.type || 'Não especificado'}</p>
                  <p><span className="font-medium">Gênero:</span> {character.gender}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-500 mb-2">Origem</h3>
                <p>{character.origin.name}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-500 mb-2">Localização</h3>
                <p>{character.location.name}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-500 mb-2">Episódios</h3>
                <p className="text-sm">{character.episode.length} episódio(s)</p>
                <div className="mt-2 max-h-32 overflow-y-auto">
                  <ul className="space-y-1 text-sm">
                    {character.episode.map((episodeUrl, index) => {
                      const episodeNumber = episodeUrl.split('/').pop();
                      return (
                        <li key={index} className="text-gray-300">
                          Episódio {episodeNumber}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-500 mb-2">Informações Adicionais</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Criado em:</span> {new Date(character.created).toLocaleDateString('pt-BR')}</p>
                  <p><span className="font-medium">URL:</span> <a href={character.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">Ver na API</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}