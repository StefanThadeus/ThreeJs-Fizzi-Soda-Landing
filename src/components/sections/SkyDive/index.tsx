"use client";

import { Bounded } from "@/components/Bounded";
import { Scene } from "./Scene";
import { View } from "@react-three/drei";

const SENTENCE = "Dive into better health";

export const SkyDive = () => (
  <Bounded className="skydive relative h-screen">
    <h2 className="sr-only">{SENTENCE}</h2>

    <div className="pointer-events-none absolute inset-x-0 top-0 h-full ">
      <View className="sticky top-0 z-50 h-screen w-screen">
        <Scene sentence={SENTENCE} />
      </View>
    </div>
  </Bounded>
);
