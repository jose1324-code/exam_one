"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import SectionHeading from "./ui/SectionHeading";

const STATS = [
  { value: 1200, suffix: "+", label: "Students Enrolled", decimals: 0 },
  { value: 42, suffix: "", label: "NEET Selections 2024", decimals: 0 },
  { value: 98, suffix: "%", label: "Board Pass Rate", decimals: 0 },
  { value: 4.9, suffix: "★", label: "Parent Rating", decimals: 1 },
];

export default function StatsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const orbs = useMemo(
    () => [
      { cls: "left-[8%] top-[12%] h-56 w-56 bg-indigo-500/30", dur: 9 },
      { cls: "right-[6%] top-[30%] h-72 w-72 bg-accent/20", dur: 12 },
      { cls: "bottom-[8%] left-[40%] h-44 w-44 bg-white/10", dur: 7 },
    ],
    []
  );

  return (
    <section id="results" className="relative overflow-hidden bg-gradient-to-br from-deep via-primary to-deep py-[clamp(48px,8vw,96px)] text-center text-white">
      {!reduce &&
        orbs.map((o, i) => (
          <motion.div
            key={i}
            aria-hidden
            className={`absolute rounded-full blur-[70px] ${o.cls}`}
            animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      {/* geometric outline shapes, slow rotation */}
      {!reduce && (
        <>
          <motion.svg aria-hidden viewBox="0 0 100 100" className="absolute right-[4%] top-[6%] h-[300px] w-[300px] opacity-[0.06]"
            animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none" stroke="#fff" strokeWidth="2" />
          </motion.svg>
          <motion.svg aria-hidden viewBox="0 0 100 100" className="absolute bottom-[6%] left-[3%] h-[200px] w-[200px] opacity-[0.08]"
            animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            <circle cx="50" cy="50" r="44" fill="none" stroke="#fff" strokeWidth="2" />
          </motion.svg>
          <motion.svg aria-hidden viewBox="0 0 100 100" className="absolute left-[42%] top-[36%] h-[250px] w-[250px] opacity-[0.05]"
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <polygon points="50,8 92,88 8,88" fill="none" stroke="#fff" strokeWidth="2" />
          </motion.svg>
        </>
      )}
      {Array.from({ length: 15 }).map((_, i) =>
        reduce ? null : (
          <motion.span
            key={`p-${i}`}
            aria-hidden
            className="absolute rounded-full bg-white/40"
            style={{ left: `${(i * 61) % 100}%`, top: `${(i * 37) % 100}%`, width: 3 + (i % 2), height: 3 + (i % 2) }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity }}
          />
        )
      )}
      <div ref={ref} className="relative mx-auto max-w-[1180px] px-6">
        <SectionHeading dark eyebrow="Results — Sample Data" title="Results That Speak (Sample Data)" />
        <div className="mt-11 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? {} : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={reduce ? {} : { scale: 1.04, borderColor: "#FF6F00" }}
              className="rounded-card border border-white/15 bg-white/[0.08] p-8 backdrop-blur-md"
            >
              <div className="font-poppins text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold text-accentSoft">
                {inView ? (
                  <CountUp end={s.value} decimals={s.decimals} duration={1.6} separator="," />
                ) : (
                  <>0</>
                )}
                {inView && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.6, type: "spring", stiffness: 300 }}
                    className="inline-block"
                  >
                    {s.suffix}
                  </motion.span>
                )}
              </div>
              <p className="mt-1.5 text-indigo-200">
                {s.label}
                <br />
                <small>(Sample)</small>
              </p>
            </motion.div>
          ))}
        </div>
        <p className="mt-7 text-sm italic text-indigo-300">
          * All statistics above are sample / illustrative data for demonstration purposes only.
        </p>
      </div>
    </section>
  );
}
