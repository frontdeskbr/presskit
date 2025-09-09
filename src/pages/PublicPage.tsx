import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Youtube, Music, Link as LinkIcon, Image } from "lucide-react";

// Exemplo de dados públicos (em produção, buscar do backend)
const exampleLinks = [
  { type: "link", url: "https://meusite.com" },
  { type: "youtube", url: "https://youtube.com/watch?v=xyz" },
  { type: "soundcloud", url: "https://soundcloud.com/artist/track" },
];
const exampleImages = [
  { url: "https://placehold.co/300x200" },
  { url: "https://placehold.co/300x200/EEE/31343C" },
];

export default function PublicPage() {
  // Em produção, buscar dados do usuário pelo username/slug
  const [links] = useState(exampleLinks);
  const [images] = useState(exampleImages);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10">
      <Card className="w-full max-w-lg p-8 text-center">
        <img
          src="https://placehold.co/96x96"
          alt="Avatar"
          className="mx-auto rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">Nome do Usuário</h1>
        <p className="text-gray-500 mb-6">Bio curta do usuário ou descrição do presskit.</p>
        <div className="space-y-3 mb-6">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              {item.type === "link" && <LinkIcon className="w-4 h-4" />}
              {item.type === "youtube" && <Youtube className="w-4 h-4 text-red-500" />}
              {item.type === "soundcloud" && <Music className="w-4 h-4 text-orange-500" />}
              <span>{item.url}</span>
            </a>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2 justify-center">
            <Image className="w-5 h-5" /> Galeria
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Imagem ${idx + 1}`}
                className="rounded shadow object-cover w-full h-32"
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}