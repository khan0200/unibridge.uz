import { useState, useEffect } from "react";

/* ── helpers ─────────────────────────────────────────────── */
const extractId = (url) => {
  // shorts
  const shortsMatch = url.match(/shorts\/([A-Za-z0-9_-]+)/);
  if (shortsMatch) return { id: shortsMatch[1], type: "short" };
  // regular watch
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  if (watchMatch) return { id: watchMatch[1], type: "video" };
  return null;
};

const embedUrl = ({ id, type }) => {
  const base = `https://www.youtube.com/embed/${id}`;
  return type === "short"
    ? `${base}?rel=0&modestbranding=1`
    : `${base}?rel=0&modestbranding=1`;
};

const thumbUrl = (id) =>
  `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

/* ── data ────────────────────────────────────────────────── */
const videoLinks = [
  "https://www.youtube.com/watch?v=zDSrC-_kfSw&t=1262s",
  "https://www.youtube.com/watch?v=i8AxpitVS1o",
  "https://www.youtube.com/watch?v=WNLK62MLEr4",
  "https://www.youtube.com/watch?v=wxbIqpFbgVQ",
  "https://www.youtube.com/watch?v=Ja9Qq7eIX3o&t=1s",
];

const shortsLinks = [
  "https://www.youtube.com/shorts/ZzcQKkKtd8A",
  "https://youtube.com/shorts/Me0f-STFrx4?si=M0UPOVDiBLzK9SY3",
  "https://youtube.com/shorts/3BNE0qY9qsQ?si=cI9SEyAu-lq7WD1J",
  "https://youtube.com/shorts/5BVrxDouOMA?si=Lge438Zx6-gCNFuV",
  "https://youtube.com/shorts/6N-zaO9VIxM?si=oNYyq01BzTZp2-F_",
  "https://youtube.com/shorts/zPM5UgYHOko?si=ToUYtzkflLoddN3V",
  "https://youtube.com/shorts/TT47_SHw2CY?si=TmD1eQzkI-l7TsvC",
  "https://youtube.com/shorts/0leNjY-oZ6Q?si=meOlp9h2RIdGIoaA",
  "https://youtube.com/shorts/Gzib1hkoZXQ?si=waGxk9qMezEO7agq",
  "https://youtube.com/shorts/h8Ctb-C1MqA?si=yW8pMxjQkIQxG7TN",
  "https://youtube.com/shorts/iJRKU8em7n4?si=hA612X0ZsMx7e8i0",
  "https://youtube.com/shorts/HQ3GVaWka8g?si=ZVMBeKEbupjy3iLk",
  "https://youtube.com/shorts/-cAYLg9LI1g?si=A_J7NwoDRfpEGKgH",
  "https://youtube.com/shorts/g4eJd03KBD0?si=hfCAfGwk7ymvJQ8G",
  "https://youtube.com/shorts/3cdTY7huv4o?si=fBQVNOvzvYv46W4l",
  "https://youtube.com/shorts/eT7qGVdkB4A?si=R4YipKTxW9hyXtcp",
];

const videos = videoLinks.map(extractId).filter(Boolean);
const shorts = shortsLinks.map(extractId).filter(Boolean);

/* ── Carousel for 16:9 videos ────────────────────────────── */
function VideoCarousel({ items }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const prev = () => { setPlaying(false); setCurrent((c) => (c - 1 + items.length) % items.length); };
  const next = () => { setPlaying(false); setCurrent((c) => (c + 1) % items.length); };
  const go = (i) => { setPlaying(false); setCurrent(i); };

  const item = items[current];

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Main player */}
      <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
        {playing ? (
          <iframe
            key={item.id}
            src={`${embedUrl(item)}&autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
            <img
              src={thumbUrl(item.id)}
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-9 sm:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Counter badge */}
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
              {current + 1} / {items.length}
            </div>
          </div>
        )}

        {/* Prev / Next overlays */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all backdrop-blur-sm z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all backdrop-blur-sm z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2.5 bg-blue-500" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Shorts paginated carousel (4 per page) + modal ─────── */
function ShortsGrid({ items }) {
  const PER_PAGE = 4;
  const totalPages = Math.ceil(items.length / PER_PAGE);

  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(null);

  const pageItems = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <>
      {/* 4-item grid for current page */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {pageItems.map((v, i) => {
          const globalIdx = page * PER_PAGE + i;
          return (
            <button
              key={v.id}
              onClick={() => setModal(v)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
              style={{ paddingBottom: "177.78%" }}
            >
              <img
                src={thumbUrl(v.id)}
                alt={`Short ${globalIdx + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* SHORTS badge */}
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[0.5rem] font-bold px-1.5 py-0.5 rounded">
                SHORTS
              </div>
              {/* Number badge */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                {globalIdx + 1}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={page === 0}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-300 ${
                i === page ? "w-6 h-2.5 bg-red-500" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={page === totalPages - 1}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page counter */}
      <p className="text-center text-sm text-gray-400 mt-2">
        {page + 1} / {totalPages} sahifa
      </p>

      {/* Modal lightbox */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-black"
            style={{ height: "min(90vh, 520px)", aspectRatio: "9/16", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              key={modal.id}
              src={`${embedUrl(modal)}&autoplay=1`}
              title="YouTube Short"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "115%" }}
            />
            <button
              onClick={() => setModal(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-all z-20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Main Videos section ─────────────────────────────────── */
const Videos = () => {
  const [tab, setTab] = useState("videos");

  return (
    <div className="scroll-section section-shell bg-gradient-to-b from-gray-50 to-white" id="videos">
      <div className="layout-container">

        {/* Section header */}
        <div className="section-header text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Bizning{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Videolar
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Koreyada ta'lim hayoti va jarayon haqida haqiqiy videolar
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 gap-1">
            <button
              onClick={() => setTab("videos")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                tab === "videos"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📹 Videolar ({videos.length})
            </button>
            <button
              onClick={() => setTab("shorts")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                tab === "shorts"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🩳 Shorts ({shorts.length})
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          {tab === "videos" ? (
            <VideoCarousel items={videos} />
          ) : (
            <ShortsGrid items={shorts} />
          )}
        </div>

        {/* YouTube channel link */}
        <div className="mt-10 text-center">
          <a
            href="https://www.youtube.com/@unibridgeuz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube kanalimizga obuna bo'ling
          </a>
        </div>

      </div>
    </div>
  );
};

export default Videos;
