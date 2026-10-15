"use client";

import {
  BoxesIcon,
  CreditCardIcon,
  FileTextIcon,
  MailCheckIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";

import { AnimatedList } from "@/components/velora/animated-list";
import { cn } from "@/lib/utils";

const notifications = [
  {
    icon: ShoppingCartIcon,
    tone: "bg-emerald-500/15 text-emerald-500",
    title: "Comandă nouă",
    description: "#2031 · 349 lei · plată cu cardul",
    time: "acum",
  },
  {
    icon: CreditCardIcon,
    tone: "bg-blue-500/15 text-blue-500",
    title: "Plată confirmată",
    description: "Stripe · webhook verificat",
    time: "acum 1 min",
  },
  {
    icon: FileTextIcon,
    tone: "bg-blue-500/15 text-blue-500",
    title: "Factură emisă",
    description: "F-2026-0417 · PDF trimis clientului",
    time: "acum 1 min",
  },
  {
    icon: MailCheckIcon,
    tone: "bg-amber-500/15 text-amber-500",
    title: "Coș recuperat",
    description: "Email de recuperare → comandă plasată",
    time: "acum 6 min",
  },
  {
    icon: StarIcon,
    tone: "bg-orange-500/15 text-orange-500",
    title: "Recenzie nouă",
    description: "5 stele, după emailul de după livrare",
    time: "acum 12 min",
  },
  {
    icon: BoxesIcon,
    tone: "bg-cyan-500/15 text-cyan-500",
    title: "Stoc actualizat",
    description: "184 produse din feed-ul furnizorului",
    time: "acum 24 min",
  },
];

/** What a shop day looks like when the platform does the work: a looping feed. */
export function ActivityList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-[26rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_65%,transparent)]",
        className,
      )}
    >
      <AnimatedList delay={1800}>
        {notifications.map((n) => (
          <div key={n.title} className="flex items-center gap-4 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
            <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", n.tone)}>
              <n.icon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center justify-between gap-2 text-sm font-medium">
                {n.title}
                <span className="shrink-0 text-xs font-normal text-muted-foreground">{n.time}</span>
              </p>
              <p className="truncate text-sm text-muted-foreground">{n.description}</p>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}
