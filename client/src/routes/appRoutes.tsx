import { Route, Routes } from "react-router";
import Index from "../pages/index";
import SocialNetworks from "@/pages/socialNetworks";

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<SocialNetworks />} />
            </Routes>
        </>
    );
}