import { Route, Routes } from "react-router";
import Index from "../pages/index";
import SocialNetworks from "@/pages/socialNetworks";
import Login from "@/pages/admin/login";
import BlogAdmin from "@/pages/admin/blog";
import EventsAdmin from "@/pages/admin/events";
import GlossaryAdmin from "@/pages/admin/glossary";

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<SocialNetworks />} />

                {/* Admin */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/blog" element={<BlogAdmin />} />
                <Route path="/admin/events" element={<EventsAdmin />} />
                <Route path="/admin/glossary" element={<GlossaryAdmin />} />
            </Routes>
        </>
    );
}