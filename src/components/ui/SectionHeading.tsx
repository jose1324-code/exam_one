"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  align?: "center" | "left";
};

export default function SectionHeading({ eyebrow, title, subtitle, dark = false, align = "center" }: Props) {
  const reduce = useReducedMotion();
  const anim = reduce ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6 } };
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <motion.div {...anim} className={`flex max-w-2xl flex-col ${alignCls}`}>
      <span className="mb-4 inline-block rounded-full bg-accent/10 px-[18px] py-2 font-grotesk text-xs font-semibold uppercase tracking-[2px] text-accent">
        {eyebrow}
      </span>
      <h2 className={`font-poppins text-[clamp(1.6rem,4vw,2.5rem)] font-bold leading-tight ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {subtitle ? <p className={`mt-3 ${dark ? "text-indigo-200" : "text-muted"}`}>{subtitle}</p> : null}
    </motion.div>
  );
}
