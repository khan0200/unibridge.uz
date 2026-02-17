import {
  faInstagram,
  faTelegram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trackButtonClick } from "../../../config/googleSheets";

const socialIcons = [
  { icon: faInstagram, link: "https://www.instagram.com/unibridge_consulting/", platform: 'instagram' },
  { icon: faTelegram, link: "https://t.me/unibridge_consulting", platform: 'telegram' },
  { icon: faYoutube, link: "https://www.youtube.com/@UnibridgeKoreya", platform: 'youtube' },
];

const SocialMedia = () => {
  return (
    <div className="flex items-center gap-3">
      {socialIcons.map((item, index) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1"
          key={index}
          onClick={() => trackButtonClick(`social_${item.platform}`, 'contact_section')}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className="text-lg"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
