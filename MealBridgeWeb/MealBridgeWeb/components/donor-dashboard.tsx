"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Plus, MapPin, Package, Utensils } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"
import { SidebarNav } from "./sidebar-nav"

export function DonorDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("User")
  const { t } = useLanguage()

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [])

  const recentDonations = [
    { id: 1, food: "Pizza Slices (20)", date: "2024-01-15", status: "Picked Up", recipient: "Hope Center" },
    { id: 2, food: "Sandwiches (15)", date: "2024-01-14", status: "Claimed", recipient: "City Mission" },
    { id: 3, food: "Salad Bowls (10)", date: "2024-01-13", status: "Available", recipient: "-" },
  ]

  const stats = [
    { label: t("totalDonations"), value: "47", icon: Package },
    { label: t("mealsShared"), value: "623", icon: Utensils },
    { label: t("activeListings"), value: "3", icon: MapPin },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav role="donor" userName={userName} />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("donorDashboard")}</h1>
              <p className="text-sm text-gray-600">{t("manageYourDonations")}</p>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Stats Cards - 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <stat.icon className="w-8 h-8 text-[#681123] mb-2" />
                  <p className="text-3xl font-bold text-[#681123]">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Quick Action Card */}
            <Card
              className="p-6 bg-gradient-to-br from-[#681123] to-[#4A0D1A] text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
              onClick={() => router.push("/donor/create-donation")}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t("createNewDonation")}</h3>
                  <p className="text-white/80 text-sm mt-1">{t("createDonationDesc")}</p>
                </div>
              </div>
            </Card>

            {/* Recent Donations */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t("recentDonations")}</h3>
              <div className="space-y-3">
                {recentDonations.map((donation) => (
                  <Card key={donation.id} className="p-5 hover:shadow-md transition-shadow border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-lg text-gray-900">{donation.food}</p>
                        <p className="text-sm text-gray-600 mt-1">{donation.date}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {t("recipient")}: {donation.recipient}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          donation.status === "Picked Up"
                            ? "bg-green-100 text-green-800"
                            : donation.status === "Claimed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {donation.status === "Picked Up"
                          ? t("pickedUp")
                          : donation.status === "Claimed"
                            ? t("claimed")
                            : t("available")}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
