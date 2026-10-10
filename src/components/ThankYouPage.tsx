"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import { Copy, Facebook, Home, Library, MessageCircle } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";
import AnimatedCheckmark from "./ui/AnimatedCheckmark";
import TimelineStep from "./ui/TimelineStep";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const INFO_ROWS = [
  "✅ Demo Class: FREE",
  "📞 We'll call within 24 hours",
  "📍 Anna Nagar East, Chennai (or Online — your choice)",
  "⏰ Mon–Sat, 9 AM – 7 PM",
];

const QUOTE = "Every expert was once a beginner. Your journey starts today.";

export default function ThankYouPage() {
  const reduce = useReducedMotion();
  const params = useSearchParams();
  const name = (params.get("name") || "").trim().slice(0, 40);
  const sclass = (params.get("class") || "").trim().slice(0, 30);
  const [quoteDone, setQuoteDone] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    const colors = ["#FF6F00", "#FFB74D", "#1A237E", "#ffffff", "#10B981"];
    confetti({ particleCount: 200, spread: 90, origin: { x: 0.5, y: 0.3 }, gravity: 0.8, scalar: 1.2, colors });
    const t1 = setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { x: 0.5, y: 0.4 }, colors }), 1200);
    const t2 = setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, colors });
      confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors });
    }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduce]);

  useEffect(() => {
    if (reduce) { setQuoteDone(true); return; }
    const t = setTimeout(() => setQuoteDone(true), 2500 + QUOTE.length * 30);
    return () => clearTimeout(t);
  }, [reduce]);

  const stars = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ left: `${(i * 83) % 100}%`, top: `${(i * 47 + 8) % 100}%`, dur: 3 + ((i * 7) % 4), delay: (i % 5) * 0.4 })),
    []
  );

  const shareWa = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent("I just booked a FREE demo at BrightPath Academy, Chennai! Check it out: brightpathacademy.in (sample link)")}`, "_blank", "noopener");
    toast("💬 Opening WhatsApp share...", { duration: 2400 });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      toast.success("✅ Link copied!");
    } catch {
      toast("Copy not available in this browser.", { duration: 2200 });
    }
  };

  return (
    <div className="hero-mesh relative min-h-screen overflow-hidden px-4 py-16 text-white">
      {/* bg mini floating items at 30% opacity */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <motion.span className="absolute left-[6%] top-[10%] text-4xl" animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity }}>📖</motion.span>
          <motion.span className="absolute right-[8%] top-[8%] text-4xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }}>🎓</motion.span>
          <motion.span className="absolute bottom-[12%] right-[10%] text-4xl" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>⚛️</motion.span>
          <motion.span className="absolute bottom-[14%] left-[8%] text-4xl" animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}>🏆</motion.span>
          {stars.map((s, i) => (
            <motion.span key={i} className="absolute text-sm text-amber-300" style={{ left: s.left, top: s.top }}
              animate={{ y: [0, -14, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}>★</motion.span>
          ))}
        </div>
      )}

      <motion.div
        variants={reduce ? {} : container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-[600px] rounded-[32px] border border-white/20 bg-white/[0.06] p-8 text-center backdrop-blur-[20px] md:p-14"
      >
        <motion.div variants={reduce ? {} : fadeUp} className="flex justify-center">
          <AnimatedCheckmark size={100} />
        </motion.div>

        <motion.div variants={reduce ? {} : fadeUp} className="mt-5 flex justify-center gap-3 text-4xl" aria-hidden>
          {["🎉", "🎓", "⭐"].map((e, i) => (
            <motion.span key={e}
              initial={reduce ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.3 + i * 0.12 }}
            >
              <motion.span className="block" animate={reduce ? {} : { y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                {e}
              </motion.span>
            </motion.span>
          ))}
        </motion.div>

        <motion.h1 variants={reduce ? {} : fadeUp} className="mt-4 font-poppins text-[2.4rem] font-bold leading-tight">
          You&apos;re In{name ? `, ${name}` : ""}! 🎊
        </motion.h1>
        <motion.p variants={reduce ? {} : fadeUp} className="mt-2 font-medium text-[#C5CAE9]">
          Your FREE demo class{sclass ? ` for ${sclass}` : ""} is booked.
        </motion.p>

        <motion.div variants={reduce ? {} : fadeUp} className="mt-6 rounded-2xl border-l-4 border-accent bg-deep/50 p-5 text-left">
          <p className="mb-3 font-poppins font-bold">📋 Booking Summary</p>
          <div className="mb-3 h-px bg-white/15" />
          {INFO_ROWS.map((row, i) => (
            <motion.p key={row}
              initial={reduce ? {} : { opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="py-1 text-[0.95rem] text-indigo-100"
            >
              {row}
            </motion.p>
          ))}
          <p className="mt-2 text-[11px] italic text-indigo-300">(Sample data — for illustration only.)</p>
        </motion.div>

        <motion.div variants={reduce ? {} : fadeUp} className="mt-7 text-left">
          <TimelineStep icon="📞" title="We'll call you within 24 hours" dotColor="#3B82F6" delay={1.2} />
          <TimelineStep icon="📅" title="Schedule your FREE demo class" dotColor="#FF6F00" delay={1.5} />
          <TimelineStep icon="🎓" title="Meet your mentor & start learning!" dotColor="#10B981" delay={1.8} last />
        </motion.div>

        <motion.div variants={reduce ? {} : fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <AnimatedButton href="/" variant="ghost" className="flex-1">
            <Home className="h-5 w-5" /> Back to Home
          </AnimatedButton>
          <AnimatedButton href="/#courses" variant="accent" className="flex-1">
            <Library className="h-5 w-5" /> Explore Courses →
          </AnimatedButton>
        </motion.div>

        <motion.div variants={reduce ? {} : fadeUp} className="mt-7 border-t border-white/15 pt-5">
          <p className="mb-3 text-sm text-indigo-200">Share BrightPath with a friend:</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={shareWa}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </motion.button>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#" onClick={(e) => e.preventDefault()}
              aria-label="Share on Facebook (placeholder)"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1877F2] px-4 py-2 text-sm font-bold text-white">
              <Facebook className="h-4 w-4" /> Facebook
            </motion.a>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={copyLink}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white hover:bg-white/25">
              <Copy className="h-4 w-4" /> Copy Link
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* motivational typewriter quote */}
      <div className="relative mx-auto mt-8 max-w-xl text-center font-poppins text-base italic text-white/70" aria-live="polite">
        {reduce || quoteDone
          ? QUOTE
          : QUOTE.split("").map((ch, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 + i * 0.03 }}>
                {ch}
              </motion.span>
            ))}
      </div>
    </div>
  );
}
