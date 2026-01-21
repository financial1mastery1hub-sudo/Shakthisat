"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Filter } from "lucide-react"
import ambassadorsData from "@/data/ambassadors.json"
import { ContactFooter } from "@/components/contact-footer"

const getBadgeStyle = (role: string) => {
  switch (role) {
    case "Ambassador":
      return "bg-[#6A0DAD] text-[#FFD700]"
    case "Co-Ambassador":
      return "bg-[#0B6623] text-[#FFD700]"
    case "Tech-Ambassador":
      return "bg-[#8B0000] text-[#FFD700] whitespace-pre-line"
    default:
      return "bg-gray-600 text-white"
  }
}

const formatRoleText = (role: string) => {
  if (role === "Tech-Ambassador") return "Tech\nAmbassador"
  return role
}

const countryCodes: Record<string, string> = { /* unchanged mapping */ }

export default function AmbassadorsPage() {
  const ambassadors = ambassadorsData

  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [selected, setSelected] = useState<any>(null)
  const [page, setPage] = useState(1)

  const perPage = 6

  const filtered = ambassadors.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase())
    const matchesRole =
      roleFilter === "All" || a.ambassadorRole === roleFilter
    return matchesSearch && matchesRole
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27] pt-24 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-6 mb-8">

  {/* Border Box */}
  <div className="border-2 border-white rounded-xl p-8">

    {/* Title */}
    <div className="text-center mb-10">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#9D4EDD] bg-clip-text text-transparent">
        ShakthiSAT Ambassadors
      </h1>
      <p className="text-[#C0C0C0] mt-4">
        Meet the women inspiring the next generation of explorers.
      </p>
    </div>

    {/* Search + Beautiful Filter */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        placeholder="Search ambassadors..."
        className="w-full max-w-md px-4 py-2 rounded-full bg-[#1A1F3A] border border-[#6A4FC8] text-white placeholder-[#C0C0C0] focus:outline-none focus:border-[#00FFFF]"
      />

      {/* BEAUTIFUL ROLE FILTER */}
      <div className="relative">
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value)
            setPage(1)
          }}
          className="appearance-none w-full sm:w-56 px-5 py-2 rounded-full bg-[#1A1F3A] border border-[#9D4EDD] text-[#FFD700] font-semibold shadow-md hover:border-[#00FFFF] transition cursor-pointer focus:outline-none"
        >
          <option value="All">All Roles</option>
          <option value="Ambassador">Ambassador</option>
          <option value="Co-Ambassador">Co-Ambassador</option>
          <option value="Tech-Ambassador">Tech-Ambassador</option>
        </select>

        {/* Icon overlay */}
        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFD700] h-4 w-4 pointer-events-none" />
      </div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {paginated.map((person, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="relative bg-[#1A1F3A]/70 p-6 rounded-2xl border border-[#6A4FC8]/40 shadow-lg"
        >
          {/* Top-Right Badge */}
          <div
            className={`absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-md shadow-md text-center leading-tight ${getBadgeStyle(
              person.ambassadorRole
            )}`}
          >
            {formatRoleText(person.ambassadorRole)}
          </div>

          {/* Image */}
          <div className="relative mx-auto w-48 h-48 rounded-3xl border-2 border-[#00FFFF] overflow-hidden bg-black">
            {person.image ? (
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                No Image
              </div>
            )}
          </div>

          <h3 className="mt-10 text-xl font-semibold text-center">
            {person.name}
          </h3>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setSelected(person)}
              className="px-6 py-2 bg-gradient-to-r from-[#00FFFF] to-[#9D4EDD] rounded-full text-black font-semibold hover:opacity-90 transition"
            >
              Know More
            </button>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-[#1A1F3A] border border-[#6A4FC8] rounded-md hover:border-[#00FFFF] disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-[#C0C0C0]">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-[#1A1F3A] border border-[#6A4FC8] rounded-md hover:border-[#00FFFF] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    )}
  </div>

</div>


      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black rounded-2xl max-w-lg w-full p-6 relative shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#9D4EDD] relative">
                  {selected.image ? (
                    <Image
                      src={selected.image}
                      alt={selected.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">{selected.name}</h2>

                  <span
                    className={`mt-2 inline-block text-xs font-bold px-3 py-1 rounded-md text-center whitespace-pre-line ${getBadgeStyle(
                      selected.ambassadorRole
                    )}`}
                  >
                    {formatRoleText(selected.ambassadorRole)}
                  </span>

                  {countryCodes[selected.country] && (
                    <Image
                      src={`https://flagcdn.com/w40/${countryCodes[
                        selected.country
                      ].toLowerCase()}.png`}
                      alt={selected.country}
                      width={28}
                      height={20}
                      className="rounded-sm border border-black/20 shadow-sm mt-2"
                    />
                  )}
                </div>
              </div>

              <p className="text-gray-800 leading-relaxed">
                {selected.about}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactFooter />
    </main>
  )
}
