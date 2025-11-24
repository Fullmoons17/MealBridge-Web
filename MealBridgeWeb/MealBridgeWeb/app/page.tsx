"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Utensils, HandHeart, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#681123] to-[#4A0D1A] text-white">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-8 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-8 max-w-3xl">
          <Image src="/mealbridge-logo.png" alt="MealBridge Logo" width={160} height={160} className="mx-auto" />

          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">{t("landingTitle")}</h1>

          <p className="text-lg md:text-xl text-white/90 text-balance leading-relaxed">{t("landingSubtitle")}</p>

          <p className="text-base md:text-lg text-white/80">{t("landingDescription")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#681123] hover:bg-white/90 px-8 h-12 text-base font-semibold"
            >
              <Link href="/register">{t("getStarted")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 bg-transparent h-12 text-base font-semibold"
            >
              <Link href="/login">{t("login")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <Utensils className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">{t("donorRole")}</h3>
              <p className="text-white/80 leading-relaxed">{t("donorDesc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <HandHeart className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">{t("recipientRole")}</h3>
              <p className="text-white/80 leading-relaxed">{t("recipientDesc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <BarChart3 className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">{t("adminRole")}</h3>
              <p className="text-white/80 leading-relaxed">{t("adminDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
