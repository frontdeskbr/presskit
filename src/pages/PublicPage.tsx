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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
      <Card className="w-full max-w-lg p-10 text-center shadow-2xl border border-gray-200 bg-white/90">
        <img
          src="https://placehold.co/96x96"
          alt="Avatar"
          className="mx-auto rounded-full mb-4 border-4 border-primary shadow"
        />
        <h1 className="text-3xl font-extrabold mb-1 text-primary">Nome do Usuário</h1>
        <p className="text-gray-500 mb-6">Bio curta do usuário ou descrição do presskit.</p>
        <div className="space-y-3 mb-8">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-semibold shadow"
            >
              {item.type === "link" && <LinkIcon className="w-5 h-5" />}
              {item.type === "youtube" && <Youtube className="w-5 h-5 text-red-500" />}
              {item.type === "soundcloud" && <Music className="w-5 h-5 text-orange-500" />}
              <span className="truncate">{item.url}</span>
            </a>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2 justify-center text-lg text-primary">
            <Image className="w-5 h-5" /> Galeria
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Imagem ${idx + 1}`}
                className="rounded shadow object-cover w-full h-32 border border-gray-200"
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}