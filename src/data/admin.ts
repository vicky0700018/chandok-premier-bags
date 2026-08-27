export const orderStatuses = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"] as const;
export const enquiryStatuses = ["New", "Contacted", "In Progress", "Converted", "Closed"] as const;

export const orders = [
  {
    id: "CBH-ORD-10241",
    customer: "Rohit Deshmukh",
    phone: "+91 98220 11223",
    date: "2026-08-22",
    items: [{ name: "Premium Laptop Backpack", qty: 1 }, { name: "Corporate Laptop Bag", qty: 2 }],
    amount: 6497,
    payment: "UPI",
    status: "Delivered",
  },
  {
    id: "CBH-ORD-10242",
    customer: "Sneha Kulkarni",
    phone: "+91 97654 33210",
    date: "2026-08-23",
    items: [{ name: "Classic School Backpack", qty: 3 }],
    amount: 3597,
    payment: "Cash on Delivery",
    status: "Shipped",
  },
  {
    id: "CBH-ORD-10243",
    customer: "Vishal Enterprises",
    phone: "+91 91234 55667",
    date: "2026-08-24",
    items: [{ name: "Custom Logo Backpack", qty: 120 }],
    amount: 203880,
    payment: "Net Banking",
    status: "Confirmed",
  },
  {
    id: "CBH-ORD-10244",
    customer: "Aarti Joshi",
    phone: "+91 99887 66554",
    date: "2026-08-25",
    items: [{ name: "Premium Cabin Trolley", qty: 1 }],
    amount: 5499,
    payment: "Card",
    status: "Packed",
  },
  {
    id: "CBH-ORD-10245",
    customer: "Imran Shaikh",
    phone: "+91 90210 44556",
    date: "2026-08-26",
    items: [{ name: "Waterproof Travel Backpack", qty: 1 }, { name: "Urban College Backpack", qty: 1 }],
    amount: 4398,
    payment: "UPI",
    status: "Pending",
  },
  {
    id: "CBH-ORD-10246",
    customer: "Sunrise Public School",
    phone: "+91 93711 77889",
    date: "2026-08-26",
    items: [{ name: "Institutional School Bag", qty: 250 }],
    amount: 224750,
    payment: "Net Banking",
    status: "Confirmed",
  },
  {
    id: "CBH-ORD-10247",
    customer: "Pradeep Nair",
    phone: "+91 88997 12345",
    date: "2026-08-27",
    items: [{ name: "Executive Messenger Bag", qty: 1 }],
    amount: 2799,
    payment: "Cash on Delivery",
    status: "Cancelled",
  },
];

export const customers = [
  { id: "CUS-001", name: "Rohit Deshmukh", email: "rohit.d@example.com", phone: "+91 98220 11223", city: "Pune", orders: 6, spend: 28450, status: "Active", joined: "2024-06-11" },
  { id: "CUS-002", name: "Sneha Kulkarni", email: "sneha.k@example.com", phone: "+91 97654 33210", city: "Pimpri", orders: 3, spend: 9120, status: "Active", joined: "2025-01-22" },
  { id: "CUS-003", name: "Vishal Enterprises", email: "purchase@vishalent.in", phone: "+91 91234 55667", city: "Chinchwad", orders: 4, spend: 512300, status: "Corporate", joined: "2023-09-03" },
  { id: "CUS-004", name: "Aarti Joshi", email: "aarti.joshi@example.com", phone: "+91 99887 66554", city: "Sangvi", orders: 2, spend: 8290, status: "Active", joined: "2025-11-14" },
  { id: "CUS-005", name: "Imran Shaikh", email: "imran.s@example.com", phone: "+91 90210 44556", city: "Aundh", orders: 1, spend: 4398, status: "New", joined: "2026-08-25" },
  { id: "CUS-006", name: "Sunrise Public School", email: "admin@sunrisepune.edu.in", phone: "+91 93711 77889", city: "Pune", orders: 5, spend: 894000, status: "Institutional", joined: "2022-04-19" },
  { id: "CUS-007", name: "Meera Patil", email: "meera.p@example.com", phone: "+91 90909 11221", city: "Nigdi", orders: 0, spend: 0, status: "Inactive", joined: "2026-05-02" },
];

export const enquiries = [
  { id: "ENQ-501", name: "Kunal Rane", phone: "+91 98111 22334", email: "kunal.r@example.com", type: "Product Enquiry", product: "Premium Cabin Trolley", quantity: 2, message: "Do you have this in champagne with a warranty card?", date: "2026-08-24", status: "New" },
  { id: "ENQ-502", name: "Divya Menon", phone: "+91 90000 55442", email: "divya.m@example.com", type: "Custom Branding", product: "Custom Logo Backpack", quantity: 80, message: "Need embroidered logo for an onboarding kit.", date: "2026-08-25", status: "Contacted" },
  { id: "ENQ-503", name: "Tejas Bhosale", phone: "+91 98220 99887", email: "tejas.b@example.com", type: "After Sales Service", product: "Hard Shell Check-In Suitcase", quantity: 1, message: "Wheel replacement required, purchased last year.", date: "2026-08-25", status: "In Progress" },
  { id: "ENQ-504", name: "Nisha Agarwal", phone: "+91 91111 00099", email: "nisha.a@example.com", type: "Bulk Order", product: "Institutional School Bag", quantity: 300, message: "Requesting quotation with our school crest.", date: "2026-08-26", status: "Converted" },
  { id: "ENQ-505", name: "Farhan Qureshi", phone: "+91 90112 33445", email: "farhan.q@example.com", type: "General", product: "—", quantity: 0, message: "What are your Sunday store timings?", date: "2026-08-27", status: "Closed" },
];

export const bulkEnquiries = [
  { id: "BLK-201", company: "Techstride Solutions Pvt Ltd", contact: "Amit Ranade", phone: "+91 98505 77112", email: "amit@techstride.in", bagType: "Corporate Laptop Bags", quantity: 250, branding: "Embroidered logo on front panel", deliveryDate: "2026-09-20", budget: "₹3,00,000 – ₹5,00,000", status: "In Progress" },
  { id: "BLK-202", company: "Sunrise Public School", contact: "Mrs. Kavita Rao", phone: "+91 93711 77889", email: "admin@sunrisepune.edu.in", bagType: "Institutional School Bags", quantity: 600, branding: "Screen printed school crest", deliveryDate: "2026-10-05", budget: "₹5,00,000+", status: "Converted" },
  { id: "BLK-203", company: "Pune Marathon Trust", contact: "Sagar Kale", phone: "+91 99231 44556", email: "events@punemarathon.org", bagType: "Promotional Event Bags", quantity: 1500, branding: "Sponsor logos, two colours", deliveryDate: "2026-11-12", budget: "₹7,00,000+", status: "New" },
  { id: "BLK-204", company: "Grandeur Hotels", contact: "Reena D'Souza", phone: "+91 90045 66778", email: "procure@grandeur.co.in", bagType: "Employee Travel Kits", quantity: 120, branding: "Metal badge", deliveryDate: "2026-09-30", budget: "₹1,50,000 – ₹3,00,000", status: "Contacted" },
];

export const accountCustomer = {
  name: "Rohit Deshmukh",
  email: "rohit.d@example.com",
  phone: "+91 98220 11223",
  memberSince: "June 2024",
  address: {
    label: "Home",
    line: "Flat 402, Shreeji Residency, Kaspate Wasti, Wakad",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411057",
  },
};
