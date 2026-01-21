"use client"

import { useState, useEffect, useMemo, JSX } from "react"
import advisorsData from "@/data/advisors.json"
import Image from "next/image"
import { ContactFooter } from "@/components/contact-footer"

interface Advisor {
  name: string
  desc: string
  image: string
}

export default function AdvisorsPage(): JSX.Element {
  const [search, setSearch] = useState<string>("")
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    setAdvisors(advisorsData as Advisor[])
  }, [])

  const filteredAdvisors = useMemo(
    () =>
      advisors.filter((advisor) =>
        advisor.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, advisors],
  )

  const openModal = (index: number): void => {
    setActiveIndex(index)
    setShowModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = (): void => {
    setShowModal(false)
    setActiveIndex(null)
    document.body.style.overflow = ""
  }

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

const toggleExpand = (index: number): void => {
  setExpandedIndex(expandedIndex === index ? null : index)
}


  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">

        {/* Border Box */}
        <div className="border-2 border-white/30 rounded-xl p-6 sm:p-8">

          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#FFD700] via-[#FF6EC7] to-[#6A4FC8] bg-clip-text text-transparent">
              Our Advisors
            </h1>
          </div>

          {/* Search */}
          <div className="mb-10 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search advisors by name..."
              className="w-full px-4 py-3 rounded-lg bg-[#12152e] text-white border border-[#383c6b]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Responsive Advisors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAdvisors.map((advisor, index) => (
              <div
                key={advisor.name}
                className="flex flex-col md:flex-row gap-6 bg-[#12152e] rounded-xl p-6 shadow-lg hover:shadow-[#6A4FC8]/40 transition"
              >
                {/* Image */}
                <div className="w-full md:w-1/3 h-80 md:h-48 relative rounded-lg overflow-hidden">

                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center w-full md:w-2/3 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-[#FFD700] mb-3">
                    {advisor.name}
                  </h3>

                 <p
  className={`
    text-sm text-[#C0C0C0] leading-relaxed 
    ${expandedIndex === index ? "" : "line-clamp-3"}
  `}
>
  {advisor.desc}
</p>

<button
  className="mt-2 text-[#FF6EC7] text-xs font-semibold underline hover:text-[#FFD700] transition"
  onClick={() => toggleExpand(index)}
>
  {expandedIndex === index ? "Read Less" : "Read More"}
</button>


                  <button
                    type="button"
                    onClick={() => openModal(index)}
                    className="mt-4 inline-block px-4 py-2 rounded-md bg-[#6A4FC8] text-white font-semibold hover:bg-[#8d6bff] transition"
                  >
                    About
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal */}
      {showModal && activeIndex !== null && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-[#12152e] rounded-xl border border-[#6A4FC8]/40 
                       max-w-2xl w-full max-h-[80vh] overflow-hidden p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-3 text-white text-3xl"
            >
              ×
            </button>

            {/* Poster */}
            <div className="relative w-full h-[55vh] sm:h-[500px] overflow-y-auto pt-6">
              <Image
                src={`/adv-posters/${activeIndex + 1}.jpg`}
                alt={filteredAdvisors[activeIndex].name}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>
        </div>
      )}

      <ContactFooter />
    </main>
  )
}
