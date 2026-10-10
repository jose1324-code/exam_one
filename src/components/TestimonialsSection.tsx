"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const DATA = [
  { initials: "AS", color: "#1A237E", name: "Parent of Arjun S., Class 12", quote: "Weekly reports kept us stress-free. Arjun's physics scores jumped from 70s to 90s in three months." },
  { initials: "PK", color: "#FF6F00", name: "Parent of Priya K., Class 10", quote: "Small batch of 18 meant every doubt was answered. The free demo itself convinced us to join." },
  { initials: "MR", color: "#10B981", name: "Parent of Meera R., NEET", quote: "Sunday mocks + NCERT deep-dives built real exam temperament. Wonderful mentoring and care." },
  { initials: "DV", color: "#7C3AED", name: "Parent of Deepak V., JEE", quote: "Problem-solving sessions are superb. Faculty personally called us every month with a clear plan." },
];

function Stars() {
  const reduce = useReducedMotion();
  return (
    <div className="mb-2 tracking-[2px] text-amber-500" aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? {} : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 12 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, reduce ? [] : [Autoplay({ delay: 4500, stopOnInteraction: true })]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="bg-bg py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionHeading eyebrow="Sample Testimonials" title="What Parents Say" subtitle="Real-feel, fictional quotes for demo purposes." />
        <div className="mx-auto mt-2 max-w-2xl rounded-xl border border-amber-500 bg-amber-100 p-3 text-center text-sm font-semibold text-amber-900">
          ⚠ Sample testimonials — not real individuals. For illustration only.
        </div>

        <div className="embla mt-8" ref={emblaRef} role="region" aria-label="Parent testimonials carousel" tabIndex={0}>
          <div className="embla__container pb-2 pt-2">
            {DATA.map((t) => (
              <article key={t.name} className="embla__slide relative overflow-hidden rounded-card border border-gray-100 bg-white p-7 shadow-soft">
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-8 select-none font-poppins text-[160px] font-extrabold leading-none text-primary"
                  style={{ opacity: 0.06 }}
                  animate={reduce ? {} : { scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  &rdquo;
                </motion.span>
                <div className="mb-3 flex items-center gap-3">
                  <motion.span
                    whileHover={reduce ? {} : { scale: 1.12, rotate: 6 }}
                    className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full font-poppins text-lg font-bold text-white"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </motion.span>
                  <div>
                    <b className="block text-[0.95rem]">{t.name}</b>
                    <small className="text-xs text-muted">(Sample)</small>
                  </div>
                </div>
                <Stars />
                <p className="text-[0.92rem] text-gray-700">&ldquo;{t.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-2" role="tablist" aria-label="Carousel navigation">
          {DATA.map((_, i) => (
            <motion.button
              key={i}
              layout
              role="tab"
              aria-selected={selected === i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              animate={{ width: selected === i ? 28 : 10 }}
              className={`h-2.5 rounded-full ${selected === i ? "bg-accent" : "bg-indigo-200"}`}
            />
          ))}
        </div>
        <div className="mt-3.5 flex justify-center gap-2.5">
          <motion.button
            whileHover={reduce ? {} : { scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
          >
            <ChevronLeft />
          </motion.button>
          <motion.button
            whileHover={reduce ? {} : { scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
          >
            <ChevronRight />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
