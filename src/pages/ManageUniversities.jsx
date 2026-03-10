import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrash,
    faArrowLeft,
    faSave,
    faTimes,
    faExclamationTriangle,
    faUpload
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ManageUniversities = () => {
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUniversity, setEditingUniversity] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [saving, setSaving] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const [editFormData, setEditFormData] = useState({
        name: '',
        levels: [],
        information: '',
        majors: '',
        scholarships: '',
        logo: ''
    });

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        setLoading(true);
        setStatusMessage({ type: '', text: '' });
        try {
            const querySnapshot = await getDocs(collection(db, 'universities'));
            const universitiesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUniversities(universitiesData);
        } catch (error) {
            console.error('Error fetching universities:', error);
            setStatusMessage({ type: 'error', text: "Universitetlarni yuklashda xatolik yuz berdi." });
        }
        setLoading(false);
    };

    const handleEdit = (university) => {
        setStatusMessage({ type: '', text: '' });
        setEditingUniversity(university);
        setEditFormData({
            name: university.name,
            levels: Array.isArray(university.levels) ? university.levels : (university.level ? [university.level] : []),
            information: university.information || '',
            majors: university.majors || '',
            scholarships: university.scholarships || '',
            logo: university.logo || ''
        });
        setLogoPreview(university.logo || '');
        setLogoFile(null);
    };

    const handleLevelChange = (level) => {
        setEditFormData(prev => {
            const levels = prev.levels.includes(level)
                ? prev.levels.filter(l => l !== level)
                : [...prev.levels, level];
            return { ...prev, levels };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 800000) {
                setStatusMessage({ type: 'error', text: "Rasm hajmi juda katta. Iltimos, 800KB dan kichik rasm yuklang." });
                return;
            }
            setStatusMessage({ type: '', text: '' });
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveEdit = async () => {
        if (editFormData.levels.length === 0) {
            setStatusMessage({ type: 'error', text: "Iltimos, kamida bitta darajani tanlang." });
            return;
        }

        setSaving(true);
        setStatusMessage({ type: '', text: '' });
        try {
            const universityRef = doc(db, 'universities', editingUniversity.id);
            await updateDoc(universityRef, {
                levels: editFormData.levels,
                logo: logoPreview,
                information: editFormData.information,
                majors: editFormData.majors,
                scholarships: editFormData.scholarships,
                updatedAt: serverTimestamp()
            });

            setStatusMessage({ type: 'success', text: "Universitet muvaffaqiyatli yangilandi." });
            setEditingUniversity(null);
            fetchUniversities();
        } catch (error) {
            console.error('Error updating university:', error);
            setStatusMessage({ type: 'error', text: "Universitetni yangilashda xatolik yuz berdi." });
        }
        setSaving(false);
    };

    const handleDelete = async (universityId) => {
        try {
            await deleteDoc(doc(db, 'universities', universityId));
            setStatusMessage({ type: 'success', text: "Universitet o'chirildi." });
            setDeleteConfirm(null);
            fetchUniversities();
        } catch (error) {
            console.error('Error deleting university:', error);
            setStatusMessage({ type: 'error', text: "Universitetni o'chirishda xatolik yuz berdi." });
        }
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/universities')}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Orqaga qaytish
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Universitetlarni boshqarish
                    </h1>
                    <p className="text-gray-600">
                        Universitetlarni tahrirlash va o'chirish
                    </p>
                </div>

                {statusMessage.text && (
                    <div
                        className={`mb-6 rounded-xl border-2 p-4 ${statusMessage.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}
                    >
                        <p className="font-medium">{statusMessage.text}</p>
                    </div>
                )}

                {/* Universities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {universities.map((university) => (
                        <div
                            key={university.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            {/* University Logo */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center h-48 border-b border-gray-50">
                                <img
                                    src={university.logo}
                                    alt={university.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>

                            {/* University Info */}
                            <div className="p-5">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">
                                    UNIVERSITET
                                </p>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                                    {university.name}
                                </h3>

                                {/* Level Badges */}
                                {(university.levels || university.level) && (
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {(Array.isArray(university.levels) ? university.levels : [university.level]).map((level) => (
                                            <span
                                                key={level}
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${level === 'COLLEGE' ? 'bg-green-100 text-green-700' :
                                                    level === 'BACHELOR' ? 'bg-blue-100 text-blue-700' :
                                                        level === 'MASTER E-VISA' ? 'bg-purple-100 text-purple-700' :
                                                            level === 'MASTER NO CERTIFICATE' ? 'bg-orange-100 text-orange-700' :
                                                                level === 'REGIONAL (Telex)' ? 'bg-pink-100 text-pink-700' :
                                                                    level === '1% TOP' ? 'bg-yellow-100 text-yellow-700' :
                                                                        'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {level}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(university)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                        Tahrirlash
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(university)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                        O'chirish
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Universities */}
                {universities.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-xl">Hech qanday universitet topilmadi</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingUniversity && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                        {/* Modal Header */}
                        <div className="p-6 border-b bg-gray-50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Universitetni tahrirlash</h2>
                                <button
                                    onClick={() => setEditingUniversity(null)}
                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-6">
                                {/* University Name (Read-only) */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Universitet nomi
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                                    />
                                </div>

                                {/* Choose Levels */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Choose Levels * <span className="text-xs text-gray-500 font-normal">(Select one or more)</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['COLLEGE', 'BACHELOR', 'MASTER E-VISA', 'MASTER NO CERTIFICATE', 'REGIONAL (Telex)', '1% TOP'].map((level) => (
                                            <label
                                                key={level}
                                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${editFormData.levels.includes(level)
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={editFormData.levels.includes(level)}
                                                    onChange={() => handleLevelChange(level)}
                                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                                />
                                                <span className={`font-semibold text-sm ${editFormData.levels.includes(level) ? 'text-blue-700' : 'text-gray-700'
                                                    }`}>
                                                    {level}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Logo Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Logo rasmini yangilash
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50">
                                                <FontAwesomeIcon icon={faUpload} className="text-blue-600" />
                                                <span className="text-gray-700 font-medium">
                                                    {logoFile ? logoFile.name : 'Yangi rasm tanlang'}
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {logoPreview && (
                                        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-2">Logo ko'rinishi:</p>
                                            <img
                                                src={logoPreview}
                                                alt="Logo preview"
                                                className="w-32 h-32 object-contain bg-white rounded-lg border-2 border-gray-200 p-2"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Information */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        INFORMATION
                                    </label>
                                    <textarea
                                        value={editFormData.information}
                                        onChange={(e) => setEditFormData({ ...editFormData, information: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {/* Majors */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        MAJORS
                                    </label>
                                    <textarea
                                        value={editFormData.majors}
                                        onChange={(e) => setEditFormData({ ...editFormData, majors: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {/* Scholarships */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        SCHOLARSHIPS OPPORTUNITIES
                                    </label>
                                    <textarea
                                        value={editFormData.scholarships}
                                        onChange={(e) => setEditFormData({ ...editFormData, scholarships: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                            <button
                                onClick={() => setEditingUniversity(null)}
                                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={saving}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saqlanmoqda...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSave} />
                                        Saqlash
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                Universitetni o'chirish
                            </h2>
                            <p className="text-gray-600 text-center mb-6">
                                <strong>{deleteConfirm.name}</strong> universitetini o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi!
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm.id)}
                                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                                >
                                    O'chirish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUniversities;
