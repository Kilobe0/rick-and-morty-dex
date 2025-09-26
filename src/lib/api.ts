// src/lib/api.ts
import axios from 'axios';
import { z } from 'zod';

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

// Esquemas de validação com Zod (opcional, mas recomendado)
const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  image: z.string().url(),
});

const ApiResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
  }),
  results: z.array(CharacterSchema),
});

export type Character = z.infer<typeof CharacterSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

interface GetCharactersParams {
  pageParam?: string;
  queryKey: (string | { search: string })[];
}

export const getCharacters = async ({ pageParam = "1", queryKey }: GetCharactersParams): Promise<ApiResponse> => {
  const [, { search }] = queryKey as [string, { search: string }];
  const response = await apiClient.get(`/character?page=${pageParam}&name=${search}`);
  return ApiResponseSchema.parse(response.data);
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await apiClient.get(`/character/${id}`);
  // Adicionar mais campos ao schema se necessário para a página de detalhes
  return CharacterSchema.parse(response.data);
};