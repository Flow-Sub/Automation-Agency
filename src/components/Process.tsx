import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

// ============ FIXED ORBITING CIRCLES COMPONENT ============
interface OrbitingCirclesProps {
    children: React.ReactNode;
    radius?: number;
    reverse?: boolean;
    duration?: number;
    iconSize?: number;
}

const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
    children,
    radius = 160,
    reverse = false,
    duration = 20,
    iconSize = 30,
}) => {
    const childArray = React.Children.toArray(children);
    const angleStep = 360 / childArray.length;

    // Responsive adjustments
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768; // Tailwind 'md' breakpoint
    const adjustedRadius = isMobile ? radius / 2 : radius;
    const adjustedIconSize = isMobile ? iconSize / 1.5 : iconSize;

    return (
        <>
            {/* Orbit Path */}
            <div
                className="absolute rounded-full border border-white/10"
                style={{
                    width: adjustedRadius * 2,
                    height: adjustedRadius * 2,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Rotating Container */}
            <div
                className="absolute"
                style={{
                    width: adjustedRadius * 2,
                    height: adjustedRadius * 2,
                    top: '50%',
                    left: '50%',
                    marginLeft: -adjustedRadius,
                    marginTop: -adjustedRadius,
                    animation: `orbit-spin ${duration}s linear infinite`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {childArray.map((child, index) => {
                    const angle = angleStep * index;

                    return (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                width: adjustedIconSize + 16,
                                height: adjustedIconSize + 16,
                                left: '50%',
                                top: '50%',
                                marginLeft: -(adjustedIconSize + 16) / 2,
                                marginTop: -(adjustedIconSize + 16) / 2,
                                transform: `rotate(${angle}deg) translateX(${adjustedRadius}px)`,
                            }}
                        >
                            <div
                                className="w-full h-full flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-transform cursor-pointer hover:border-indigo-500/50"
                                style={{
                                    animation: `orbit-spin ${duration}s linear infinite`,
                                    animationDirection: reverse ? 'normal' : 'reverse',
                                }}
                            >
                                <div style={{ width: adjustedIconSize, height: adjustedIconSize }}>
                                    {child}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};


// ============ APP ICONS ============
const Icons = {
    whatsapp: () => (
        <svg viewBox="0 0 175.216 175.552" className="w-full h-full">
            <defs>
                <linearGradient id="whatsapp-grad" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#57d163" />
                    <stop offset="1" stopColor="#23b33a" />
                </linearGradient>
            </defs>
            <path d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z" fill="url(#whatsapp-grad)" />
            <path d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647" fill="#ffffff" fillRule="evenodd" />
        </svg>
    ),

    notion: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#ffffff" />
            <path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="#000000" fillRule="evenodd" clipRule="evenodd" />
        </svg>
    ),

    openai: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
    ),

    googleDrive: () => (
        <svg viewBox="0 0 87.3 78" className="w-full h-full">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
        </svg>
    ),

    slack: () => (
        <svg viewBox="0 0 124 124" className="w-full h-full">
            <path d="M26.4 78.6c0 7.2-5.8 13-13 13s-13-5.8-13-13 5.8-13 13-13h13v13zm6.5 0c0-7.2 5.8-13 13-13s13 5.8 13 13v32.5c0 7.2-5.8 13-13 13s-13-5.8-13-13V78.6z" fill="#e01e5a" />
            <path d="M45.9 26c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13v13h-13zm0 6.5c7.2 0 13 5.8 13 13s-5.8 13-13 13H13c-7.2 0-13-5.8-13-13s5.8-13 13-13h32.9z" fill="#36c5f0" />
            <path d="M97.6 45.5c0-7.2 5.8-13 13-13s13 5.8 13 13-5.8 13-13 13h-13v-13zm-6.5 0c0 7.2-5.8 13-13 13s-13-5.8-13-13V13c0-7.2 5.8-13 13-13s13 5.8 13 13v32.5z" fill="#2eb67d" />
            <path d="M78.1 97.6c7.2 0 13 5.8 13 13s-5.8 13-13 13-13-5.8-13-13v-13h13zm0-6.5c-7.2 0-13-5.8-13-13s5.8-13 13-13h32.5c7.2 0 13 5.8 13 13s-5.8 13-13 13H78.1z" fill="#ecb22e" />
        </svg>
    ),

    gmail: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
        </svg>
    ),

    zoom: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-4.865-3.025c-.24-.12-.765-.225-1.095-.045l-2.31 1.26V8.52c0-.825-.675-1.5-1.5-1.5H6.51c-.825 0-1.5.675-1.5 1.5v6.96c0 .825.675 1.5 1.5 1.5h7.72c.825 0 1.5-.675 1.5-1.5v-1.65l2.31 1.26c.33.18.855.075 1.095-.045.24-.12.375-.375.375-.63V9.605c0-.255-.135-.51-.375-.63z" fill="#2D8CFF" />
        </svg>
    ),

    zapier: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.194 13.5H13.5v3.694c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V13.5H6.806c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5H10.5V6.806c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V10.5h3.694c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5z" fill="#FF4A00" />
        </svg>
    ),

    hubspot: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.2 2.2 0 0017.238.841h-.067a2.2 2.2 0 00-2.193 2.193v.066a2.2 2.2 0 001.267 1.984v2.846a6.27 6.27 0 00-2.932 1.283L6.456 4.094a2.095 2.095 0 00.072-.536 2.142 2.142 0 10-2.14 2.14c.31 0 .604-.069.87-.19l6.744 5.047a6.262 6.262 0 00-.165 1.418c0 .51.063 1.006.18 1.482l-2.63 1.243a2.326 2.326 0 00-1.597-.633c-1.3 0-2.356 1.056-2.356 2.357s1.056 2.356 2.357 2.356 2.357-1.055 2.357-2.356a2.35 2.35 0 00-.159-.838l2.498-1.181a6.29 6.29 0 109.679-7.5zm-2.956 8.894a3.617 3.617 0 01-3.612-3.613 3.617 3.617 0 013.612-3.612 3.617 3.617 0 013.613 3.612 3.617 3.617 0 01-3.613 3.613z" fill="#FF7A59" />
        </svg>
    ),

    discord: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2" />
        </svg>
    ),

    stripe: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="#635BFF" />
        </svg>
    ),

    shopify: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.022-.116-.122-.2-.222-.2s-2.17-.153-2.17-.153-1.437-1.435-1.6-1.586c-.163-.151-.483-.107-.608-.07-.02.007-.335.103-.858.264a6.083 6.083 0 00-.394-1.02c-.583-1.166-1.437-1.782-2.468-1.783h-.003c-.071 0-.143.007-.214.013-.032-.04-.064-.079-.097-.117C11.658.126 10.818 0 10.126 0c-1.924.026-3.817 1.446-5.334 4.004-.987 1.763-1.735 3.98-1.95 5.698-1.996.618-3.39 1.048-3.423 1.06C.1 10.96 0 10.975 0 11.335 0 11.695 0 23.514 0 23.514l15.337.465z" fill="#95BF47" />
        </svg>
    ),

    figma: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491z" fill="#0ACF83" />
            <path d="M8.148 24c2.476 0 4.49-2.014 4.49-4.49v-4.49H8.148c-2.476 0-4.49 2.013-4.49 4.49 0 2.476 2.014 4.49 4.49 4.49z" fill="#0ACF83" />
            <path d="M8.148 15.02c2.476 0 4.49-2.014 4.49-4.49s-2.014-4.49-4.49-4.49-4.49 2.013-4.49 4.49c0 2.476 2.014 4.49 4.49 4.49z" fill="#1ABCFE" />
            <path d="M8.148 0h4.588v8.981H8.148z" fill="#FF7262" />
            <path d="M8.148 6.039c-2.476 0-4.49 2.013-4.49 4.49s2.014 4.49 4.49 4.49V6.039z" fill="#F24E1E" />
        </svg>
    ),

    github: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    ),

    twitter: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),

    linkedin: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2" />
        </svg>
    ),

    airtable: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M11.992 1.966L1.164 6.467c-.229.095-.229.418 0 .513l10.828 4.501c.229.095.489.095.718 0l10.828-4.501c.229-.095.229-.418 0-.513L12.71 1.966a.91.91 0 0 0-.718 0z" fill="#FCB400" />
            <path d="M12.709 13.283L23.82 8.635c.232-.097.232-.33 0-.427l-2.347-.976a.91.91 0 0 0-.718 0l-8.046 3.347-8.046-3.347a.91.91 0 0 0-.718 0l-2.347.976c-.232.097-.232.33 0 .427l11.111 4.648c.229.095.489.095.718 0z" fill="#18BFFF" />
            <path d="M12.709 17.81l11.111-4.648c.232-.097.232-.33 0-.427l-2.347-.976a.91.91 0 0 0-.718 0l-8.046 3.347-8.046-3.347a.91.91 0 0 0-.718 0l-2.347.976c-.232.097-.232.33 0 .427l11.111 4.648c.229.095.489.095.718 0z" fill="#F82B60" />
        </svg>
    ),

    calendly: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M19.655 14.262c-.281.655-.608 1.283-.981 1.88a12.076 12.076 0 0 1-1.498 1.883c-.527.555-1.1 1.064-1.718 1.524a10.66 10.66 0 0 1-1.983 1.192 9.043 9.043 0 0 1-2.21.715 9.596 9.596 0 0 1-2.35.213 9.596 9.596 0 0 1-2.35-.213 9.043 9.043 0 0 1-2.21-.715 10.66 10.66 0 0 1-1.983-1.192 11.76 11.76 0 0 1-1.718-1.524 12.076 12.076 0 0 1-1.498-1.883 12.87 12.87 0 0 1-.981-1.88A10.18 10.18 0 0 1 0 12c0-1.532.344-2.973 1.024-4.262a12.87 12.87 0 0 1 .981-1.88c.43-.68.93-1.308 1.498-1.883a11.76 11.76 0 0 1 1.718-1.524 10.66 10.66 0 0 1 1.983-1.192A9.043 9.043 0 0 1 9.414.544a9.596 9.596 0 0 1 2.35-.213c.796 0 1.578.072 2.35.213a9.043 9.043 0 0 1 2.21.715c.712.331 1.375.727 1.983 1.192a11.76 11.76 0 0 1 1.718 1.524c.568.575 1.068 1.203 1.498 1.883.373.597.7 1.225.981 1.88C23.185 9.027 23.529 10.468 23.529 12s-.344 2.973-1.024 4.262z" fill="#006BFF" />
        </svg>
    ),

    make: () => (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8zm0 2.4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#6D4AFF" />
        </svg>
    ),
};

// ============ MAIN COMPONENT ============
export const Process: React.FC = () => {
    return (
        <div className="relative max-w-7xl mx-auto px-6 py-20">

            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 mb-6"
                >
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold  tracking-widest text-gray-200">
                        Powerful Integrations
                    </span>
                </motion.div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-futuristic font-bold tracking-tight mb-6">
                    <span className="text-white">We Connect to </span>
                    <span className="bg-gradient-to-r from-primary via-emerald-600 to-lime-400 bg-clip-text text-transparent">
                        All Your Apps
                    </span>
                </h2>


                <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">
                    AI & Automation technologies we're experts in. Seamlessly integrate with
                    <span className="text-primary font-semibold"> 500+ tools</span> you already use.
                </p>
            </motion.div>

            {/* Orbiting Circles Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center mb-16"
            >
                {/* Center Logo */}
                <div className="absolute z-20 w-20 h-20 md:w-28 md:h-28 rounded-full 
bg-gradient-to-br from-primary to-emerald-800 
flex items-center justify-center 
shadow-[0_0_60px_rgba(16,185,129,0.6)]">

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
                    />
                    <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-white" />
                </div>

                {/* Inner Orbit */}
                <OrbitingCircles radius={100} duration={20} iconSize={28}>
                    <Icons.whatsapp />
                    <Icons.notion />
                    <Icons.openai />
                    <Icons.slack />
                    <Icons.gmail />
                </OrbitingCircles>

                {/* Middle Orbit */}
                <OrbitingCircles radius={170} duration={30} reverse iconSize={32}>
                    <Icons.googleDrive />
                    <Icons.zoom />
                    <Icons.zapier />
                    <Icons.hubspot />
                    <Icons.discord />
                    <Icons.figma />
                </OrbitingCircles>

                {/* Outer Orbit */}
                <OrbitingCircles radius={250} duration={40} iconSize={36}>
                    <Icons.stripe />
                    <Icons.shopify />
                    <Icons.github />
                    <Icons.twitter />
                    <Icons.linkedin />
                    <Icons.airtable />
                    <Icons.calendly />
                    <Icons.make />
                </OrbitingCircles>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-12"
            >
                {['AI Voice Agents', 'Custom Chatbots', 'Workflow Automation', 'Data Sync', 'API Connections', 'Real-time Updates'].map((feature, i) => (
                    <motion.span
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer"
                    >
                        {feature}
                    </motion.span>
                ))}
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
            >
                {[
                    { value: '500+', label: 'Integrations' },
                    { value: '99.9%', label: 'Uptime' },
                    { value: '< 50ms', label: 'Response' },
                    { value: '24/7', label: 'Automation' },
                ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-2xl md:text-3xl font-bold font-futuristic bg-primary
 bg-clip-text text-transparent">
                            {stat.value}
                        </div>
                        <div className="text-xs text-zinc-500">{stat.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
            >
               <motion.a
  href="https://cal.com/sadam-ashraf-zbcnwf/30min"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="group relative inline-block px-10 py-5 
  bg-primary
  rounded-full font-bold uppercase tracking-widest text-xs 
  overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.4)]"
>
  <div className="absolute inset-0 
  bg-gradient-to-r from-green-400 to-lime-400 
  opacity-0 group-hover:opacity-100 transition-opacity" />

  <span className="relative flex items-center gap-3 text-black">
    <Sparkles className="w-4 h-4" />
    Free Consultation
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </span>
</motion.a>

            </motion.div>

            {/* CSS Animation */}
            <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};