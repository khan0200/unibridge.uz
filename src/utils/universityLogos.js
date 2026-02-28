/**
 * Maps Firestore university names (always uppercase) to local static logo paths.
 * Logos live in /public/logos/ and are served directly by Vite / the web server.
 *
 * How it works:
 *   getUniversityLogo(university.name) → '/logos/Inha.png'   (fast, local)
 *   Falls back to university.logo (Firestore Base64) if no local match exists.
 */

const LOGO_MAP = {
    // ── A ──────────────────────────────────────────────────
    'ANYANG UNIVERSITY (ANYANG-SI, SEOUL)': '/logos/ANYANG.svg',
    'ANYANG UNIVERSITY': '/logos/ANYANG.svg',

    // ── B ──────────────────────────────────────────────────
    'BAEKSEOK UNIVERSITY': '/logos/BAEKSEOK.svg',
    'BUFS': '/logos/BUFS.png',
    'BUSAN UNIVERSITY OF FOREIGN STUDIES': '/logos/BUFS.png',

    // ── C ──────────────────────────────────────────────────
    'CHONNAM NATIONAL UNIVERSITY': '/logos/Chonnam.png',
    'CHONNAM': '/logos/Chonnam.png',
    'CHUNG-ANG UNIVERSITY': '/logos/Chung-Ang_University_logo.png',
    'CHUNG ANG UNIVERSITY': '/logos/Chung-Ang_University_logo.png',
    'CHUNGBUK NATIONAL UNIVERSITY': '/logos/CHUNGBUK NATIONAL UNIVERSITY.png',
    'CHUNGCHEONG COLLEGE': '/logos/CHUNGCHEONG COLLEGE.svg',
    'CHUNGNAM NATIONAL UNIVERSITY': '/logos/Chungnam University.png',
    'CHUNGNAM UNIVERSITY': '/logos/Chungnam University.png',

    // ── D ──────────────────────────────────────────────────
    'DAEJIN UNIVERSITY': '/logos/DAEJIN UNIVERSITY.svg',
    'DAEWON UNIVERSITY COLLEGE': '/logos/DAEWON.svg',
    'DAEWON': '/logos/DAEWON.svg',
    'DONG-A UNIVERSITY': '/logos/DONG A UNIVERSITY.svg',
    'DONG A UNIVERSITY': '/logos/DONG A UNIVERSITY.svg',
    'DONG-EUI UNIVERSITY': '/logos/DONG EUI UNIVERSITY (BUSAN).svg',
    'DONG EUI UNIVERSITY': '/logos/DONG EUI UNIVERSITY (BUSAN).svg',
    'DONG EUI UNIVERSITY (BUSAN)': '/logos/DONG EUI UNIVERSITY (BUSAN).svg',
    'DONGWON INSTITUTE OF SCIENCE AND TECHNOLOGY': '/logos/Dongwon Institute of Science and Technology.png',

    // ── E ──────────────────────────────────────────────────
    'EWHA WOMANS UNIVERSITY': '/logos/EWHA WOMANS UNIVERSITY.svg',
    'EWHA WOMAN\'S UNIVERSITY': '/logos/EWHA WOMANS UNIVERSITY.svg',

    // ── F ──────────────────────────────────────────────────
    'FAR EAST UNIVERSITY': '/logos/FAR EAST UNIVERSITY.svg',

    // ── G ──────────────────────────────────────────────────
    'GACHON UNIVERSITY': '/logos/GACHON UNIVERSITY.webp',

    // ── H ──────────────────────────────────────────────────
    'HALLYM UNIVERSITY': '/logos/HALLYM UNIVERSITY.png',
    'HANSUNG UNIVERSITY': '/logos/HANSUNG UNIVERSITY.svg',
    'HANYANG UNIVERSITY': '/logos/HANYANG UNIVERSITY.svg',

    // ── I ──────────────────────────────────────────────────
    'INDUK UNIVERSITY': '/logos/INDUK UNIVERSITY.svg',
    'INHA UNIVERSITY': '/logos/Inha.png',
    'INHA UNIVERSITY (TOP 600)': '/logos/Inha.png',

    // ── J ──────────────────────────────────────────────────
    'JEONBUK NATIONAL UNIVERSITY': '/logos/JEONBUK NATIONAL.png',
    'JOONGBU UNIVERSITY': '/logos/JOONGBU UNIVERSITY.svg',

    // ── K ──────────────────────────────────────────────────
    'KAIST': '/logos/KAIST.png',
    'KANGWON NATIONAL UNIVERSITY': '/logos/Kangwon.png',
    'KEIMYUNG UNIVERSITY': '/logos/KEIMYUNG UNIVERSITY.svg',
    'KONKUK UNIVERSITY': '/logos/Konkuk.png',
    'KOREA AEROSPACE UNIVERSITY': '/logos/KOREA AEROSPACE UNIVERSITY.svg',
    'KOREA UNIVERSITY': '/logos/Korea_University_Global_Symbol.png',
    'KUNJANG UNIVERSITY': '/logos/KUNJANG.png',
    'KUNJANG COLLEGE': '/logos/KUNJANG.png',
    'KYUNGHEE UNIVERSITY': '/logos/Kyunghee.png',
    'KYUNG HEE UNIVERSITY': '/logos/Kyunghee.png',
    'KYUNGPOOK NATIONAL UNIVERSITY': '/logos/KYUNGPOOK NATIONAL UNIVERSITY.svg',
    'KYUNGSUNG UNIVERSITY': '/logos/KYUNGSUNG UNIVERSITY.svg',

    // ── M ──────────────────────────────────────────────────
    'MOKPO NATIONAL UNIVERSITY': '/logos/Mokpo.svg',
    'MOKPO': '/logos/Mokpo.svg',

    // ── N ──────────────────────────────────────────────────
    'NAMSEOUL UNIVERSITY': '/logos/NAMSEOUL UNIVERSITY.svg',

    // ── P ──────────────────────────────────────────────────
    'PUSAN NATIONAL UNIVERSITY': '/logos/Pusan National.png',

    // ── S ──────────────────────────────────────────────────
    'SEJONG UNIVERSITY': '/logos/Sejong.png',
    'SEOJEONG UNIVERSITY': '/logos/Seojeong.png',
    'SEOJEONG COLLEGE': '/logos/Seojeong.png',
    'SEOUL NATIONAL UNIVERSITY': '/logos/SEOUL NATIONAL UNIVERSITY.svg',
    'SEOYEONG UNIVERSITY': '/logos/SEOYEONG UNIVERSITY – COLLEGE.svg',
    'SEOYEONG UNIVERSITY – COLLEGE': '/logos/SEOYEONG UNIVERSITY – COLLEGE.svg',
    'SINGYEONGJU UNIVERSITY': '/logos/SINGYEONGJU UNIVERSITY.png',
    'SUNGKYUNKWAN UNIVERSITY': '/logos/SKKU.png',
    'SKKU': '/logos/SKKU.png',
    'SOLBRIDGE INTERNATIONAL SCHOOL OF BUSINESS': '/logos/Solbridge.png',
    'SOLBRIDGE': '/logos/Solbridge.png',
    'SUNMOON UNIVERSITY': '/logos/Sunmoon.webp',
    'SUN MOON UNIVERSITY': '/logos/Sunmoon.webp',

    // ── T ──────────────────────────────────────────────────
    'TONGMYONG UNIVERSITY': '/logos/TONGMYONG UNIVERSITY.svg',
    'TONGWON UNIVERSITY': '/logos/TONGWON UNIVERSITY.png',

    // ── W ──────────────────────────────────────────────────
    'WOOSONG UNIVERSITY': '/logos/WOOSONG.png',
    'WOOSONG (SOLBRIDGE SCHOOL)': '/logos/WOOSONG (SOLBRIDGE SCHOOL).webp',
    'WOOSUK UNIVERSITY': '/logos/Woosuk.png',

    // ── Y ──────────────────────────────────────────────────
    'YONSEI UNIVERSITY': '/logos/Yonsei.png',
};

/**
 * Returns the local logo path for a given university name,
 * or null if no local logo is mapped.
 *
 * @param {string} name - The university name (as stored in Firestore, usually uppercase)
 * @returns {string|null}
 */
export function getUniversityLogo(name) {
    if (!name) return null;
    const upper = name.trim().toUpperCase();

    // 1. Direct match (exact key in the map, case-insensitive via toUpperCase)
    for (const [key, path] of Object.entries(LOGO_MAP)) {
        if (key.toUpperCase() === upper) return path;
    }

    // 2. Partial / contains match as fallback
    for (const [key, path] of Object.entries(LOGO_MAP)) {
        if (upper.includes(key.toUpperCase()) || key.toUpperCase().includes(upper)) {
            return path;
        }
    }

    return null; // Fall back to Firestore Base64
}
