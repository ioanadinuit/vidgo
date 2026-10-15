"use client";

import { useRef, type Ref } from "react";
import {
  CloudIcon,
  FileTextIcon,
  MailIcon,
  ShoppingBagIcon,
  TruckIcon,
  WalletIcon,
} from "lucide-react";

import { AnimatedBeam } from "@/components/velora/animated-beam";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

function Node({
  ref,
  className,
  label,
  children,
}: {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={ref}
      title={label}
      className={cn(
        "z-10 flex size-13 items-center justify-center rounded-full border bg-card shadow-lg [&_svg]:size-5",
        className,
      )}
    >
      {children}
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** What the shop talks to, drawn as beams into the platform. */
export function IntegrationsBeam({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const left1 = useRef<HTMLDivElement>(null);
  const left2 = useRef<HTMLDivElement>(null);
  const left3 = useRef<HTMLDivElement>(null);
  const right1 = useRef<HTMLDivElement>(null);
  const right2 = useRef<HTMLDivElement>(null);
  const right3 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex h-96 w-full items-center justify-between px-2 sm:px-8", className)}
    >
      <div className="flex h-full flex-col justify-between py-6">
        <Node ref={left1} label="Stripe: plăți cu cardul">
          <WalletIcon className="text-muted-foreground" />
        </Node>
        <Node ref={left2} label="e-Factura: XML pentru SPV">
          <FileTextIcon className="text-muted-foreground" />
        </Node>
        <Node ref={left3} label="Cloudflare: DNS și protecție">
          <CloudIcon className="text-muted-foreground" />
        </Node>
      </div>

      <Node ref={centerRef} label="VidGo" className="size-18 border-primary/40 bg-primary/10 shadow-primary/20">
        <BrandMark className="size-10" />
      </Node>

      <div className="flex h-full flex-col justify-between py-6">
        <Node ref={right1} label="Email: comenzi, facturi, recuperare coș">
          <MailIcon className="text-muted-foreground" />
        </Node>
        <Node ref={right2} label="Google Merchant: feed de produse">
          <ShoppingBagIcon className="text-muted-foreground" />
        </Node>
        <Node ref={right3} label="Curieri: AWB prin Innoship, în lucru">
          <TruckIcon className="text-muted-foreground" />
        </Node>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={left1} toRef={centerRef} curvature={-60} />
      <AnimatedBeam containerRef={containerRef} fromRef={left2} toRef={centerRef} delay={1} />
      <AnimatedBeam containerRef={containerRef} fromRef={left3} toRef={centerRef} curvature={60} delay={2} />
      <AnimatedBeam containerRef={containerRef} fromRef={right1} toRef={centerRef} curvature={-60} reverse delay={0.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={right2} toRef={centerRef} reverse delay={1.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={right3} toRef={centerRef} curvature={60} reverse delay={2.5} />
    </div>
  );
}
