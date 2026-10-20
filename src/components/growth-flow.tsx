"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { SearchIcon, UsersIcon, ShoppingBagIcon, ArrowRightIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n";

function Count({ value, prefix = "", suffix = "", active, delay }: { value: number; prefix?: string; suffix?: string; active: boolean; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!active || reduced) return;
    const control = animate(0, value, { duration: 1.3, delay, ease: "easeOut", onUpdate: v => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString("ro-RO") + suffix;
    }});
    return () => control.stop();
  }, [active, reduced, value, prefix, suffix, delay]);
  return <span ref={ref}>{prefix}{value.toLocaleString("ro-RO")}{suffix}</span>;
}

export function GrowthFlow({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0, margin: "-38% 0px -38% 0px" });
  const t = (ro: string, en: string) => locale === "ro" ? ro : en;
  return <div ref={ref} className="growth-flow" data-active={active ? "" : undefined}>
    <div className="growth-flow-heading"><span>{t("De la vizibilitate la comenzi", "From visibility to orders")}</span><small>{t("Rezultate măsurate + scenariu de potențial", "Measured results + potential scenario")}</small></div>
    <div className="growth-steps">
      <article className="growth-step growth-visibility">
        <div className="growth-step-label"><SearchIcon aria-hidden="true" size={20}/><span>{t("01 · Vizibilitate", "01 · Visibility")}</span></div>
        <div className="growth-value">50 <span className="growth-arrow">→</span> <Count value={18} active={active} delay={.2}/></div>
        <p>{t("Poziție Google · de la 50 la 18 în 3 luni · 17 octombrie 2026", "Google position · from 50 to 18 in 3 months · 17 October 2026")}</p>
        <svg className="growth-chart" viewBox="0 0 260 90" role="img" aria-label={t("Vizibilitate în creștere", "Growing visibility")}><path className="growth-chart-grid" d="M0 20H260M0 50H260M0 80H260"/><path className="growth-chart-area" d="M0 80L35 71L70 74L105 53L140 48L175 32L210 29L255 8V90H0Z"/><path className="growth-chart-line" pathLength="1" d="M0 80L35 71L70 74L105 53L140 48L175 32L210 29L255 8"/><circle className="growth-chart-dot" cx="255" cy="8" r="4"/></svg>
        <small>{t("Măsurat · Google Search Console", "Measured · Google Search Console")}</small>
      </article>
      <div className="growth-connector" aria-hidden="true"><i/><ArrowRightIcon size={20}/></div>
      <article className="growth-step growth-traffic">
        <div className="growth-step-label"><UsersIcon aria-hidden="true" size={20}/><span>{t("02 · Trafic", "02 · Traffic")}</span></div>
        <div className="growth-word">{t("Mai mulți vizitatori", "More visitors")}</div>
        <p>{t("Potențial de creștere: +300%", "Potential growth: +300%")}</p>
        <div className="growth-bars" aria-hidden="true">{[22,30,27,40,49,46,62,72,85,100].map((h,i)=><span key={i} style={{ height: h + "%", animationDelay: (1+i*.09)+"s" }}/>)}</div>
        <small>{t("Ilustrație de potențial · fără prognoză de volum", "Potential illustration · no volume forecast")}</small>
      </article>
      <div className="growth-connector" aria-hidden="true"><i/><ArrowRightIcon size={20}/></div>
      <article className="growth-step growth-orders">
        <div className="growth-step-label"><ShoppingBagIcon aria-hidden="true" size={20}/><span>{t("03 · Comenzi", "03 · Orders")}</span></div>
        <div className="growth-value"><Count value={5} prefix="+" suffix="%" active={active} delay={2}/></div>
        <p>{t("Ipoteză conservatoare în simulare", "Conservative assumption for this scenario")}</p>
        <div className="growth-revenue"><Count value={10000} prefix="+" suffix=" €" active={active} delay={2.4}/><span>{t("vânzări suplimentare / an", "additional sales / year")}</span></div>
        <small>{t("La 200.000 € / an, aceeași valoare medie a comenzii", "At €200,000 / year, unchanged average order value")}</small>
      </article>
    </div>
    <p className="growth-footnote">{t("Platforma oferă baza tehnică. Creșterea efectivă depinde și de oferta magazinului, conținut și marketing.", "The platform provides the technical foundation. Actual growth also depends on the store’s offer, content and marketing.")}</p>
  </div>;
}
