import { useEffect, useMemo } from "react";

type PartnerLogo = {
  id: number;
  logo: string;
  alt: string;
};

const partnerImages = import.meta.glob("../img/Partners/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const Partners = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const partners: PartnerLogo[] = useMemo(() => {
    const entries = Object.entries(partnerImages).sort(([a], [b]) => a.localeCompare(b));

    return entries.map(([path, logo], index) => {
      const filename = path.split("/").pop() ?? `partner-${index + 1}`;
      const readableName = filename
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return {
        id: index + 1,
        logo: logo as string,
        alt: readableName ? `${readableName} logo` : `Partner ${index + 1} logo`,
      };
    });
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-purple-700 blur-[120px]" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-teal-500 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
        <div className="text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.24em] text-purple-200">
            Partners
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-teal-200 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
              Powering ShakthiSAT Together
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              A constellation of space agencies, innovators, and educators joining forces to bring ShakthiSAT to life.
            </p>
          </div>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-fuchsia-400 to-teal-400 rounded-full" />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_100px_-45px_rgba(0,0,0,0.8)] p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="relative group aspect-video rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-teal-400/20" />
                <div className="absolute inset-0 rounded-2xl border border-purple-400/20 group-hover:border-teal-300/40 transition-colors duration-300" />
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="relative z-10 max-w-[70%] max-h-[70%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Partners;