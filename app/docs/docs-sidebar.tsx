"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const docs = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
      {
        title: "Quick Start",
        href: "/docs/quick-start",
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "Fund Requests",
        href: "/docs/fund-requests",
      },
      {
        title: "Donations",
        href: "/docs/donations",
      },
      {
        title: "Voting System",
        href: "/docs/voting",
      },
      {
        title: "Dispute Resolution",
        href: "/docs/disputes",
      },
    ],
  },
  {
    title: "Smart Contracts",
    items: [
      {
        title: "Overview",
        href: "/docs/smart-contracts",
      },
      {
        title: "Contract Integration",
        href: "/docs/contract-integration",
      },
      {
        title: "Security",
        href: "/docs/security",
      },
    ],
  },
  {
    title: "User Guides",
    items: [
      {
        title: "Creating Requests",
        href: "/docs/guides/creating-requests",
      },
      {
        title: "Making Donations",
        href: "/docs/guides/making-donations",
      },
      {
        title: "Participating in Votes",
        href: "/docs/guides/voting",
      },
      {
        title: "Handling Disputes",
        href: "/docs/guides/disputes",
      },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] py-6 pr-6 lg:py-8">
      <div className="space-y-6">
        {docs.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="font-medium">{section.title}</h4>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm hover:bg-muted",
                    pathname === item.href ? "font-medium text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

