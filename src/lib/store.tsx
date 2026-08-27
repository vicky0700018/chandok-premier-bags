import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as seedProducts, type Product } from "../data/products";
import { banners as seedBanners, categories as seedCategories, coupons as seedCoupons, business } from "../data/site";
import {
  bulkEnquiries as seedBulk,
  customers as seedCustomers,
  enquiries as seedEnquiries,
  orders as seedOrders,
} from "../data/admin";

export type CartLine = {
  key: string;
  id: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  color: string;
  size: string;
  qty: number;
};

export type Toast = { id: number; message: string; tone: "success" | "error" | "info" };

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(read(key, initial));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota errors in demo */
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

export type PlacedOrder = {
  id: string;
  date: string;
  items: CartLine[];
  total: number;
  payment: string;
  delivery: string;
  eta: string;
  address: string;
  customer: string;
};

type Ctx = {
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  addToCart: (p: Product, opts?: { color?: string; size?: string; qty?: number }) => void;
  updateQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  toasts: Toast[];
  notify: (message: string, tone?: Toast["tone"]) => void;
  coupon: { code: string; percent: number } | null;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  myOrders: PlacedOrder[];
  placeOrder: (o: PlacedOrder) => void;
  lastOrder: PlacedOrder | null;
  // admin
  adminUser: string | null;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  adminProducts: Product[];
  setAdminProducts: (p: Product[] | ((prev: Product[]) => Product[])) => void;
  adminCategories: typeof seedCategories;
  setAdminCategories: (c: typeof seedCategories | ((p: typeof seedCategories) => typeof seedCategories)) => void;
  adminOrders: typeof seedOrders;
  setAdminOrders: (o: typeof seedOrders | ((p: typeof seedOrders) => typeof seedOrders)) => void;
  adminCustomers: typeof seedCustomers;
  adminEnquiries: typeof seedEnquiries;
  setAdminEnquiries: (e: typeof seedEnquiries | ((p: typeof seedEnquiries) => typeof seedEnquiries)) => void;
  adminBulk: typeof seedBulk;
  setAdminBulk: (b: typeof seedBulk | ((p: typeof seedBulk) => typeof seedBulk)) => void;
  adminBanners: typeof seedBanners;
  setAdminBanners: (b: typeof seedBanners | ((p: typeof seedBanners) => typeof seedBanners)) => void;
  adminCoupons: typeof seedCoupons;
  setAdminCoupons: (c: typeof seedCoupons | ((p: typeof seedCoupons) => typeof seedCoupons)) => void;
  settings: typeof business;
  setSettings: (s: typeof business | ((p: typeof business) => typeof business)) => void;
};

const ShopContext = createContext<Ctx | null>(null);

export const ADMIN_EMAIL = "admin@chandokbaghouse.com";
export const ADMIN_PASSWORD = "Admin@123";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersisted<CartLine[]>("cbh_cart", []);
  const [wishlist, setWishlist] = usePersisted<string[]>("cbh_wishlist", []);
  const [coupon, setCoupon] = usePersisted<{ code: string; percent: number } | null>("cbh_coupon", null);
  const [myOrders, setMyOrders] = usePersisted<PlacedOrder[]>("cbh_orders", []);
  const [adminUser, setAdminUser] = usePersisted<string | null>("cbh_admin", null);
  const [adminProducts, setAdminProducts] = usePersisted<Product[]>("cbh_admin_products", seedProducts);
  const [adminCategories, setAdminCategories] = usePersisted("cbh_admin_categories", seedCategories);
  const [adminOrders, setAdminOrders] = usePersisted("cbh_admin_orders", seedOrders);
  const [adminEnquiries, setAdminEnquiries] = usePersisted("cbh_admin_enquiries", seedEnquiries);
  const [adminBulk, setAdminBulk] = usePersisted("cbh_admin_bulk", seedBulk);
  const [adminBanners, setAdminBanners] = usePersisted("cbh_admin_banners", seedBanners);
  const [adminCoupons, setAdminCoupons] = usePersisted("cbh_admin_coupons", seedCoupons);
  const [settings, setSettings] = usePersisted("cbh_settings", business);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart: Ctx["addToCart"] = (p, opts = {}) => {
    const color = opts.color ?? p.colors[0] ?? "Default";
    const size = opts.size ?? p.sizes[0] ?? "One Size";
    const qty = opts.qty ?? 1;
    const key = `${p.id}|${color}|${size}`;
    setCart((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, id: p.id, name: p.name, image: p.image, price: p.price, mrp: p.mrp, color, size, qty }];
    });
    notify(`${p.name} added to cart`);
  };

  const updateQty = (key: string, qty: number) =>
    setCart((prev) => prev.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)));

  const removeLine = (key: string) => setCart((prev) => prev.filter((l) => l.key !== key));
  const clearCart = () => setCart([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      notify(has ? "Removed from wishlist" : "Saved to wishlist", has ? "info" : "success");
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const subtotal = useMemo(() => cart.reduce((s, l) => s + l.price * l.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  const applyCoupon = (code: string) => {
    const found = adminCoupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found || !found.active) return notify("Invalid coupon code", "error");
    if (subtotal < found.minOrder)
      return notify(`${found.code} needs a minimum order of ₹${found.minOrder.toLocaleString("en-IN")}`, "error");
    setCoupon({ code: found.code, percent: found.percent });
    notify(`${found.code} applied — ${found.percent}% off`);
  };

  const removeCoupon = () => {
    setCoupon(null);
    notify("Coupon removed", "info");
  };

  const placeOrder = (o: PlacedOrder) => {
    setMyOrders((prev) => [o, ...prev]);
    setAdminOrders((prev) => [
      {
        id: o.id,
        customer: o.customer,
        phone: "—",
        date: o.date,
        items: o.items.map((i) => ({ name: i.name, qty: i.qty })),
        amount: o.total,
        payment: o.payment,
        status: "Pending",
      },
      ...prev,
    ]);
    setCart([]);
    setCoupon(null);
  };

  const adminLogin = (email: string, password: string) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdminUser(email.trim().toLowerCase());
      return true;
    }
    return false;
  };

  const value: Ctx = {
    cart,
    cartCount,
    subtotal,
    addToCart,
    updateQty,
    removeLine,
    clearCart,
    wishlist,
    toggleWishlist,
    inWishlist: (id) => wishlist.includes(id),
    toasts,
    notify,
    coupon,
    applyCoupon,
    removeCoupon,
    myOrders,
    placeOrder,
    lastOrder: myOrders[0] ?? null,
    adminUser,
    adminLogin,
    adminLogout: () => setAdminUser(null),
    adminProducts,
    setAdminProducts,
    adminCategories,
    setAdminCategories,
    adminOrders,
    setAdminOrders,
    adminCustomers: seedCustomers,
    adminEnquiries,
    setAdminEnquiries,
    adminBulk,
    setAdminBulk,
    adminBanners,
    setAdminBanners,
    adminCoupons,
    setAdminCoupons,
    settings,
    setSettings,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
