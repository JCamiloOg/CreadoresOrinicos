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
        i18n.on("languageChanging", () => setLoadingLanguaje(true));
        i18n.on("languageChanged", () => {
            setTimeout(() => setLoadingLanguaje(false), 500);
        });

    }, []);

    useEffect(() => {
        document.title = "Creadores Oniricos";
        startLoading();

        setTimeout(() => stopLoading(), 1000);
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