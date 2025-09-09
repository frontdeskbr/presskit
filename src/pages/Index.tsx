import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="bg-white/80 rounded-xl shadow-lg p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-primary">Presskit.cc</h1>
        <p className="text-lg text-gray-700 mb-6">
          Crie sua página de links, vídeos e galeria de imagens em minutos.<br />
          Compartilhe seu presskit profissional com o mundo!
        </p>
        <Link to="/dashboard">
          <Button className="w-full py-6 text-lg font-bold">Comece agora</Button>
        </Link>
        <div className="mt-6">
          <span className="text-gray-500 text-sm">Exemplo público:</span>
          <Link to="/u/exemplo" className="block text-blue-600 hover:underline">
            presskit.cc/u/exemplo
          </Link>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;