import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type Theme = "light" | "dark" | "system";
type PrimaryColor = "blue" | "purple" | "green" | "orange";

export function AppearanceSettings() {
  const { toast } = useToast();
  const {
    theme: currentTheme,
    primaryColor: currentPrimaryColor,
    setTheme,
    setPrimaryColor,
  } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);
  const [selectedPrimaryColor, setSelectedPrimaryColor] =
    useState<PrimaryColor>(currentPrimaryColor);
  const [isCompact, setIsCompact] = useState(false);

  const handleSave = () => {
    // Apply the selected theme and primary color globally
    setTheme(selectedTheme);
    setPrimaryColor(selectedPrimaryColor);

    toast({
      title: "Aparência atualizada",
      description: "As configurações de aparência foram salvas.",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Tema</Label>
            <RadioGroup
              value={selectedTheme}
              onValueChange={(value: Theme) => setSelectedTheme(value)}
              className="grid grid-cols-3 gap-4 mt-2"
            >
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <span>Claro</span>
              </Label>
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <span>Escuro</span>
              </Label>
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="system"
                  id="system"
                  className="sr-only"
                />
                <span>Sistema</span>
              </Label>
            </RadioGroup>
          </div>

          <div>
            <Label>Cor principal</Label>
            <RadioGroup
              value={selectedPrimaryColor}
              onValueChange={(value: PrimaryColor) =>
                setSelectedPrimaryColor(value)
              }
              className="grid grid-cols-4 gap-4 mt-2"
            >
              <Label
                htmlFor="blue"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-blue-500 p-4 hover:bg-blue-600 [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="blue" id="blue" className="sr-only" />
              </Label>
              <Label
                htmlFor="purple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-purple-500 p-4 hover:bg-purple-600 [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="purple"
                  id="purple"
                  className="sr-only"
                />
              </Label>
              <Label
                htmlFor="green"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-green-500 p-4 hover:bg-green-600 [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="green" id="green" className="sr-only" />
              </Label>
              <Label
                htmlFor="orange"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-orange-500 p-4 hover:bg-orange-600 [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value="orange"
                  id="orange"
                  className="sr-only"
                />
              </Label>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="compact-mode">Modo compacto</Label>
            <Switch
              id="compact-mode"
              checked={isCompact}
              onCheckedChange={setIsCompact}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Salvar alterações
        </Button>
      </CardContent>
    </Card>
  );
}
