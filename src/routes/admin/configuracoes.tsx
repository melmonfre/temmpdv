import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { AppearanceSettings } from '@/components/settings/AppearanceSettings'
import { SystemSettings } from '@/components/settings/SystemSettings'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/configuracoes')({
  component: Settings,
})

export default function Settings() {
  return (
    <Layout role="admin">
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Configurações</h1>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>
          <TabsContent value="system">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
