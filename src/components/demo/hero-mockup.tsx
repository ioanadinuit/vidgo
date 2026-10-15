"use client";

import { motion } from "motion/react";
import {
  BoxesIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

import { BorderBeam } from "@/components/velora/border-beam";
import { BrowserMockup } from "@/components/velora/browser-mockup";
import { NumberTicker } from "@/components/velora/number-ticker";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboardIcon, label: "Panou", active: true },
  { icon: ShoppingCartIcon, label: "Comenzi" },
  { icon: BoxesIcon, label: "Produse" },
  { icon: FileTextIcon, label: "Facturi" },
  { icon: UsersIcon, label: "Clienți" },
  { icon: SettingsIcon, label: "Setări" },
];

const stats = [
  { label: "Comenzi, ultimele 30 de zile", value: 1284, prefix: "", suffix: "", change: "+12,4%" },
  { label: "Vânzări", value: 214380, prefix: "", suffix: " lei", change: "+8,1%" },
  { label: "Facturi emise automat", value: 1284, prefix: "", suffix: "", change: "100%" },
];

const bars = [38, 62, 48, 74, 56, 88, 66, 92, 60, 78, 84, 98];

/**
 * The shop admin, sketched in markup: sidebar, three counters, a monthly
 * chart. No screenshot to age, nothing to load.
 */
export function HeroMockup({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-5xl", className)}>
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[2rem] bg-gradient-to-r from-brand-from via-brand-via to-brand-to opacity-20 blur-3xl"
      />

      <BrowserMockup url="magazinul-tau.ro/admin" className="relative">
        <BorderBeam size={96} duration={10} colorFrom="#174B9A" colorTo="#FD6208" />

        <div className="flex">
          <aside className="hidden w-44 flex-col gap-1 border-r border-border/60 p-3 md:flex">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-xs",
                  item.active ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </span>
            ))}
          </aside>

          <div className="flex-1 p-4 lg:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">Panou</span>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Ultimele 30 de zile
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/60 bg-background/40 p-3 lg:p-4">
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-base font-semibold lg:text-xl">
                    <NumberTicker value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-500">
                    <TrendingUpIcon className="size-3" />
                    {stat.change}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-border/60 bg-background/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium">Comenzi pe lună</span>
                <span className="text-[11px] text-muted-foreground">2026</span>
              </div>
              <div className="flex h-32 items-end gap-2 lg:h-40">
                {bars.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-brand-from to-brand-via"
                    style={{ height: `${height}%`, opacity: 0.5 + height / 200 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </BrowserMockup>
    </div>
  );
}
