"use client";

import { useMemo, useState } from "react";

import type { PricingCalcCopy } from "@/content/types";
import { cn } from "@/lib/utils";

/** Price list. All amounts in EUR, without VAT. */
const PRICES = {
  threshold: 1_000_000,
  base: 300,
  /** Monthly licence once 1M EUR is reached, plus a step for each further million, up to 5M EUR. */
  atThreshold: 725,
  stepPerMillion: 80,
  /** From 5M EUR: the base licence plus 0.5% of yearly sales, uncapped, paid in monthly instalments. */
  commissionFrom: 5_000_000,
  commissionRate: 0.005,
  vat: 0.21,
  rate: 5,
  build: 250,
  infra: 500,
  integration: 250,
  bands: [
    { to: 1_000, per100: 15 },
    { to: 20_000, per100: 10 },
    { to: 50_000, per100: 7 },
    { to: 100_000, per100: 4 },
  ],
};

/** Monthly licence for yearly sales on the platform (EUR). */
function licencePerMonth(sales: number) {
  if (sales < PRICES.threshold) return PRICES.base;
  if (sales < PRICES.commissionFrom) {
    const extraMillions = Math.floor(sales / 1_000_000) - 1;
    return PRICES.atThreshold + PRICES.stepPerMillion * extraMillions;
  }
  return PRICES.base + (sales * PRICES.commissionRate) / 12;
}

/** Migration: all products are priced at the rate of the band the store falls into. */
function migration(products: number) {
  const n = Math.max(products, 0);
  const index = PRICES.bands.findIndex((band) => n <= band.to);
  const band = index === -1 ? PRICES.bands.length - 1 : index;
  const per100 = PRICES.bands[band].per100;
  return { n, band, per100, cost: (n / 100) * per100 };
}

function toNumber(value: string) {
  const n = parseFloat(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const inputClass =
  "w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-base tabular-nums focus-visible:outline-2 focus-visible:outline-primary";

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && <small className="text-xs text-muted-foreground">{hint}</small>}
    </div>
  );
}

function Rows({ rows }: { rows: [string, string, boolean?][] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {rows.map(([label, value, total]) => (
          <tr key={label} className={cn("border-b border-dashed border-border last:border-0", total && "font-semibold")}>
            <td className="py-1.5 pr-3">{label}</td>
            <td className="py-1.5 text-right font-mono tabular-nums whitespace-nowrap">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PricingCalculator({ t }: { t: PricingCalcCopy }) {
  const [sales, setSales] = useState("1000000");
  const [currency, setCurrency] = useState<"eur" | "ron">("eur");
  const [hosting, setHosting] = useState("15");
  const [products, setProducts] = useState("10000");
  const [integrations, setIntegrations] = useState("0");

  const eur = useMemo(
    () =>
      new Intl.NumberFormat(t.numberLocale, {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [t.numberLocale]
  );
  const num = useMemo(() => new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 0 }), [t.numberLocale]);
  const pct = useMemo(() => new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 2 }), [t.numberLocale]);

  const salesEur = currency === "eur" ? toNumber(sales) : toNumber(sales) / PRICES.rate;
  const above = salesEur >= PRICES.threshold;
  const commissionTier = salesEur >= PRICES.commissionFrom;
  const licenceMonth = licencePerMonth(salesEur);
  const hostingMonth = toNumber(hosting);
  const monthTotal = licenceMonth + hostingMonth;

  const migr = migration(toNumber(products));
  const mig = migr.cost;
  const integN = Math.floor(toNumber(integrations));
  const integ = integN * PRICES.integration;
  const once = PRICES.build + PRICES.infra + integ + mig;
  const vatPct = pct.format(PRICES.vat * 100);

  function switchCurrency(next: "eur" | "ron") {
    if (next === currency) return;
    const v = toNumber(sales);
    setSales(String(Math.round(next === "ron" ? v * PRICES.rate : v / PRICES.rate)));
    setCurrency(next);
  }

  const card = "rounded-2xl border border-border bg-card p-5 lg:p-6";
  const twoCols = "grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <h2 className="text-2xl font-semibold tracking-tight">{t.recurringTitle}</h2>
      <div className={twoCols}>
        <div className={cn(card, "grid gap-5")}>
          <Field id="sales" label={t.sales} hint={t.salesHint}>
            <div className="flex gap-2">
              <input
                id="sales"
                type="number"
                inputMode="decimal"
                min={0}
                step={10000}
                value={sales}
                onChange={(e) => setSales(e.target.value)}
                className={inputClass}
              />
              <div className="inline-flex shrink-0 overflow-hidden rounded-lg border border-border" role="group" aria-label={t.currency}>
                {(["eur", "ron"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    aria-pressed={currency === code}
                    onClick={() => switchCurrency(code)}
                    className={cn(
                      "px-3 text-sm font-semibold",
                      currency === code ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    )}
                  >
                    {code === "eur" ? "€" : t.lei}
                  </button>
                ))}
              </div>
            </div>
          </Field>
          <Field id="hosting" label={t.hosting} hint={t.hostingHint}>
            <input
              id="hosting"
              type="number"
              inputMode="decimal"
              min={0}
              step={5}
              value={hosting}
              onChange={(e) => setHosting(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <div className={cn(card, "grid gap-4")}>
          <p className="flex flex-wrap items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm">
            <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              {above ? t.aboveTier : t.belowTier}
            </span>
            <span>
              {t.salesOf} <b className="font-mono">{eur.format(salesEur)}</b> {t.perYear} (≈ {num.format(salesEur * PRICES.rate)} {t.lei})
            </span>
          </p>
          <article
            className="grid content-start gap-3 rounded-xl border border-border bg-card p-4"
            style={{ borderTop: `4px solid ${above ? "var(--brand-to)" : "var(--primary)"}` }}
          >
            <h3 className="font-display text-lg font-bold">{t.baseLicence}</h3>
            <p className="font-mono text-3xl font-semibold tabular-nums">
              {eur.format(monthTotal)} <span className="font-sans text-xs font-normal text-muted-foreground">{t.perMonth}</span>
            </p>
            <Rows
              rows={[
                ...((commissionTier
                  ? [
                      [t.licence, eur.format(PRICES.base)],
                      [t.commissionRow, eur.format((salesEur * PRICES.commissionRate) / 12)],
                    ]
                  : [[t.licence, eur.format(licenceMonth)]]) as [string, string][]),
                [t.hostingMonth, eur.format(hostingMonth)],
                [t.totalMonth, eur.format(monthTotal), true],
                [`${t.totalMonthVat} ${vatPct}%`, eur.format(monthTotal * (1 + PRICES.vat))],
              ]}
            />
          </article>
          <p className="rounded-xl bg-accent px-4 py-3 text-sm">{commissionTier ? t.commissionNote : above ? t.aboveNote : t.belowNote}</p>
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight">{t.onceTitle}</h2>
      <div className={twoCols}>
        <div className={cn(card, "grid gap-5")}>
          <Field id="products" label={t.products} hint={t.productsHint}>
            <input
              id="products"
              type="number"
              inputMode="numeric"
              min={0}
              max={100000}
              step={100}
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field id="integrations" label={t.integrations} hint={t.integrationsHint}>
            <input
              id="integrations"
              type="number"
              inputMode="numeric"
              min={0}
              step={1}
              value={integrations}
              onChange={(e) => setIntegrations(e.target.value)}
              className={inputClass}
            />
          </Field>
          <div className="grid gap-1 text-sm">
            <p className="flex justify-between gap-3"><span className="font-semibold">{t.build}</span><span className="font-mono">{eur.format(PRICES.build)}</span></p>
            <small className="text-xs text-muted-foreground">{t.buildHint}</small>
          </div>
          <div className="grid gap-1 text-sm">
            <p className="flex justify-between gap-3"><span className="font-semibold">{t.infra}</span><span className="font-mono">{eur.format(PRICES.infra)}</span></p>
            <small className="text-xs text-muted-foreground">{t.infraHint}</small>
          </div>
        </div>

        <div className={cn(card, "grid gap-4")}>
          <div className="overflow-x-auto">
            <h3 className="mb-2 font-display text-lg font-bold">{t.migration}</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="py-1.5 text-left font-semibold">{t.band}</th>
                  <th className="py-1.5 text-right font-semibold">{t.per100}</th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {PRICES.bands.map((b, i) => (
                  <tr
                    key={b.to}
                    className={cn("border-b border-dashed border-border", i === migr.band && "bg-accent font-semibold")}
                  >
                    <td className="px-2 py-1.5">
                      {num.format(i === 0 ? 1 : PRICES.bands[i - 1].to + 1)}–{num.format(b.to)}
                    </td>
                    <td className="px-2 py-1.5 text-right">{eur.format(b.per100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 font-mono text-sm tabular-nums">
              {num.format(migr.n)} × {eur.format(migr.per100)} / 100 = <b>{eur.format(mig)}</b>
            </p>
            {toNumber(products) > 100000 && <p className="mt-2 text-xs text-muted-foreground">{t.max}</p>}
          </div>

          <div className="grid gap-3 rounded-xl border border-border p-4" style={{ borderTop: "4px solid var(--brand-to)" }}>
            <p className="font-mono text-3xl font-semibold tabular-nums">
              {eur.format(once)} <span className="font-sans text-xs font-normal text-muted-foreground">{t.exVat}</span>
            </p>
            <Rows
              rows={[
                [t.build, eur.format(PRICES.build)],
                [t.infra, eur.format(PRICES.infra)],
                [`${t.integrationsRow}, ${integN} × ${eur.format(PRICES.integration)}`, eur.format(integ)],
                [t.migration, eur.format(mig)],
                [t.onceTotal, eur.format(once), true],
                [`${t.onceTotalVat} ${vatPct}%`, eur.format(once * (1 + PRICES.vat))],
              ]}
            />
          </div>

          <p className="text-xs text-muted-foreground">{t.vatNote}</p>
        </div>
      </div>
    </div>
  );
}
