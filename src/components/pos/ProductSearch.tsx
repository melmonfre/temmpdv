import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredProducts: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductSearch({ 
  searchTerm, 
  onSearchChange, 
  filteredProducts,
  onProductSelect 
}: ProductSearchProps) {
  const { toast } = useToast();

  const handleProductSelect = (product: Product) => {
    if (product.stock <= 0) {
      toast({
        title: "Produto sem estoque",
        description: "Este produto não está disponível no momento",
        variant: "destructive"
      });
      return;
    }
    onProductSelect(product);
    toast({
      title: "Produto adicionado",
      description: "O produto foi adicionado ao carrinho"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscar Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SearchInput 
            searchTerm={searchTerm} 
            onSearchChange={onSearchChange} 
          />

          <ProductGrid 
            products={filteredProducts} 
            onProductSelect={handleProductSelect} 
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function SearchInput({ searchTerm, onSearchChange }: SearchInputProps) {
  return (
    <div>
      <Label htmlFor="search">Código de barras ou nome do produto</Label>
      <Input
        id="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Digite para buscar..."
      />
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products?.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onSelect={onProductSelect}
        />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:bg-accent transition-colors" 
      onClick={() => onSelect(product)}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="font-bold">
              R$ {product.price.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Estoque: {product.stock}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}