import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter, endBefore, limitToLast, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faSearch,
    faTimes,
    faGraduationCap,
    faInfoCircle,
    faAward,
    faChevronDown,
    faBook,
    faTrophy
} from '@fortawesome/free-solid-svg-icons';

const Universities = () => {
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
    const [hasMore, setHasMore] = useState(true);
    const PAGE_LIMIT = 8;

    // Unified Fetch Function
    const fetchUniversities = async (direction = 'initial') => {
        try {
            if (direction === 'initial') {
                setLoading(true);
            } else {
                setPaging(true);
            }

            let q;
            if (direction === 'next' && lastDoc) {
                q = query(
                    collection(db, 'universities'),
                    orderBy('name', 'asc'),
                    startAfter(lastDoc),
                    limit(PAGE_LIMIT)
                );
            } else if (direction === 'prev' && firstDoc) {
                q = query(
                    collection(db, 'universities'),
                    orderBy('name', 'asc'),
                    endBefore(firstDoc),
                    limitToLast(PAGE_LIMIT)
                );
            } else {
                // Initial or Reset
                q = query(
                    collection(db, 'universities'),
                    orderBy('name', 'asc'),
                    limit(PAGE_LIMIT)
                );
            }

            const querySnapshot = await getDocs(q);
            const universitiesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Track docs for pagination
            if (querySnapshot.docs.length > 0) {
                setFirstDoc(querySnapshot.docs[0]);
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
                setUniversities(universitiesData);
                setFilteredUniversities(universitiesData);

                // Check if there's potentially more (only for 'initial' and 'next')
                if (universitiesData.length < PAGE_LIMIT) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } else {
                if (direction === 'initial') {
                    setUniversities([]);
                    setFilteredUniversities([]);
                }
                setHasMore(false);
            }

            setLoading(false);
            setPaging(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error fetching universities:', error);
            setLoading(false);
            setPaging(false);
        }
    };

    // Fetch Total Count
    const fetchTotalCount = async () => {
        try {
            const coll = collection(db, 'universities');
            const snapshot = await getCountFromServer(coll);
            const count = snapshot.data().count;
            setTotalPages(Math.ceil(count / PAGE_LIMIT));
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

    // Initial Load
    useEffect(() => {
        fetchTotalCount();
        fetchUniversities();
    }, []);

    // Filter universities based on search (Client side still for the current set)
    // Note: To make search global with pagination, we'd need a different approach.
    // However, if searching, we often want to clear pagination and show all matches.
    // For now, let's keep it simple: Search resets to page 1 and fetches all matching names if searchTerm exists.
    useEffect(() => {
        if (!searchTerm) {
            // If search is cleared, reset to first page
            if (page !== 1) {
                setPage(1);
                fetchUniversities();
            }
            return;
        }

        // If searching, we fetch all (since Firestore doesn't support easy global text search with pagination)
        // But to keep it "un-depressing", we only do this if needed.
        const searchUniversities = async () => {
            setLoading(true);
            try {
                // Since we can't do middle-of-word search in Firestore without dedicated tools,
                // we fetch all and filter locally for search, OR just do simple prefix.
                // Fetching all for search is fine if the results are usually small.
                const q = query(collection(db, 'universities'), orderBy('name', 'asc'));
                const querySnapshot = await getDocs(q);
                const all = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const filtered = all.filter(uni =>
                    uni.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredUniversities(filtered);
                setHasMore(false); // Disable pagination during search
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        const timer = setTimeout(() => {
            searchUniversities();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleNext = () => {
        if (hasMore) {
            setPage(prev => prev + 1);
            fetchUniversities('next');
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
            fetchUniversities('prev');
        }
    };

    const openModal = (university) => {
        setSelectedUniversity(university);
        setIsModalOpen(true);
        setActiveAccordion(null); // All closed for start
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUniversity(null);
        setActiveAccordion(null);
        document.body.style.overflow = 'unset'; // Restore scrolling
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Universitetlar
                    </h1>

                    {/* Search Input */}
                    <div className="flex justify-center items-center mb-12">
                        <div className="relative w-full sm:w-96">
                            <input
                                type="text"
                                placeholder="Universitet nomini qidiring..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Universities Grid */}
                <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 transition-opacity duration-300 ${paging ? 'opacity-50' : 'opacity-100'}`}>
                    {filteredUniversities.map((university) => (
                        <div
                            key={university.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100"
                        >
                            {/* University Logo */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-8 flex items-center justify-center h-32 sm:h-48 border-b border-gray-50">
                                <img
                                    src={university.logo}
                                    alt={university.name}
                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            {/* University Info */}
                            <div className="p-3 sm:p-5">
                                <p className="text-[8px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1 sm:mb-2 font-semibold">
                                    UNIVERSITET
                                </p>
                                <h3 className="text-xs sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 leading-tight">
                                    {university.name}
                                </h3>

                                {/* Details Button */}
                                <button
                                    onClick={() => openModal(university)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 shadow-sm hover:shadow-xl active:scale-95 text-[10px] sm:text-base"
                                >
                                    <span>Batafsil</span>
                                    <FontAwesomeIcon icon={faArrowRight} className="hidden sm:block group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {!searchTerm && filteredUniversities.length > 0 && (
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1 || paging}
                                className={`px-6 py-2 rounded-xl border-2 font-bold transition-all ${page === 1 || paging ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:scale-95'}`}
                            >
                                <FontAwesomeIcon icon={faArrowRight} className="rotate-180 mr-2" />
                                Oldingi
                            </button>

                            <div className="flex items-center gap-2">
                                <span className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                                    {page} / {totalPages}
                                </span>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={page >= totalPages || paging}
                                className={`px-6 py-2 rounded-xl border-2 font-bold transition-all ${page >= totalPages || paging ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:scale-95'}`}
                            >
                                Keyingi
                                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 font-medium">Jami {totalPages} sahifa mavjud</p>
                    </div>
                )}

                {/* No Results */}
                {filteredUniversities.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 text-xl font-medium">Hech qanday universitet topilmadi</p>
                    </div>
                )}
            </div>

            {/* University Details Modal */}
            {isModalOpen && selectedUniversity && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div
                        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="relative bg-gray-50 p-6 flex items-center gap-4 border-b">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors"
                            >
                                <FontAwesomeIcon icon={faTimes} size="sm" />
                            </button>

                            <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-sm border shrink-0">
                                <img
                                    src={selectedUniversity.logo}
                                    alt={selectedUniversity.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>

                            <div className="text-gray-900">
                                <p className="text-blue-600 text-[10px] uppercase tracking-widest font-bold mb-0.5">Universitet Ma'lumotlari</p>
                                <h2 className="text-lg sm:text-xl font-black leading-tight line-clamp-2">{selectedUniversity.name}</h2>
                            </div>
                        </div>

                        {/* Modal Content - List Style Accordion */}
                        <div className="flex-1 overflow-y-auto p-2 sm:p-4">
                            <div className="divide-y divide-gray-100">
                                {/* Information Section */}
                                <div className="group">
                                    <button
                                        onClick={() => toggleAccordion('info')}
                                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeAccordion === 'info' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                                                <FontAwesomeIcon icon={faInfoCircle} className="text-sm" />
                                            </div>
                                            <h3 className={`text-sm font-bold tracking-wide transition-colors ${activeAccordion === 'info' ? 'text-gray-900' : 'text-gray-600'}`}>
                                                INFORMATION
                                            </h3>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={`text-[10px] transition-all duration-300 ${activeAccordion === 'info' ? 'rotate-180 text-blue-500' : 'text-gray-300'}`}
                                        />
                                    </button>
                                    {activeAccordion === 'info' && (
                                        <div className="px-16 pb-6 animate-in slide-in-from-top-2 duration-300">
                                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-medium">
                                                {selectedUniversity.information}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Majors Section */}
                                <div className="group">
                                    <button
                                        onClick={() => toggleAccordion('majors')}
                                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeAccordion === 'majors' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                                                <FontAwesomeIcon icon={faBook} className="text-sm" />
                                            </div>
                                            <h3 className={`text-sm font-bold tracking-wide transition-colors ${activeAccordion === 'majors' ? 'text-gray-900' : 'text-gray-600'}`}>
                                                MAJORS
                                            </h3>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={`text-[10px] transition-all duration-300 ${activeAccordion === 'majors' ? 'rotate-180 text-blue-500' : 'text-gray-300'}`}
                                        />
                                    </button>
                                    {activeAccordion === 'majors' && (
                                        <div className="px-16 pb-6 animate-in slide-in-from-top-2 duration-300">
                                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-medium">
                                                {selectedUniversity.majors}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Scholarships Section */}
                                <div className="group">
                                    <button
                                        onClick={() => toggleAccordion('scholarships')}
                                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeAccordion === 'scholarships' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                                                <FontAwesomeIcon icon={faTrophy} className="text-sm" />
                                            </div>
                                            <h3 className={`text-sm font-bold tracking-wide transition-colors ${activeAccordion === 'scholarships' ? 'text-gray-900' : 'text-gray-600'}`}>
                                                SCHOLARSHIPS
                                            </h3>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={`text-[10px] transition-all duration-300 ${activeAccordion === 'scholarships' ? 'rotate-180 text-blue-500' : 'text-gray-300'}`}
                                        />
                                    </button>
                                    {activeAccordion === 'scholarships' && (
                                        <div className="px-16 pb-6 animate-in slide-in-from-top-2 duration-300">
                                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-medium">
                                                {selectedUniversity.scholarships}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-gray-50 border-t flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors shadow-lg active:scale-95"
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
