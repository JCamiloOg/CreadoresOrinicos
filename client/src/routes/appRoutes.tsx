import { Route, Routes } from "react-router";
import Index from "../pages/index";
import SocialNetworks from "@/pages/socialNetworks";
import Login from "@/pages/admin/login";
import BlogAdmin from "@/pages/admin/blog";

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<SocialNetworks />} />

                {/* Admin */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/blog" element={<BlogAdmin />} />
            </Routes>
        </>
    );
}