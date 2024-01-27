import React from "react";
import HeroSection from "../components/HeroSection";
import Benefits from "../components/Benefits";
import ShowBooks from "../components/ShowBooks";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Benefits />
      <ShowBooks />
    </div>
  );
}
