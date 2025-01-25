import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmployeeSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function EmployeeSearch({ searchTerm, onSearchChange }: EmployeeSearchProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscar Funcionários</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Buscar por nome ou email</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Digite para buscar..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}