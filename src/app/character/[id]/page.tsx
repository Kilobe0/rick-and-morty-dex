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
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="relative mx-auto lg:mx-0">
            <Image
              src={character.image}
              alt={character.name}
              width={320}
              height={320}
              className="rounded-2xl border-4 border-primary shadow-xl w-full max-w-xs lg:max-w-none"
            />
            <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-background ${
              character.status === 'Alive' ? 'bg-success' :
              character.status === 'Dead' ? 'bg-destructive' :
              'bg-muted'
            }`} />
          </div>
        </div>
        
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">{character.name}</h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-6">
            {character.status} - {character.species}
          </p>
          
          {/* Informações detalhadas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Informações Básicas</h3>
                <div className="space-y-2 text-sm lg:text-base">
                  <p><span className="font-medium">ID:</span> {character.id}</p>
                  <p><span className="font-medium">Status:</span> {character.status}</p>
                  <p><span className="font-medium">Espécie:</span> {character.species}</p>
                  <p><span className="font-medium">Tipo:</span> {character.type || 'Não especificado'}</p>
                  <p><span className="font-medium">Gênero:</span> {character.gender}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Origem</h3>
                <p className="text-sm lg:text-base">{character.origin.name}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Localização</h3>
                <p className="text-sm lg:text-base">{character.location.name}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Episódios</h3>
                <p className="text-sm mb-2">{character.episode.length} episódio(s)</p>
                <div className="max-h-32 overflow-y-auto">
                  <ul className="space-y-1 text-xs lg:text-sm">
                    {character.episode.map((episodeUrl, index) => {
                      const episodeNumber = episodeUrl.split('/').pop();
                      return (
                        <li key={index} className="text-muted-foreground">
                          Episódio {episodeNumber}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Informações Adicionais</h3>
                <div className="space-y-2 text-xs lg:text-sm">
                  <p><span className="font-medium">Criado em:</span> {new Date(character.created).toLocaleDateString('pt-BR')}</p>
                  <p>
                    <span className="font-medium">URL:</span>{' '}
                    <a
                      href={character.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ver na API
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}