import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">StoreSys</h1>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/cadastro">Criar conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Sistema completo para sua loja
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Gerencie vendas, estoque e clientes em uma única plataforma.
              Simplifique suas operações e aumente seus resultados.
            </p>
            <Button size="lg" asChild className="mr-4">
              <Link to="/cadastro">Começar agora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Fazer login</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tudo que você precisa
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Gestão de Vendas</h3>
                <p className="text-gray-600">
                  Controle suas vendas em tempo real, com suporte a múltiplas
                  formas de pagamento.
                </p>
              </div>
              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Controle de Estoque</h3>
                <p className="text-gray-600">
                  Mantenha seu estoque sempre atualizado com alertas automáticos e
                  relatórios detalhados.
                </p>
              </div>
              <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">
                  Gestão de Clientes
                </h3>
                <p className="text-gray-600">
                  Cadastre e acompanhe seus clientes, histórico de compras e
                  preferências.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Comece agora mesmo e veja a diferença em sua gestão.
            </p>
            <Button size="lg" asChild>
              <Link to="/cadastro">Criar conta grátis</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2024 StoreSys. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}