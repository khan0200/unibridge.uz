import React, { useState, useMemo } from "react";
import Projects from "./Projects";
import UniversityModal from "./UniversityModal";
import { trackUniversityInteraction, trackButtonClick } from "../../config/googleSheets";
import yonsei from "../../assets/images/Yonsei.png";
import korea from "../../assets/images/Korea_University_Global_Symbol.png";
import seoul from "../../assets/images/Seoul National University.png";
import hanyang from "../../assets/images/Hanyang.png";
import kyunghee from "../../assets/images/Kyunghee.png";
import gachon from "../../assets/images/Gachon logo.png";
import kaist from "../../assets/images/KAIST.png";
import inha from "../../assets/images/Inha.png";
import konkuk from "../../assets/images/Konkuk.png";
import skku from "../../assets/images/SKKU.png";
import woosong from "../../assets/images/WOOSONG.png";
import bufs from "../../assets/images/BUFS.png";
import chonnam from "../../assets/images/Chonnam.png";
import chungnam from "../../assets/images/Chungnam University.png";
import daejin from "../../assets/images/Daejin.png";
import dongA from "../../assets/images/Dong A University.png";
import dongEui from "../../assets/images/Dong eui.png";
import dongwon from "../../assets/images/Dongwon Institute of Science and Technology.png";
import farEast from "../../assets/images/Far East.png";
import induk from "../../assets/images/Induk University.png";
import kangwon from "../../assets/images/Kangwon.png";
import kyungpook from "../../assets/images/KyungPook.png";
import pusan from "../../assets/images/Pusan National.png";
import sejong from "../../assets/images/Sejong.png";
import seojeong from "../../assets/images/Seojeong.png";
import solbridge from "../../assets/images/Solbridge.png";
import sunmoon from "../../assets/images/Sunmoon.webp";
import woosuk from "../../assets/images/Woosuk.png";
import keimyung from "../../assets/images/keimyung.jpg";
import mokpo from "../../assets/images/Mokpo.svg";
import daewon from "../../assets/images/DAEWON.svg";
import kunjang from "../../assets/images/KUNJANG.png";

// Application fees for each university
const applicationFees = {
  'Seoul National University': '60,000 KRW',
  'Korea University': '150,000 KRW',
  'Yonsei University': '150,000 KRW',
  'KAIST': '100,000 KRW',
  'Hanyang University': '150,000 KRW',
  'Kyung Hee University': '180,000 KRW',
  'Sungkyunkwan University': '150,000 KRW',
  'Inha University': '100,000 KRW',
  'Konkuk University': '150,000 KRW',
  'Gachon University': '150,000 KRW',
  'Woosong University': '60,000 KRW',
  'Busan University of Foreign Studies': '80,000 KRW',
  'Chonnam National University': '70,000 KRW',
  'Chungnam National University': '60,000 KRW',
  'Daejin University': '100,000 KRW',
  'Dong-A University': '60,000 KRW',
  'Dong-eui University': '60,000 KRW',
  'Dongwon Institute of Science and Technology': '50,000 KRW',
  'Far East University': '0 KRW',
  'Induk University': '50,000 KRW',
  'Kangwon National University': '50,000 KRW',
  'Kyungpook National University': '80,000 KRW',
  'Pusan National University': '80,000 KRW',
  'Sejong University': '120,000 KRW',
  'Seojeong University': 'Xar xil',
  'Solbridge International School of Business': '100,000 KRW',
  'Sun Moon University': '60,000 KRW',
  'Woosuk University': '60,000 KRW',
  'Keimyung University': '75,000 KRW',
  'Mokpo National University': '50,000 KRW',
  'Daewon University College': '40,000 KRW',
  'Kunjang University College': '45,000 KRW'
};

const projectData = [
  {
    id: 1,
    image: seoul,
    category: "UNIVERSITET",
    title: "Seoul National University",
    description: "Janubiy Koreyaning eng nufuzli davlat universiteti. Tibbiyot, muhandislik va biznes sohalarida dunyoga mashhur.",
    ranking: "TOP 30",
    languageReq: "IELTS 6.5 / TOPIK 4",
    interview: "Yes",
    location: "Seoul, South Korea",
    notes: "Highly competitive admission. Most prestigious university in Korea",
    majors: [{ name: "Business Administration", scholarships: { "IELTS 6.5/TOPIK 4": "$0-6000" } }],
    link: "#!",
  },
  {
    id: 2,
    image: yonsei,
    category: "UNIVERSITET",
    title: "Yonsei University",
    description: "Xalqaro ta'lim va tibbiyot sohasida ilg'or dasturlarga ega bo'lgan prestijli universitet.",
    ranking: "TOP 60",
    languageReq: "IELTS 6.5 / TOPIK 4",
    interview: "1-Check up call, 2-Interview",
    location: "Seoul, South Korea",
    notes: "IELTS 6.5+/TOPIK 4+ (0-100%)",
    majors: [
      { name: "Economics", scholarships: { "IELTS 6.5/TOPIK 4": "$0-5800" } },
      { name: "International Studies", scholarships: { "IELTS 6.5/TOPIK 4": "$0-5800" } },
      { name: "Asian Studies", scholarships: { "IELTS 6.5/TOPIK 4": "$0-5800" } },
      { name: "IT Designing (3D)", scholarships: { "IELTS 6.5/TOPIK 4": "$0-5800" } },
      { name: "Nano Science", scholarships: { "IELTS 6.5/TOPIK 4": "$0-5800" } }
    ],
    link: "#!",
  },
  {
    id: 3,
    image: korea,
    category: "UNIVERSITET",
    title: "Korea University",
    description: "Huquq va biznes ta'limi bo'yicha yetakchi xususiy universitet. Kuchli alumni tarmog'iga ega.",
    ranking: "TOP 70",
    languageReq: "IELTS 6.5 / TOPIK 4",
    interview: "No",
    location: "Seoul, South Korea",
    notes: "1%, no KDB, no parents income",
    majors: [
      { name: "International Studies", scholarships: { "IELTS 6.5/TOPIK 4": "$0-5000" } },
      { name: "Global Entertainment", scholarships: { "IELTS 6.5/TOPIK 4": "$0-5000" } }
    ],
    link: "#!",
  },
  {
    id: 4,
    image: kaist,
    category: "UNIVERSITET",
    title: "KAIST",
    description: "Texnologiya va innovatsiyalar bo'yicha Osiyoning yetakchi instituti. IT va muhandislik sohalarida dunyoviy darajada.",
    ranking: "TOP 60",
    languageReq: "IELTS 6.5 / TOPIK 4",
    interview: "No",
    location: "Daejeon, South Korea",
    notes: "Full Scholarship provided, Research-focused institution",
    majors: [
      { name: "Computer Science", scholarships: { "IELTS 6.5/TOPIK 4": "$0-4000" } },
      { name: "Electrical Engineering", scholarships: { "IELTS 6.5/TOPIK 4": "$0-4000" } },
      { name: "Mechanical Engineering", scholarships: { "IELTS 6.5/TOPIK 4": "$0-4000" } },
      { name: "Chemical Engineering", scholarships: { "IELTS 6.5/TOPIK 4": "$0-4000" } }
    ],
    link: "#!",
  },
  {
    id: 5,
    image: hanyang,
    category: "UNIVERSITET",
    title: "Hanyang University",
    description: "Muhandislik va dizayn ta'limi bo'yicha mashhur. Amaliy ko'nikmalar va innovatsiyalarga e'tibor beradi.",
    ranking: "TOP 170",
    languageReq: "IELTS 6.0 / TOPIK 4",
    interview: "Yes",
    location: "Seoul, South Korea",
    notes: "1%, no KDB, no parents income",
    majors: [
      { name: "Business Administration", scholarships: { "IELTS 6.0/TOPIK 4 (30-100%)": "$0-3700", "TOPIK 6 (100%)": "$0" } },
      { name: "Data Science", scholarships: { "IELTS 6.0/TOPIK 4": "$0-3700; $0" } },
      { name: "International Studies", scholarships: { "IELTS 6.0/TOPIK 4": "$0-3700; $0" } }
    ],
    link: "#!"
  },
  {
    id: 6,
    image: kyunghee,
    category: "UNIVERSITET",
    title: "Kyung Hee University",
    description: "Tibbiyot va xalqaro munosabatlar bo'yicha taniqli. Turizm ta'limi ham rivojlangan.",
    ranking: "TOP 300",
    languageReq: "IELTS 6.0 / TOPIK 4",
    interview: "No",
    location: "Seoul, South Korea",
    notes: "Tourism education developed",
    majors: [
      { name: "Business Administration", scholarships: { "IELTS 6.0/TOPIK 4": "$0-3200; $2700; $2200" } },
      { name: "Global Hospitality & Tourism", scholarships: { "IELTS 6.0/TOPIK 4 (30-100%)": "$0-3200", "IELTS 6.5/TOPIK 5 (30-100%)": "$2700", "IELTS 7+/TOPIK 6 (50-100%)": "$2200" } },
      { name: "International Studies", scholarships: { "IELTS 6.0/TOPIK 4 (30-100%)": "$0-3200", "IELTS 6.5/TOPIK 5 (30-100%)": "$2700", "IELTS 7+/TOPIK 6 (50-100%)": "$2200" } },
      { name: "Asian Studies", scholarships: { "IELTS 6.0/TOPIK 4 (30-100%)": "$0-3200", "IELTS 6.5/TOPIK 5 (30-100%)": "$2700", "IELTS 7+/TOPIK 6 (50-100%)": "$2200" } }
    ],
    link: "#!"
  },
  {
    id: 7,
    image: skku,
    category: "UNIVERSITET",
    title: "Sungkyunkwan University",
    description: "Samsung bilan hamkorlikda IT va muhandislik sohalarida ilg'or ta'lim beradi.",
    ranking: "TOP 100",
    languageReq: "IELTS 6.5 / TOPIK 4",
    interview: "No",
    location: "Seoul, South Korea",
    notes: "Partnership with Samsung 1%, no KDB, no parents income",
    majors: [
      { name: "Global Business Administration", scholarships: { "IELTS 6.0/TOPIK 4 (30-100%)": "$0-3000", "IELTS 6.5/TOPIK 5 (30-100%)": "$3000", "IELTS 7+/TOPIK 6 (50-100%)": "$2500 (Spring only)" } },
      { name: "Global Economics", scholarships: { "IELTS 6.5/TOPIK 4": "$0-3200; $2000; $800 (Spring only)" } },
      { name: "Software Engineering", scholarships: { "IELTS 6.5/TOPIK 4": "$0-2400; $2400; $2000" } }
    ],
    link: "#!"
  },
  {
    id: 8,
    image: inha,
    category: "UNIVERSITET",
    title: "Inha University",
    description: "Muhandislik va IT sohalarida kuchli dasturlarga ega. Xalqaro hamkorlik dasturlari rivojlangan.",
    ranking: "TOP 600",
    languageReq: "IELTS 5.5 / TOPIK 3",
    interview: "Yes, math exam included",
    location: "100 Inha-ro, Michuhol-gu, Incheon, South Korea",
    notes: "4 days lesson 1 single week. (Parent income needed for university)",
    majors: [
      { name: "Business Administration", scholarships: { "IELTS 6.0/TOPIK 3": "$0-3000; $2500; $2000" } },
      { name: "ISE (IT)", scholarships: { "IELTS 6.0/TOPIK 3 (30-100%)": "$0-3000", "IELTS 6.5/TOPIK 4 (40-50%)": "$2500", "IELTS 7+/TOPIK 5+ (80%+)": "$2000" } }
    ],
    link: "#!"
  },
  {
    id: 9,
    image: konkuk,
    category: "UNIVERSITET",
    title: "Konkuk University",
    description: "Veterinariya va qishloq xo'jaligi sohalarida ixtisoslashgan. Amaliy tadqiqotlar markazi.",
    ranking: "TOP 600",
    languageReq: "TOPIK 3",
    interview: "Yes",
    location: "120 Neungdong-ro, Gwangjin District, Seoul, South Korea",
    notes: "1%, no KDB, no parents income",
    majors: [
      { name: "International Commerce & Business", scholarships: { "IELTS 5.5/TOPIK 3 (30-100%)": "$0-2800", "IELTS 6.0/TOPIK 4 (40-50%)": "$2300", "IELTS 6.5+/TOPIK 5+ (80%+)": "$1800" } },
      { name: "Computer Software", scholarships: { "IELTS 5.5/TOPIK 3": "$0-2800; $2300; $1800" } }
    ],
    link: "#!"
  },
  {
    id: 10,
    image: gachon,
    category: "UNIVERSITET",
    title: "Gachon University",
    description: "Tibbiyot va IT sohalarida zamonaviy ta'lim dasturlari. Amaliy ko'nikmalar rivojlantirishga e'tibor.",
    ranking: "TOP 600",
    languageReq: "IELTS 6.0 / TOPIK 3",
    interview: "No",
    location: "1342 Seongnam-daero, Sujeong-gu, Seongnam-si, Gyeonggi-do, South Korea",
    notes: "4 days lesson 1 single week, first semester Korean language course",
    majors: [
      { name: "Business Administration", scholarships: { "IELTS 6.0/TOPIK 3 (30-100%)": "$0-2500", "IELTS 6.5/TOPIK 4 (40-50%)": "$2000", "IELTS 7+/TOPIK 5+ (80%+)": "$1500" } },
      { name: "Computer Engineering", scholarships: { "IELTS 6.0/TOPIK 3": "$0-2500; $2000; $1500" } }
    ],
    link: "#!"
  },
  {
    id: 11,
    image: woosong,
    category: "UNIVERSITET",
    title: "Woosong University",
    description: "Xalqaro ta'lim dasturlari va zamonaviy yondashuvlar bilan taniqli universitet.",
    ranking: "Asia Ranking: TOP 450",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "59 Baengnyong-ro, Dong-gu, Daejeon, South Korea",
    notes: "Multilingual education programs",
    majors: [
      { name: "Global Business Administration", scholarship: "Available" },
      { name: "Software Engineering", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 12,
    image: bufs,
    category: "UNIVERSITET",
    title: "Busan University of Foreign Studies",
    description: "Chet tillari va xalqaro munosabatlar sohasida ixtisoslashgan universitet.",
    ranking: "Asia Ranking: TOP 280",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "65 Geumsaem-ro 485 beon-gil, Geumjeong-gu, Busan, South Korea",
    notes: "1-2 days lesson",
    majors: [
      { name: "Business Administration", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 13,
    image: chonnam,
    category: "UNIVERSITET",
    title: "Chonnam National University",
    description: "Janubiy Koreyaning yirik davlat universitetlaridan biri, ko'p sohali ta'lim beradi.",
    ranking: "TOP 900",
    languageReq: "TOPIK: 3",
    interview: "Yes",
    location: "77 Yongbong-ro, Buk-gu, Gwangju, South Korea",
    notes: "4 days lesson",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Computer Science", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 14,
    image: chungnam,
    category: "UNIVERSITET",
    title: "Chungnam National University",
    description: "Daejeon shahrida joylashgan, fan va texnologiya sohasida kuchli davlat universiteti.",
    ranking: "TOP 900",
    languageReq: "IELTS: 6.0 / TOPIK: 3",
    interview: "Yes",
    location: "99 Daehak-ro, Yuseong District, Daejeon, South Korea",
    notes: "4 days lesson, 1%, no KDB, no parents income",
    majors: [
      { name: "International Studies", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 15,
    image: daejin,
    category: "UNIVERSITET",
    title: "Daejin University",
    description: "Pocheon shahrida joylashgan, kichik va samimiy ta'lim muhitini taklif etuvchi universitet.",
    ranking: "Asia Ranking: TOP 365",
    languageReq: "IELTS: 5.5 / TOPIK: 3 / SKA: 321",
    interview: "Yes, exam for SKA holders",
    location: "1007 Hoguk-ro, Pocheon-si, Gyeonggi-do, South Korea",
    notes: "1-2 days lesson a week",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Korean Studies", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 16,
    image: dongA,
    category: "UNIVERSITET",
    title: "Dong-A University",
    description: "Busan shahrida joylashgan, biznes va muhandislik sohasida taniqli universitet.",
    ranking: "Asia Ranking: TOP 450",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "37 Nakdong-daero 550beon-gil, Saha-gu, Busan, South Korea",
    notes: "Multi-disciplinary university",
    majors: [
      { name: "Global Business Administration", scholarship: "Available" },
      { name: "English Language", scholarship: "Available" },
      { name: "Software Engineering", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 17,
    image: dongEui,
    category: "UNIVERSITET",
    title: "Dong-eui University",
    description: "Busan shahrida joylashgan, tibbiyot va sog'liqni saqlash sohasida ixtisoslashgan.",
    ranking: "Asia Ranking: TOP 380",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "176 Eomgwang-ro, Busanjin District, Busan, South Korea",
    notes: "4 days lesson a week",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Global Hospitality", scholarship: "Available" },
      { name: "IT", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 18,
    image: dongwon,
    category: "UNIVERSITET | KOLLEJ",
    title: "Dongwon Institute of Science and Technology",
    description: "Amaliy fanlar va texnologiya sohasida ta'lim beruvchi institut.",

    languageReq: "IELTS: 5.5 / TOPIK: 2 / SKA: 220+",
    interview: "Ha",
    location: "Yangsan, South Gyeongsang",
    notes: "Kasbiy ta'lim",
    majors: [
      { name: "Industry (Kemasozlik, Avtomobilsozlik, Payvandlash)", scholarship: "50% gacha" },
      { name: "Business Administration", scholarship: "30% gacha" },
      { name: "Tourism", scholarship: "40% gacha" }
    ],
    link: "#!"
  },
  {
    id: 19,
    image: farEast,
    category: "UNIVERSITET",
    title: "Far East University",
    description: "Eumseong shahrida joylashgan, zamonaviy ta'lim dasturlari bilan taniqli universitet.",
    ranking: "Korea Ranking: TOP 180",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "Gamgok-myeon, Eumseong County, North Chungcheong Province, South Korea",
    notes: "1-2 days lesson a week",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Hotel Management", scholarship: "Available" },
      { name: "Computer Science & AI", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 20,
    image: induk,
    category: "UNIVERSITET | KOLLEJ",
    title: "Induk University",
    description: "Seulda joylashgan, muhandislik va dizayn sohasida ixtisoslashgan universitet.",

    languageReq: "IELTS: 5.5 / TOPIK: 2 / SKA: 220+",
    interview: "Ha",
    location: "Seoul (Nowon-gu)",
    notes: "Kasbiy ta'lim",
    majors: [
      { name: "Industry (Kemasozlik, Avtomobilsozlik, Payvandlash)", scholarship: "50% gacha" },
      { name: "Business Administration", scholarship: "30% gacha" },
      { name: "Tourism", scholarship: "40% gacha" }
    ],
    link: "#!"
  },
  {
    id: 21,
    image: kangwon,
    category: "UNIVERSITET",
    title: "Kangwon National University",
    description: "Chuncheon shahrida joylashgan, tabiat fanlari va qishloq xo'jaligi sohasida kuchli.",
    ranking: "TOP 1000",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "1 Kangwondaehak-gil, Chuncheon-si, Gangwon-do, South Korea",
    notes: "4 days lesson",
    majors: [
      { name: "Global Business", scholarship: "Available" },
      { name: "Global Media Communication", scholarship: "Available" },
      { name: "Global Performance", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 22,
    image: kyungpook,
    category: "UNIVERSITET",
    title: "Kyungpook National University",
    description: "Daegu shahrida joylashgan, tibbiyot va muhandislik sohasida taniqli davlat universiteti.",
    ranking: "TOP 900",
    languageReq: "TOPIK: 3",
    interview: "Yes",
    location: "80 Daehak-ro, Buk-gu, Daegu, South Korea",
    notes: "4 days lesson, 1%, no KDB, no parents income",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Computer Science", scholarship: "Available" },
      { name: "Economics", scholarship: "Available" },
      { name: "Korean Language & Literature", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 23,
    image: pusan,
    category: "UNIVERSITET",
    title: "Pusan National University",
    description: "Busan shahrining eng yirik davlat universiteti, ko'p sohali ta'lim beradi.",
    ranking: "TOP 500",
    languageReq: "TOPIK: 3",
    interview: "Yes",
    location: "30 Jangjeon-dong, Busan, South Korea",
    notes: "4 days lesson, 1%, no KDB, no parents income",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Computer Science", scholarship: "Available" },
      { name: "Economics", scholarship: "Available" },
      { name: "Korean Language & Literature", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 24,
    image: sejong,
    category: "UNIVERSITET",
    title: "Sejong University",
    description: "Seulda joylashgan, biznes va muhandislik sohasida taniqli xususiy universitet.",
    ranking: "TOP 300",
    languageReq: "IELTS 6.0 / TOPIK 4",
    interview: "1-Check up call, 2-Interview",
    location: "209 Neungdong-ro, Gwangjin District, Seoul, South Korea",
    notes: "4 days lesson in 1 week",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Computer Science", scholarship: "Available" },
      { name: "Hospitality", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 25,
    image: seojeong,
    category: "UNIVERSITET | KOLLEJ",
    title: "Seojeong University",
    description: "Yangju shahrida joylashgan, amaliy fanlar va texnologiya sohasida ta'lim beradi.",

    languageReq: "IELTS: 5.5 / TOPIK: 2 / SKA: 220+",
    interview: "Yo'q",
    location: "Yangju, Gyeonggi",
    notes: "Kasbiy ta'lim",
    majors: [
      { name: "Industry (Kemasozlik, Avtomobilsozlik, Payvandlash)", scholarship: "50% gacha" },
      { name: "Business Administration", scholarship: "30% gacha" },
      { name: "Tourism", scholarship: "40% gacha" }
    ],
    link: "#!"
  },
  {
    id: 26,
    image: solbridge,
    category: "UNIVERSITET",
    title: "Solbridge International School of Business",
    description: "Xalqaro biznes ta'limi sohasida ixtisoslashgan maktab.",
    ranking: "Asia Ranking: TOP 450",
    languageReq: "IELTS 5.5 / TOPIK 3",
    interview: "Yes",
    location: "59 Baengnyong-ro, Dong-gu, Daejeon, South Korea",
    notes: "International business focus",
    majors: [
      { name: "Global Business Administration", scholarship: "Available" },
      { name: "Software Engineering", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 27,
    image: sunmoon,
    category: "UNIVERSITET",
    title: "Sun Moon University",
    description: "Asan shahrida joylashgan, xalqaro dasturlar va zamonaviy yondashuvlar bilan taniqli.",
    ranking: "Asia Ranking: TOP 300",
    languageReq: "IELTS 5.5 / TOPIK 3",
    interview: "Yes",
    location: "70 Sunmoon-ro 221beon-gil, Tangjeong-myeon, Asan-si, Chungcheongnam-do, South Korea",
    notes: "1%, no KDB, no parents income",
    majors: [
      { name: "Business Administration", scholarship: "Available" },
      { name: "Computer Science", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 28,
    image: woosuk,
    category: "UNIVERSITET",
    title: "Woosuk University",
    description: "Wanju shahrida joylashgan, kichik va samimiy ta'lim muhitini taklif etuvchi universitet.",
    ranking: "QS Ranking: 500+",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "490 Hujeong-ri, Samnye-eup, Wanju-gun, North Jeolla Province, South Korea",
    notes: "E viza magistratura",
    majors: [
      { name: "Education and Cultural Content Development", scholarship: "Available" },
      { name: "Business Administration", scholarship: "Available" },
      { name: "Pharmacy", scholarship: "Available" },
      { name: "Pharmaceutical and Cosmetic Engineering", scholarship: "Available" },
      { name: "Computer Science", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 29,
    image: keimyung,
    category: "UNIVERSITET",
    title: "Keimyung University",
    description: "Daegu shahrida joylashgan, tibbiyot va gumanitar fanlar sohasida taniqli universitet.",
    ranking: "Korea Ranking: TOP 43",
    languageReq: "IELTS: 5.5 / TOPIK: 3",
    interview: "Yes",
    location: "1095 Dalgubeol-daero, Sindang-dong, Dalseo District, Daegu, South Korea",
    notes: "1%, no KDB, no parents income",
    majors: [
      { name: "International Business", scholarship: "Available" },
      { name: "International Relations", scholarship: "Available" }
    ],
    link: "#!"
  },
  {
    id: 30,
    image: mokpo,
    category: "UNIVERSITET | KOLLEJ",
    title: "Mokpo National University",
    description: "Mokpo shahrida joylashgan davlat universiteti, dengiz fanlari sohasida kuchli.",

    languageReq: "IELTS: 5.5 / TOPIK: 2 / SKA: 220+",
    interview: "Yo'q",
    location: "Muan, Jeollanam-do",
    notes: "Kasbiy ta'lim",
    majors: [
      { name: "Industry (Kemasozlik, Avtomobilsozlik, Payvandlash)", scholarship: "50% gacha" },
      { name: "Business Administration", scholarship: "30% gacha" },
      { name: "Tourism", scholarship: "40% gacha" }
    ],
    link: "#!"
  },
  {
    id: 31,
    image: daewon,
    category: "UNIVERSITET | KOLLEJ",
    title: "Daewon University College",
    description: "Jecheon shahrida joylashgan, amaliy kasbiy ta'lim beruvchi kollej.",

    languageReq: "IELTS: 5.5 / TOPIK: 2 / SKA: 220+",
    interview: "Yo'q",
    location: "Jecheon, North Chungcheong",
    notes: "Kasbiy ta'lim",
    majors: [
      { name: "Industry (Kemasozlik, Avtomobilsozlik, Payvandlash)", scholarship: "50% gacha" },
      { name: "Business Administration", scholarship: "30% gacha" },
      { name: "Tourism", scholarship: "40% gacha" }
    ],
    link: "#!"
  },
  {
    id: 32,
    image: kunjang,
    category: "UNIVERSITET | KOLLEJ",
    title: "Kunjang University College",
    description: "Gunsan shahrida joylashgan, amaliy kasbiy ta'lim va texnologiya sohasida ixtisoslashgan.",

    languageReq: "IELTS: 5.5 / TOPIK: 2 / SKA: 220+",
    interview: "Ha",
    location: "Gunsan, North Jeolla",
    notes: "Kasbiy ta'lim",
    majors: [
      { name: "Industry (Kemasozlik, Avtomobilsozlik, Payvandlash)", scholarship: "50% gacha" },
      { name: "Business Administration", scholarship: "30% gacha" },
      { name: "Tourism", scholarship: "40% gacha" }
    ],
    link: "#!"
  }
];

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const universitiesPerPage = 8;

  // Custom university order as specified by user
  const universityOrder = [
    // TOP Universities
    "Seoul National University",
    "Yonsei University",
    "Korea University",
    "KAIST",
    "Hanyang University",
    "Kyung Hee University",
    "Sungkyunkwan University",
    "Inha University",
    "Konkuk University",
    "Gachon University",
    // Regular Universities
    "Woosong University",
    "Busan University of Foreign Studies",
    "Chonnam National University",
    "Chungnam National University",
    "Daejin University",
    "Dong-A University",
    "Dong-eui University",
    "Far East University",
    "Kangwon National University",
    "Kyungpook National University",
    "Pusan National University",
    "Sejong University",
    "Solbridge International School of Business",
    "Sun Moon University",
    "Woosuk University",
    "Keimyung University",
    "Mokpo National University",
    // University Colleges
    "Dongwon Institute of Science and Technology",
    "Induk University",
    "Seojeong University",
    "Daewon University College",
    "Kunjang University College"
  ];

  // Helper function to get university order index
  const getUniversityOrderIndex = (title) => {
    const index = universityOrder.indexOf(title);
    return index === -1 ? 999 : index;
  };

  const filteredUniversities = useMemo(() => {
    let filtered = projectData.filter((university) => {
      const matchesSearch = university.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "" ||
        (selectedCategory === "kasbiy" && university.category === "UNIVERSITET | KOLLEJ");

      return matchesSearch && matchesCategory;
    });

    // Sort universities according to custom order
    filtered.sort((a, b) => {
      const orderA = getUniversityOrderIndex(a.title);
      const orderB = getUniversityOrderIndex(b.title);
      return orderA - orderB;
    });

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);
  const startIndex = (currentPage - 1) * universitiesPerPage;
  const endIndex = startIndex + universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const universitetlarElement = document.getElementById('universitetlar');
    if (universitetlarElement) {
      universitetlarElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openModal = (university) => {
    // Track university interaction
    trackUniversityInteraction(university.title, 'modal_open');

    const universityWithFee = {
      ...university,
      applicationFee: applicationFees[university.title] || 'N/A'
    };
    setSelectedUniversity(universityWithFee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUniversity(null);
  };

  return (
    <div
      className="content mt-6 md:mt-8 xl:mt-12 mb-6 md:mb-12 max-xxl:p-2"
      id="universitetlar"
    >
      <div className="xl:mb-17.5 mb-5">
        <div className="max-sm:px-2 text-center mx-auto max-w-144.25">
          <p className="section-title ">Universitetlar</p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8 mt-8">
            {/* Desktop Layout - One Row */}
            <div className="hidden md:flex items-center justify-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Universitet nomini qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="">Barcha universitetlar</option>
                <option value="kasbiy">Kasbiy ta'lim</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Tozalash
              </button>
            </div>

            {/* Mobile Layout - Two Rows */}
            <div className="md:hidden">
              {/* First Row - Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Universitet nomini qidiring..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* Second Row - Filters */}
              <div className="flex gap-2 mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                >
                  <option value="">Barcha universitetlar</option>
                  <option value="kasbiy">Kasbiy ta'lim</option>
                </select>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Tozalash
                </button>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 text-sm text-center">
              {filteredUniversities.length} ta universitet topildi
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {currentUniversities.map((data, index) => (
            <Projects data={data} key={index} onDetailsClick={() => openModal(data)} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container text-center mt-8">
          <nav>
            <div className="flex justify-center items-center space-x-2">
              <button
                className={`px-3 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Oldingi
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    className={`px-3 py-2 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                className={`px-3 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Keyingi
              </button>
            </div>

            <div className="mt-3">
              <small className="text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, filteredUniversities.length)} / {filteredUniversities.length} ta universitet
              </small>
            </div>
          </nav>
        </div>
      )}

      {/* No Results Message */}
      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Hech qanday universitet topilmadi</p>
          <p className="text-gray-400 text-sm mt-2">Qidiruv shartlarini o'zgartirib ko'ring</p>
        </div>
      )}



      {/* University Modal */}
      <UniversityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        university={selectedUniversity}
      />
    </div>
  );
};

export default Portfolio;
