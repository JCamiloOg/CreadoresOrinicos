import { useTranslation } from "react-i18next";

import logo from "@/assets/logoOniricos.png";
import { useState } from "react";
import { Link, NavLink } from "react-router";


export default function NavBar() {
    const [open, setOpen] = useState(false);

    const { t, i18n } = useTranslation();

    const baseClass = "rounded-b";
    const activeClass = "border-b-[3px] border-[#e48c4d]";
    const inactiveClass = "hover:border-b-[3px] hover:border-[#e48c4d]";

    const baseClassMobile = "p-2 rounded";
    const activeClassMobile = "shadow shadow-[#e48c4d]";
    const inactiveClassMobile = "hover:shadow hover:shadow-[#e48c4d]";

    const toggleLang = () => {
        i18n.emit("languageChanging");
        const lang = i18n.language === "es" ? "en" : "es";
        setTimeout(() => {
            i18n.changeLanguage(lang);
        }, 500);
    };

    return (
        <nav
            className={`w-full sm:w-full md:w-full lg:w-10/12 xl:w-8/12 mx-auto fixed left-0 md:left-2/4 md:-translate-x-2/4 z-49   md:mt-10 py-4 border-b border-[#9d4132]/20  shadow-lg shadow-[#9d4132]/20 text-white backdrop-blur-sm`}>
            <div className="flex items-center justify-between ">
                <div className="shrink-0 px-4 flex gap-5 justify-center items-center">
                    <Link to={"/"} className="">
                        <img src={logo} className="w-20 " alt="" />
                    </Link>
                    <Link to="/" className="text-4xl font-romance md:block hidden">
                        <div>
                            Creadores
                        </div>
                        <div>
                            Oniricos
                        </div>
                        {/* <div className="">
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">C</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">R</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">E</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">A</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">D</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">O</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">R</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">E</span>
                            <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.8s_linear_infinite]">S</span>
                        </div>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_1.9s_linear_infinite]">O</span>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_2s_linear_infinite]">N</span>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_2.1s_linear_infinite]">I</span>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_2.2s_linear_infinite]">R</span>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_2.3s_linear_infinite]">I</span>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_2.4s_linear_infinite]">C</span>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_2.5s_linear_infinite]">O</span>
                        <span className="px-1 bg-[#e48c4d] rounded-full animate-[ping_2.6s_linear_infinite]">S</span> */}
                    </Link>
                </div>
                <div
                    className="hidden text-lg md:flex w-1/2 items-center justify-between gap-4 py-2 cursor-pointer md:px-10 border-r-2 border-l-2 border-white list-none ">
                    <NavLink to={"/"} className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>{t("navBar.home")}</NavLink>
                    <NavLink to={"/blog"} className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>{t("navBar.blog")}</NavLink>
                    <NavLink to={"/events"} className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>{t("navBar.events")}</NavLink>
                    <NavLink to={"/services"} className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>{t("navBar.services")}</NavLink>
                    <NavLink to={"/aboutUs"} className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>{t("navBar.aboutUs")}</NavLink>
                    <NavLink to={"/contact"} className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>{t("navBar.contact")}</NavLink>
                </div>

                <div className="hidden md:flex justify-start pr-4 py-1">
                    <button onClick={toggleLang}
                        className="bg-[#e48c4d] w-20 cursor-pointer text-white px-6 py-2 rounded-md relative overflow-hidden group">
                        <span
                            className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition duration-500"
                        ></span>
                        <span className="relative z-10 font-bold text-gray-800">{i18n.language === "en" ? "EN" : "ES"}</span>
                    </button>
                </div>

                {/* <button className="block md:hidden text-3xl pr-4" id="nav__toggle-open" onClick={() => setOpen(!open)}>
                    <FontAwesomeIcon icon={faBars} />
                </button> */}
                <div className="pr-6">
                    <button
                        className="md:hidden relative w-8 h-8 flex items-center justify-center"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`absolute w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${open ? 'rotate-45' : '-translate-y-2'
                                }`}
                        />
                        <span
                            className={`absolute w-6 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${open ? 'opacity-0' : 'opacity-100'
                                }`}
                        />
                        <span
                            className={`absolute w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${open ? '-rotate-45' : 'translate-y-2'
                                }`}
                        />
                    </button>
                </div>
            </div>
            <div className={` transition-all duration-500 ease-in-out ${open ? "h-[350px] opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"} md:hidden `}>
                {/* Mobile */}
                <div id="mobile-nav"
                    className={`${open ? "flex" : "hidden"} pt-5 md:hidden mx-auto w-full flex-col items-center gap-4 rounded-b cursor-pointer shadow shadow-green-60 `}>
                    <NavLink to={"/"} className={({ isActive }) => `${baseClassMobile} ${isActive ? activeClassMobile : inactiveClassMobile}`}>{t("navBar.home")}</NavLink>
                    <NavLink to={"/blog"} className={({ isActive }) => `${baseClassMobile} ${isActive ? activeClassMobile : inactiveClassMobile}`}>{t("navBar.blog")}</NavLink>
                    <NavLink to={"/events"} className={({ isActive }) => `${baseClassMobile} ${isActive ? activeClassMobile : inactiveClassMobile}`}>{t("navBar.events")}</NavLink>
                    <NavLink to={"/services"} className={({ isActive }) => `${baseClassMobile} ${isActive ? activeClassMobile : inactiveClassMobile}`}>{t("navBar.services")}</NavLink>
                    <NavLink to={"/aboutUs"} className={({ isActive }) => `${baseClassMobile} ${isActive ? activeClassMobile : inactiveClassMobile}`}>{t("navBar.aboutUs")}</NavLink>
                    <NavLink to={"/contact"} className={({ isActive }) => `${baseClassMobile} ${isActive ? activeClassMobile : inactiveClassMobile}`}>{t("navBar.contact")}</NavLink>
                    <button onClick={toggleLang}
                        className="bg-[#e48c4d] w-20 cursor-pointer text-white px-6 py-2 rounded-md relative overflow-hidden group">
                        <span
                            className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition duration-500"
                        ></span>
                        <span className="relative z-10 font-bold text-gray-800">{i18n.language === "en" ? "EN" : "ES"}</span>
                    </button>
                </div>
            </div>
        </nav >
    );
}