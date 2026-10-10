"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import toast from "react-hot-toast";

export function scrollToContactWithHighlight() {
  const target = document.getElementById("contact");
  const card = document.getElementById("contact-form-card");
  const firstInput = document.getElementById("demo-name") as HTMLInputElement | null;
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  toast("👋 Fill in your details below!", { duration: 2600 });
  if (card) {
    card.animate(
      [
        { boxShadow: "0 12px 40px rgba(26,35,126,0.16)", borderColor: "#e5e7eb" },
        { boxShadow: "0 0 0 5px rgba(255,111,0,0.55)", borderColor: "#FF6F00" },
        { boxShadow: "0 0 0 0px rgba(255,111,0,0)", borderColor: "#e5e7eb" },
        { boxShadow: "0 0 0 5px rgba(255,111,0,0.55)", borderColor: "#FF6F00" },
        { boxShadow: "0 12px 40px rgba(26,35,126,0.16)", borderColor: "#e5e7eb" },
      ],
      { duration: 2000, easing: "ease-in-out" }
    );
    setTimeout(() => firstInput?.focus({ preventScroll: true }), 800);
  }
}

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "accent" | "ghost" | "outline" | "white";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
};

const styles: Record<string, string> = {
  accent: "bg-accent text-white shadow-glow hover:bg-accentDark",
  ghost: "bg-white/10 text-white border-white/50 backdrop-blur-md border-2 hover:bg-white/20",
  outline: "bg-white text-primary border-primary border-2 hover:bg-primary hover:text-white",
  white: "bg-white text-primary hover:bg-bg",
};

export default function AnimatedButton({
  children,
  href,
  variant = "accent",
  className = "",
  onClick,
  type = "button",
  ariaLabel,
  disabled = false,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const spawnRipple = (e: React.MouseEvent) => {
    const el = ref.current as HTMLElement | null;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "btn-ripple";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    span.style.background = "rgba(255,255,255,0.5)";
    el.appendChild(span);
    span.animate(
      [
        { transform: "scale(0)", opacity: 0.5 },
        { transform: "scale(4)", opacity: 0 },
      ],
      { duration: 600, easing: "ease-out" }
    ).onfinish = () => span.remove();
  };

  const cls = `relative inline-flex min-h-[52px] items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-transparent px-8 py-[15px] font-poppins text-base font-bold transition-colors ${styles[variant]} ${className}`;

  const motionProps = reduce
    ? {}
    : { whileHover: { scale: 1.03, y: -3 }, whileTap: { scale: 0.96 } };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={cls}
        {...motionProps}
        onMouseDown={spawnRipple}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${cls} disabled:cursor-not-allowed disabled:opacity-60`}
      {...motionProps}
      onMouseDown={spawnRipple}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
