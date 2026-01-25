import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import advisorsData from "@/data/Advisors.json";

type Advisor = {
  name: string;
  image: string;
  desc: string;
  poster: string;
};

const advisorImages = import.meta.glob("../img/Advisors/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const resolveAdvisorImage = (image: string): string => {
  const cleaned = image
    .replace(/^\/?img\/?Advisors\//i, "")
    .replace(/^\/?images\//i, "")
    .replace(/^\//, "");

  const key = `../img/Advisors/${cleaned}`;
  return (advisorImages[key] as string | undefined) ?? image;
};

const Advisors = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Advisor | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const advisors = useMemo(
    () =>
      (advisorsData as Advisor[]).map((advisor) => ({
        ...advisor,
        image: resolveAdvisorImage(advisor.image),
      })),
    []
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return advisors.filter((advisor) =>
      advisor.name.toLowerCase().includes(term)
    );
  }, [advisors, search]);

  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(
    () => filtered.slice((page - 1) * perPage, page * perPage),
    [filtered, page]
  );

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-purple-700 blur-[120px]" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-teal-500 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.24em] text-purple-200">
            Advisors
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-teal-200 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
            ShakthiSAT Advisors
          </h1>

          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Meet the mentors guiding the next generation of global changemakers.
          </p>

          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-fuchsia-400 to-teal-400 rounded-full" />
        </div>

        {/* Search */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_100px_-45px_rgba(0,0,0,0.8)] p-6 sm:p-8">
          <div className="mb-10">
            <div className="flex justify-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search advisors..."
                className="w-full max-w-md px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-300/50 focus:ring-1 focus:ring-teal-400/20 transition"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {paginated.map((advisor, index) => (
              <motion.div
                key={`${advisor.name}-${index}`}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-teal-400/20" />
                <div className="relative bg-black/40 p-6 rounded-2xl border border-white/10 shadow-lg group-hover:border-teal-300/40 transition-colors duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative mx-auto w-48 h-48 rounded-2xl border border-white/20 overflow-hidden bg-black/60 mb-6">
                    <img
                      src={advisor.image}
                      alt={advisor.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-center mb-auto text-white">
                    {advisor.name}
                  </h3>

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setSelected(advisor)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-teal-400 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 border-t border-white/10 pt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-full hover:border-teal-300/50 hover:bg-white/10 disabled:opacity-40 transition"
              >
                Prev
              </button>
              <span className="px-4 py-2 text-white/70">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-full hover:border-teal-300/50 hover:bg-white/10 disabled:opacity-40 transition"
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black border border-white/10 text-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/20 flex-shrink-0">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
              </div>

              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                {selected.desc}
              </p>

              {selected.poster && (
                <a
                  href={selected.poster}
                  target="_blank"
                  className="inline-block mt-4 text-teal-300 underline"
                >
                  View Poster
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Advisors;
