"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
import AnimatedButton, { scrollToContactWithHighlight } from "./ui/AnimatedButton";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#results", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [seats, setSeats] = useState(3);

  useEffect(() => {
    let tick = 0;
    const onScroll = () => {
      cancelAnimationFrame(tick);
      tick = requestAnimationFrame(() => setScrolled(window.scrollY > 80));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(tick);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSeats((s) => (s <= 1 ? 3 : s - 1)), 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const bar = useMemo(
    () => (
      <motion.header
        initial={reduce ? {} : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-x-0 top-0 z-[90] transition-all ${
          scrolled ? "bg-white/85 shadow-soft backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-4">
          <a href="#home" aria-label="BrightPath Academy home" className="flex min-w-0 items-center gap-2.5 font-poppins text-lg font-extrabold">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primaryLight text-xl shadow-soft">
              <GraduationCap className="h-6 w-6 text-accent" aria-hidden />
            </span>
            <span className={`truncate ${scrolled ? "text-primary" : "text-white"}`}>
              Bright<span className="text-accent">Path</span> Academy
            </span>
          </a>
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex gap-7">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setActive(l.href)}
                    className={`relative py-1 text-[0.95rem] font-medium ${scrolled ? "text-ink" : "text-white"} ${active === l.href ? "text-accent" : ""}`}
                  >
                    {l.label}
                    {active === l.href && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-accent"
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:block">
            <AnimatedButton className="cta-pulse !min-h-[44px] !px-6 !py-3 !text-sm" onClick={scrollToContactWithHighlight} ariaLabel="Book free demo">
              Book Free Demo ·{" "}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={seats}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="inline-block min-w-[1ch] text-center"
                  aria-label={`${seats} seats left (sample)`}
                >
                  {seats}
                </motion.span>
              </AnimatePresence>
              <span className="sr-only">(Sample urgency counter)</span>
            </AnimatedButton>
          </div>
          <button
            className={`grid h-11 w-11 place-items-center rounded-lg md:hidden ${scrolled ? "text-primary" : "text-white"}`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>
    ),
    [scrolled, active, open, reduce, seats]
  );

  return (
    <>
      {bar}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[150] bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              aria-label="Mobile menu"
              className="fixed right-0 top-0 z-[200] flex h-screen w-[80%] max-w-[320px] flex-col bg-white shadow-lift md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <span className="font-poppins text-base font-extrabold text-primary">Menu</span>
                <button
                  className="grid h-10 w-10 place-items-center rounded-lg text-primary hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-2">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[52px] items-center border-b border-gray-100 font-semibold text-ink hover:text-accent"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="border-t border-gray-100 px-5 py-5">
                <AnimatedButton
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(scrollToContactWithHighlight, 250);
                  }}
                >
                  Book Free Demo
                </AnimatedButton>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
