import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { Plus, Link as LinkIcon, Image, Youtube, Music, Trash2 } from "lucide-react";

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

  const removeLink = (idx: number) => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  const addImage = () => {
    if (!newImage) return;
    const url = URL.createObjectURL(newImage);
    setImages([...images, { type: "image", url }]);
    setNewImage(null);
    showSuccess("Imagem adicionada!");
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-primary">Editar sua página pública</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-xl border border-gray-200 bg-white">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg text-primary">
            <LinkIcon className="w-5 h-5" /> Links & Vídeos
          </h3>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Cole a URL (YouTube, SoundCloud, etc.)"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={() => addLink("link")} title="Adicionar link">
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => addLink("youtube")} title="Adicionar YouTube">
              <Youtube className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => addLink("soundcloud")} title="Adicionar SoundCloud">
              <Music className="w-4 h-4" />
            </Button>
          </div>
          <ul className="space-y-2 mt-2">
            {links.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 bg-muted/50 rounded px-3 py-2">
                {item.type === "link" && <LinkIcon className="w-4 h-4" />}
                {item.type === "youtube" && <Youtube className="w-4 h-4 text-red-500" />}
                {item.type === "soundcloud" && <Music className="w-4 h-4 text-orange-500" />}
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline flex-1 truncate">
                  {item.url}
                </a>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeLink(idx)}
                  className="text-destructive"
                  title="Remover"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6 shadow-xl border border-gray-200 bg-white">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg text-primary">
            <Image className="w-5 h-5" /> Galeria de Imagens
          </h3>
          <div className="flex gap-2 mb-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
              className="flex-1"
            />
            <Button variant="outline" onClick={addImage} disabled={!newImage}>
              <Plus className="w-4 h-4" /> Adicionar
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.url}
                  alt={`Imagem ${idx + 1}`}
                  className="rounded shadow object-cover w-full h-24 border border-gray-200"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 opacity-80 group-hover:opacity-100"
                  onClick={() => removeImage(idx)}
                  title="Remover imagem"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}