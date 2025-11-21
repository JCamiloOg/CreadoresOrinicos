import Background from "@/components/background/background";
import Loader from "@/components/loader/loader";
import NavBar from "@/components/navBar/navBar";
import SectionSocial from "@/components/socialNetworks/sectionSocial";
import i18n from "@/config/i18n";
import { usePageLoader } from "@/hooks/usePageLoader";
import { useEffect, useState } from "react";

export default function SocialNetworks() {
    const { loading, startLoading, stopLoading } = usePageLoader();
    const [loadingLanguaje, setLoadingLanguaje] = useState(false);


    useEffect(() => {
        document.title = i18n.language == "en" ? "Contacto" : "Contact";
        startLoading();

        setTimeout(() => stopLoading(), 1000);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        i18n.on("languageChanging", () => {
            document.title = i18n.language == "en" ? "Contacto" : "Contact";
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            setLoadingLanguaje(true);
        });
        i18n.on("languageChanged", () => {
            setTimeout(() => {
                setLoadingLanguaje(false);
            }, 500);
        });

    }, []);


    return (
        <>
            <Loader isVisible={loading || loadingLanguaje} />
            <Background />
            <NavBar />
            <SectionSocial />
        </>
    );
}