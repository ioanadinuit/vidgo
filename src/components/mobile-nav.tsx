"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MobileNavProps {
  links: { text: string; href: string }[];
  labels: { open: string; close: string; bookDemo: string; menu: string };
  langSwitch: { href: string; code: string; label: string };
  startHref: string;
}

/** Phone-width menu: a plain list under the bar, nothing animated to trap focus. */
export function MobileNav({ links, labels, langSwitch, startHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <XIcon /> : <MenuIcon />}
      </Button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 border-b border-border/40 bg-background/95 px-4 pb-6 pt-2 backdrop-blur-xl"
        >
          <nav aria-label={labels.menu} className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-base font-medium"
              >
                {link.text}
              </Link>
            ))}
            <Link
              href={langSwitch.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-3 text-base font-medium text-muted-foreground"
              aria-label={langSwitch.label}
            >
              {langSwitch.code} · {langSwitch.label}
            </Link>
          </nav>
          <Button className="mt-4 w-full" asChild>
            <a href={startHref} rel="noopener" target="_blank">
              {labels.bookDemo}
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
