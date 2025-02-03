import { Layout } from '@/components/layout/Layout'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/vendas')({
  component: AdminSales,
})

export default function AdminSales() {
  return (
    <Layout role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Vendas</h1>
        {/* Sales content will be implemented later */}
      </div>
    </Layout>
  )
}
