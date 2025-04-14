"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  Menu,
  Package,
  Settings,
  Shield,
  Users,
  X,
  LogOut,
  Bell,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/hooks/use-toast"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Ownership",
    href: "/dashboard/ownership",
    icon: Users,
  },
  {
    title: "Management Control",
    href: "/dashboard/management",
    icon: Users,
  },
  {
    title: "Skills Development",
    href: "/dashboard/skills",
    icon: FileText,
  },
  {
    title: "Enterprise Development",
    href: "/dashboard/enterprise",
    icon: Package,
  },
  {
    title: "Socio-Economic Development",
    href: "/dashboard/socio-economic",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        {/* Sidebar for desktop */}
        <div
          className={`hidden border-r bg-sidebar-gradient md:block ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Shield className="h-5 w-5 text-purple-500" />
                {isSidebarOpen && (
                  <span className="text-transparent bg-clip-text bg-purple-gold-gradient">B-BBEE Nectar</span>
                )}
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <ul className="grid gap-1 px-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        pathname === item.href
                          ? "bg-purple-gold-gradient font-medium text-white hover:text-white"
                          : "text-muted-foreground hover:bg-card-gradient hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {isSidebarOpen && <span>{item.title}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar-gradient">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <span className="text-transparent bg-clip-text bg-purple-gold-gradient">B-BBEE Nectar</span>
                </Link>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="flex-1 overflow-auto py-4">
                <ul className="grid gap-1 px-2">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                          pathname === item.href
                            ? "bg-purple-gold-gradient text-white font-medium hover:text-white"
                            : "text-muted-foreground hover:bg-card-gradient hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
            <div className="flex flex-1 items-center gap-2">
              <form className="hidden md:block md:flex-1 lg:max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-background pl-8 md:w-[300px] lg:w-full"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/profile-image.jpg" alt="Thabo Mabena" />
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Thabo Mabena</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
        <Toaster />
      </div>
    </ToastProvider>
  )
}
