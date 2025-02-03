import { Layout } from '@/components/layout/Layout'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/funcionario/vendas')({
  component: EmployeeSales,
})

export default function EmployeeSales() {
  return (
    <Layout role="employee">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Minhas Vendas</h1>
        {/* Sales content will be implemented later */}
      </div>
    </Layout>
  )
}
