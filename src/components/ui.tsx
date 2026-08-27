import { useEffect, useState, type ReactNode } from "react";
import { useShop } from "../lib/store";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6 4.9 17.3l1-5.7-4.1-4 5.7-.8z"
            fill={i <= Math.round(rating) ? "var(--color-secondary)" : "var(--color-input)"}
          />
        </svg>
      ))}
    </span>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "sale" | "new" | "premium" | "success" | "muted" }) {
  const tones: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    sale: "bg-sale text-sale-foreground",
    new: "bg-success text-success-foreground",
    premium: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function badgeTone(badge: string) {
  const b = badge.toLowerCase();
  if (b === "sale") return "sale" as const;
  if (b === "new") return "new" as const;
  if (b === "premium") return "premium" as const;
  return "default" as const;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`animate-fade-up max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-card p-5 shadow-lift sm:rounded-2xl ${wide ? "sm:max-w-3xl" : "sm:max-w-lg"}`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close dialog" className="rounded-md p-1 text-muted-foreground transition hover:bg-muted">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button className="btn-base btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-base bg-destructive text-destructive-foreground hover:opacity-90" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </Modal>
  );
}

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <div className="surface flex flex-col items-center gap-3 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 8h16l-1.5 11H5.5L4 8zM9 8V6a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {action}
    </div>
  );
}

export function QuantitySelector({ value, onChange, small = false }: { value: number; onChange: (n: number) => void; small?: boolean }) {
  const btn = `flex items-center justify-center rounded-md text-foreground transition hover:bg-muted ${small ? "h-7 w-7" : "h-9 w-9"}`;
  return (
    <div className="inline-flex items-center rounded-lg border border-input bg-card">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        −
      </button>
      <span className={`min-w-8 text-center text-sm font-semibold ${small ? "" : "px-1"}`}>{value}</span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export function ToastHost() {
  const { toasts } = useShop();
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[95] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`animate-fade-up pointer-events-auto rounded-lg px-4 py-2.5 text-sm font-medium shadow-lift ${
            t.tone === "error"
              ? "bg-destructive text-destructive-foreground"
              : t.tone === "info"
                ? "bg-ink text-ink-foreground"
                : "bg-success text-success-foreground"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function ProductImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      {!loaded && !failed && <div className="skeleton absolute inset-0" />}
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-accent/30">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-primary/40">
            <path d="M4 8h16l-1.5 11H5.5L4 8zM9 8V6a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

export function Section({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
