"use client";

import { useRef } from "react";
import { Group } from "three";
import { Environment } from "@react-three/drei";
import { FloatingCan } from "@/components/FloatingCan";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FLOAT_SPEED = 1.5;

export const Scene = () => {
  const isReady = useStore((state) => state.isReady);

  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  useGSAP(() => {
    if (
      !groupRef.current ||
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current
    ) {
      return;
    }

    // assets loaded, other things such as gsap html animations may also begin
    // the state is being checked wherever it is relevant for better ux
    isReady();

    // set can starting locations
    gsap.set(can1Ref.current.position, { x: -1.5 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: 1.5 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    const introTimeline = gsap.timeline({
      defaults: { duration: 3, ease: "back.out(1.4)" },
    });

    if (window.scrollY < 20) {
      introTimeline
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollTimeline = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTimeline
      // rotate can group
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      // can 1 - black cherry
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)
      // can 2 - lemon lime
      .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current.rotation, { z: 0 }, 0)
      // can 3 - grape
      .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current.rotation, { z: -0.1 }, 0)
      // can 4 - strawberry lemonade
      .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current.rotation, { z: 0.3 }, 0)
      // can 5 - watermelon
      .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current.rotation, { z: -0.25 }, 0)
      // shift can group to the side
      .to(
        groupRef.current.position,
        { x: 1, duration: 3, ease: "sine.inOut" },
        1.3,
      );
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          sodaCan={{ flavor: "blackCherry" }}
          speed={FLOAT_SPEED}
        />
      </group>

      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          sodaCan={{ flavor: "lemonLime" }}
          speed={FLOAT_SPEED}
        />
      </group>

      <FloatingCan
        ref={can3Ref}
        sodaCan={{ flavor: "grape" }}
        speed={FLOAT_SPEED}
      />

      <FloatingCan
        ref={can4Ref}
        sodaCan={{ flavor: "strawberryLemonade" }}
        speed={FLOAT_SPEED}
      />

      <FloatingCan
        ref={can5Ref}
        sodaCan={{ flavor: "watermelon" }}
        speed={FLOAT_SPEED}
      />

      <Environment files="/hdrs/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
};
