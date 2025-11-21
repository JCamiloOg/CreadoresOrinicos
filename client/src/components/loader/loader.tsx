import { useTranslation } from "react-i18next";
import "./loader.css";
import { useEffect, useState } from "react";
interface Props {
    isVisible: boolean
}

export default function Loader({ isVisible }: Props) {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (!isVisible) {
            const timeOut = setTimeout(() => setHidden(true), 500);

            return () => clearTimeout(timeOut);
        } else {
            setHidden(false);
        }

    }, [isVisible]);

    if (hidden) return null;

    return (
        <div className={`z-50 w-full h-dvh bg-radial from-[#943829] from-0% to-[#000000] absolute top-2/4 left-2/4 -translate-2/4 flex items-center justify-center  ${isVisible ? "opacity-100" : "opacity-0"} transition-all duration-500`}>
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}