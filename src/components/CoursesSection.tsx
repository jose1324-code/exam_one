"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import AnimatedButton, { scrollToContactWithHighlight } from "./ui/AnimatedButton";

type Filter = "All" | "Class 10" | "NEET" | "JEE";

type Course = {
  tag: string;
  title: string;
  filter: Exclude<Filter, "All"> | "Class 10";
  seats: string;
  banner: string;
  emoji: string;
  hoverAnim: "spin" | "bounce" | "pulse";
  rows: [string, string][];
  syllabus: string;
  faculty: string;
  schedule: string;
};

const COURSES: Course[] = [
  {
    tag: "CLASS 10 FOUNDATION",
    title: "Class 10 — All Subjects",
    filter: "Class 10",
    seats: "3 Seats Left (Sample)",
    banner: "#0D9488",
    emoji: "📐",
    hoverAnim: "bounce",
    rows: [["Subjects", "Maths, Science, English, Social"], ["Duration", "April – March (Full Year)"], ["Batch size", "Max 20 students"], ["Timing", "4 PM – 7 PM (Weekdays)"]],
    syllabus: "Full CBSE + State Board syllabus, chapter-wise assignments, monthly revision marathons and 20 board-pattern mock papers.",
    faculty: "Senior school faculty with 10+ yrs average experience; dedicated mentor per 10 students.",
    schedule: "Mon–Fri 4–7 PM · Sat doubt clinic 10 AM · Monthly parent review.",
  },
  {
    tag: "CLASS 11 & 12 SCIENCE",
    title: "Class 11 & 12 Science",
    filter: "Class 10",
    seats: "5 Seats Left (Sample)",
    banner: "#7C3AED",
    emoji: "🔬",
    hoverAnim: "spin",
    rows: [["Subjects", "Physics, Chemistry, Maths / Biology"], ["Duration", "Full academic year + revision"], ["Board", "CBSE & State Board"], ["Timing", "Evenings + weekend tests"]],
    syllabus: "Board + foundation bridge: NCERT mastery, derivations lab, numerical drills and pre-board crash series.",
    faculty: "IIT/NIT & MSc-PhD faculty; weekly error-log reviews with each student.",
    schedule: "Evenings 5–8 PM · Sunday mock 9 AM · Daily practice problems.",
  },
  {
    tag: "NEET FOUNDATION",
    title: "NEET Foundation (Class 11–12)",
    filter: "NEET",
    seats: "2 Seats Left (Sample)",
    banner: "#059669",
    emoji: "🩺",
    hoverAnim: "pulse",
    rows: [["Subjects", "Physics, Chemistry, Biology"], ["Special", "Mock tests every Sunday, NCERT deep-dive"], ["Batch size", "Max 20 students"], ["Bonus", "AIIMS alumni mentoring"]],
    syllabus: "Line-by-line NCERT biology, assertion-reason drills, 40 NEET-pattern mocks and AIIMS alumni strategy sessions.",
    faculty: "AIIMS/MAMC alumni for Biology; IIT alumni for Physics problem clinics.",
    schedule: "Mon–Sat 4–8 PM · Sunday NEET mock 9 AM–12 PM.",
  },
  {
    tag: "JEE MAINS FOUNDATION",
    title: "JEE Mains Foundation",
    filter: "JEE",
    seats: "4 Seats Left (Sample)",
    banner: "#2563EB",
    emoji: "⚙️",
    hoverAnim: "spin",
    rows: [["Subjects", "Physics, Chemistry, Maths"], ["Special", "Problem-solving sessions, past paper analysis"], ["Batch size", "Max 20 students"], ["Bonus", "IIT alumni mentoring"]],
    syllabus: "JEE Mains 10-yr PYQ bank, speed-accuracy labs, rank-predictor mocks and IIT alumni problem-solving nights.",
    faculty: "IIT Madras alumni core team; personal rank-improvement plan per student.",
    schedule: "Mon–Sat 4–8 PM · Sunday JEE mock · Daily 1-hr DPP discussion.",
  },
];

const FILTERS: Filter[] = ["All", "Class 10", "NEET", "JEE"];

export default function CoursesSection() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const visible = COURSES.filter((c) => filter === "All" || c.filter === filter);

  return (
    <section id="courses" className="bg-white py-[clamp(40px,8vw,96px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
        <SectionHeading eyebrow="Programmes" title="Our Programmes" subtitle="Foundation to intensive — pick the batch that fits your child's goal." />

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3" role="tablist" aria-label="Filter courses">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 font-poppins text-xs font-bold transition-colors sm:px-6 sm:py-2.5 sm:text-sm ${filter === f ? "text-white" : "bg-bg text-primary hover:bg-indigo-100"}`}
            >
              {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" />}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                layout
                key={c.title}
                initial={reduce ? {} : { opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                whileHover={reduce ? {} : { y: -6, boxShadow: "0 12px 40px rgba(26,35,126,0.16)" }}
                className="group relative overflow-hidden rounded-card border border-gray-100 bg-white shadow-soft"
              >
                {/* course image banner: 80px, pattern + large icon */}
                <div className="relative flex h-[80px] w-full items-center justify-center overflow-hidden" style={{ background: c.banner }} aria-hidden>
                  <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
                    <defs>
                      <pattern id={`dots-${i}`} width="22" height="22" patternUnits="userSpaceOnUse">
                        <circle cx="3" cy="3" r="2" fill="#ffffff" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${i})`} />
                  </svg>
                  <motion.span
                    className="relative text-5xl drop-shadow-lg"
                    whileHover={
                      reduce ? {} : c.hoverAnim === "spin" ? { rotate: 360, scale: 1.15 } : c.hoverAnim === "bounce" ? { y: [0, -10, 0], scale: 1.15 } : { scale: [1, 1.25, 1] }
                    }
                    transition={{ duration: 0.6 }}
                  >
                    {c.emoji}
                  </motion.span>
                </div>
                <div className="p-[20px_20px_24px] sm:p-[26px_26px_30px]">
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[6px] origin-top bg-accent"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                />
                <motion.span
                  aria-live="polite"
                  animate={reduce ? {} : { opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
                >
                  🟢 {c.seats}
                </motion.span>
                <p className="font-grotesk text-xs font-bold tracking-[1.5px] text-accent">{c.tag}</p>
                <h3 className="mb-3 mt-1.5 font-poppins text-xl font-bold">{c.title}</h3>
                <ul className="mb-5">
                  {c.rows.map(([k, v]) => (
                    <li key={k} className="border-b border-dashed border-gray-200 py-[7px] text-[0.92rem] text-gray-700">
                      <strong className="text-primary">{k}:</strong> {v}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <motion.span whileHover={reduce ? {} : { x: [0, 3, -3, 0], scale: 1.05 }} className="inline-block">
                    <AnimatedButton className="!min-h-[44px] !px-6 !py-2.5 !text-sm" onClick={scrollToContactWithHighlight}>
                      Book Demo
                    </AnimatedButton>
                  </motion.span>
                  <motion.button
                    whileHover={reduce ? { x: 6 } : { x: 6 }}
                    onClick={() => setExpanded((e) => (e === c.title ? null : c.title))}
                    className="font-semibold text-accent hover:underline"
                    aria-expanded={expanded === c.title}
                  >
                    Know More <ArrowRight className="inline h-4 w-4" />
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded === c.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 rounded-xl bg-bg p-4 text-sm">
                        <p><strong className="text-primary">Syllabus:</strong> {c.syllabus}</p>
                        <p className="mt-2"><strong className="text-primary">Faculty:</strong> {c.faculty}</p>
                        <p className="mt-2"><strong className="text-primary">Schedule:</strong> {c.schedule}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
