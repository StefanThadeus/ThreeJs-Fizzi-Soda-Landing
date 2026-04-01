"use client";

import Image from "next/image";
import { Bounded } from "../Bounded";
import { Button } from "../Button";
import { TextSplitter } from "../TextSplitter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "@/lib/colors";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Hero = () => {
  useGSAP(() => {
    const introTimeline = gsap.timeline();

    introTimeline
      .set(".hero", { opacity: 1 })
      .from(".hero-header-word", {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 1,
      })
      .from(
        ".hero-subheading",
        {
          opacity: 0,
          y: 30,
        },
        "+=0.8",
      )
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-button", {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTimeline
      .fromTo(
        "body",
        { backgroundColor: COLORS.fizziYellow },
        { backgroundColor: COLORS.fizziGreen, overwrite: "auto" },
        1,
      )
      .from(".text-side-heading .split-char", {
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(3)",
        duration: 0.5,
      })
      .from(".text-side-body", {
        y: 20,
        opacity: 0,
      });
  });

  return (
    <Bounded className="hero opacity-0">
      <div className="grid">
        {/* Top part */}
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header md:text-[9rem] lg:text-[13rem] text-7xl font-black uppercase leading-[0.8] text-orange-500">
              <TextSplitter
                text="Live Gutsy"
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>

            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              Soda Perfected
            </div>

            <div className="hero-body text-2xl font-normal text-sky-950">
              3-5g sugar. 9g fiber. 5 delicious flavors.
            </div>

            <Button link="#" text="Shop Now" className="hero-button mt-12" />
          </div>
        </div>

        {/* Bottom part */}
        <div className="grid text-side relative z-80 h-screen items-center gap-4 md:grid-cols-2">
          <Image
            src="/all-cans-bunched.png"
            alt="hero"
            width={1603}
            height={1791}
            className="mx-auto w-full h-auto max-w-150 md:hidden"
          />

          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text="Try all five flavors" />
            </h2>

            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              Our soda is made with real fruit juice and a touch of cane sugar.
              We never use artificial sweeteners or high fructose corn syrup.
              Try all five flavors and find your favorite!
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};
