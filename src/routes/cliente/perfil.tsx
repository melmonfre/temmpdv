import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { MaskedInput } from '@/components/ui/masked-input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cliente/perfil')({
  component: Profile,
})

export default function Profile() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    cep: '12345-678',
    address: 'Rua Example, 123',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: 'Perfil atualizado',
        description: 'Seus dados foram atualizados com sucesso.',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar seus dados.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout role="customer">
      <div className="container max-w-2xl py-6">
        <Card>
          <CardHeader>
            <CardTitle>Meus dados</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <MaskedInput
                  id="name"
                  value={formData.name}
                  onChange={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <MaskedInput
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <MaskedInput
                  id="phone"
                  mask="phone"
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData({ ...formData, phone: value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <MaskedInput
                  id="cpf"
                  mask="cpf"
                  value={formData.cpf}
                  onChange={(value) => setFormData({ ...formData, cpf: value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <MaskedInput
                  id="cep"
                  mask="cep"
                  value={formData.cep}
                  onChange={(value) => setFormData({ ...formData, cep: value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <MaskedInput
                  id="address"
                  value={formData.address}
                  onChange={(value) =>
                    setFormData({ ...formData, address: value })
                  }
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
