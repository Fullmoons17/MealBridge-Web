"use client"

import { Home, Plus, History, User, Package, Search, LogOut, BarChart3 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface SidebarNavProps {
  role: "donor" | "recipient" | "admin"
  userName: string
}

export function SidebarNav({ role, userName }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  const donorNavItems = [
    { icon: Home, label: t("home"), path: "/donor/dashboard" },
    { icon: Plus, label: t("create"), path: "/donor/create-donation" },
    { icon: History, label: t("history"), path: "/donor/history" },
    { icon: User, label: t("account"), path: "/donor/account" },
  ]

  const recipientNavItems = [
    { icon: Search, label: t("browse"), path: "/recipient/dashboard" },
    { icon: Package, label: t("claimed"), path: "/recipient/claimed" },
    { icon: User, label: t("account"), path: "/recipient/account" },
  ]

  const adminNavItems = [
    { icon: BarChart3, label: t("dashboard"), path: "/admin/dashboard" },
    { icon: User, label: t("account"), path: "/admin/account" },
  ]

  const navItems = role === "donor" ? donorNavItems : role === "recipient" ? recipientNavItems : adminNavItems

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#681123] text-white flex flex-col shadow-lg border-r border-[#4A0D1A]">
      {/* Logo Section */}
      <div className="p-6 border-b border-[#4A0D1A]">
        <div className="flex items-center gap-3 mb-2">
          <Image src="/mealbridge-logo.png" alt="MealBridge" width={40} height={40} className="rounded-lg" />
          <h1 className="text-xl font-bold">MealBridge</h1>
        </div>
        <p className="text-sm text-white/80">
          {t("hello")}, {userName}
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                isActive ? "bg-white/20 text-white font-semibold" : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#4A0D1A]">
        <Button
          onClick={() => router.push("/")}
          className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 justify-start gap-3"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">{t("logout")}</span>
        </Button>
      </div>
    </aside>
  )
}
