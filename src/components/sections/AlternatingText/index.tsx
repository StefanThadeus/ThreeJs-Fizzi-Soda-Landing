"use client";

import { Bounded } from "@/components/Bounded";
import { TEXTS } from "./constants";
import { View } from "@react-three/drei";
import { Scene } from "./Scene";
import { clsx } from "clsx";

export const AlternatingText = () => (
  <Bounded className="alternating-text-container bg-yellow-300 relative text-sky-950">
    <div>
      <div className="grid z-100 relative">
        <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
          <Scene />
        </View>

        {TEXTS.map((text, index) => (
          <div
            key={index}
            className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
          >
            <div
              className={clsx(
                index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30",
              )}
            >
              <h2 className="text-balance text-6xl font-bold">{text.title}</h2>
              <div className="mt-4 text-xl">{text.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Bounded>
);
