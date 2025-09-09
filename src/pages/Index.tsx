import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/80 via-secondary/60 to-muted/80">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center border border-gray-200">
        <img
          src="/favicon.ico"
          alt="Presskit.cc"
          className="mx-auto mb-4 w-16 h-16 rounded-full shadow"
        />
        <h1 className="text-5xl font-extrabold mb-4 text-primary drop-shadow">Presskit.cc</h1>
        <p className="text-xl text-gray-700 mb-8 font-medium">
          Crie sua página de links, vídeos e galeria de imagens em minutos.<br />
          Compartilhe seu presskit profissional com o mundo!
        </p>
        <Link to="/dashboard">
          <Button className="w-full py-6 text-xl font-bold shadow-lg">Comece agora</Button>
        </Link>
        <div className="mt-8">
          <span className="text-gray-500 text-base">Exemplo público:</span>
          <Link to="/u/exemplo" className="block text-blue-600 hover:underline text-lg font-semibold">
            presskit.cc/u/exemplo
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;