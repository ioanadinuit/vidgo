"use client";

import { useMemo, useState } from "react";

import type { PricingCalcCopy } from "@/content/types";
import { cn } from "@/lib/utils";

/** Price list. All amounts in EUR, without VAT. */
const PRICES = {
  threshold: 1_000_000,
  base: 300,
  flat: 800,
  r1: 0.005,
  r2: 0.001,
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

/** Commission per year: 0.5% of the first million and 0.1% of each further million, once the threshold is reached. */
function commission(sales: number) {
  if (sales < PRICES.threshold) return 0;
  return PRICES.r1 * PRICES.threshold + PRICES.r2 * (sales - PRICES.threshold);
}

function yearly(sales: number, hosting: number) {
  const above = sales >= PRICES.threshold;
  const hostingYear = hosting * 12;
  const flatLicence = (above ? PRICES.flat : PRICES.base) * 12;
  const commLicence = PRICES.base * 12;
  const comm = commission(sales);
  return {
    above,
    hostingYear,
    flat: { licence: flatLicence, total: flatLicence + hostingYear },
    comm: { licence: commLicence, comm, total: commLicence + comm + hostingYear },
  };
}

/** Progressive migration: each band of products is priced at its own rate per 100 products. */
function migration(products: number) {
  const n = Math.min(Math.max(products, 0), PRICES.bands[PRICES.bands.length - 1].to);
  let from = 0;
  return PRICES.bands.map((band) => {
    const qty = Math.max(0, Math.min(n, band.to) - from);
    const row = { from, to: band.to, per100: band.per100, qty, cost: (qty / 100) * band.per100 };
    from = band.to;
    return row;
  });
}

/** Sales at which both options cost the same, above the threshold. */
const BREAK_EVEN =
  PRICES.threshold + ((PRICES.flat - PRICES.base) * 12 - PRICES.r1 * PRICES.threshold) / PRICES.r2;

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
    () => new Intl.NumberFormat(t.numberLocale, { style: "currency", currency: "EUR", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }),
    [t.numberLocale]
  );
  const num = useMemo(() => new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 0 }), [t.numberLocale]);
  const pct = useMemo(() => new Intl.NumberFormat(t.numberLocale, { maximumFractionDigits: 2 }), [t.numberLocale]);

  const salesEur = currency === "eur" ? toNumber(sales) : toNumber(sales) / PRICES.rate;
  const host = toNumber(hosting);
  const c = yearly(salesEur, host);
  const diff = c.comm.total - c.flat.total;

  const bands = migration(toNumber(products));
  const migQty = bands.reduce((a, b) => a + b.qty, 0);
  const mig = bands.reduce((a, b) => a + b.cost, 0);
  const integN = Math.floor(toNumber(integrations));
  const integ = integN * PRICES.integration;
  const once = PRICES.build + PRICES.infra + integ + mig;
  const firstYear = once + Math.min(c.flat.total, c.comm.total);
  const vatPct = pct.format(PRICES.vat * 100);

  function switchCurrency(next: "eur" | "ron") {
    if (next === currency) return;
    const v = toNumber(sales);
    setSales(String(Math.round(next === "ron" ? v * PRICES.rate : v / PRICES.rate)));
    setCurrency(next);
  }

  const card = "rounded-2xl border border-border bg-card p-5 lg:p-6";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6">
      <h2 className="text-2xl font-semibold tracking-tight">{t.recurringTitle}</h2>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
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
              {c.above ? t.aboveTier : t.belowTier}
            </span>
            <span>
              {t.salesOf} <b className="font-mono">{eur.format(salesEur)}</b> {t.perYear} (≈ {num.format(salesEur * PRICES.rate)} {t.lei})
            </span>
          </p>

          {c.above ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  key: "flat",
                  title: t.flatOption,
                  color: "var(--primary)",
                  best: diff > 0.5,
                  month: c.flat.total / 12,
                  avg: false,
                  total: c.flat.total,
                  rows: [
                    [`${t.licence}, ${eur.format(PRICES.flat)} × 12`, eur.format(c.flat.licence)],
                    [t.hostingYear, eur.format(c.hostingYear)],
                  ] as [string, string][],
                },
                {
                  key: "comm",
                  title: t.commOption,
                  color: "var(--brand-to)",
                  best: diff < -0.5,
                  month: c.comm.total / 12,
                  avg: true,
                  total: c.comm.total,
                  rows: [
                    [`${t.licence}, ${eur.format(PRICES.base)} × 12`, eur.format(c.comm.licence)],
                    [t.commission, eur.format(c.comm.comm)],
                    [t.hostingYear, eur.format(c.hostingYear)],
                  ] as [string, string][],
                },
              ].map((o) => (
                <article
                  key={o.key}
                  className="relative grid content-start gap-3 rounded-xl border border-border bg-card p-4"
                  style={{ borderTop: `4px solid ${o.color}` }}
                >
                  {o.best && (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {t.cheaper}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-bold">{o.title}</h3>
                  <p className="font-mono text-3xl font-semibold tabular-nums">
                    {eur.format(o.month)} <span className="font-sans text-xs font-normal text-muted-foreground">{o.avg ? t.perMonthAvg : t.perMonth}</span>
                  </p>
                  <Rows
                    rows={[
                      ...o.rows,
                      [t.totalYear, eur.format(o.total), true],
                      [`${t.totalYearVat} ${vatPct}%`, eur.format(o.total * (1 + PRICES.vat))],
                    ]}
                  />
                  <p className="text-xs text-muted-foreground">
                    {salesEur > 0 ? `${pct.format((o.total / salesEur) * 100)}% ${t.ofSales}` : ""}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <article className="grid content-start gap-3 rounded-xl border border-border bg-card p-4" style={{ borderTop: "4px solid var(--primary)" }}>
              <h3 className="font-display text-lg font-bold">{t.baseLicence}</h3>
              <p className="font-mono text-3xl font-semibold tabular-nums">
                {eur.format(c.flat.total / 12)} <span className="font-sans text-xs font-normal text-muted-foreground">{t.perMonth}</span>
              </p>
              <Rows
                rows={[
                  [`${t.licence}, ${eur.format(PRICES.base)} × 12`, eur.format(c.flat.licence)],
                  [t.hostingYear, eur.format(c.hostingYear)],
                  [t.totalYear, eur.format(c.flat.total), true],
                  [`${t.totalYearVat} ${vatPct}%`, eur.format(c.flat.total * (1 + PRICES.vat))],
                ]}
              />
            </article>
          )}

          <p className="rounded-xl bg-accent px-4 py-3 text-sm">
            {c.above ? (
              <>
                {t.breakEven} <b className="font-mono">{eur.format(BREAK_EVEN)}</b> {t.breakEvenAfter}
              </>
            ) : (
              t.belowNote
            )}
          </p>
        </div>
      </div>

      <div className={card}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.chartTitle}</h3>
        <CostChart sales={salesEur} hosting={host} t={t} num={num} pct={pct} />
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><i className="inline-block h-[3px] w-4 rounded" style={{ background: "var(--primary)" }} />{t.flatOption}</span>
          <span className="inline-flex items-center gap-1.5"><i className="inline-block h-[3px] w-4 rounded" style={{ background: "var(--brand-to)" }} />{t.commOption}</span>
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight">{t.onceTitle}</h2>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
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
                  <th className="py-1.5 text-right font-semibold">{t.qty}</th>
                  <th className="py-1.5 text-right font-semibold">{t.per100}</th>
                  <th className="py-1.5 text-right font-semibold">{t.cost}</th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                {bands.map((b) => (
                  <tr key={b.to} className="border-b border-dashed border-border">
                    <td className="py-1.5 pr-3">{num.format(b.from + 1)}–{num.format(b.to)}</td>
                    <td className="py-1.5 text-right">{num.format(b.qty)}</td>
                    <td className="py-1.5 text-right">{eur.format(b.per100)}</td>
                    <td className="py-1.5 text-right">{eur.format(b.cost)}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="py-1.5 font-sans">{t.total}</td>
                  <td className="py-1.5 text-right">{num.format(migQty)}</td>
                  <td />
                  <td className="py-1.5 text-right">{eur.format(mig)}</td>
                </tr>
              </tbody>
            </table>
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

          <p className="rounded-xl bg-accent px-4 py-3 text-sm">
            {t.firstYear} <b className="font-mono">{eur.format(firstYear)}</b>
          </p>
          <p className="text-xs text-muted-foreground">{t.vatNote}</p>
        </div>
      </div>
    </div>
  );
}

function CostChart({
  sales,
  hosting,
  t,
  num,
  pct,
}: {
  sales: number;
  hosting: number;
  t: PricingCalcCopy;
  num: Intl.NumberFormat;
  pct: Intl.NumberFormat;
}) {
  const W = 760, H = 280, L = 70, R = 20, T = 16, B = 40;
  const thr = PRICES.threshold;
  const maxX = Math.max(thr * 4, sales * 1.25, 1);
  const xs = Array.from({ length: 201 }, (_, i) => (maxX * i) / 200);
  xs.push(thr - 1e-6, thr);
  xs.sort((a, b) => a - b);
  const flat = xs.map((x) => yearly(x, hosting).flat.total);
  const comm = xs.map((x) => yearly(x, hosting).comm.total);
  const maxY = Math.max(...flat, ...comm, 1) * 1.1;
  const X = (x: number) => L + (x / maxX) * (W - L - R);
  const Y = (y: number) => H - B - (y / maxY) * (H - T - B);
  const line = (ys: number[]) => xs.map((x, i) => `${X(x).toFixed(1)},${Y(ys[i]).toFixed(1)}`).join(" ");
  const nice = (raw: number) => {
    const p = Math.pow(10, Math.floor(Math.log10(raw || 1)));
    const n = raw / p;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
  };
  const short = (v: number) => (v >= 1e6 ? `${pct.format(v / 1e6)}M` : v >= 1e3 ? `${num.format(v / 1e3)}k` : num.format(v));
  const yStep = nice(maxY / 4);
  const xStep = nice(maxX / 5);
  const yTicks = Array.from({ length: Math.floor(maxY / yStep) + 1 }, (_, i) => i * yStep);
  const xTicks = Array.from({ length: Math.floor(maxX / xStep) + 1 }, (_, i) => i * xStep);
  const c = yearly(sales, hosting);

  return (
    <div className="mt-3 overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.chartLabel} className="block h-auto w-full min-w-[520px]">
        {yTicks.map((y) => (
          <g key={`y${y}`}>
            <line x1={L} x2={W - R} y1={Y(y)} y2={Y(y)} stroke="var(--border)" />
            <text x={L - 8} y={Y(y) + 4} textAnchor="end" fontSize="11" fill="var(--muted-foreground)" className="font-mono">{short(y)}</text>
          </g>
        ))}
        {xTicks.map((x) => (
          <text key={`x${x}`} x={X(x)} y={H - B + 18} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" className="font-mono">{short(x)}</text>
        ))}
        <text x={(L + W - R) / 2} y={H - 4} textAnchor="middle" fontSize="11.5" fill="var(--muted-foreground)">{t.chartAxis}</text>
        <line x1={X(thr)} x2={X(thr)} y1={T} y2={H - B} stroke="var(--muted-foreground)" strokeDasharray="4 4" />
        <text x={X(thr) + 6} y={T + 12} fontSize="11" fill="var(--muted-foreground)">{t.chartThreshold}</text>
        <polyline points={line(flat)} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinejoin="round" />
        <polyline points={line(comm)} fill="none" stroke="var(--brand-to)" strokeWidth="2.5" strokeLinejoin="round" />
        {sales <= maxX && (
          <g>
            <line x1={X(sales)} x2={X(sales)} y1={T} y2={H - B} stroke="var(--foreground)" opacity="0.3" />
            <circle cx={X(sales)} cy={Y(c.flat.total)} r="4.5" fill="var(--primary)" stroke="var(--card)" strokeWidth="2" />
            <circle cx={X(sales)} cy={Y(c.comm.total)} r="4.5" fill="var(--brand-to)" stroke="var(--card)" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
}
