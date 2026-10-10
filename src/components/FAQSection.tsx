"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const FAQS = [
  { q: "Is the first demo class really free?", a: "Yes! Your first demo class is 100% free with no obligation. Just fill the enquiry form and we'll schedule it." },
  { q: "What board do you teach — CBSE or State Board?", a: "Both. We run separate batches for CBSE and Tamil Nadu State Board, with board-specific tests and material." },
  { q: "How many students are in each batch?", a: "Maximum 20 students per batch — that's a hard cap, so every child gets personal attention." },
  { q: "Do you provide study material?", a: "Yes. Printed notes, NCERT summaries, chapter-wise assignments and Sunday mock papers are all included." },
  { q: "Can my child attend both school and coaching?", a: "Absolutely. Evening (4–7 PM) and weekend batches are designed around school hours, plus hybrid online options." },
  { q: "Do you offer online classes?", a: "Yes — every batch is hybrid. Attend from campus in Anna Nagar or join the same live class from home." },
];

export default function FAQSection() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
        <div className="mx-auto mt-9 max-w-[760px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={reduce ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                animate={{ borderColor: isOpen ? "#FF6F00" : "transparent" }}
                className="mb-3 overflow-hidden rounded-2xl border-2 bg-bg"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-5 py-[18px] text-left font-poppins text-[0.98rem] font-semibold text-ink"
                >
                  {f.q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-2xl text-accent">
                    <Plus />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-[18px] text-[0.92rem] text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
