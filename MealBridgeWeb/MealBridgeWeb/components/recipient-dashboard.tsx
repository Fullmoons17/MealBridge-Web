"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Package, Map, List, Filter, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"
import { SidebarNav } from "./sidebar-nav"

interface Donation {
  id: number
  donor: string
  food: string
  foodType: string
  quantity: number
  distance: string
  expiresIn: string
  address: string
  image: string
  lat: number
  lng: number
  donorPhone?: string
  pickupInstructions?: string
  allergens?: string
}

export function RecipientDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("User")
  const [showMap, setShowMap] = useState(false)
  const [showClaimDialog, setShowClaimDialog] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)
  const [pickupAddress, setPickupAddress] = useState("")
  const [pickupNotes, setPickupNotes] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filterFoodType, setFilterFoodType] = useState("all")
  const [sortBy, setSortBy] = useState("nearest")
  const { t } = useLanguage()

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [])

  const availableDonations: Donation[] = [
    {
      id: 1,
      donor: "Pizza Palace",
      food: "Pizza Slices",
      foodType: "prepared",
      quantity: 20,
      distance: "2.3 km",
      expiresIn: "3 hours",
      address: "King Fahd Road, Riyadh",
      image: "/delicious-pizza-slices.jpg",
      lat: 24.7136,
      lng: 46.6753,
      donorPhone: "+966 50 123 4567",
      pickupInstructions: "Please ring the back entrance bell. Available for pickup between 2 PM - 5 PM.",
      allergens: "Wheat, Dairy, Possible traces of nuts",
    },
    {
      id: 2,
      donor: "Green Cafe",
      food: "Salad Bowls",
      foodType: "fresh",
      quantity: 15,
      distance: "4.1 km",
      expiresIn: "2 hours",
      address: "Olaya Street, Riyadh",
      image: "/fresh-green-salad-bowls.jpg",
      lat: 24.7435,
      lng: 46.6621,
      donorPhone: "+966 50 234 5678",
      pickupInstructions: "Come to the main counter and ask for donation pickup.",
      allergens: "None",
    },
    {
      id: 3,
      donor: "Bagel Shop",
      food: "Assorted Bagels",
      foodType: "baked",
      quantity: 30,
      distance: "5.8 km",
      expiresIn: "5 hours",
      address: "Al Malaz, Riyadh",
      image: "/fresh-assorted-bagels.jpg",
      lat: 24.6877,
      lng: 46.7219,
      donorPhone: "+966 50 345 6789",
      pickupInstructions: "Pick up from side door. Staff will assist you with packaging.",
      allergens: "Wheat, Sesame seeds, Eggs",
    },
  ]

  const filteredDonations = availableDonations
    .filter((d) => filterFoodType === "all" || d.foodType === filterFoodType)
    .sort((a, b) => {
      if (sortBy === "nearest") {
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      } else if (sortBy === "expiring") {
        return Number.parseFloat(a.expiresIn) - Number.parseFloat(b.expiresIn)
      }
      return 0
    })

  const claimedDonations = [{ id: 1, donor: "Taco Town", food: "Tacos", quantity: 25, pickupTime: "Today 3:00 PM" }]

  const handleClaimClick = (donation: Donation) => {
    setSelectedDonation(donation)
    setShowClaimDialog(true)
  }

  const handleConfirmClaim = () => {
    console.log("[v0] Claiming donation:", selectedDonation?.id)
    setShowClaimDialog(false)
    setTimeout(() => setShowRatingDialog(true), 500)
    setPickupAddress("")
    setPickupNotes("")
  }

  const handleSubmitRating = () => {
    console.log("[v0] Rating:", rating, "Feedback:", feedback)
    setShowRatingDialog(false)
    setRating(0)
    setFeedback("")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav role="recipient" userName={userName} />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("browseAvailableMeals")}</h1>
              <p className="text-sm text-gray-600">{t("findFoodDonationsNearYou")}</p>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Filter and View Toggle */}
          <div className="flex gap-4 mb-6">
            <Button
              size="lg"
              variant="outline"
              className="px-4 py-2 bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {t("filters")}
            </Button>
            <Button
              size="lg"
              className={`px-6 py-2 ${!showMap ? "bg-[#681123] text-white" : "bg-white text-gray-700 border"}`}
              onClick={() => setShowMap(false)}
            >
              <List className="w-4 h-4 mr-2" />
              {t("listView")}
            </Button>
            <Button
              size="lg"
              className={`px-6 py-2 ${showMap ? "bg-[#681123] text-white" : "bg-white text-gray-700 border"}`}
              onClick={() => setShowMap(true)}
            >
              <Map className="w-4 h-4 mr-2" />
              {t("mapView")}
            </Button>
          </div>

          {showFilters && (
            <Card className="p-6 mb-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{t("filterOptions")}</h3>
                <Button size="sm" variant="ghost" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">{t("foodType")}</Label>
                  <Select value={filterFoodType} onValueChange={setFilterFoodType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allTypes")}</SelectItem>
                      <SelectItem value="prepared">{t("preparedMeals")}</SelectItem>
                      <SelectItem value="fresh">{t("freshProduce")}</SelectItem>
                      <SelectItem value="baked">{t("bakedGoods")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">{t("sortBy")}</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nearest">{t("nearestFirst")}</SelectItem>
                      <SelectItem value="expiring">{t("expiringSoon")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}

          {showMap ? (
            <Card className="p-0 overflow-hidden h-96 lg:h-[600px]">
              {/* Map content */}
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115423.89273249699!2d46.571788!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xa5e87c40a63f3270!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890"
              />
              {/* Donation markers */}
              {/* ... existing markers code ... */}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map((donation) => (
                <Card key={donation.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <img
                    src={donation.image || "/placeholder.svg"}
                    alt={donation.food}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{donation.food}</h4>
                        <p className="text-sm text-gray-600">{donation.donor}</p>
                      </div>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        {donation.expiresIn}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex items-center text-sm text-gray-700">
                        <Package className="w-4 h-4 mr-2 text-[#681123]" />
                        {donation.quantity} {t("servings")}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-[#681123]" />
                        {donation.distance} {t("away")}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-[#681123] hover:bg-[#4A0D1A]"
                      onClick={() => handleClaimClick(donation)}
                    >
                      {t("claimDonation")}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
