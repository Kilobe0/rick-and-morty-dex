// src/components/CharacterCard.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Character } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link href={`/character/${character.id}`} className="block group">
        <Card className="overflow-hidden h-full flex flex-col">
          <CardHeader className="p-0">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow flex justify-between">
            <CardTitle className="text-lg truncate group-hover:text-primary font-inter-subheading">
              {character.name}
              <p className="text-sm text-muted-foreground text-description">
                {character.species}
              </p>
            </CardTitle>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  character.status === "Alive"
                    ? "bg-green-600 text-white"
                    : character.status === "Dead"
                    ? "bg-red-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {character.status}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
