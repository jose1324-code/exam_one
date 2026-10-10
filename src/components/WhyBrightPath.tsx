"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

/* Mini illustrated SVG icons (30×30) drawn in navy/white/accent */
function CapIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <polygon points="15,4 28,10 15,16 2,10" fill="#fff" />
      <rect x="11" y="14" width="8" height="7" rx="1.5" fill="#FFB74D" />
      <line x1="25" y1="10" x2="25" y2="19" stroke="#FFB74D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="25" cy="21" r="2" fill="#FFB74D" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="5" y="18" width="5" height="7" rx="1.5" fill="#fff" opacity="0.7" />
      <rect x="12.5" y="13" width="5" height="12" rx="1.5" fill="#fff" opacity="0.85" />
      <rect x="20" y="7" width="5" height="18" rx="1.5" fill="#FFB74D" />
      <path d="M4 8 L13 12 L19 7 L26 9" stroke="#FFB74D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polygon points="26,9 23,9.5 25,12" fill="#FFB74D" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <circle cx="10" cy="11" r="4.5" fill="#fff" />
      <path d="M2.5 24 Q2.5 17.5 10 17.5 Q17.5 17.5 17.5 24 Z" fill="#fff" opacity="0.85" />
      <circle cx="20.5" cy="12" r="3.8" fill="#FFB74D" />
      <path d="M14.5 24 Q14.8 18.5 20.5 18.5 Q26.5 18.5 26.5 24 Z" fill="#FFB74D" opacity="0.9" />
    </svg>
  );
}
function HybridIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="4" y="7" width="22" height="13" rx="2.5" fill="#fff" />
      <rect x="6.5" y="9.5" width="17" height="8" rx="1.5" fill="#1A237E" />
      <rect x="2" y="21" width="26" height="3" rx="1.5" fill="#FFB74D" />
      <path d="M12 5 Q15 2 18 5" stroke="#FFB74D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="15" cy="3.4" r="1.3" fill="#FFB74D" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <path d="M15 3 L25 7 V14 Q25 22 15 27 Q5 22 5 14 V7 Z" fill="#fff" />
      <path d="M11 14.5 L14 17.5 L19.5 11" stroke="#10B981" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BubbleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <path d="M4 6 h22 v13 h-13 l-5 5 v-5 h-4 z" fill="#fff" rx="2" />
      <path d="M11 12.5 L14 15.5 L19.5 9.5" stroke="#FF6F00" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  { Icon: CapIcon, anim: "draw", title: "Expert Faculty", desc: "IIT & AIIMS alumni with 10+ years teaching experience in every classroom." },
  { Icon: ChartIcon, anim: "bounce", title: "Data-Driven Learning", desc: "Weekly tests, analytics dashboards and gap identification for each student." },
  { Icon: PeopleIcon, anim: "bounce", title: "Small Batches", desc: "Max 20 students per batch for true personal attention and doubt-clearing." },
  { Icon: HybridIcon, anim: "draw", title: "Hybrid Classes", desc: "Attend from campus or from home — your choice, same quality, live interaction." },
  { Icon: ShieldIcon, anim: "draw", title: "Safe Environment", desc: "CCTV-monitored campus in Anna Nagar, Chennai with verified staff & support." },
  { Icon: BubbleIcon, anim: "bounce", title: "Parent Updates", desc: "Weekly progress reports sent directly to parents via SMS & WhatsApp." },
];

function Particles() {
  const reduce = useReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${(i * 67) % 100}%`,
        top: `${(i * 41) % 100}%`,
        size: 2 + ((i * 7) % 3),
        dur: 4 + ((i * 13) % 5),
      })),
    []
  );
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ x: [0, 18, -12, 0], y: [0, -22, 10, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function WhyBrightPath() {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="relative overflow-hidden py-[clamp(48px,8vw,96px)]">
      <Particles />
      <div className="relative mx-auto max-w-[1180px] px-6">
        <SectionHeading
          eyebrow="Why BrightPath"
          title="Why Parents Choose BrightPath"
          subtitle="Personal attention, proven methods and constant parent partnership — everything your child needs to top boards & crack entrances."
        />
        <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={reduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              whileHover={reduce ? {} : { y: -8, borderColor: "#FF6F00", boxShadow: "0 12px 40px rgba(26,35,126,0.16)" }}
              className="group rounded-card border-2 border-transparent bg-white p-[30px_26px] shadow-soft"
            >
              <motion.span
                className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-primaryLight text-white"
                whileHover={reduce ? {} : f.anim === "bounce" ? { scale: [1, 1.25, 1], y: [0, -6, 0] } : { rotate: [0, 10, -10, 0], scale: 1.15 }}
              >
                <f.Icon />
              </motion.span>
              <h3 className="font-poppins text-[1.08rem] font-bold">{f.title}</h3>
              <p className="mt-2 text-[0.93rem] text-muted">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
