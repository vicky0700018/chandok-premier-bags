export const business = {
  name: "Chandok Bag House",
  brand: "PS Creation",
  owner: "Navneet Singh Gurmukh Singh Gandhi",
  phone: "+91 93711 11448",
  phoneRaw: "+919371111448",
  email: "gschandok@chandokbaghouse.com",
  address:
    "Shop No. 4, Union Bank ATM, Shivaprasad Building, Housing Society, near Old Sangvi, Anand Nagar, Sainath Colony, Old Sangvi, Pimpri-Chinchwad, Maharashtra 411027",
  description:
    "Chandok Bag House is a premier bag manufacturing and retail establishment in Pimpri-Chinchwad, Maharashtra, specialising in high-quality retail and corporate baggage solutions for over two decades.",
  hours: [
    { day: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
    { day: "Sunday", time: "11:00 AM – 7:00 PM" },
    { day: "Public Holidays", time: "By appointment" },
  ],
  social: [
    { label: "Facebook", url: "https://facebook.com" },
    { label: "Instagram", url: "https://instagram.com" },
    { label: "WhatsApp", url: "https://wa.me/919371111448" },
  ],
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = u;

export const categories = [
  {
    id: "school-bags",
    name: "School Bags",
    blurb: "Sturdy daily-use bags built for students.",
    image: u("1622560480605-d83c853bc5c3"),
    active: true,
  },
  {
    id: "laptop-backpacks",
    name: "Laptop Backpacks",
    blurb: "Padded protection for work and campus.",
    image: u("1553062407-98eeb64c6a62"),
    active: true,
  },
  {
    id: "travel-bags",
    name: "Travel Bags",
    blurb: "Duffels and weekenders for every journey.",
    image: u("1581605405669-fcdf81165afa"),
    active: true,
  },
  {
    id: "suitcases",
    name: "Suitcases",
    blurb: "Cabin and check-in trolleys with smooth glide.",
    image: u("1565026057447-bc90a3dceb87"),
    active: true,
  },
  {
    id: "corporate-bags",
    name: "Corporate Bags",
    blurb: "Executive briefcases and office backpacks.",
    image: u("1491637639811-60e2756cc1c7"),
    active: true,
  },
  {
    id: "custom-bags",
    name: "Custom Bags",
    blurb: "Made to your specification, in your colours.",
    image: u("1548036328-c9fa89d128fa"),
    active: true,
  },
  {
    id: "promotional-bags",
    name: "Promotional Bags",
    blurb: "Event and giveaway bags with your logo.",
    image: u("1544816155-12df9643f363"),
    active: true,
  },
  {
    id: "institutional-bags",
    name: "Institutional Bags",
    blurb: "Bulk supply for schools and academies.",
    image: u("1584917865442-de89df76afd3"),
    active: true,
  },
];

export const banners = [
  {
    id: "BNR-01",
    title: "Carry Quality. Carry Confidence.",
    subtitle: "Premium Bags, Luggage & Custom Corporate Solutions for Every Journey.",
    cta: "Shop Collection",
    image: "hero-bags.jpg",
    active: true,
    order: 1,
  },
  {
    id: "BNR-02",
    title: "Back To School Collection",
    subtitle: "Ergonomic school bags built for the whole academic year.",
    cta: "Shop School Bags",
    image: u("1596149615493-f0739de31c2d"),
    active: true,
    order: 2,
  },
  {
    id: "BNR-03",
    title: "Corporate Gifting, Branded Right",
    subtitle: "Bulk manufacturing with your logo, delivered on schedule.",
    cta: "Bulk Enquiry",
    image: "bulk-corporate.jpg",
    active: false,
    order: 3,
  },
];

export const coupons = [
  { code: "BAG10", percent: 10, minOrder: 999, active: true, note: "Flat 10% off on orders above ₹999" },
  { code: "WELCOME15", percent: 15, minOrder: 1999, active: true, note: "First order 15% off above ₹1,999" },
  { code: "CORPORATE20", percent: 20, minOrder: 9999, active: true, note: "Bulk/corporate 20% off above ₹9,999" },
];
