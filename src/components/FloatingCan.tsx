"use client";

import { Float } from "@react-three/drei";
import { SodaCanModel, SodaCanProps } from "@/components/SodaCanModel";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";

type FloatingCanProps = {
  sodaCan?: SodaCanProps;
  children?: ReactNode;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
};

export const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      sodaCan,
      speed = 1,
      rotationIntensity = 2,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={speed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <SodaCanModel {...sodaCan} />
        </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";
