"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Facebook, Instagram, Youtube } from "lucide-react";
import AnimatedButton, { scrollToContactWithHighlight } from "./ui/AnimatedButton";

export default function Footer() {
  const reduce = useReducedMotion();
  const col = (i: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay: i * 0.12 },
  });

  return (
    <footer className="bg-deep pt-16 text-indigo-200">
      <div className="mx-auto grid max-w-[1180px] gap-9 px-6 md:grid-cols-3">
        <motion.div {...col(0)}>
          <span className="mb-3 flex items-center gap-2.5 font-poppins text-lg font-extrabold text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primaryLight">
              <GraduationCap className="h-6 w-6 text-accent" aria-hidden />
            </span>
            Bright<span className="-ml-2 text-accent">Path</span> Academy
          </span>
          <p className="text-sm">Chennai&apos;s friendly coaching for Class 10–12, NEET &amp; JEE foundations. Small batches, big results — first demo free.</p>
          <div className="mt-3.5 flex gap-2.5">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href="#"
                aria-label={s.label}
                whileHover={reduce ? {} : { scale: 1.2, rotate: -5, backgroundColor: "#FF6F00" }}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
              >
                <s.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div {...col(1)}>
          <h4 className="mb-3.5 font-poppins font-bold text-white">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[["#home", "Home"], ["#courses", "Courses"], ["#results", "Results"], ["#pricing", "Pricing"], ["#contact", "Contact"]].map(([h, l]) => (
              <li key={h}><a href={h} className="hover:text-accent">{l}</a></li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...col(2)}>
          <h4 className="mb-3.5 font-poppins font-bold text-white">Contact (Sample)</h4>
          <ul className="space-y-2.5 text-sm">
            <li>📍 Anna Nagar East, Chennai – 600102</li>
            <li>📞 +91 9XXXX XXXXX</li>
            <li>📧 info@brightpathacademy.in</li>
          </ul>
          <AnimatedButton className="cta-pulse mt-3.5 !min-h-[44px] !px-6 !py-3 !text-sm" onClick={scrollToContactWithHighlight}>
            Book Free Demo
          </AnimatedButton>
        </motion.div>
      </div>
      <motion.div
        initial={reduce ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-11 border-t border-white/10 px-6 py-5 text-center text-xs text-indigo-300"
      >
        © 2024 BrightPath Academy, Chennai. This is a fictional website created for educational purposes only. All names, stats, prices &amp; testimonials are sample data.
      </motion.div>
    </footer>
  );
}
