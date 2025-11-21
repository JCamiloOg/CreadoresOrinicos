// hooks/useFlipButtons.ts
import { useEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export function useFlipButtons(wrapperRef: React.RefObject<HTMLDivElement | null>) {

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const buttons = wrapper.querySelectorAll<HTMLElement>('[data-flip-button="button"]');
        const bg = wrapper.querySelector<HTMLElement>('[data-flip-button="bg"]');

        if (!bg) return;

        const activeLink = wrapper.querySelector<HTMLElement>(".border-\\[\\#efeeec4d\\]\\.rounded-\\[\\.25em\\]");

        const handlers: Array<() => void> = Array.from(buttons).map((button) => {
            const enter = () => {
                const state = Flip.getState(bg);
                button.appendChild(bg);
                Flip.from(state, { duration: 0.4 });
            };

            const leave = () => {
                const state = Flip.getState(bg);
                activeLink?.appendChild(bg);
                Flip.from(state, { duration: 0.4 });
            };

            button.addEventListener("mouseenter", enter);
            button.addEventListener("focus", enter);

            button.addEventListener("mouseleave", leave);
            button.addEventListener("blur", leave);

            // cleanup
            return () => {
                button.removeEventListener("mouseenter", enter);
                button.removeEventListener("focus", enter);
                button.removeEventListener("mouseleave", leave);
                button.removeEventListener("blur", leave);
            };
        });

        return () => {
            handlers.forEach((unsub) => unsub());
        };

    }, [wrapperRef]);
}
