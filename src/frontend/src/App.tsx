import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Facebook,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Ruler,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useCompanyStats,
  useProjects,
  useServices,
  useSubmitContactForm,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

// ─── Nav Data ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "About Us",
    children: [
      "Overview",
      "Our Leadership",
      "Milestones",
      "CSR",
      "Corporate Governance",
    ],
  },
  {
    label: "Sectors",
    children: [
      "Energy & Utilities",
      "Infrastructure",
      "Urban Development",
      "Industrial",
      "Mining & Metals",
      "Hydrocarbons",
    ],
  },
  {
    label: "Services",
    children: [
      "Design & Engineering",
      "Project Management",
      "Sustainability Solutions",
      "Digital Solutions",
      "Architecture & Planning",
    ],
  },
  { label: "Projects", children: [] },
  {
    label: "Insights",
    children: [
      "White Papers",
      "Case Studies",
      "Blogs",
      "Technical Publications",
    ],
  },
  {
    label: "People",
    children: ["Life @ Aditattva", "Careers"],
  },
  {
    label: "Media",
    children: [
      "Media Kit",
      "Annual Reports",
      "Press Releases",
      "Press Coverage",
    ],
  },
  { label: "Contact Us", children: [] },
];

// ─── Hero Slides ─────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    image: "/assets/generated/hero-slide1.dim_1600x900.jpg",
    headline: "Cutting-Edge Engineering\nSolutions",
    sub: "Driving innovation with precision and sustainability",
  },
  {
    image: "/assets/generated/hero-slide2.dim_1600x900.jpg",
    headline: "Engineering Excellence\nand Innovation",
    sub: "Best-in-class Integrated Engineering Consultancy — Concept to Commissioning",
  },
  {
    image: "/assets/generated/hero-slide3.dim_1600x900.jpg",
    headline: "Precision Meets\nSustainability",
    sub: "Engineering a cleaner, greener tomorrow with renewable solutions",
  },
  {
    image: "/assets/generated/hero-slide4.dim_1600x900.jpg",
    headline: "Integrated Solutions\nAcross Industries",
    sub: "End-to-end engineering for energy, infrastructure and industrial sectors",
  },
  {
    image: "/assets/generated/hero-slide5.dim_1600x900.jpg",
    headline: "Engineering\nA Better Tomorrow",
    sub: "Serving communities through excellence and expertise",
  },
];

// ─── Default Services ─────────────────────────────────────────────────────────
const DEFAULT_SERVICES = [
  {
    title: "Design & Engineering",
    description:
      "Comprehensive design and engineering solutions from concept to detailed design.",
    iconName: "ruler",
  },
  {
    title: "Project Management",
    description:
      "Expert project management ensuring on-time, on-budget delivery.",
    iconName: "clipboard",
  },
  {
    title: "Sustainability Solutions",
    description: "Green engineering strategies for a sustainable future.",
    iconName: "leaf",
  },
  {
    title: "Digital & Advanced Technologies",
    description:
      "Digital transformation through AI, IoT, and advanced analytics.",
    iconName: "monitor",
  },
  {
    title: "Architecture & Planning",
    description:
      "Innovative architectural design and urban planning solutions.",
    iconName: "building",
  },
];

const DEFAULT_PROJECTS = [
  {
    title: "Metro Rail Corridor Expansion",
    description:
      "Design and project management for a 45km metro rail expansion connecting suburban districts.",
    imageUrl: "/assets/generated/hero-slide1.dim_1600x900.jpg",
    category: "Infrastructure",
  },
  {
    title: "Solar Power Plant — 500MW",
    description:
      "Full engineering consultancy for a utility-scale solar facility in Rajasthan.",
    imageUrl: "/assets/generated/hero-slide3.dim_1600x900.jpg",
    category: "Energy & Utilities",
  },
  {
    title: "Smart City Master Plan",
    description:
      "Integrated urban development plan encompassing mobility, utilities and digital infrastructure.",
    imageUrl: "/assets/generated/hero-slide2.dim_1600x900.jpg",
    category: "Urban Development",
  },
];

const INSIGHTS = {
  "White Papers": [
    {
      title: "Future of Sustainable Infrastructure in South Asia",
      date: "March 2026",
      image: "/assets/generated/hero-slide1.dim_1600x900.jpg",
    },
    {
      title: "Digital Twin Technology in Large-Scale Projects",
      date: "February 2026",
      image: "/assets/generated/hero-slide2.dim_1600x900.jpg",
    },
    {
      title: "Decarbonisation Pathways for the Energy Sector",
      date: "January 2026",
      image: "/assets/generated/hero-slide3.dim_1600x900.jpg",
    },
  ],
  "Case Studies": [
    {
      title: "Metro Rail Corridor: Delivered 3 Months Early",
      date: "December 2025",
      image: "/assets/generated/hero-slide1.dim_1600x900.jpg",
    },
    {
      title: "500MW Solar Park: Zero Incident Commissioning",
      date: "November 2025",
      image: "/assets/generated/hero-slide3.dim_1600x900.jpg",
    },
    {
      title: "Smart City Water Management System",
      date: "October 2025",
      image: "/assets/generated/hero-slide2.dim_1600x900.jpg",
    },
  ],
  Blogs: [
    {
      title: "Why BIM is Transforming Engineering Consultancy",
      date: "March 2026",
      image: "/assets/generated/hero-slide4.dim_1600x900.jpg",
    },
    {
      title: "Net Zero Buildings: Engineering Principles",
      date: "February 2026",
      image: "/assets/generated/hero-slide3.dim_1600x900.jpg",
    },
    {
      title: "The Rise of Modular Construction in India",
      date: "January 2026",
      image: "/assets/generated/hero-slide2.dim_1600x900.jpg",
    },
  ],
  "Technical Publications": [
    {
      title: "Seismic Analysis of Long-Span Bridge Structures",
      date: "Q1 2026",
      image: "/assets/generated/hero-slide1.dim_1600x900.jpg",
    },
    {
      title: "Thermal Modelling for Industrial HVAC Systems",
      date: "Q4 2025",
      image: "/assets/generated/hero-slide4.dim_1600x900.jpg",
    },
    {
      title: "Slope Stability in Open-Cast Mining Operations",
      date: "Q3 2025",
      image: "/assets/generated/sector-mining.dim_800x500.jpg",
    },
  ],
};

const SECTORS = [
  {
    name: "Energy & Power",
    image: "/assets/generated/sector-power.dim_800x500.jpg",
  },
  {
    name: "Infrastructure",
    image: "/assets/generated/sector-infrastructure.dim_800x500.jpg",
  },
  {
    name: "Mining & Metals",
    image: "/assets/generated/sector-mining.dim_800x500.jpg",
  },
  {
    name: "Hydrocarbons & Chemicals",
    image: "/assets/generated/sector-hydrocarbons.dim_800x500.jpg",
  },
  {
    name: "Urban Development",
    image: "/assets/generated/hero-slide2.dim_1600x900.jpg",
  },
];

// ─── Icon helper ──────────────────────────────────────────────────────────────
function ServiceIcon({
  name,
  className,
}: { name: string; className?: string }) {
  switch (name) {
    case "ruler":
      return <Ruler className={className} />;
    case "clipboard":
      return <ClipboardList className={className} />;
    case "leaf":
      return <Leaf className={className} />;
    case "monitor":
      return <Monitor className={className} />;
    default:
      return <Building2 className={className} />;
  }
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  end,
  suffix = "+",
}: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const interval = setInterval(() => {
            current = Math.min(current + increment, end);
            setCount(Math.round(current));
            if (current >= end) clearInterval(interval);
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="bg-[#003087] text-white text-xs py-2 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-6">
          {["About Us", "Careers", "Contact"].map((link) => (
            <a
              key={link}
              href="/"
              className="hover:text-orange-400 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 ml-auto">
          {[
            { icon: <Linkedin size={14} />, label: "LinkedIn" },
            { icon: <Twitter size={14} />, label: "Twitter" },
            { icon: <Facebook size={14} />, label: "Facebook" },
            { icon: <Instagram size={14} />, label: "Instagram" },
            { icon: <Youtube size={14} />, label: "YouTube" },
          ].map(({ icon, label }) => (
            <a
              key={label}
              href="/"
              aria-label={label}
              className="hover:text-orange-400 transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Header/Navbar ────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none select-none">
          <span className="text-2xl font-black tracking-[0.12em] text-[#003087] uppercase">
            ADITATTVA
          </span>
          <span className="block h-[3px] w-10 bg-[#E87722] mt-0.5" />
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-0"
          onMouseLeave={handleMouseLeave}
        >
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() =>
                item.children.length ? handleMouseEnter(item.label) : undefined
              }
            >
              <button
                type="button"
                onClick={() => {
                  if (!item.children.length) {
                    scrollTo(item.label.toLowerCase().replace(" ", "-"));
                  }
                }}
                className="flex items-center gap-1 px-3 py-5 text-sm font-medium text-gray-700 hover:text-[#003087] transition-colors whitespace-nowrap"
                data-ocid={`nav.${item.label.toLowerCase().replace(/ /g, "_")}.link`}
              >
                {item.label}
                {item.children.length > 0 && <ChevronDown size={12} />}
              </button>

              {/* Mega Dropdown */}
              {item.children.length > 0 && (
                <div
                  className={`mega-dropdown ${
                    activeDropdown === item.label ? "open" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="border-l-4 border-[#E87722] pl-6">
                      <p className="section-label mb-4">{item.label}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {item.children.map((child) => (
                          <a
                            key={child}
                            href="/"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#003087] hover:font-medium transition-all group"
                          >
                            <ChevronRight
                              size={14}
                              className="text-[#E87722] group-hover:translate-x-0.5 transition-transform"
                            />
                            {child}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 text-[#003087]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.menu.toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-0 top-[calc(2rem+4rem)] bg-white z-50 overflow-y-auto px-6 py-8"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="mb-6">
                <p className="text-[#003087] font-bold text-sm uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <a
                    key={child}
                    href="/"
                    className="block text-gray-600 py-1 text-sm hover:text-[#E87722]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child}
                  </a>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Slider ──────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[560px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className="hero-slide"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Slide Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <p className="section-label mb-4 text-orange-400">
                Engineering Excellence
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 whitespace-pre-line">
                {HERO_SLIDES[current].headline}
              </h1>
              <p className="text-white/80 text-lg mb-8">
                {HERO_SLIDES[current].sub}
              </p>
              <a
                href="/"
                className="tce-btn-outline inline-flex items-center gap-2"
                data-ocid="hero.primary_button"
              >
                Read More <ArrowRight size={16} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: slide dots use stable indices
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#E87722] scale-125" : "bg-white/60"
            }`}
            data-ocid={`hero.slide.${i + 1}`}
          />
        ))}
      </div>

      {/* Left social bar */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 hidden md:flex">
        {[
          { icon: <Linkedin size={16} />, label: "LinkedIn" },
          { icon: <Twitter size={16} />, label: "Twitter" },
          { icon: <Facebook size={16} />, label: "Facebook" },
        ].map(({ icon, label }) => (
          <a
            key={label}
            href="/"
            aria-label={label}
            className="text-white/70 hover:text-white transition-colors"
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Right scroll text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3">
        <span className="text-white/60 text-xs tracking-[0.3em] uppercase rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-12 bg-white/40" />
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { data: stats } = useCompanyStats();

  const statItems = [
    {
      value: Number(stats?.years ?? 25),
      label: "Years of Excellence",
      suffix: "+",
    },
    {
      value: Number(stats?.projects ?? 500),
      label: "Projects Delivered",
      suffix: "+",
    },
    {
      value: Number(stats?.offices ?? 30),
      label: "Countries Served",
      suffix: "+",
    },
    {
      value: Number(stats?.employees ?? 5000),
      label: "Engineering Talent",
      suffix: "+",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-3">ABOUT US</p>
            <h2 className="section-heading mb-6">
              Engineering a Better Tomorrow™
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Partnering through the entire asset life cycle; right from concept
              to commissioning. Aditattva Group is an integrated engineering
              solutions provider you can trust.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[#003087] font-semibold text-sm hover:text-[#E87722] transition-colors"
              data-ocid="about.link"
            >
              About Us <ArrowRight size={16} className="text-[#E87722]" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <img
              src="/assets/generated/hero-slide5.dim_1600x900.jpg"
              alt="About Aditattva"
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E87722]" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12">
          {statItems.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
              data-ocid={`about.stat.${i + 1}`}
            >
              <p className="text-4xl md:text-5xl font-black text-[#003087] mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection() {
  const { data: backendServices } = useServices();
  const services = backendServices?.length ? backendServices : DEFAULT_SERVICES;

  return (
    <section id="services" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">DESIGN TO DELIVERY</p>
          <h2 className="section-heading">
            Engineering Excellence In Every Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.slice(0, 5).map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-6 flex flex-col cursor-pointer transition-all duration-300 hover:bg-[#003087]"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="mb-4 text-[#003087] group-hover:text-white transition-colors">
                <ServiceIcon name={svc.iconName} className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-white mb-2 leading-snug transition-colors">
                {svc.title}
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-white/70 leading-relaxed flex-1 transition-colors">
                {svc.description}
              </p>
              <div className="mt-4">
                <ArrowRight size={16} className="text-[#E87722]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sectors Section ──────────────────────────────────────────────────────────
function SectorsSection() {
  return (
    <section id="sectors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="section-label mb-3">SECTORS WE SERVE</p>
          <h2 className="section-heading">
            Rock Solid Dependability — Delivering Results
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTORS.map((sector, i) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden h-64 group cursor-pointer"
              data-ocid={`sectors.item.${i + 1}`}
            >
              <img
                src={sector.image}
                alt={sector.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <h3 className="text-white font-bold text-lg">{sector.name}</h3>
                <a
                  href="/"
                  className="text-[#E87722] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Explore <ArrowRight size={14} />
                </a>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#E87722] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const { data: backendProjects } = useProjects();
  const projects = backendProjects?.length ? backendProjects : DEFAULT_PROJECTS;

  return (
    <section id="projects" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="section-label mb-3">GLOBAL PROJECTS</p>
          <h2 className="section-heading mb-6">
            Delivering Aspirations, Achieving Scale
          </h2>
          <div className="flex flex-wrap gap-8 text-sm text-gray-500">
            <span className="font-bold text-[#003087]">
              500+ Projects Delivered
            </span>
            <span>|</span>
            <span className="font-bold text-[#003087]">30+ Countries</span>
            <span>|</span>
            <span className="font-bold text-[#003087]">25+ Years</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {projects.slice(0, 3).map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white group hover:shadow-card-hover transition-shadow duration-300 border-b-2 border-transparent hover:border-[#E87722]"
              data-ocid={`projects.item.${i + 1}`}
            >
              <div className="overflow-hidden h-48">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="inline-block bg-orange-100 text-[#E87722] text-xs font-semibold px-2 py-1 mb-3 uppercase tracking-wide">
                  {proj.category}
                </span>
                <h3 className="font-bold text-gray-900 mb-2">{proj.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {proj.description}
                </p>
                <a
                  href="/"
                  className="text-[#003087] text-sm font-semibold hover:text-[#E87722] inline-flex items-center gap-1 transition-colors"
                >
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            className="tce-btn-primary"
            data-ocid="projects.primary_button"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Insights Section ─────────────────────────────────────────────────────────
function InsightsSection() {
  const tabs = [
    "White Papers",
    "Case Studies",
    "Blogs",
    "Technical Publications",
  ] as const;
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("White Papers");

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="section-label mb-3">INSIGHTS</p>
          <h2 className="section-heading">Knowledge-Led Engineering</h2>
        </motion.div>

        {/* Tab bar */}
        <div className="flex gap-0 border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                activeTab === tab
                  ? "border-[#E87722] text-[#003087]"
                  : "border-transparent text-gray-500 hover:text-[#003087]"
              }`}
              data-ocid={`insights.${tab.toLowerCase().replace(/ /g, "_")}.tab`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {INSIGHTS[activeTab].map((item, i) => (
              <div
                key={item.title}
                className="group cursor-pointer"
                data-ocid={`insights.item.${i + 1}`}
              >
                <div className="overflow-hidden h-44 mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs text-gray-400 mb-2">{item.date}</p>
                <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#003087] transition-colors">
                  {item.title}
                </h3>
                <a
                  href="/"
                  className="text-[#E87722] text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── People Section ───────────────────────────────────────────────────────────
function PeopleSection() {
  return (
    <section id="people" className="relative py-28 overflow-hidden">
      <img
        src="/assets/generated/people-careers.dim_1400x700.jpg"
        alt="People at Aditattva"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#003087]/80" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-8 text-center"
      >
        <p className="section-label text-orange-400 mb-4">
          A PEOPLE-DRIVEN ORGANISATION
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          People Are The Core To The Business
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
          Work with passionate people who are experts in their field.
        </p>
        <button
          type="button"
          className="tce-btn-orange"
          data-ocid="people.primary_button"
        >
          Apply Now
        </button>
      </motion.div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const submitMutation = useSubmitContactForm();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        subject: form.phone,
        message: form.message,
      });
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="section-label mb-3">CONTACT US</p>
          <h2 className="section-heading">Get In Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="contact.modal"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#003087] transition-colors"
                  id="contact-name"
                  data-ocid="contact.name.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#003087] transition-colors"
                  id="contact-email"
                  data-ocid="contact.email.input"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
              >
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+91 00000 00000"
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#003087] transition-colors"
                id="contact-phone"
                data-ocid="contact.phone.input"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
              >
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#003087] transition-colors resize-none"
                id="contact-message"
                data-ocid="contact.message.textarea"
              />
            </div>
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="tce-btn-primary w-full flex items-center justify-center gap-2"
              data-ocid="contact.submit_button"
            >
              {submitMutation.isPending ? "Sending..." : "Send Message"}
            </button>
            {submitMutation.isError && (
              <p
                className="text-red-500 text-sm"
                data-ocid="contact.error_state"
              >
                An error occurred. Please try again.
              </p>
            )}
          </form>

          {/* Office Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[#003087] text-lg mb-4">
                Our Office
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin
                    className="text-[#E87722] mt-0.5 shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Head Office</p>
                    <p className="text-gray-500 text-sm">
                      Plot No. 42, Sector 18, Gurugram,
                      <br />
                      Haryana — 122 015, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-[#E87722] mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-500 text-sm">+91 124 456 7890</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-[#E87722] mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-500 text-sm">info@aditattva.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="font-bold text-[#003087] text-lg mb-4">
                Regional Offices
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
                {[
                  "Mumbai",
                  "Chennai",
                  "Hyderabad",
                  "Bengaluru",
                  "Kolkata",
                  "Pune",
                ].map((city) => (
                  <div key={city} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E87722]" />
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "aditattva.com";

  const footerLinks = {
    "About Us": ["Overview", "Leadership", "Milestones", "CSR"],
    Sectors: ["Energy & Utilities", "Infrastructure", "Urban Dev", "Mining"],
    Services: ["Design & Engg.", "Project Mgmt.", "Sustainability", "Digital"],
    Insights: ["White Papers", "Case Studies", "Blogs", "Publications"],
    Media: ["Media Kit", "Annual Reports", "Press Coverage"],
    People: ["Life @ Aditattva", "Careers"],
  };

  return (
    <footer className="bg-white border-t-4 border-[#003087]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <div className="mb-2">
              <span className="text-2xl font-black tracking-[0.12em] text-[#003087] uppercase">
                ADITATTVA
              </span>
              <div className="h-[3px] w-10 bg-[#E87722] mt-1" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-3">
              An integrated engineering solutions provider partnering through
              the entire asset life cycle.
            </p>
            <div className="flex gap-4 mt-4">
              {[
                { icon: <Linkedin size={18} />, label: "LinkedIn" },
                { icon: <Twitter size={18} />, label: "Twitter" },
                { icon: <Facebook size={18} />, label: "Facebook" },
                { icon: <Instagram size={18} />, label: "Instagram" },
                { icon: <Youtube size={18} />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="/"
                  aria-label={label}
                  className="text-[#003087] hover:text-[#E87722] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-bold text-[#003087] text-xs uppercase tracking-wider mb-3">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="/"
                        className="text-gray-500 text-xs hover:text-[#E87722] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex gap-4">
            {["Privacy Policy", "Disclaimer", "Site Map"].map((item) => (
              <a
                key={item}
                href="/"
                className="hover:text-[#E87722] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="text-center">
            © {year} Aditattva Group. All Rights Reserved. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E87722] transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
function AppContent() {
  return (
    <div className="min-h-screen font-sans">
      <TopBar />
      <Header />
      <main>
        <HeroSlider />
        <AboutSection />
        <ServicesSection />
        <SectorsSection />
        <ProjectsSection />
        <InsightsSection />
        <PeopleSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
