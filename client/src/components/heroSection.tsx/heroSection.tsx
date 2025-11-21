import { useRef } from "react";
import { useFlipButtons } from "@/hooks/useFlipButtons";
import { useTabSystem } from "@/hooks/useTabSystem";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
    const { t } = useTranslation();
    const wrapperRef = useRef<HTMLDivElement>(null);


    useFlipButtons(wrapperRef);
    useTabSystem(wrapperRef);
    return (
        <>
            <section className="p-8 justify-center items-center min-h-screen flex relative text-[1.1vw]">
                <div ref={wrapperRef} data-tabs="wrapper" className="z-1 grid grid-cols-12 w-full min-h-[37em] relative">
                    <div className="md:col-span-6 col-span-12 md:pt-20">
                        <div className="w-full  h-full ml-auto mr-0 pt-4 pb-8">
                            <div className=" items-start min-h-full pt-0 pb-0 pr-10">
                                <div className=" gap-y-8 flex flex-col justify-start items-start mt-8">
                                    <h1 className="mt-0 mb-0 md:text-7xl text-4xl font-medium leading-none text-white font-romance">{t("heroSection.slogan")}</h1>
                                    <div data-flip-button="wrap" data-tabs="nav" className="bg-[#efeeec0f] border border-[#efeeec14] rounded-[0.5em] p-2 flex md:text-xl text-lg">
                                        <button data-tabs="button" data-flip-button="button" className="bg-transparent border border-[#efeeec00]  px-6 py-[1.125em] transition-colors duration-200 relative text-inherit">
                                            <div className="z-1 text-[1.125em] relative text-white">Shapes</div>
                                            <div data-flip-button="bg" className="z-0 bg-[#efeeec0f] border border-[#efeeec14] rounded-[0.25em] w-full h-full absolute inset-0"></div>
                                        </button>
                                        <button data-tabs="button" data-flip-button="button" className="bg-transparent border border-[#efeeec00] px-6 py-[1.125em] transition-colors duration-200 relative text-inherit">
                                            <div className="z-1 text-[1.125em] relative text-white">Depth</div>
                                        </button>
                                        <button data-tabs="button" data-flip-button="button" className="bg-transparent border border-[#efeeec00] px-6 py-[1.125em] transition-colors duration-200 relative text-inherit">
                                            <div className="z-1 text-[1.125em] relative text-white">Layers</div>
                                        </button>
                                    </div>
                                </div>
                                <div className="gap-x-8 gap-y-8 flex flex-col justify-start items-start md:mt-28 mt-28 text-white">
                                    <div data-tabs="content-wrap" className="w-full min-w-[24em] relative">
                                        <div data-tabs="content-item" className="z-1 gap-x-5 gap-y-5 invisible flex flex-col absolute left-0 right-0 bottom-0 ">
                                            <h2 data-tabs-fade="" className="tracking-[-0.02em] mt-0 mb-0 md:text-[1.75em] text-2xl font-medium leading-none">Shifting Perspectives</h2>
                                            <p data-tabs-fade="" className="content-p md:text-xl text-lg opacity-80">A dynamic exploration of structure, balance, and creative symmetry.</p>
                                        </div>
                                        <div data-tabs="content-item" className="z-1 gap-x-5 gap-y-5 invisible flex flex-col absolute left-0 right-0 bottom-0">
                                            <h2 data-tabs-fade="" className="tracking-[-0.02em] mt-0 mb-0 md:text-[1.75em] text-2xl font-medium leading-none">Fragments of Motion</h2>
                                            <p data-tabs-fade="" className="content-p opacity-80 md:text-xl text-lg">Where design meets depth—an abstract dance of light and form.</p>
                                        </div>
                                        <div data-tabs="content-item" className="z-1 gap-x-5 gap-y-5 invisible flex flex-col absolute left-0 right-0 bottom-0">
                                            <h2 data-tabs-fade="" className="tracking-[-0.02em] mt-0 mb-0 md:text-[1.75em] text-2xl font-medium leading-none">Echoes in Orange</h2>
                                            <p data-tabs-fade="" className="content-p opacity-80 md:text-xl text-lg">A journey through layered geometry and endless possibilities.</p>
                                        </div>
                                    </div>
                                    <Link id="form-button" to="/" className="text-[#131313] justify-center items-center h-16 px-6 no-underline flex relative md:text-2xl text-xl bg-[#eb9354] rounded-2xl hover:bg-[#9e6338] transition-colors duration-300">
                                        <p className="m-0 text-[1.25em] leading-[1.4]">Ver más</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-6 col-span-12">
                        <div data-tabs="visual-wrap" className="rounded-[0.5em] w-full h-[42em] max-h-[80vh] relative overflow-hidden">
                            <div data-tabs="visual-item" className="invisible justify-start items-center w-full h-full flex absolute">
                                <img src="https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e14dd4dbca1d8e5930_philip-oroni-IANBrm46bF0-unsplash%20(2).avif" loading="lazy" className="object-cover rounded-[0.5em] w-full max-w-none h-full" />
                            </div>
                            <div data-tabs="visual-item" className="invisible justify-start items-center w-full h-full flex absolute">
                                <img src="https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e19e4d013c6a4c5a1b_philip-oroni-Zx_G3LpNnV4-unsplash%20(1).avif" loading="lazy" className="object-cover rounded-[0.5em] w-full max-w-none h-full" />
                            </div>
                            <div data-tabs="visual-item" className="invisible justify-start items-center w-full h-full flex absolute">
                                <img src="https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e1c88b5b4c14d1e6fd_philip-oroni-h9N7bm-HRCo-unsplash.avif" loading="lazy" className="object-cover rounded-[0.5em] w-full max-w-none h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}