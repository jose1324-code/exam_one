"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play, Star, Trophy, Users, X, ChevronDown } from "lucide-react";
import AnimatedButton, { scrollToContactWithHighlight } from "./ui/AnimatedButton";
import HeroIllustration from "./HeroIllustration";

const WORDS = ["True Potential", "Bright Future", "NEET Dreams", "JEE Success"];

function useTypewriter() {
  const [text, setText] = useState("");
  useEffect(() => {
    let wi = 0;
    let ci = 0;
    let del = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = WORDS[wi];
      setText(word.slice(0, ci));
      let delay = del ? 55 : 110;
      if (!del && ci === word.length) {
        delay = 1600;
        del = true;
      } else if (del && ci === 0) {
        del = false;
        wi = (wi + 1) % WORDS.length;
        delay = 350;
      } else {
        ci += del ? -1 : 1;
      }
      timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return text;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function DemoModal({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="fixed inset-0 z-[300] grid place-items-center bg-deep/70 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Student story video"
    >
      <motion.div
        initial={reduce ? {} : { scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="w-full max-w-2xl overflow-hidden rounded-card bg-white shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-primary px-5 py-4 text-white">
          <p className="font-poppins font-bold">Student Story (Sample video placeholder)</p>
          <button onClick={onClose} aria-label="Close video">
            <X />
          </button>
        </div>
        <div className="aspect-video w-full bg-deep">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
            title="Sample student story video"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="px-5 py-4 text-sm text-muted">Sample embed for illustration only — replace with your real testimonial video.</p>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const typed = useTypewriter();
  const [modal, setModal] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);

  return (
    <section ref={ref} id="home" className="hero-mesh relative flex min-h-screen items-center overflow-hidden pb-20 pt-32 text-white">
      {!reduce && (
        <>
          <motion.div aria-hidden className="absolute -right-20 -top-28 h-[420px] w-[420px] rounded-full bg-indigo-400 opacity-50 blur-[70px]"
            animate={{ scale: [1, 1.25, 1], x: [0, 20, 0], y: [0, -30, 0], rotate: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute -bottom-24 -left-20 h-[340px] w-[340px] rounded-full bg-accent opacity-30 blur-[70px]"
            animate={{ scale: [1, 1.15, 1], x: [0, -24, 0], y: [0, 26, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute left-[35%] top-[40%] h-[260px] w-[260px] rounded-full bg-primaryLight opacity-40 blur-[70px]"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        </>
      )}

      <div className="relative z-[2] mx-auto grid w-full max-w-[1180px] items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div variants={reduce ? {} : container} initial="hidden" animate="show" style={{ y: textY }}>
          <motion.span variants={reduce ? {} : item} className="mb-4 inline-block rounded-full border border-accent/40 bg-accent/20 px-[18px] py-2 font-grotesk text-xs font-semibold uppercase tracking-[2px] text-accentSoft">
            📍 Chennai&apos;s #1 Coaching for Class 10–12
          </motion.span>
          <motion.h1 variants={reduce ? {} : item} className="font-poppins text-[clamp(2rem,5.5vw,3.6rem)] font-bold leading-tight">
            Unlock Your Child&apos;s <br />
            <span className="text-accentSoft">{typed}</span>
            <motion.span aria-hidden animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="ml-1 inline-block w-[3px] self-stretch bg-accentSoft">
              &nbsp;
            </motion.span>
          </motion.h1>
          <motion.p variants={reduce ? {} : item} className="mt-5 max-w-[520px] text-[clamp(1rem,2.2vw,1.2rem)] text-indigo-200">
            Expert NEET &amp; JEE foundation batches. Small batches. Big results. First demo class — absolutely <strong className="text-white">FREE</strong>.
          </motion.p>
          <motion.div variants={reduce ? {} : item} className="mt-7 flex flex-wrap gap-3.5">
            <AnimatedButton onClick={scrollToContactWithHighlight}>Book Free Demo →</AnimatedButton>
            <AnimatedButton variant="ghost" onClick={() => setModal(true)} ariaLabel="Watch student story">
              <Play className="h-5 w-5" /> Watch Student Story
            </AnimatedButton>
          </motion.div>
          <motion.div variants={reduce ? {} : item} className="mt-7 flex flex-wrap gap-3" role="list">
            {[
              { icon: <Star className="h-4 w-4 text-accentSoft" />, text: "4.9/5 Rating" },
              { icon: <Users className="h-4 w-4 text-accentSoft" />, text: "1,200+ Students" },
              { icon: <Trophy className="h-4 w-4 text-accentSoft" />, text: "98% Board Pass Rate" },
            ].map((b, i) => (
              <motion.span
                key={b.text}
                role="listitem"
                initial={reduce ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.12 }}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md"
              >
                <span className="mr-1.5 inline-flex align-middle">{b.icon}</span>
                {b.text} <em className="ml-1 rounded-md bg-accent px-1.5 py-0.5 text-[0.68rem] not-italic text-white">SAMPLE</em>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: artY }} className="relative hidden justify-center lg:flex">
          <HeroIllustration />
        </motion.div>
        {/* Mobile: show compact illustration below CTAs */}
        <div className="relative flex justify-center lg:hidden">
          <HeroIllustration />
        </div>
      </div>

      <motion.a
        href="#featured"
        aria-label="Scroll down"
        className="absolute bottom-[22px] left-1/2 z-[3] -translate-x-1/2 text-2xl text-white"
        animate={reduce ? {} : { y: [0, 10, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <ChevronDown />
      </motion.a>

      <AnimatePresence>{modal && <DemoModal onClose={() => setModal(false)} />}</AnimatePresence>
    </section>
  );
}
