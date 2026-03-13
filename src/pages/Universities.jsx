import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getUniversityLogo } from "../utils/universityLogos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSearch,
  faTimes,
  faInfoCircle,
  faChevronDown,
  faBook,
  faTrophy,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const Universities = () => {
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Pagination state
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_LIMIT = 8;

  // Unified Fetch Function
  const fetchUniversities = async (direction = "initial") => {
    try {
      if (direction === "initial") {
        setLoading(true);
      } else {
        setPaging(true);
      }

      let q;
      if (direction === "next" && lastDoc) {
        q = query(
          collection(db, "universities"),
          orderBy("name", "asc"),
          startAfter(lastDoc),
          limit(PAGE_LIMIT),
        );
      } else if (direction === "prev" && firstDoc) {
        q = query(
          collection(db, "universities"),
          orderBy("name", "asc"),
          endBefore(firstDoc),
          limitToLast(PAGE_LIMIT),
        );
      } else {
        // Initial or Reset
        q = query(
          collection(db, "universities"),
          orderBy("name", "asc"),
          limit(PAGE_LIMIT),
        );
      }

      const querySnapshot = await getDocs(q);
      const universitiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Track docs for pagination
      if (querySnapshot.docs.length > 0) {
        setFirstDoc(querySnapshot.docs[0]);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setFilteredUniversities(universitiesData);

        // Check if there's potentially more (only for 'initial' and 'next')
        if (universitiesData.length < PAGE_LIMIT) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        if (direction === "initial") {
          setFilteredUniversities([]);
        }
        setHasMore(false);
      }

      setLoading(false);
      setPaging(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching universities:", error);
      setLoading(false);
      setPaging(false);
    }
  };

  // Fetch Total Count
  const fetchTotalCount = async () => {
    try {
      const coll = collection(db, "universities");
      const snapshot = await getCountFromServer(coll);
      const count = snapshot.data().count;
      setTotalUniversities(count);
      setTotalPages(Math.ceil(count / PAGE_LIMIT));
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchTotalCount();
    fetchUniversities();
  }, []);

  // Auto-reset when search is cleared
  useEffect(() => {
    if (searchTerm === "" && activeSearchTerm !== "" && !selectedLevel) {
      // Search was cleared and no level filter, reset to paginated view
      setActiveSearchTerm("");
      setPage(1);
      fetchUniversities();
    }
  }, [searchTerm, activeSearchTerm, selectedLevel]);

  // Auto-search when level filter changes
  useEffect(() => {
    handleSearch();
  }, [selectedLevel]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Manual search function
  const handleSearch = async () => {
    if (!searchTerm.trim() && !selectedLevel) {
      // If search is empty and no level selected, reset to paginated view
      setActiveSearchTerm("");
      setPage(1);
      fetchUniversities();
      return;
    }

    setActiveSearchTerm(searchTerm);
    setLoading(true);
    try {
      const q = query(collection(db, "universities"), orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      const all = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let filtered = all;

      // Filter by search term
      if (searchTerm.trim()) {
        filtered = filtered.filter((uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      // Filter by level
      if (selectedLevel) {
        filtered = filtered.filter((uni) => {
          // Support both old format (single level) and new format (array of levels)
          if (Array.isArray(uni.levels)) {
            return uni.levels.includes(selectedLevel);
          } else if (uni.level) {
            return uni.level === selectedLevel;
          }
          return false;
        });
      }

      setFilteredUniversities(filtered);
      setHasMore(false); // Disable pagination during search
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Handle Enter key press in search input
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleNext = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
      fetchUniversities("next");
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      fetchUniversities("prev");
    }
  };

  const openModal = (university) => {
    setSelectedUniversity(university);
    setIsModalOpen(true);
    setActiveAccordion(null); // All closed for start
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUniversity(null);
    setActiveAccordion(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-shell bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="layout-container relative">
        {/* Header */}
        <div className="text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 drop-shadow-sm">
            Universitetlar
          </h1>

          {/* Search Input and Filter */}
          <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-3">
            {/* Search Bar — full width on mobile, fixed width on sm+ */}
            <div className="relative w-full sm:w-96 group">
              <input
                type="text"
                placeholder="Universitet nomini qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="w-full px-4 py-4 pl-12 pr-14 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-all shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2.5 rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} className="text-base" />
              </button>
            </div>

            {/* Level Filter — full width on mobile, auto on sm+ */}
            <div className="relative group w-full sm:w-auto">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none w-full sm:w-auto px-4 py-4 pl-11 pr-10 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-all shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm font-medium text-gray-700 cursor-pointer sm:min-w-[180px]"
              >
                <option value="">All Levels</option>
                <option value="COLLEGE">COLLEGE</option>
                <option value="BACHELOR">BACHELOR</option>
                <option value="MASTER E-VISA">MASTER E-VISA</option>
                <option value="MASTER NO CERTIFICATE">
                  MASTER NO CERTIFICATE
                </option>
                <option value="REGIONAL (Telex)">REGIONAL (Telex)</option>
                <option value="1% TOP">1% TOP</option>
              </select>
              <FontAwesomeIcon
                icon={faFilter}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Small Ghost Text Above Grid */}
        <div className="flex justify-start mb-6 px-1 relative z-10">
          <span className="text-sm sm:text-lg font-bold text-blue-500/40 italic tracking-tight select-none">
            {activeSearchTerm || selectedLevel
              ? filteredUniversities.length
              : totalUniversities}{" "}
            universitetlar
          </span>
        </div>

        {/* Universities Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 transition-opacity duration-300 relative z-10 ${paging ? "opacity-50" : "opacity-100"}`}
        >
          {filteredUniversities.map((university) => (
            <div
              key={university.id}
              className="surface-card overflow-hidden group hover:-translate-y-1 flex flex-col"
            >
              {/* University Logo */}
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center h-32 sm:h-48 border-b border-gray-100 overflow-hidden">
                {/* Hover accent stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-4 sm:p-8 w-full h-full flex items-center justify-center">
                  <img
                    src={getUniversityLogo(university.name) || university.logo}
                    alt={university.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                  />
                </div>
              </div>

              {/* University Info */}
              <div className="p-3 sm:p-5 flex flex-col flex-1 gap-2.5">
                <div className="flex-1">
                  <p className="text-[9px] sm:text-[10px] text-blue-500 uppercase tracking-widest font-bold mb-1">
                    UNIVERSITET
                  </p>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-3">
                    {university.name}
                  </h3>
                </div>

                {/* Level Badges */}
                {(university.levels || university.level) && (
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(university.levels)
                      ? university.levels
                      : [university.level]
                    ).map((level) => (
                      <span
                        key={level}
                        className={`inline-block px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wide ${
                          level === "COLLEGE"
                            ? "bg-green-100 text-green-700"
                            : level === "BACHELOR"
                              ? "bg-blue-100 text-blue-700"
                              : level === "MASTER E-VISA"
                                ? "bg-purple-100 text-purple-700"
                                : level === "MASTER NO CERTIFICATE"
                                  ? "bg-orange-100 text-orange-700"
                                  : level === "REGIONAL (Telex)"
                                    ? "bg-pink-100 text-pink-700"
                                    : level === "1% TOP"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                )}

                {/* Details Button — always readable on mobile */}
                <button
                  onClick={() => openModal(university)}
                  className="w-full btn-cta py-2.5 px-4 text-sm"
                >
                  <span>Batafsil</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {!activeSearchTerm && !selectedLevel && filteredUniversities.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-2 sm:gap-4 relative z-10">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <button
                onClick={handlePrev}
                disabled={page === 1 || paging}
                className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 font-bold text-xs sm:text-base transition-all ${page === 1 || paging ? "border-gray-100 text-gray-300 cursor-not-allowed" : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:scale-95"}`}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="rotate-180 mr-1 sm:mr-2 text-xs sm:text-sm"
                />
                Oldingi
              </button>

              <div className="flex items-center gap-2">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs sm:text-base">
                  {page} / {totalPages}
                </span>
              </div>

              <button
                onClick={handleNext}
                disabled={page >= totalPages || paging}
                className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 font-bold text-xs sm:text-base transition-all ${page >= totalPages || paging ? "border-gray-100 text-gray-300 cursor-not-allowed" : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:scale-95"}`}
              >
                Keyingi
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-1 sm:ml-2 text-xs sm:text-sm"
                />
              </button>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Jami {totalPages} sahifa mavjud
            </p>
          </div>
        )}

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 text-2xl"
              />
            </div>
            <p className="text-gray-500 text-xl font-medium">
              Hech qanday universitet topilmadi
            </p>
          </div>
        )}
      </div>

      {/* University Details Modal */}
      {isModalOpen && selectedUniversity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gray-50 p-3 sm:p-6 flex items-center gap-2 sm:gap-4 border-b">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-xs sm:text-sm"
                />
              </button>

              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex items-center justify-center shadow-sm border shrink-0">
                <img
                  src={selectedUniversity.logo}
                  alt={selectedUniversity.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="text-gray-900 pr-6 sm:pr-0">
                <p className="text-blue-600 text-[8px] sm:text-[10px] uppercase tracking-widest font-bold mb-0.5">
                  Universitet Ma'lumotlari
                </p>
                <h2 className="text-sm sm:text-lg md:text-xl font-black leading-tight line-clamp-2">
                  {selectedUniversity.name}
                </h2>
              </div>
            </div>

            {/* Modal Content - List Style Accordion */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4">
              <div className="divide-y divide-gray-100">
                {/* Information Section */}
                <div className="group">
                  <button
                    onClick={() => toggleAccordion("info")}
                    className="w-full flex items-center justify-between p-2.5 sm:p-4 hover:bg-gray-50 transition-colors rounded-lg sm:rounded-xl"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${activeAccordion === "info" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"}`}
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <h3
                        className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${activeAccordion === "info" ? "text-gray-900" : "text-gray-600"}`}
                      >
                        INFORMATION
                      </h3>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[8px] sm:text-[10px] transition-all duration-300 ${activeAccordion === "info" ? "rotate-180 text-blue-500" : "text-gray-300"}`}
                    />
                  </button>
                  {activeAccordion === "info" && (
                    <div className="px-8 sm:px-16 pb-4 sm:pb-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[11px] sm:text-xs md:text-sm font-medium">
                        {selectedUniversity.information}
                      </p>
                    </div>
                  )}
                </div>

                {/* Majors Section */}
                <div className="group">
                  <button
                    onClick={() => toggleAccordion("majors")}
                    className="w-full flex items-center justify-between p-2.5 sm:p-4 hover:bg-gray-50 transition-colors rounded-lg sm:rounded-xl"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${activeAccordion === "majors" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"}`}
                      >
                        <FontAwesomeIcon
                          icon={faBook}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <h3
                        className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${activeAccordion === "majors" ? "text-gray-900" : "text-gray-600"}`}
                      >
                        MAJORS
                      </h3>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[8px] sm:text-[10px] transition-all duration-300 ${activeAccordion === "majors" ? "rotate-180 text-blue-500" : "text-gray-300"}`}
                    />
                  </button>
                  {activeAccordion === "majors" && (
                    <div className="px-8 sm:px-16 pb-4 sm:pb-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[11px] sm:text-xs md:text-sm font-medium">
                        {selectedUniversity.majors}
                      </p>
                    </div>
                  )}
                </div>

                {/* Scholarships Section */}
                <div className="group">
                  <button
                    onClick={() => toggleAccordion("scholarships")}
                    className="w-full flex items-center justify-between p-2.5 sm:p-4 hover:bg-gray-50 transition-colors rounded-lg sm:rounded-xl"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${activeAccordion === "scholarships" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"}`}
                      >
                        <FontAwesomeIcon
                          icon={faTrophy}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <h3
                        className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${activeAccordion === "scholarships" ? "text-gray-900" : "text-gray-600"}`}
                      >
                        SCHOLARSHIPS
                      </h3>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[8px] sm:text-[10px] transition-all duration-300 ${activeAccordion === "scholarships" ? "rotate-180 text-blue-500" : "text-gray-300"}`}
                    />
                  </button>
                  {activeAccordion === "scholarships" && (
                    <div className="px-8 sm:px-16 pb-4 sm:pb-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[11px] sm:text-xs md:text-sm font-medium">
                        {selectedUniversity.scholarships}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gray-900 text-white text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl hover:bg-black transition-colors shadow-lg active:scale-95"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Universities;
