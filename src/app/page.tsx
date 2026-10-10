"use client";

import { motion, useScroll, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import WhyBrightPath from "@/components/WhyBrightPath";
import CoursesSection from "@/components/CoursesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StickyBanners from "@/components/StickyBanners";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-accent"
      style={{ scaleX, transformOrigin: "left" }}
    />
  );
}

function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    let raf = 0;
    let tx = -500;
    let ty = -500;
    const move = (e: MouseEvent) => {
      tx = e.clientX - 200;
      ty = e.clientY - 200;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(tx);
        y.set(ty);
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [x, y, reduce]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] rounded-full opacity-[0.12] mix-blend-multiply blur-3xl"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, #FF6F00 0%, #1A237E 60%, transparent 70%)",
      }}
    />
  );
}

const sectionAnim = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay },
});

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <motion.div {...sectionAnim(0)}>
          <MarqueeBar />
        </motion.div>
        <motion.div {...sectionAnim(0.05)}>
          <WhyBrightPath />
        </motion.div>
        <motion.div {...sectionAnim(0.1)}>
          <CoursesSection />
        </motion.div>
        <motion.div {...sectionAnim(0.1)}>
          <StatsSection />
        </motion.div>
        <motion.div {...sectionAnim(0.1)}>
          <TestimonialsSection />
        </motion.div>
        <motion.div {...sectionAnim(0.1)}>
          <PricingSection />
        </motion.div>
        <motion.div {...sectionAnim(0.1)}>
          <ContactSection />
        </motion.div>
        <motion.div {...sectionAnim(0.1)}>
          <FAQSection />
        </motion.div>
      </main>
      <Footer />
      <StickyBanners />
    </>
  );
}
