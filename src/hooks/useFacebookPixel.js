import {
    useEffect
} from 'react';
import {
    useLocation
} from 'react-router-dom';

/**
 * Hook to automatically track PageView events on route changes for Meta Pixel
 */
const useFacebookPixel = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if fbq is defined (Meta Pixel script loaded)
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'PageView');
        }
    }, [location.pathname, location.search]);
};

export default useFacebookPixel;
