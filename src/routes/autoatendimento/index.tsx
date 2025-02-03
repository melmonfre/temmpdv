import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/autoatendimento/')({
  component: Store,
})

export default function Store() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => api.getProducts(),
  });

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product: Product) => {
    toast({
      title: "Produto selecionado",
      description: `${product.name} foi adicionado ao seu pedido.`
    });
  };

  if (isLoading) {
    return (
      <Layout role="self-service">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="self-service">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Autoatendimento</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Buscar Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Buscar por nome ou descrição</Label>
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite para buscar..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <Card 
              key={product.id} 
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleProductSelect(product)}
            >
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {product.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-bold">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Estoque: {product.stock}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
