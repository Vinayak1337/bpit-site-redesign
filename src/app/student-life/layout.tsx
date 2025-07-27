"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

interface StudentLifeLayoutProps {
  children: ReactNode
}

export default function StudentLifeLayout({ children }: StudentLifeLayoutProps) {
  const pathname = usePathname()
  const isMainPage = pathname === "/student-life"

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
      {isMainPage ? (
        // Main student-life page - no sidebar
        children
      ) : (
        // Sub-pages - each page will handle its own carousel + sidebar layout
        children
      )}
    </main>
  )
}
