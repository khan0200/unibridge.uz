import { useState } from 'react';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddUniversity = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        levels: [], // Changed from 'level' to 'levels' array
        information: '',
        majors: '',
        scholarships: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'name' ? value.toUpperCase() : value
        }));
    };

    const handleLevelChange = (level) => {
        setFormData(prev => {
            const levels = prev.levels.includes(level)
                ? prev.levels.filter(l => l !== level)
                : [...prev.levels, level];
            return { ...prev, levels };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 800000) { // Check for ~800KB to stay safe within 1MB Firestore limit
                setErrorMessage("Rasm hajmi juda katta. Iltimos, 800KB dan kichik rasm yuklang.");
                return;
            }
            setErrorMessage('');
            setLogoFile(file);
            // Create preview and convert to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccess(false);

        if (!logoPreview) {
            setErrorMessage("Iltimos, universitet logosini yuklang.");
            return;
        }

        if (formData.levels.length === 0) {
            setErrorMessage("Iltimos, kamida bitta darajani tanlang.");
            return;
        }

        setLoading(true);

        try {
            // Use university name as document ID
            await setDoc(doc(db, 'universities', formData.name), {
                name: formData.name,
                levels: formData.levels, // Save array of levels
                logo: logoPreview, // Save Base64 string directly
                information: formData.information,
                majors: formData.majors,
                scholarships: formData.scholarships,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            setSuccess(true);

            // Reset form
            setFormData({
                name: '',
                levels: [],
                information: '',
                majors: '',
                scholarships: ''
            });

            // Reset file states
            setLogoFile(null);
            setLogoPreview('');

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        } catch (error) {
            console.error('Error adding university:', error);
            setErrorMessage("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
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
                        Universitet qo'shish
                    </h1>
                    <p className="text-gray-600">
                        Yangi universitet ma'lumotlarini kiriting
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} className="text-white" />
                        </div>
                        <p className="text-green-800 font-semibold">
                            Universitet muvaffaqiyatli qo'shildi!
                        </p>
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4">
                        <p className="text-red-700 font-medium">{errorMessage}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="space-y-6">
                        {/* University Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Universitet nomi *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Masalan: Seoul National University"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
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
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.levels.includes(level)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.levels.includes(level)}
                                            onChange={() => handleLevelChange(level)}
                                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className={`font-semibold text-sm ${formData.levels.includes(level) ? 'text-blue-700' : 'text-gray-700'
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
                                Logo rasmini yuklang *
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer">
                                    <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50">
                                        <FontAwesomeIcon icon={faUpload} className="text-blue-600" />
                                        <span className="text-gray-700 font-medium">
                                            {logoFile ? logoFile.name : 'Rasm tanlang'}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required={!logoPreview}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Logo Preview */}
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
                                INFORMATION *
                            </label>
                            <textarea
                                name="information"
                                value={formData.information}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Universitet haqida umumiy ma'lumot..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Majors */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                MAJORS *
                            </label>
                            <textarea
                                name="majors"
                                value={formData.majors}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Mavjud yo'nalishlar (bakalavr, magistratura)..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Scholarships */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                SCHOLARSHIPS OPPORTUNITIES *
                            </label>
                            <textarea
                                name="scholarships"
                                value={formData.scholarships}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Grantlar va stipendiyalar haqida ma'lumot..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saqlanmoqda...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPlus} />
                                        Universitet qo'shish
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-900 mb-2">Maslahat</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>- Logo rasmini kompyuteringizdan yuklang (800KB dan kichik)</li>
                        <li>- Universitet nomi avtomatik ravishda KATTA HARFLARDA saqlanadi</li>
                        <li>- Ma\'lumotlarni aniq va batafsil kiriting</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddUniversity;

