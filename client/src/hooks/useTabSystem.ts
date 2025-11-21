// hooks/useTabSystem.ts
import { useEffect } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");

gsap.defaults({
    ease: "osmo-ease",
    duration: 0.8,
});

export function useTabSystem(wrapperRef: React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const nav = wrapper.querySelector('[data-tabs="nav"]');
        const buttons = nav?.querySelectorAll<HTMLButtonElement>('[data-tabs="button"]') ?? [];
        const contentWrap = wrapper.querySelector('[data-tabs="content-wrap"]');
        const contentItems = contentWrap?.querySelectorAll<HTMLElement>('[data-tabs="content-item"]') ?? [];

        const visualWrap = wrapper.querySelector('[data-tabs="visual-wrap"]');
        const visualItems = visualWrap?.querySelectorAll<HTMLElement>('[data-tabs="visual-item"]') ?? [];

        if (!buttons.length || !contentItems.length || !visualItems.length) return;

        let activeButton = buttons[0];
        let activeContent = contentItems[0];
        let activeVisual = visualItems[0];
        let isAnimating = false;

        const switchTab = (index: number, initial = false) => {
            if (!initial && (isAnimating || buttons[index] === activeButton)) return;

            isAnimating = true;

            const incomingContent = contentItems[index];
            const incomingVisual = visualItems[index];
            const outgoingContent = activeContent;
            const outgoingVisual = activeVisual;

            const outgoingLines = outgoingContent.querySelectorAll("[data-tabs-fade]") ?? [];
            const incomingLines = incomingContent.querySelectorAll("[data-tabs-fade]");

            const timeline = gsap.timeline({
                defaults: { ease: "power3.inOut" },
                onComplete: () => {
                    if (!initial) {
                        outgoingContent.classList.remove("visible");
                        outgoingVisual.classList.remove("visible");
                    }

                    activeContent = incomingContent;
                    activeVisual = incomingVisual;
                    isAnimating = false;
                }
            });

            incomingContent.classList.add("visible");
            incomingVisual.classList.add("visible");

            timeline
                .to(outgoingLines, { y: "-2em", autoAlpha: 0 }, 0)
                .to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0)
                .fromTo(
                    incomingLines,
                    { y: "2em", autoAlpha: 0 },
                    { y: "0em", autoAlpha: 1, stagger: 0.075 },
                    0.4
                )
                .fromTo(
                    incomingVisual,
                    { autoAlpha: 0, xPercent: 3 },
                    { autoAlpha: 1, xPercent: 0 },
                    "<"
                );

            activeButton.classList.remove("border-[#efeeec4d]", "rounded-[.25em]");
            buttons[index].classList.add("border-[#efeeec4d]", "rounded-[.25em]");
            activeButton = buttons[index];
        };

        switchTab(0, true);

        buttons.forEach((btn, i) => {
            btn.addEventListener("click", () => switchTab(i));
        });

        // cleanup
        return () => {
            buttons.forEach((btn) => btn.replaceWith(btn.cloneNode(true)));
        };
    }, [wrapperRef]);
}
