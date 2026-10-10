"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import { X, MessageCircle, GraduationCap } from "lucide-react";
import { scrollToContactWithHighlight } from "./ui/AnimatedButton";

/** Sticky bottom-right demo banner (desktop) + WhatsApp float + mobile CTA */
export default function StickyBanners() {
  const reduce = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [waHover, setWaHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setShowMobile(true), 3000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const openWa = () => {
    window.open("https://wa.me/919XXXXXXXXX", "_blank", "noopener");
    toast("💬 Opening WhatsApp... (Sample number)", { duration: 2600 });
  };

  return (
    <>
      {/* Desktop sticky demo banner */}
      <AnimatePresence>
        {pastHero && !dismissed && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="fixed bottom-24 right-5 z-50 hidden max-w-xs items-center gap-3 rounded-2xl bg-accent p-4 text-deep shadow-lift md:flex"
            role="complementary"
            aria-label="Seats filling fast banner"
          >
            <GraduationCap className="h-8 w-8 shrink-0" aria-hidden />
            <button onClick={scrollToContactWithHighlight} className="text-left font-poppins text-sm font-bold leading-snug">
              🎓 Seats filling fast — Book your FREE demo →
            </button>
            <button onClick={() => setDismissed(true)} aria-label="Dismiss banner" className="rounded-full bg-black/10 p-1">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={reduce ? { duration: 0 } : { delay: 2, type: "spring", stiffness: 260, damping: 18 }}
        onClick={openWa}
        onMouseEnter={() => setWaHover(true)}
        onMouseLeave={() => setWaHover(false)}
        aria-label="Chat with us on WhatsApp"
        className="ring-ping fixed bottom-24 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift md:bottom-6"
      >
        <MessageCircle className="h-7 w-7" />
        <AnimatePresence>
          {waHover && (
            <motion.span
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              className="absolute right-16 whitespace-nowrap rounded-full bg-deep px-3.5 py-1.5 text-xs font-bold text-white"
            >
              Chat with us!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile floating CTA */}
      <AnimatePresence>
        {showMobile && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={
              reduce
                ? { y: 0, opacity: 1 }
                : {
                    y: 0,
                    opacity: 1,
                    boxShadow: ["0 10px 30px rgba(255,111,0,.5)", "0 10px 44px rgba(255,111,0,.8)", "0 10px 30px rgba(255,111,0,.5)"],
                  }
            }
            transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 260, damping: 22, boxShadow: { duration: 2, repeat: Infinity } }}
            exit={{ y: 80, opacity: 0 }}
            onClick={scrollToContactWithHighlight}
            aria-label="Book free demo"
            className="fixed inset-x-4 bottom-4 z-[90] rounded-full bg-accent p-4 font-poppins font-bold text-white md:hidden"
          >
            Book Free Demo →
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
