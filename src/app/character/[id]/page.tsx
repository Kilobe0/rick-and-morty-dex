// src/app/character/[id]/page.tsx
import { getCharacterById } from "@/lib/api";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

// Metadata dinâmico para SEO
export async function generateMetadata({ params }: DetailPageProps) {
  const { id } = await params;
  const character = await getCharacterById(Number(id));
  return {
    title: `${character.name} | Rick and Morty Dex`,
    description: `Details about ${character.name}`,
  };
}

export default async function CharacterDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const character = await getCharacterById(Number(id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-background/80 py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Header com imagem e informações principais */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
              <Image
                src={character.image}
                alt={character.name}
                width={280}
                height={280}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
            <div
              className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-background shadow-lg ${
                character.status === "Alive"
                  ? "bg-green-500"
                  : character.status === "Dead"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-inter-title bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {character.name}
          </h1>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card border shadow-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                character.status === "Alive"
                  ? "bg-green-500"
                  : character.status === "Dead"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            />
            <p className="text-lg md:text-xl text-muted-foreground font-inter-heading">
              {character.status} - {character.species}
            </p>
          </div>
        </div>

        {/* Grid de informações em cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-inter-heading text-primary flex items-center">
                Basic Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm md:text-base">
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">ID</p>
                  <p className="font-inter-subheading">{character.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">Status</p>
                  <p className="font-inter-subheading">{character.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">Species</p>
                  <p className="font-inter-subheading">{character.species}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">Gender</p>
                  <p className="font-inter-subheading">{character.gender}</p>
                </div>
              </div>
              {character.type && (
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">Type</p>
                  <p className="font-inter-subheading">{character.type}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Origem e Localização */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-inter-heading text-primary flex items-center gap-2">
                Localization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium text-muted-foreground">Origin</p>
                <p className="font-inter-subheading text-lg">
                  {character.origin.name}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-muted-foreground">
                  Last Known Location
                </p>
                <p className="font-inter-subheading text-lg">
                  {character.location.name}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Episódios */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-inter-heading text-primary flex items-center gap-2">
                Episodes ({character.episode.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-48 overflow-y-auto pr-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {character.episode.map((episodeUrl, index) => {
                    const episodeNumber = episodeUrl.split("/").pop();
                    return (
                      <div
                        key={index}
                        className="bg-secondary/50 rounded-lg p-3 text-center hover:bg-secondary/70 transition-colors duration-200"
                      >
                        <p className="text-sm font-medium text-foreground font-inter-subheading">
                          Ep. {episodeNumber}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <div className="p-6 md:col-span-2">
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Created</p>
                <p className="font-inter-subheading">
                  {new Date(character.created).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <a
                href={character.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-inter-subheading text-sm"
              >
                View on API
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
