import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { Plus, Link as LinkIcon, Image, Youtube, Music } from "lucide-react";

type LinkItem = { type: "link" | "youtube" | "soundcloud"; url: string };
type ImageItem = { type: "image"; url: string };

export default function Dashboard() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [newLink, setNewLink] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const addLink = (type: LinkItem["type"]) => {
    if (!newLink) return;
    setLinks([...links, { type, url: newLink }]);
    setNewLink("");
    showSuccess("Link adicionado!");
  };

  const addImage = () => {
    if (!newImage) return;
    const url = URL.createObjectURL(newImage);
    setImages([...images, { type: "image", url }]);
    setNewImage(null);
    showSuccess("Imagem adicionada!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Editar sua página pública</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <LinkIcon className="w-5 h-5" /> Links & Vídeos
          </h3>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Cole a URL (YouTube, SoundCloud, etc.)"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <Button variant="outline" onClick={() => addLink("link")}>
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => addLink("youtube")}>
              <Youtube className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => addLink("soundcloud")}>
              <Music className="w-4 h-4" />
            </Button>
          </div>
          <ul className="space-y-2 mt-4">
            {links.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {item.type === "link" && <LinkIcon className="w-4 h-4" />}
                {item.type === "youtube" && <Youtube className="w-4 h-4 text-red-500" />}
                {item.type === "soundcloud" && <Music className="w-4 h-4 text-orange-500" />}
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {item.url}
                </a>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Image className="w-5 h-5" /> Galeria de Imagens
          </h3>
          <div className="flex gap-2 mb-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            />
            <Button variant="outline" onClick={addImage} disabled={!newImage}>
              <Plus className="w-4 h-4" /> Adicionar
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Imagem ${idx + 1}`}
                className="rounded shadow object-cover w-full h-24"
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}