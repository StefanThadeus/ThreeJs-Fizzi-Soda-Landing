import { Hero } from "@/components/sections/Hero";
import { SkyDive } from "@/components/sections/SkyDive";
import { Carousel } from "@/components/sections/Carousel";
import { AlternatingText } from "@/components/sections/AlternatingText";

export default function Home() {
  return (
    <>
      <Hero />
      <SkyDive />
      <Carousel />
      <AlternatingText />
    </>
  );
}
