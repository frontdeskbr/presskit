import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { Plus, Link as LinkIcon, Image, Youtube, Music, Trash2, Edit2, FilePlus2 } from "lucide-react";

type LinkItem = { type: "link" | "youtube" | "soundcloud"; url: string };
type ImageItem = { type: "image"; url: string };
type Page = {
  id: string;
  name: string;
  slug: string;
  links: LinkItem[];
  images: ImageItem[];
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Dashboard() {
  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      name: "Minha Página",
      slug: "minha-pagina",
      links: [],
      images: [],
    },
  ]);
  const [selectedPageId, setSelectedPageId] = useState("1");
  const [newPageName, setNewPageName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Conteúdo da página selecionada
  const selectedPage = pages.find((p) => p.id === selectedPageId);

  // Inputs para links/imagens
  const [newLink, setNewLink] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  // CRUD de páginas
  const createPage = () => {
    if (!newPageName.trim()) return;
    const slug = slugify(newPageName);
    const id = Date.now().toString();
    setPages([
      ...pages,
      { id, name: newPageName, slug, links: [], images: [] },
    ]);
    setSelectedPageId(id);
    setNewPageName("");
    showSuccess("Página criada!");
  };

  const startRename = (id: string, name: string) => {
    setRenamingId(id);
    setRenameValue(name);
  };

  const confirmRename = (id: string) => {
    setPages(
      pages.map((p) =>
        p.id === id ? { ...p, name: renameValue, slug: slugify(renameValue) } : p
      )
    );
    setRenamingId(null);
    setRenameValue("");
    showSuccess("Página renomeada!");
  };

  const deletePage = (id: string) => {
    const filtered = pages.filter((p) => p.id !== id);
    setPages(filtered);
    if (selectedPageId === id && filtered.length > 0) {
      setSelectedPageId(filtered[0].id);
    } else if (filtered.length === 0) {
      setSelectedPageId("");
    }
    showSuccess("Página excluída!");
  };

  // Conteúdo da página selecionada
  const addLink = (type: LinkItem["type"]) => {
    if (!selectedPage || !newLink) return;
    setPages(
      pages.map((p) =>
        p.id === selectedPageId
          ? { ...p, links: [...p.links, { type, url: newLink }] }
          : p
      )
    );
    setNewLink("");
    showSuccess("Link adicionado!");
  };

  const removeLink = (idx: number) => {
    if (!selectedPage) return;
    setPages(
      pages.map((p) =>
        p.id === selectedPageId
          ? { ...p, links: p.links.filter((_, i) => i !== idx) }
          : p
      )
    );
  };

  const addImage = () => {
    if (!selectedPage || !newImage) return;
    const url = URL.createObjectURL(newImage);
    setPages(
      pages.map((p) =>
        p.id === selectedPageId
          ? { ...p, images: [...p.images, { type: "image", url }] }
          : p
      )
    );
    setNewImage(null);
    showSuccess("Imagem adicionada!");
  };

  const removeImage = (idx: number) => {
    if (!selectedPage) return;
    setPages(
      pages.map((p) =>
        p.id === selectedPageId
          ? { ...p, images: p.images.filter((_, i) => i !== idx) }
          : p
      )
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-primary">Suas páginas</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Lista de páginas */}
        <Card className="w-full md:w-72 p-4 shadow-xl border border-gray-200 bg-white flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <FilePlus2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg">Gerenciar páginas</span>
          </div>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nome da nova página"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={createPage} disabled={!newPageName.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <ul className="space-y-2 flex-1 overflow-y-auto">
            {pages.map((page) => (
              <li
                key={page.id}
                className={`group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors ${
                  selectedPageId === page.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/60"
                }`}
                onClick={() => setSelectedPageId(page.id)}
              >
                <span className="font-medium flex-1 truncate">
                  {renamingId === page.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        confirmRename(page.id);
                      }}
                      className="flex gap-1"
                    >
                      <Input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="h-7 text-sm"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        type="submit"
                        variant="outline"
                        className="h-7 px-2"
                      >
                        OK
                      </Button>
                    </form>
                  ) : (
                    page.name
                  )}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="opacity-60 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    startRename(page.id, page.name);
                  }}
                  title="Renomear"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="opacity-60 group-hover:opacity-100 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePage(page.id);
                  }}
                  title="Excluir"
                  disabled={pages.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </Card>
        {/* Editor da página selecionada */}
        <div className="flex-1">
          {selectedPage ? (
            <Card className="p-6 shadow-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-xl text-primary mb-1">
                    {selectedPage.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    URL: <a
                      href={`/u/usuario/${selectedPage.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >presskit.cc/u/usuario/{selectedPage.slug}</a>
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-4 shadow border border-gray-100 bg-muted/40">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                    <LinkIcon className="w-5 h-5" /> Links & Vídeos
                  </h4>
                  <div className="flex gap-2 mb-2">
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
                    {selectedPage.links.map((item, idx) => (
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
                <Card className="p-4 shadow border border-gray-100 bg-muted/40">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                    <Image className="w-5 h-5" /> Galeria de Imagens
                  </h4>
                  <div className="flex gap-2 mb-2">
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
                    {selectedPage.images.map((img, idx) => (
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
            </Card>
          ) : (
            <Card className="p-8 text-center text-gray-500">
              Nenhuma página selecionada.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}