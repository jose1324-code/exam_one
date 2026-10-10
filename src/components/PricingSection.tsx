"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { Check } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import AnimatedButton, { scrollToContactWithHighlight } from "./ui/AnimatedButton";

const PLANS = [
  { name: "STARTER", sub: "Class 10", price: 2500, popular: false, feats: ["All subjects covered", "Study material included", "Weekly tests", "Doubt sessions"] },
  { name: "Class 11 & 12 Science", sub: "Boards + Foundation", price: 3500, popular: true, feats: ["Everything in Starter", "Sunday mock tests", "Parent progress reports", "1-on-1 doubt sessions"] },
  { name: "NEET / JEE INTENSIVE", sub: "Entrance + Boards", price: 4500, popular: false, feats: ["Full coaching + test series", "Personal mentoring", "Past-paper marathons", "Parent counselling"] },
];

export default function PricingSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="bg-white py-[clamp(40px,8vw,96px)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
        <SectionHeading eyebrow="Pricing — Sample / Indicative" title="Transparent Pricing" subtitle="No hidden fees. Sample / indicative prices only." />
        <div ref={ref} className="mt-8 grid gap-5 sm:mt-11 sm:gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduce ? {} : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={reduce ? {} : { y: -6 }}
              animate={
                p.popular && !reduce
                  ? { boxShadow: ["0 4px 24px rgba(26,35,126,0.08)", "0 12px 44px rgba(255,111,0,0.35)", "0 4px 24px rgba(26,35,126,0.08)"] }
                  : {}
              }
              transition={{ duration: 0.55, ...(p.popular && !reduce ? { boxShadow: { duration: 2, repeat: Infinity } } : { delay: i * 0.12 }) }}
              className={`relative flex flex-col rounded-card bg-white p-6 text-center shadow-soft sm:p-8 ${
                p.popular ? "border-[3px] border-accent lg:scale-[1.03]" : "border border-gray-100"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-[18px] py-1.5 font-grotesk text-xs font-bold tracking-wider text-white">
                  ⭐ MOST POPULAR
                </span>
              )}
              <h3 className="font-poppins text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-muted">{p.sub}</p>
              <div className="mb-1 mt-3 font-poppins text-4xl font-extrabold text-primary">
                ₹
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={p.price} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    {inView ? <CountUp end={p.price} duration={1.4} separator="," /> : 0}
                  </motion.span>
                </AnimatePresence>
              </div>
              <small className="text-muted">/month (Sample)</small>
              <ul className="mb-6 mt-4 flex-1 text-left">
                {p.feats.map((f) => (
                  <li key={f} className="flex items-start gap-2 border-b border-gray-100 py-2.5 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <motion.span whileTap={{ scale: 0.96 }} className="block">
                <AnimatedButton variant={p.popular ? "accent" : "outline"} className="w-full" onClick={scrollToContactWithHighlight}>
                  Book Demo
                </AnimatedButton>
              </motion.span>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm italic text-muted">Prices are indicative samples only. Contact us for actual fee structure.</p>
      </div>
    </section>
  );
}
