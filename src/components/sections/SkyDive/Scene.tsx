"use client";

import { FloatingCan } from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCanModel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import { useRef } from "react";
import { Group, MeshLambertMaterial } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getXPosition, getXYPositions, getYPosition } from "./utils";
import { COLORS } from "@/lib/colors";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ANGLE = 75 * (Math.PI / 180);
const CLOUD_DISTANCE = 15;
const CLOUD_DURATION = 6;

type SkyDiveProps = { sentence: string; sodaCan?: SodaCanProps };

export const Scene = ({ sentence, sodaCan }: SkyDiveProps) => {
  const groupRef = useRef<Group>(null);
  const canRef = useRef<Group>(null);
  const cloud1Ref = useRef<Group>(null);
  const cloud2Ref = useRef<Group>(null);
  const cloudsRef = useRef<Group>(null);
  const wordsRef = useRef<Group>(null);

  useGSAP(() => {
    if (
      !canRef.current ||
      !groupRef.current ||
      !wordsRef.current ||
      !cloudsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    ) {
      return;
    }

    // set initial positions
    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPositions(-4, -ANGLE) });
    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPositions(7, -ANGLE), z: 2 },
    );

    // spinning can
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    // infinite cloud movement
    gsap.set([cloud1Ref.current.position, cloud2Ref.current.position], {
      ...getXYPositions(CLOUD_DISTANCE, -ANGLE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(CLOUD_DISTANCE * 2, ANGLE)}`,
      x: `+=${getXPosition(CLOUD_DISTANCE * -2, ANGLE)}`,
      duration: CLOUD_DURATION,
      repeat: -1,
      ease: "none",
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(CLOUD_DISTANCE * 2, ANGLE)}`,
      x: `+=${getXPosition(CLOUD_DISTANCE * -2, ANGLE)}`,
      duration: CLOUD_DURATION,
      delay: CLOUD_DURATION / 2,
      repeat: -1,
      ease: "none",
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });

    scrollTimeline
      .to("body", {
        backgroundColor: COLORS.skyBlue,
        overwrite: "auto",
        duration: 0.1,
      })
      .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-7, -ANGLE), z: -7 },
          ],
          stagger: 0.3,
        },
        0,
      )
      .to(canRef.current.position, {
        ...getXYPositions(4, -ANGLE),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      .to(cloudsRef.current.position, { z: 7, duration: 0.5 });
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          sodaCan={sodaCan}
          rotationIntensity={0.35}
          floatIntensity={3}
          speed={3}
        />
      </group>

      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      <group ref={wordsRef}>
        <ThreeText sentence={sentence} color="#f97315" />
      </group>

      <ambientLight intensity={2} color="#9ddefa" />
      <Environment preset="dawn" environmentIntensity={1.5} />
    </group>
  );
};

const ThreeText = ({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) => {
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  const words = sentence.toUpperCase().split(" ");

  const material = new MeshLambertMaterial();

  return words.map((word, index) => (
    <Text
      key={`${word}-${index}`}
      color={color}
      scale={isDesktop ? 1 : 5}
      material={material}
      font="./fonts/Alpino-Variable.woff"
      anchorX="center"
      anchorY="middle"
      characters="ABCDEFGHIJKLMNOPQRSTUVXWYZ!,.?'"
    >
      {word}
    </Text>
  ));
};
