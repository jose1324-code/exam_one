"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import confetti from "canvas-confetti";

/* Small helper: fire confetti from a mouse event point */
function burstAt(e: React.MouseEvent, colors = ["#1A237E", "#FF6F00", "#FFB74D", "#ffffff"]) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  confetti({ particleCount: 80, spread: 60, origin: { x, y }, colors });
}

function Tooltip({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileHover={{ opacity: 1, y: 0 }}
      className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-deep px-3 py-1 text-[11px] font-bold text-white opacity-0 shadow-lift group-hover:opacity-100"
    >
      {text}
    </motion.span>
  );
}

export default function HeroIllustration() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [bulbFlash, setBulbFlash] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [speech, setSpeech] = useState(false);
  const [trophyStars, setTrophyStars] = useState<number[]>([]);
  const [entered, setEntered] = useState(false);

  const anim = (a: object) => (reduce ? {} : a);

  const onStudentClick = useCallback(
    (e: React.MouseEvent) => {
      burstAt(e);
      setSpeech(true);
      setTimeout(() => setSpeech(false), 2000);
    },
    []
  );

  const onBulbClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setBulbFlash(true);
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    confetti({ particleCount: 24, spread: 100, startVelocity: 22, scalar: 0.7, ticks: 80, origin: { x, y }, colors: ["#FFD54F", "#FF6F00", "#ffffff"] });
    setTimeout(() => setBulbFlash(false), 320);
  }, []);

  const onTrophyHover = useCallback(() => {
    if (reduce) return;
    const id = Date.now();
    setTrophyStars((s) => [...s.slice(-4), id]);
    setTimeout(() => setTrophyStars((s) => s.filter((v) => v !== id)), 1200);
  }, [reduce]);

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[520px]" role="img" aria-label="Cheerful cartoon student studying at a desk surrounded by floating books, science symbols and trophies">
      {/* ═══ LAYER 0 — background glow circles ═══ */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div className="absolute right-[2%] top-[2%] h-[200px] w-[200px] rounded-full bg-primary blur-[60px]"
          {...anim({ animate: { scale: [1, 1.12, 1], opacity: [0.15, 0.22, 0.15] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } })} />
        <motion.div className="absolute bottom-[4%] left-[0%] h-[160px] w-[160px] rounded-full bg-accent blur-[60px]"
          {...anim({ animate: { scale: [1, 1.12, 1], opacity: [0.15, 0.22, 0.15] }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } })} />
        <motion.div className="absolute left-[30%] top-[30%] h-[180px] w-[180px] rounded-full bg-purple-500 blur-[60px]"
          {...anim({ animate: { scale: [1, 1.12, 1], opacity: [0.12, 0.2, 0.12] }, transition: { duration: 10, repeat: Infinity, ease: "easeInOut" } })} />
      </div>

      {/* ═══ MAIN SVG SCENE 520×420 ═══ */}
      <motion.svg
        viewBox="0 0 520 420"
        className="relative z-10 w-full drop-shadow-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        onAnimationComplete={() => setEntered(true)}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB74D" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
          <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7E9D4" />
            <stop offset="100%" stopColor="#EDD7B8" />
          </linearGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="260" cy="392" rx="180" ry="16" fill="rgba(0,0,0,0.28)" />

        {/* ═══ LAYER 1 — DESK ═══ */}
        <g>
          <rect x="150" y="352" width="18" height="42" rx="8" fill="#8D6E63" />
          <rect x="352" y="352" width="18" height="42" rx="8" fill="#8D6E63" />
          <rect x="96" y="300" width="328" height="58" rx="16" fill="url(#deskGrad)" />
          <rect x="96" y="300" width="328" height="12" rx="6" fill="#F9EEDC" opacity="0.7" />

          {/* laptop */}
          <g>
            <rect x="180" y="238" width="110" height="66" rx="8" fill="#1A237E" />
            <rect x="188" y="246" width="94" height="50" rx="5" fill="#E8EAF6" />
            {/* animated mini bar chart */}
            {!reduce && entered ? (
              <>
                <motion.rect x="198" y="262" width="14" fill="#FF6F00" rx="3"
                  initial={{ height: 8 }} animate={{ height: [14, 26, 18] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
                <motion.rect x="218" y="262" width="14" fill="#1A237E" rx="3"
                  initial={{ height: 8 }} animate={{ height: [24, 12, 28] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
                <motion.rect x="238" y="262" width="14" fill="#10B981" rx="3"
                  initial={{ height: 8 }} animate={{ height: [18, 30, 16] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
              </>
            ) : (
              <>
                <rect x="198" y="268" width="14" height="20" fill="#FF6F00" rx="3" />
                <rect x="218" y="262" width="14" height="26" fill="#1A237E" rx="3" />
                <rect x="238" y="266" width="14" height="22" fill="#10B981" rx="3" />
              </>
            )}
            <rect x="206" y="254" width="58" height="5" rx="2.5" fill="#9FA8DA" />
            <rect x="168" y="302" width="134" height="8" rx="4" fill="#283593" />
            <circle cx="235" cy="292" r="3" fill="#FF6F00" />
          </g>

          {/* succulent */}
          <g>
            <ellipse cx="132" cy="300" rx="20" ry="5" fill="rgba(0,0,0,0.12)" />
            <path d="M122 300 h20 l-3 24 h-14 z" fill="#EF6C00" />
            <ellipse cx="132" cy="300" rx="12" ry="3" fill="#D84315" />
            <ellipse cx="132" cy="282" rx="7" ry="14" fill="#26A69A" />
            <ellipse cx="123" cy="287" rx="6" ry="11" fill="#4DB6AC" transform="rotate(-24 123 287)" />
            <ellipse cx="141" cy="287" rx="6" ry="11" fill="#00897B" transform="rotate(24 141 287)" />
          </g>

          {/* stack of 3 books */}
          <g>
            <rect x="330" y="286" width="66" height="14" rx="4" fill="#1A237E" />
            <rect x="334" y="272" width="58" height="14" rx="4" fill="#FF6F00" />
            <rect x="330" y="258" width="66" height="14" rx="4" fill="#0D9488" />
            <rect x="338" y="261" width="30" height="4" rx="2" fill="#fff" opacity="0.8" />
            <rect x="342" y="275" width="30" height="4" rx="2" fill="#fff" opacity="0.8" />
          </g>

          {/* pencil holder */}
          <g>
            <rect x="402" y="272" width="26" height="30" rx="5" fill="#3949AB" />
            <rect x="406" y="252" width="5" height="24" rx="2" fill="#FFD54F" transform="rotate(8 406 252)" />
            <rect x="414" y="250" width="5" height="26" rx="2" fill="#EF5350" transform="rotate(-6 414 250)" />
            <rect x="421" y="254" width="5" height="22" rx="2" fill="#26A69A" transform="rotate(12 421 254)" />
          </g>
        </g>

        {/* ═══ LAYER 2 — STUDENT ═══ */}
        <motion.g {...anim({ animate: { x: [-1, 1, -1] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } })}>
          {/* torso uniform */}
          <rect x="222" y="196" width="76" height="110" rx="22" fill="#1A237E" />
          <path d="M246 198 L260 216 L274 198 L268 198 L260 208 L252 198 Z" fill="#ffffff" />
          {/* left arm resting */}
          <rect x="196" y="214" width="34" height="66" rx="17" fill="#283593" transform="rotate(18 196 214)" />
          <circle cx="222" cy="282" r="10" fill="#E8B48C" />
          {/* right arm raised with pencil */}
          <motion.g {...anim({ animate: { y: [0, -4, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } })}>
            <rect x="292" y="200" width="32" height="62" rx="16" fill="#283593" transform="rotate(-24 292 200)" />
            <circle cx="316" cy="200" r="10" fill="#E8B48C" />
            {/* glowing pencil */}
            <g transform="rotate(-30 316 190)">
              <rect x="310" y="160" width="10" height="34" rx="3" fill="#FFD54F" />
              <rect x="310" y="152" width="10" height="8" rx="2" fill="#F48FB1" />
              <path d="M310 194 L315 202 L320 194 Z" fill="#1C1C2E" />
            </g>
            <circle cx="315" cy="177" r="12" fill="#FF6F00" opacity="0.25">
              {!reduce && <animate attributeName="r" values="10;15;10" dur="2.5s" repeatCount="indefinite" />}
            </circle>
          </motion.g>

          {/* head */}
          <motion.g
            style={{ originX: "260px", originY: "170px" }}
            {...anim({ animate: { rotate: [-2, 2, -2] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } })}
          >
            <circle cx="260" cy="140" r="52" fill="#F2C29B" />
            {/* hair */}
            <path d="M210 132 Q212 84 260 82 Q308 84 310 132 Q296 108 284 112 Q278 96 260 96 Q242 96 236 112 Q224 108 210 132 Z" fill="#2B2B3A" />
            <circle cx="226" cy="96" r="10" fill="#2B2B3A" />
            <circle cx="294" cy="96" r="10" fill="#2B2B3A" />
            {/* eyes with blink */}
            <motion.g style={{ originX: "260px", originY: "140px" }} {...anim({ animate: { scaleY: [1, 1, 0.06, 1, 1] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } })}>
              <circle cx="242" cy="142" r="11" fill="#ffffff" />
              <circle cx="278" cy="142" r="11" fill="#ffffff" />
              <circle cx="244" cy="144" r="5" fill="#1C1C2E" />
              <circle cx="280" cy="144" r="5" fill="#1C1C2E" />
              <circle cx="246" cy="142" r="1.8" fill="#ffffff" />
              <circle cx="282" cy="142" r="1.8" fill="#ffffff" />
            </motion.g>
            {/* cheeks */}
            <motion.g {...anim({ animate: { opacity: [0.4, 0.65, 0.4] }, transition: { duration: 3, repeat: Infinity } })}>
              <circle cx="228" cy="158" r="7" fill="#F48FB1" opacity="0.6" />
              <circle cx="292" cy="158" r="7" fill="#F48FB1" opacity="0.6" />
            </motion.g>
            {/* smile */}
            <path d="M246 162 Q260 174 274 162" stroke="#7B4B2A" strokeWidth="4" strokeLinecap="round" fill="none" />
          </motion.g>
        </motion.g>

        {/* dotted paper-plane trail */}
        <polyline points="0,330 120,260 260,140 420,170" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" opacity="0.45" />
      </motion.svg>

      {/* ═══ LAYER 5 — invisible click zone + speech bubble ═══ */}
      <button
        onClick={onStudentClick}
        aria-label="Say hello to the student — click for confetti"
        className="absolute left-1/2 top-[8%] z-20 h-[62%] w-[46%] -translate-x-1/2 cursor-pointer rounded-full bg-transparent"
      />
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            className="absolute left-1/2 top-[2%] z-30 -translate-x-1/2 whitespace-nowrap rounded-2xl rounded-bl-sm bg-white px-4 py-2 font-poppins text-sm font-bold text-primary shadow-lift"
          >
            Let&apos;s study! 📚
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ LAYER 3 — floating study objects (HTML overlays) ═══ */}
      {/* 1 — book */}
      <motion.div
        className="group absolute left-[0%] top-[16%] z-20 cursor-pointer"
        {...anim({ animate: { y: [0, -16, 0], rotate: [-4, 4, -4] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } })}
        whileHover={{ scale: 1.15, rotate: 8 }}
      >
        <Tooltip text="Study Smart!" />
        <svg width="72" height="52" viewBox="0 0 72 52">
          <path d="M4 8 Q20 2 36 8 L36 44 Q20 38 4 44 Z" fill="#fff" stroke="#1A237E" strokeWidth="2.5" />
          <path d="M68 8 Q52 2 36 8 L36 44 Q52 38 68 44 Z" fill="#fff" stroke="#1A237E" strokeWidth="2.5" />
          <rect x="34" y="6" width="4" height="40" fill="#1A237E" />
          <rect x="36" y="6" width="7" height="22" fill="#FF6F00" />
          <line x1="10" y1="18" x2="28" y2="22" stroke="#9FA8DA" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="26" x2="28" y2="30" stroke="#9FA8DA" strokeWidth="2" strokeLinecap="round" />
          <line x1="44" y1="22" x2="62" y2="18" stroke="#9FA8DA" strokeWidth="2" strokeLinecap="round" />
          <line x1="44" y1="30" x2="62" y2="26" stroke="#9FA8DA" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* 2 — grad cap */}
      <motion.div
        className="group absolute right-[2%] top-[6%] z-20 cursor-pointer"
        {...anim({ animate: { y: [0, -20, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } })}
        whileHover={{ scale: 1.2 }}
      >
        <motion.div {...anim({ animate: { rotateY: [0, 15, 0] }, transition: { duration: 5, repeat: Infinity } })}>
          <Tooltip text="Graduate!" />
          <svg width="76" height="60" viewBox="0 0 76 60">
            <polygon points="38,4 72,18 38,32 4,18" fill="#1A237E" />
            <rect x="28" y="26" width="20" height="14" rx="3" fill="#283593" />
            <line x1="66" y1="18" x2="66" y2="40" stroke="#FF6F00" strokeWidth="3" strokeLinecap="round" />
            <circle cx="66" cy="44" r="5" fill="#FF6F00" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 3 — atom */}
      <motion.div
        className="absolute right-[0%] top-[42%] z-20"
        {...anim({ animate: { x: [0, 10, 0], y: [0, -8, 0] }, transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } })}
      >
        <svg width="70" height="70" viewBox="0 0 70 70">
          <motion.ellipse cx="35" cy="35" rx="28" ry="11" fill="none" stroke="#0D9488" strokeWidth="2.5"
            {...anim({ animate: { rotate: 360 }, transition: { duration: 6, repeat: Infinity, ease: "linear" } })} style={{ originX: "35px", originY: "35px" }} />
          <motion.ellipse cx="35" cy="35" rx="28" ry="11" fill="none" stroke="#0D9488" strokeWidth="2.5" transform="rotate(60 35 35)"
            {...anim({ animate: { rotate: [60, 420] }, transition: { duration: 8, repeat: Infinity, ease: "linear" } })} style={{ originX: "35px", originY: "35px" }} />
          <motion.ellipse cx="35" cy="35" rx="28" ry="11" fill="none" stroke="#0D9488" strokeWidth="2.5" transform="rotate(120 35 35)"
            {...anim({ animate: { rotate: [120, 480] }, transition: { duration: 10, repeat: Infinity, ease: "linear" } })} style={{ originX: "35px", originY: "35px" }} />
          <circle cx="35" cy="35" r="7" fill="#FF6F00" />
          <circle cx="33" cy="33" r="2" fill="#fff" />
        </svg>
      </motion.div>

      {/* 4 — math card (flippable) */}
      <motion.div
        className="group absolute left-[38%] top-[0%] z-20 cursor-pointer"
        {...anim({ animate: { y: [0, -14, 0], rotate: [-3, 3, -3] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 } })}
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
      >
        <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.45 }} style={{ transformStyle: "preserve-3d" }}
          className="rounded-xl border-2 border-primary bg-white px-3.5 py-2 shadow-soft">
          {!flipped ? (
            <p className="font-grotesk text-sm font-bold text-primary">E = mc² <span className="text-accent">· ∫f(x)dx</span></p>
          ) : (
            <p className="font-grotesk text-sm font-bold text-success" style={{ transform: "rotateY(180deg)" }}>✓ Solved!</p>
          )}
        </motion.div>
      </motion.div>

      {/* 5 — star badge */}
      <motion.div
        className="absolute left-[4%] top-[2%] z-20"
        {...anim({ animate: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }, transition: { duration: 3, repeat: Infinity } })}
      >
        <div className="rounded-full bg-gradient-to-br from-amber-300 to-amber-500 px-3.5 py-1.5 font-poppins text-sm font-extrabold text-deep shadow-glow">
          ★ 4.9 <span className="text-[10px] font-semibold">(Sample)</span>
        </div>
      </motion.div>

      {/* 6 — lightbulb (clickable) */}
      <motion.button
        onClick={onBulbClick}
        aria-label="Click the idea bulb"
        className="group absolute left-[16%] top-[34%] z-20"
        {...anim({ animate: { y: [0, -10, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } })}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
      >
        <Tooltip text="Click for ideas!" />
        <svg width="54" height="72" viewBox="0 0 54 72">
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 27 + Math.cos(a) * 20;
            const y1 = 24 + Math.sin(a) * 20;
            const x2 = 27 + Math.cos(a) * 25;
            const y2 = 24 + Math.sin(a) * 25;
            return <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFB74D" strokeWidth="3" strokeLinecap="round"
              {...anim({ animate: { opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }, transition: { duration: 2, repeat: Infinity, delay: i * 0.12 } })} />;
          })}
          <circle cx="27" cy="26" r="16" fill={bulbFlash ? "#ffffff" : "#FFD54F"} stroke="#FF6F00" strokeWidth="3" />
          <rect x="20" y="42" width="14" height="12" rx="3" fill="#9AA0B4" />
          <rect x="22" y="54" width="10" height="5" rx="2" fill="#6B7280" />
        </svg>
      </motion.button>

      {/* 7 — trophy */}
      <motion.div
        className="group absolute bottom-[16%] right-[4%] z-20 cursor-pointer"
        onHoverStart={onTrophyHover}
        {...anim({ animate: { y: [0, -12, 0], rotate: [-2, 2, -2] }, transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 } })}
        whileHover={{ scale: 1.25 }}
      >
        <Tooltip text="You can win!" />
        <svg width="58" height="66" viewBox="0 0 58 66">
          <path d="M16 8 h26 v16 q0 14 -13 16 q-13 -2 -13 -16 z" fill="url(#goldGrad)" />
          <path d="M16 12 q-12 0 -10 12 q2 9 12 8" fill="none" stroke="#E65100" strokeWidth="4" strokeLinecap="round" />
          <path d="M42 12 q12 0 10 12 q-2 9 -12 8" fill="none" stroke="#E65100" strokeWidth="4" strokeLinecap="round" />
          <text x="29" y="30" textAnchor="middle" fontSize="14" fill="#fff">★</text>
          <rect x="25" y="40" width="8" height="10" fill="#8D6E63" />
          <rect x="18" y="50" width="22" height="8" rx="3" fill="#4E342E" />
        </svg>
        <AnimatePresence>
          {trophyStars.map((id) => (
            <motion.span key={id} initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -46, scale: 1.1 }}
              exit={{ opacity: 0 }} transition={{ duration: 1.1 }} className="absolute left-1/2 top-0 text-sm text-amber-400">★</motion.span>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 8 — paper plane on bezier arc */}
      {!reduce && (
        <motion.div
          className="absolute left-0 top-0 z-20"
          initial={false}
          animate={{ x: [-20, 300, 540], y: [300, 80, 200], rotate: [10, -8, 12], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          whileHover={{ scale: 1.3 }}
        >
          <svg width="46" height="30" viewBox="0 0 46 30">
            <polygon points="2,16 44,2 28,28 24,17" fill="#ffffff" stroke="#1A237E" strokeWidth="2" strokeLinejoin="round" />
            <line x1="24" y1="17" x2="44" y2="2" stroke="#5C6BC0" strokeWidth="1.5" />
          </svg>
        </motion.div>
      )}

      {/* ═══ LAYER 4 — glass stat cards ═══ */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={entered ? { x: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
        className="absolute -left-2 top-[30%] z-30 md:-left-8"
      >
        <motion.div
          {...anim({ animate: { y: [0, -10, 0] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } })}
          whileHover={{ scale: 1.06, rotate: -2 }}
          className="rounded-[20px] border border-white/60 bg-white/90 p-[14px_20px] shadow-[0_8px_32px_rgba(26,35,126,0.18)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-base">🎓</span>
            <div>
              <p className="font-poppins text-xl font-bold leading-none text-primary">
                <CountUp end={42} duration={1.8} enableScrollSpy scrollSpyOnce /> 
              </p>
              <p className="text-xs text-muted">NEET Selections</p>
              <p className="text-[10px] font-semibold text-accent">2024 (Sample)</p>
            </div>
          </div>
          <motion.div initial={{ width: 0 }} animate={entered ? { width: "80%" } : {}} transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-2 h-[3px] rounded-full bg-accent" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={entered ? { x: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.3 }}
        className="absolute -right-2 bottom-[10%] z-30 md:-right-6"
      >
        <motion.div
          {...anim({ animate: { y: [0, -14, 0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 } })}
          whileHover={{ scale: 1.06, rotate: 2 }}
          className="rounded-[20px] border border-white/60 bg-white/90 p-[14px_20px] shadow-[0_8px_32px_rgba(26,35,126,0.18)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-base">🚀</span>
            <div>
              <p className="font-poppins text-xl font-bold leading-none text-primary">
                <CountUp end={28} duration={1.8} enableScrollSpy scrollSpyOnce />
              </p>
              <p className="text-xs text-muted">JEE Qualifiers</p>
              <p className="text-[10px] font-semibold text-accent">(Sample)</p>
            </div>
          </div>
          <motion.div initial={{ width: 0 }} animate={entered ? { width: "70%" } : {}} transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-2 h-[3px] rounded-full bg-primary" />
        </motion.div>
      </motion.div>

      {/* Card C — A+ pill */}
      <motion.div
        initial={{ scale: 0 }}
        animate={entered ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.6 }}
        className="absolute bottom-[2%] left-[6%] z-30"
      >
        <motion.span
          {...anim({ animate: { y: [0, -8, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 } })}
          className="inline-block rounded-full bg-gradient-to-br from-accent to-[#FF8F00] px-4 py-1.5 font-poppins text-sm font-bold text-white shadow-glow"
        >
          ⭐ A+ Grade
        </motion.span>
      </motion.div>
    </div>
  );
}
