import { useEffect, useMemo, useState } from "react";
import advisorsData from "@/data/Advisors.json";

type Advisor = {
  name: string;
  desc: string;
  image: string;
  poster?: string;
};

const advisorImages = import.meta.glob("../img/Advisors/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const resolveAdvisorImage = (image: string): string => {
  const cleaned = image
    .replace(/^\/img\/Indicators\//i, "")
    .replace(/^\/advisors\//i, "")
    .replace(/^\//, "");

  const key = `../img/Advisors/${cleaned}`;
  return (advisorImages[key] as string | undefined) ?? image;
};

const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
};

const Advisors = () => {
  const [search, setSearch] = useState("");
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [page] = useState(1);

  useEffect(() => {
    setAdvisors(advisorsData as Advisor[]);
    window.scrollTo(0, 0);
  }, []);

  const filteredAdvisors = useMemo(
    () =>
      advisors.filter((advisor) =>
        advisor.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, advisors]
  );

  const openModal = (index: number) => {
    setModalIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIndex(null);
    document.body.style.removeProperty("overflow");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] pt-24 pb-16 text-white">
      {/* Decorative blurred blobs matching Devices page */}
      <div className="relative">
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-teal-500 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500 blur-[160px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="text-center space-y-6 mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.24em] text-purple-200">
              Advisors
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-teal-200 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
                Our Advisors
              </h1>

              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                Explore the leaders guiding ShakthiSAT with experience across space, innovation, policy, and education.
              </p>
            </div>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-fuchsia-400 to-teal-400 rounded-full" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_100px_-45px_rgba(0,0,0,0.8)] p-6 sm:p-8 mb-10">
            <div className="mb-6 max-w-md mx-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search advisors..."
                className="w-full px-4 py-3 rounded-full bg-black/20 text-white placeholder-white/60 border border-white/5 focus:outline-none focus:ring-0 focus:border-teal-300/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAdvisors.map((advisor, index) => (
                <div key={advisor.name} className="relative group">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-teal-400/20" />

                  <div className="relative bg-black/40 p-6 rounded-2xl border border-white/10 shadow-lg group-hover:border-teal-300/40 transition-colors duration-300 h-full flex flex-col">
                    <div className="w-full flex-shrink-0 mb-4 rounded-lg overflow-hidden border border-white/5 h-48">
                      <img
                        src={resolveAdvisorImage(advisor.image)}
                        alt={advisor.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between text-center md:text-left">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{advisor.name}</h3>
                        <p className="text-sm text-white/80 leading-relaxed">{truncateText(advisor.desc, 180)}</p>
                      </div>

                      <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
                        <button onClick={() => openModal(index)} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-400 rounded-full text-white font-semibold hover:shadow-lg transition">
                          View Details
                        </button>

                        <button onClick={() => openModal(index)} className="px-3 py-2 border border-white/10 rounded-full text-white/80 text-sm hover:text-white transition">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal matching Devices style */}
      {modalIndex !== null && filteredAdvisors[modalIndex] && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-black border border-white/10 text-white rounded-2xl max-w-2xl w-full p-6 relative shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-white/60 hover:text-white transition" aria-label="Close advisor details">×</button>

            <div className="w-full h-[55vh] sm:h-[500px] overflow-y-auto">
              <img
                src={filteredAdvisors[modalIndex].poster ? filteredAdvisors[modalIndex].poster : filteredAdvisors[modalIndex].image}
                alt={filteredAdvisors[modalIndex].name}
                className="object-contain w-full h-full rounded-md"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      )}
    </main>
  );
};

export default Advisors;