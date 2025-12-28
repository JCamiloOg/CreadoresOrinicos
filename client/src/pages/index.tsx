import Background from "@/components/background/background";
import HeroSection from "@/components/heroSection.tsx/heroSection";
import Loader from "@/components/loader/loader";
import NavBar from "@/components/navBar/navBar";
import i18n from "@/config/i18n";
import { usePageLoader } from "@/hooks/usePageLoader";
import { useEffect, useState } from "react";

export default function Index() {
    const { loading, startLoading, stopLoading } = usePageLoader();

    const [loadingLanguaje, setLoadingLanguaje] = useState(false);

    useEffect(() => {
        i18n.on("languageChanging", () => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            setLoadingLanguaje(true);
        });
        i18n.on("languageChanged", () => {
            const timer = setTimeout(() => {
                setLoadingLanguaje(false);
            }, 500);
            return () => {
                clearTimeout(timer);
            };
        });
    }, []);

    useEffect(() => {
        document.title = "Creadores Oniricos";
        startLoading();

        const timer = setTimeout(() => stopLoading(), 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [startLoading, stopLoading]);

    return (
        <>
            <NavBar />
            <Loader isVisible={loading || loadingLanguaje} />
            <Background />
            <HeroSection />
        </>
    );
}