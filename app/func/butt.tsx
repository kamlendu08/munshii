
"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MenubarDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useSession()
  
  const menuItems = [
    { href: '', label: 'About' },
    { href: '', label: 'Contact' },
    { href: '', label: 'Privacy' },
    { href: '', label: 'Pricing' },
  ]

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="px-2 md:px-4 lg:px-40 text-lg font-consola">
      <div className="flex justify-between items-center p-4 sm:p-8">
        <div className="px-2 font-bold text-2xl text-gray-700">
          <Link href={'/'}>MUNSHII</Link>
        </div>
        <div className="hidden md:flex justify-end items-center space-x-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className="px-2 font-bold text-gray-700">
              {item.label}
            </Link>
          ))}
          {status === "authenticated" && (
            <Button
              variant="outline"
              className="ml-4 font-bold text-gray-700 outline outline-gray-500 bg-gray-200"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="px-2 py-2 font-bold text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {status === "authenticated" && (
                  <Button
                    variant="outline"
                    className="font-bold text-gray-700"
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}