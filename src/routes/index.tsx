import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BarChart3, DollarSign, ShoppingCart, Users } from "lucide-react";

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">TEMM PDV</h1>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/Login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/Cadastro">Começar agora</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Sistema completo para gestão do seu negócio
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Desenvolvemos uma ferramenta poderosa para gerenciamento de finanças com precisão 
                e ajudar a manter a saúde financeira do seu negócio.
              </p>
              <Button size="lg" className="mr-4" asChild>
                <Link to="/cadastro" className="flex items-center">
                  Começar gratuitamente <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Recursos que impulsionam seu negócio
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <ShoppingCart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">PDV Intuitivo</h3>
                <p className="text-gray-600">
                  Interface simples e fácil de usar para agilizar suas vendas
                </p>
              </div>
              <div className="p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Relatórios Detalhados</h3>
                <p className="text-gray-600">
                  Acompanhe o desempenho do seu negócio com relatórios completos
                </p>
              </div>
              <div className="p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Gestão Financeira</h3>
                <p className="text-gray-600">
                  Controle total sobre suas finanças e fluxo de caixa
                </p>
              </div>
              <div className="p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Controle de Acesso</h3>
                <p className="text-gray-600">
                  Gerencie permissões e acessos da sua equipe
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Por que escolher o TEMM PDV?</h2>
              <div className="space-y-8">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">Fácil de usar</h3>
                  <p className="text-gray-600">
                    Interface intuitiva que sua equipe aprenderá rapidamente
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">Suporte especializado</h3>
                  <p className="text-gray-600">
                    Equipe dedicada para ajudar você em todas as etapas
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">Atualizações constantes</h3>
                  <p className="text-gray-600">
                    Sistema sempre atualizado com as últimas tecnologias
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Comece agora mesmo e veja a diferença em sua gestão.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/Cadastro" className="flex items-center">
                Criar conta grátis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="font-semibold text-lg text-white mb-2">TEMM PDV</p>
            <p className="text-sm">
              © 2024 TEMM Code. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
