import { DocsSidebar } from "./docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <DocsSidebar />
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}

