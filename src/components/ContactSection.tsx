"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import SectionHeading from "./ui/SectionHeading";

const schema = z.object({
  name: z.string().min(3, "Please enter the full name (min 3 chars)."),
  phone: z.string().refine((v) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, "").replace(/^91/, "")), "Enter a valid 10-digit Indian mobile number."),
  sclass: z.string().min(1, "Please select a class."),
  interests: z.array(z.string()).min(1, "Select at least one subject."),
  batch: z.string().min(1),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const STEPS = ["Your details", "Class & subjects", "Finish & submit"];

export default function ContactSection() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const { register, control, handleSubmit, trigger, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", sclass: "", interests: [], batch: "Evening 4–7 PM (Weekdays)", message: "" },
    mode: "onTouched",
  });

  const next = async () => {
    const fields = step === 0 ? (["name", "phone"] as const) : (["sclass", "interests"] as const);
    const ok = await trigger(fields);
    if (ok) {
      setDone(false);
      setStep((s) => Math.min(s + 1, 2));
    } else {
      setShakeKey((k) => k + 1);
    }
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);
    // 1. confetti burst FIRST
    if (!reduce) {
      confetti({ particleCount: 130, spread: 75, origin: { y: 0.7 }, colors: ["#1A237E", "#FF6F00", "#FFB74D", "#ffffff"] });
      setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 }, colors: ["#1A237E", "#FF6F00"] }), 250);
      setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 }, colors: ["#1A237E", "#FF6F00"] }), 400);
    }
    setTimeout(() => {
      // 2. button morphs into checkmark
      setLoading(false);
      setDone(true);
      toast.success("Demo booked! Taking you to confirmation…", { duration: 2500 });
      try {
        sessionStorage.setItem("brightpath-booking", JSON.stringify({ name: data.name, sclass: data.sclass }));
      } catch { /* storage unavailable — URL params still carry the data */ }
      // 3. after 1.5s → thank-you route with personalisation params
      setTimeout(() => {
        const q = new URLSearchParams({ name: data.name, class: data.sclass }).toString();
        router.push(`/thank-you?${q}`);
      }, 1500);
      reset();
      setStep(0);
    }, 1400);
  };

  const onInvalid = () => setShakeKey((k) => k + 1);

  const wa = () => {
    window.open("https://wa.me/919XXXXXXXXX", "_blank", "noopener");
    toast("💬 Opening WhatsApp... (Sample number)", { duration: 2600 });
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-bg py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionHeading eyebrow="Get In Touch" title="Book Your Free Demo Class" subtitle="Fill the form — we'll call you within 24 hours. (Demo form, no backend.)" />
        <div className="mt-11 grid items-start gap-8 lg:grid-cols-2">
          <motion.div initial={reduce ? {} : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-[18px]">
            <div className="rounded-card bg-white p-7 shadow-soft">
              <h3 className="flex items-center gap-2 font-poppins text-lg font-bold"><MapPin className="text-accent" /> Visit Us</h3>
              <p className="mt-2 text-gray-700">12, Anna Nagar East,<br />Chennai – 600102 <small className="text-muted">(Sample address)</small></p>
              <p className="mt-2 flex items-center gap-2 text-gray-700"><Phone className="h-4 w-4 text-accent" /> <a href="tel:+919XXXXXXXXX" className="font-semibold text-primary">+91 9XXXX XXXXX</a> <small className="text-muted">(Sample)</small></p>
              <p className="mt-2 flex items-center gap-2 text-gray-700"><Mail className="h-4 w-4 text-accent" /> <a href="mailto:info@brightpathacademy.in" className="font-semibold text-primary">info@brightpathacademy.in</a> <small className="text-muted">(Sample)</small></p>
              <motion.button
                onClick={wa}
                animate={reduce ? {} : { scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1DA851]"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </motion.button>
            </div>
            <motion.div
              initial={reduce ? {} : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-card shadow-soft"
            >
              <iframe title="Map placeholder — Chennai, Anna Nagar" loading="lazy" className="block h-[220px] w-full border-0" src="https://www.google.com/maps?q=Anna+Nagar+East+Chennai&output=embed" />
            </motion.div>
          </motion.div>

          <motion.div
            id="contact-form-card"
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-card border-2 border-gray-200 bg-white p-7 shadow-lift md:p-8"
          >
            <h3 className="font-poppins text-xl font-bold">Enquiry Form</h3>
            <p className="mb-5 text-sm text-muted">All sample data — nothing is sent anywhere.</p>

            <div className="mb-6 flex gap-2" aria-label={`Step ${step + 1} of 3`}>
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1">
                  <motion.div
                    animate={{ scaleX: i <= step ? 1 : 0.4, opacity: i <= step ? 1 : 0.4 }}
                    className="h-2 origin-left rounded-full bg-accent"
                    title={s}
                  />
                  <p className={`mt-1 text-[0.7rem] font-semibold ${i === step ? "text-accent" : "text-muted"}`}>{s}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate aria-label="Free demo booking form">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${step}-${shakeKey}`}
                  initial={{ x: 60, opacity: 0 }}
                  animate={shakeKey ? { x: [0, 10, -10, 10, -10, 0], opacity: 1 } : { x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {step === 0 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="demo-name" className="mb-1.5 block text-sm font-semibold">Full Name <i className="not-italic text-red-500">*</i></label>
                        <input id="demo-name" {...register("name")} placeholder="e.g. Lakshmi Narayanan" autoComplete="name"
                          className="min-h-[48px] w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3.5 py-3 text-[0.95rem] focus:border-primary focus:bg-white focus:outline-none" />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="demo-phone" className="mb-1.5 block text-sm font-semibold">Parent&apos;s Phone <i className="not-italic text-red-500">*</i></label>
                        <input id="demo-phone" {...register("phone")} inputMode="tel" placeholder="+91 9XXXX XXXXX" autoComplete="tel"
                          className="min-h-[48px] w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3.5 py-3 text-[0.95rem] focus:border-primary focus:bg-white focus:outline-none" />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                      </div>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="demo-class" className="mb-1.5 block text-sm font-semibold">Student&apos;s Class <i className="not-italic text-red-500">*</i></label>
                        <select id="demo-class" {...register("sclass")} className="min-h-[48px] w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3.5 py-3 focus:border-primary focus:bg-white focus:outline-none">
                          <option value="">— Select class —</option>
                          <option>Class 10</option><option>Class 11</option><option>Class 12</option><option>Dropper / Repeater</option>
                        </select>
                        {errors.sclass && <p className="mt-1 text-xs text-red-600">{errors.sclass.message}</p>}
                      </div>
                      <div>
                        <span className="mb-1.5 block text-sm font-semibold">Subject Interest <i className="not-italic text-red-500">*</i></span>
                        <Controller
                          name="interests"
                          control={control}
                          render={({ field }) => (
                            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Subject interest">
                              {["Maths", "Science", "NEET", "JEE"].map((s) => (
                                <motion.label
                                  key={s}
                                  whileTap={{ scale: 0.95 }}
                                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium ${field.value.includes(s) ? "border-accent bg-accent/10 text-accent" : "border-gray-200 bg-bg text-ink"}`}
                                >
                                  <input
                                    type="checkbox"
                                    value={s}
                                    checked={field.value.includes(s)}
                                    onChange={(e) => field.onChange(e.target.checked ? [...field.value, s] : field.value.filter((v: string) => v !== s))}
                                    className="accent-[#FF6F00]"
                                  /> {s}
                                </motion.label>
                              ))}
                            </div>
                          )}
                        />
                        {errors.interests && <p className="mt-1 text-xs text-red-600">{errors.interests.message as string}</p>}
                      </div>
                      <div>
                        <label htmlFor="demo-batch" className="mb-1.5 block text-sm font-semibold">Preferred Batch Time</label>
                        <select id="demo-batch" {...register("batch")} className="min-h-[48px] w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3.5 py-3 focus:border-primary focus:bg-white focus:outline-none">
                          <option>Evening 4–7 PM (Weekdays)</option><option>Morning 7–10 AM (Weekends)</option><option>Online — flexible</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="demo-msg" className="mb-1.5 block text-sm font-semibold">Message (optional)</label>
                        <textarea id="demo-msg" {...register("message")} rows={4} placeholder="Any question for our counsellor?"
                          className="min-h-[100px] w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3.5 py-3 focus:border-primary focus:bg-white focus:outline-none" />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={reduce ? {} : { scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-poppins font-bold text-white shadow-glow hover:bg-accentDark disabled:opacity-70"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {loading ? (
                            <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block">
                                <Loader2 className="h-5 w-5" />
                              </motion.span> Booking...
                            </motion.span>
                          ) : done ? (
                            <motion.span key="done" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" /> Booked!
                            </motion.span>
                          ) : (
                            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              Book My Free Demo Class →
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex gap-3">
                {step > 0 && (
                  <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex min-h-[48px] items-center gap-1 rounded-full border-2 border-primary px-6 font-poppins text-sm font-bold text-primary hover:bg-primary hover:text-white">
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                )}
                {step < 2 && (
                  <button type="button" onClick={next} className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-1 rounded-full bg-primary px-6 font-poppins text-sm font-bold text-white hover:bg-deep">
                    Continue <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="overflow-hidden"
                  >
                    <div role="status" className="mt-4 rounded-xl border-2 border-success bg-green-50 p-[18px] text-center font-semibold text-green-800">
                      ✅ Thank you! We&apos;ll call you within 24 hours to confirm your FREE demo. (Demo message — no data was sent.)
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
