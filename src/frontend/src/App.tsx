import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Facebook,
  Globe,
  HardHat,
  Home,
  Hospital,
  Layers,
  Lightbulb,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Quote,
  Send,
  Shield,
  Truck,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CompanyStats,
  Project,
  Service,
  TeamMember,
  Testimonial,
} from "./backend.d";
import {
  useCompanyStats,
  useProjects,
  useServices,
  useSubmitContactForm,
  useTeamMembers,
  useTestimonials,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "INDUSTRIES", href: "#industries" },
  { label: "PROJECTS", href: "#projects" },
  { label: "LEADERSHIP", href: "#leadership" },
  { label: "CONTACT US", href: "#contact" },
];

const SERVICE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  engineering: Building2,
  advisory: Lightbulb,
  infrastructure: Layers,
  construction: HardHat,
  asset: BarChart3,
  digital: Monitor,
  default: Building2,
};

const FALLBACK_SERVICES: Service[] = [
  {
    title: "Engineering & Design",
    description:
      "World-class structural, civil, and MEP engineering solutions tailored for complex infrastructure challenges.",
    iconName: "engineering",
  },
  {
    title: "Advisory & Consulting",
    description:
      "Strategic advisory services that transform bold visions into executable, value-driven outcomes.",
    iconName: "advisory",
  },
  {
    title: "Infrastructure Development",
    description:
      "End-to-end infrastructure development from feasibility through commissioning across all asset classes.",
    iconName: "infrastructure",
  },
  {
    title: "Construction Management",
    description:
      "Rigorous on-site construction oversight ensuring quality, safety, and on-time project delivery.",
    iconName: "construction",
  },
  {
    title: "Asset Management",
    description:
      "Maximising asset performance and lifecycle value through data-driven management strategies.",
    iconName: "asset",
  },
  {
    title: "Digital Solutions",
    description:
      "Cutting-edge digital transformation, BIM, and smart technology integration for the built environment.",
    iconName: "digital",
  },
];

const FALLBACK_TEAM: TeamMember[] = [
  {
    name: "Rajiv Sharma",
    role: "Chairman & Chief Executive Officer",
    bio: "Over three decades of transformative leadership in global infrastructure and engineering, driving Aditattva's mission to deliver world-class solutions.",
  },
  {
    name: "Priya Menon",
    role: "Chief Operating Officer",
    bio: "Champion of operational excellence with expertise spanning 20+ major infrastructure programmes across Asia, the Middle East, and Europe.",
  },
  {
    name: "Arjun Patel",
    role: "Chief Technical Officer",
    bio: "Pioneer in digital engineering and smart infrastructure solutions, leading Aditattva's technology strategy and innovation agenda.",
  },
  {
    name: "Vikram Nair",
    role: "Director of Strategy",
    bio: "Strategic architect behind Aditattva's global expansion, M&A activity, and long-term growth vision across emerging and developed markets.",
  },
];

const FALLBACK_PROJECTS: Project[] = [
  {
    title: "Coastal Highway Bridge Complex",
    description:
      "A 4.2km signature bridge connecting key economic zones, engineered for seismic resilience and a 100-year design life.",
    imageUrl: "/assets/generated/project-bridge.dim_600x400.jpg",
    category: "Infrastructure",
  },
  {
    title: "NextGen Smart City Hub",
    description:
      "Integrated smart city district with IoT infrastructure, sustainable energy systems, and data-driven urban management.",
    imageUrl: "/assets/generated/project-smartcity.dim_600x400.jpg",
    category: "Urban Development",
  },
  {
    title: "Renewable Energy Campus",
    description:
      "500MW hybrid solar-wind energy facility with advanced grid storage, powering 400,000 homes sustainably.",
    imageUrl: "/assets/generated/project-energy.dim_600x400.jpg",
    category: "Energy",
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Aditattva Group delivered exceptional results on our flagship infrastructure programme. Their technical depth, project discipline, and collaborative approach set a new benchmark.",
    author: "Suresh Kumar",
    role: "Director of Infrastructure",
    company: "National Highways Authority",
  },
  {
    quote:
      "Working with Aditattva's advisory team transformed our approach to asset management. Their insights and strategic frameworks have driven measurable value across our portfolio.",
    author: "Anika Singh",
    role: "Chief Executive Officer",
    company: "Apex Urban Development",
  },
  {
    quote:
      "The digital solutions team at Aditattva integrated BIM and IoT across our entire construction programme, reducing rework by 35% and accelerating delivery by four months.",
    author: "Robert Chen",
    role: "Programme Director",
    company: "Pacific Infrastructure Partners",
  },
];

const FALLBACK_STATS: CompanyStats = {
  years: BigInt(25),
  projects: BigInt(500),
  offices: BigInt(12),
  employees: BigInt(5000),
};

const INDUSTRIES = [
  {
    icon: Zap,
    label: "Energy & Utilities",
    desc: "Powering sustainable futures",
  },
  { icon: Globe, label: "Urban Development", desc: "Building smarter cities" },
  { icon: Truck, label: "Transportation", desc: "Connecting communities" },
  {
    icon: Hospital,
    label: "Healthcare Facilities",
    desc: "Enabling better health",
  },
  {
    icon: Shield,
    label: "Government & Defence",
    desc: "Securing infrastructure",
  },
  {
    icon: Home,
    label: "Commercial Real Estate",
    desc: "Creating productive spaces",
  },
];

const CLIENTS = [
  "Tata Group",
  "L&T Engineering",
  "AECOM",
  "Jacobs",
  "HDFC Bank",
  "Infosys",
  "Shapoorji Pallonji",
  "GMR Group",
];

const TEAM_IMAGES = [
  "/assets/generated/team-ceo.dim_300x300.jpg",
  "/assets/generated/team-coo.dim_300x300.jpg",
  "/assets/generated/team-cto.dim_300x300.jpg",
  "/assets/generated/team-cfd.dim_300x300.jpg",
];

// ─── Animated Counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return { count, ref };
}

// ─── Header ────────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{
        background: "linear-gradient(135deg, #0B1B2A 0%, #10283D 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 flex-shrink-0"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/aditattva-logo-transparent.dim_200x60.png"
              alt="Aditattva Group"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="nav-link-hover text-xs xl:text-sm font-semibold tracking-widest text-[#C9D3DD] hover:text-white transition-colors duration-200 pb-1"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => handleNav("#contact")}
              className="px-5 py-2.5 text-sm font-semibold rounded bg-[#C9A24A] hover:bg-[#D4B56A] text-[#0B1B2A] tracking-wide transition-colors duration-200"
              data-ocid="nav.primary_button"
            >
              REQUEST A CONSULTATION
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#14324A] overflow-hidden"
            style={{ background: "#0B1B2A" }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-3 px-3 text-sm font-semibold tracking-widest text-[#C9D3DD] hover:text-[#C9A24A] hover:bg-[#0E2233] rounded transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNav("#contact")}
                className="mt-3 px-5 py-3 text-sm font-semibold rounded bg-[#C9A24A] text-[#0B1B2A] tracking-wide text-center"
                data-ocid="nav.primary_button"
              >
                REQUEST A CONSULTATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B1B2A 0%, #0E2233 50%, #14324A 100%)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-cityscape.dim_1600x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />
      {/* Geometric overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A24A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(11,27,42,0.85) 0%, rgba(11,27,42,0.4) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-12 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-sm font-semibold tracking-[0.2em] uppercase">
              Global Engineering Excellence
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-6">
            Leadership in
            <br />
            <span className="text-[#C9A24A]">Engineering</span>
            <br />& Services.
          </h1>
          <p className="text-base sm:text-lg font-normal text-[#C9D3DD] max-w-xl leading-relaxed mb-10">
            Delivering transformative infrastructure, advisory, and digital
            solutions for the world's most complex challenges. Trusted by
            governments, developers, and enterprises across 12 global offices.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C9A24A] hover:bg-[#D4B56A] text-[#0B1B2A] font-semibold rounded transition-colors duration-200"
              data-ocid="hero.primary_button"
            >
              Explore Services <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#C9A24A] text-white hover:bg-[#C9A24A] hover:text-[#0B1B2A] font-semibold rounded transition-colors duration-200"
              data-ocid="hero.secondary_button"
            >
              Learn More <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-auto min-h-[360px]">
              <img
                src="/assets/generated/about-office.dim_600x400.jpg"
                alt="Aditattva Group offices"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent 60%, rgba(11,27,42,0.3) 100%)",
                }}
              />
            </div>
            <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-8 bg-[#C9A24A]" />
                <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase">
                  About Aditattva Group
                </span>
              </div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase text-[#0B1B2A] leading-tight mb-5">
                Engineering a Better World Since 1999
              </h2>
              <p className="text-[#6B7785] leading-relaxed mb-4">
                Aditattva Group is a global leader in engineering, advisory, and
                infrastructure services. With over 25 years of experience, we
                have delivered more than 500 landmark projects across energy,
                urban development, transportation, and the built environment.
              </p>
              <p className="text-[#6B7785] leading-relaxed mb-8">
                Our multidisciplinary teams of 5,000+ professionals operate from
                12 offices worldwide, combining local expertise with global
                perspective to solve the most complex challenges facing society
                today.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .querySelector("#services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A24A] hover:bg-[#D4B56A] text-[#0B1B2A] font-semibold text-sm rounded transition-colors"
                  data-ocid="about.primary_button"
                >
                  Our Services <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .querySelector("#leadership")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0B1B2A] text-[#0B1B2A] hover:bg-[#0B1B2A] hover:text-white font-semibold text-sm rounded transition-colors"
                  data-ocid="about.secondary_button"
                >
                  Meet Leadership <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────────
function Services({ services }: { services: Service[] }) {
  const display = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase">
              What We Do
            </span>
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase text-[#0B1B2A] leading-tight">
            Our Core Services
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((service, i) => {
            const IconComp =
              SERVICE_ICONS[service.iconName.toLowerCase()] ??
              SERVICE_ICONS.default;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="service-card-hover group relative bg-[#0E2233] rounded-xl p-8 cursor-default"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-lg bg-[#14324A] flex items-center justify-center mb-5 group-hover:bg-[#C9A24A] transition-colors duration-300">
                  <IconComp className="w-6 h-6 text-[#C9A24A] group-hover:text-[#0B1B2A] transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase text-white mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-[#C9D3DD] text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-5 flex items-center gap-1 text-[#C9A24A] text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Industries ────────────────────────────────────────────────────────────────
function Industries() {
  return (
    <section id="industries" className="py-16 lg:py-24 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase">
              Sectors We Serve
            </span>
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase text-[#0B1B2A] leading-tight">
            Industries We Serve
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-white hover:bg-[#0B1B2A] group rounded-xl p-6 flex flex-col items-center text-center cursor-default transition-colors duration-300 shadow-card"
              data-ocid={`industries.item.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-full bg-[#E9EEF3] group-hover:bg-[#C9A24A] flex items-center justify-center mb-3 transition-colors duration-300">
                <ind.icon className="w-5 h-5 text-[#0B1B2A] group-hover:text-[#0B1B2A] transition-colors duration-300" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#0B1B2A] group-hover:text-white leading-tight mb-1 transition-colors duration-300">
                {ind.label}
              </h3>
              <p className="text-[10px] text-[#6B7785] group-hover:text-[#C9D3DD] transition-colors duration-300">
                {ind.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────────
function StatItem({
  value,
  suffix,
  label,
}: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center px-4 py-6">
      <div className="font-heading text-4xl lg:text-5xl font-black text-[#C9A24A] mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-[#C9D3DD] text-sm font-semibold uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

function Stats({ stats }: { stats: CompanyStats | undefined }) {
  const s = stats ?? FALLBACK_STATS;
  return (
    <section id="stats" className="py-2 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0B1B2A 0%, #14324A 100%)",
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#1a3e5c]">
            <StatItem
              value={Number(s.years)}
              suffix="+"
              label="Years Experience"
            />
            <StatItem
              value={Number(s.projects)}
              suffix="+"
              label="Projects Completed"
            />
            <StatItem
              value={Number(s.offices)}
              suffix=""
              label="Global Offices"
            />
            <StatItem
              value={Number(s.employees)}
              suffix="+"
              label="Professionals"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────
function Projects({ projects }: { projects: Project[] }) {
  const display = projects.length > 0 ? projects : FALLBACK_PROJECTS;
  const imageMap: Record<string, string> = {
    bridge: "/assets/generated/project-bridge.dim_600x400.jpg",
    smartcity: "/assets/generated/project-smartcity.dim_600x400.jpg",
    energy: "/assets/generated/project-energy.dim_600x400.jpg",
  };

  return (
    <section id="projects" className="py-16 lg:py-24 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase">
              Our Portfolio
            </span>
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase text-[#0B1B2A] leading-tight">
            Landmark Projects
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((project, i) => {
            const imgSrc = project.imageUrl || Object.values(imageMap)[i % 3];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="project-card-hover bg-white rounded-xl overflow-hidden shadow-card group"
                data-ocid={`projects.item.${i + 1}`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#C9A24A] text-[#0B1B2A] text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold uppercase text-[#0B1B2A] mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[#6B7785] text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Leadership ────────────────────────────────────────────────────────────────
function Leadership({ members }: { members: TeamMember[] }) {
  const display = members.length > 0 ? members : FALLBACK_TEAM;

  return (
    <section id="leadership" className="py-16 lg:py-24 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase">
              Our People
            </span>
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase text-[#0B1B2A] leading-tight">
            Leadership Team
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {display.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-card group hover:shadow-card-hover transition-shadow duration-300"
              data-ocid={`leadership.item.${i + 1}`}
            >
              <div className="relative h-64 overflow-hidden bg-[#0E2233]">
                <img
                  src={TEAM_IMAGES[i] ?? TEAM_IMAGES[0]}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,27,42,0.8) 0%, transparent 50%)",
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-bold uppercase text-[#0B1B2A] leading-snug">
                  {member.name}
                </h3>
                <p className="text-[#C9A24A] text-xs font-semibold uppercase tracking-wide mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-[#6B7785] text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const display =
    testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase">
              Client Voice
            </span>
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase text-[#0B1B2A] leading-tight">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-card relative"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <Quote className="w-8 h-8 text-[#C9A24A] opacity-40 mb-4" />
              <p className="text-[#6B7785] text-sm leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-[#D7DEE6] pt-4">
                <p className="font-semibold text-[#0B1B2A] text-sm">
                  {t.author}
                </p>
                <p className="text-[#C9A24A] text-xs font-medium mt-0.5">
                  {t.role}
                </p>
                <p className="text-[#6B7785] text-xs">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Clients ───────────────────────────────────────────────────────────────────
function Clients() {
  return (
    <section id="clients" className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-[#6B7785] text-sm font-semibold uppercase tracking-widest">
            Trusted by Industry Leaders
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {CLIENTS.map((client, i) => (
            <div
              key={client}
              className="px-5 py-2.5 border-2 border-[#D7DEE6] hover:border-[#C9A24A] rounded text-[#6B7785] hover:text-[#0B1B2A] text-sm font-bold uppercase tracking-wide transition-all duration-200 cursor-default"
              data-ocid={`clients.item.${i + 1}`}
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Careers ───────────────────────────────────────────────────────────────────
function Careers() {
  return (
    <section id="careers" className="py-16 lg:py-20 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #0B1B2A 0%, #14324A 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A24A' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 px-8 py-14 lg:px-16 lg:py-20 text-center">
            <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">
              Join Our Team
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-white leading-tight mb-5">
              Build Your Career at
              <br />
              <span className="text-[#C9A24A]">Aditattva Group</span>
            </h2>
            <p className="text-[#C9D3DD] text-base max-w-2xl mx-auto leading-relaxed mb-10">
              Join 5,000+ world-class engineers, consultants, and innovators
              shaping the future of global infrastructure. We offer an
              environment where bold ideas and exceptional talent are
              celebrated.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A24A] hover:bg-[#D4B56A] text-[#0B1B2A] font-bold rounded transition-colors"
                data-ocid="careers.primary_button"
              >
                Explore Opportunities <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white hover:bg-white hover:text-[#0B1B2A] font-bold rounded transition-colors"
                data-ocid="careers.secondary_button"
              >
                Learn About Culture
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { mutate, isPending, isSuccess, isError } = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#E9EEF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
            <span className="text-[#C9A24A] text-xs font-semibold tracking-[0.2em] uppercase">
              Get In Touch
            </span>
            <div className="h-0.5 w-8 bg-[#C9A24A]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase text-[#0B1B2A] leading-tight">
            Contact Us
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-[#0B1B2A] rounded-xl p-8 lg:p-10 text-white">
            <h3 className="font-heading text-xl font-bold uppercase mb-6">
              Let's Start a Conversation
            </h3>
            <p className="text-[#C9D3DD] text-sm leading-relaxed mb-8">
              Whether you're planning a major infrastructure programme, seeking
              strategic advisory, or exploring partnership opportunities, our
              team is ready to help. Reach out to us.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14324A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#C9A24A]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7785] uppercase tracking-wide font-semibold mb-1">
                    Phone
                  </p>
                  <p className="text-[#C9D3DD] text-sm">+91 22 4567 8900</p>
                  <p className="text-[#C9D3DD] text-sm">+91 80 2345 6789</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14324A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#C9A24A]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7785] uppercase tracking-wide font-semibold mb-1">
                    Email
                  </p>
                  <p className="text-[#C9D3DD] text-sm">
                    enquiries@aditattvagroup.com
                  </p>
                  <p className="text-[#C9D3DD] text-sm">
                    projects@aditattvagroup.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14324A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#C9A24A]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7785] uppercase tracking-wide font-semibold mb-1">
                    Headquarters
                  </p>
                  <p className="text-[#C9D3DD] text-sm">
                    Aditattva House, BKC Complex
                  </p>
                  <p className="text-[#C9D3DD] text-sm">Mumbai 400051, India</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#14324A]">
              <p className="text-xs text-[#6B7785] uppercase tracking-wide font-semibold mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {(
                  [
                    {
                      Icon: Linkedin,
                      href: "https://linkedin.com",
                      label: "LinkedIn",
                    },
                    {
                      Icon: Twitter,
                      href: "https://twitter.com",
                      label: "Twitter",
                    },
                    {
                      Icon: Facebook,
                      href: "https://facebook.com",
                      label: "Facebook",
                    },
                  ] as const
                ).map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-[#14324A] hover:bg-[#C9A24A] flex items-center justify-center transition-colors duration-200"
                    data-ocid="contact.link"
                  >
                    <Icon className="w-4 h-4 text-[#C9D3DD] hover:text-[#0B1B2A]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 lg:p-10 shadow-card">
            {isSuccess ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center py-12"
                data-ocid="contact.success_state"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0B1B2A] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#6B7785] text-sm">
                  Thank you for reaching out. Our team will respond within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setForm({ name: "", email: "", subject: "", message: "" })
                  }
                  className="mt-6 px-5 py-2 text-sm font-semibold bg-[#C9A24A] text-[#0B1B2A] rounded hover:bg-[#D4B56A] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-ocid="contact.modal"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wide text-[#0B1B2A] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Rajiv Sharma"
                      className="border-[#D7DEE6] focus:border-[#C9A24A] focus:ring-[#C9A24A]"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wide text-[#0B1B2A] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <Input
                      required
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="rajiv@company.com"
                      className="border-[#D7DEE6] focus:border-[#C9A24A] focus:ring-[#C9A24A]"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold uppercase tracking-wide text-[#0B1B2A] mb-1.5"
                  >
                    Subject *
                  </label>
                  <Input
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    id="contact-subject"
                    placeholder="Project Enquiry / Partnership / Advisory"
                    className="border-[#D7DEE6] focus:border-[#C9A24A] focus:ring-[#C9A24A]"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wide text-[#0B1B2A] mb-1.5"
                  >
                    Message *
                  </label>
                  <Textarea
                    required
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your project or enquiry..."
                    className="border-[#D7DEE6] focus:border-[#C9A24A] focus:ring-[#C9A24A] resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                {isError && (
                  <div
                    className="flex items-center gap-2 text-red-600 text-sm"
                    data-ocid="contact.error_state"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#C9A24A] hover:bg-[#D4B56A] text-[#0B1B2A] font-bold py-3 text-sm uppercase tracking-wide rounded"
                  data-ocid="contact.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-[#0B1B2A] text-[#C9D3DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/assets/generated/aditattva-logo-transparent.dim_200x60.png"
              alt="Aditattva Group"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-[#6B7785] mb-5">
              Engineering excellence and innovative infrastructure solutions
              across 12 global offices.
            </p>
            <div className="flex gap-3">
              {(
                [
                  {
                    Icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    Icon: Twitter,
                    href: "https://twitter.com",
                    label: "Twitter",
                  },
                  {
                    Icon: Facebook,
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                ] as const
              ).map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded bg-[#14324A] hover:bg-[#C9A24A] flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Engineering & Design",
                "Advisory & Consulting",
                "Infrastructure",
                "Construction Mgmt",
                "Asset Management",
                "Digital Solutions",
              ].map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector("#services")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm text-[#6B7785] hover:text-[#C9A24A] transition-colors text-left"
                    data-ocid="footer.link"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm text-[#6B7785] hover:text-[#C9A24A] transition-colors text-left"
                    data-ocid="footer.link"
                  >
                    {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-[#6B7785]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A24A] mt-0.5 flex-shrink-0" />
                <span>Aditattva House, BKC Complex, Mumbai 400051</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C9A24A] flex-shrink-0" />
                <span>+91 22 4567 8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A24A] flex-shrink-0" />
                <span>enquiries@aditattvagroup.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#14324A] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7785]">
          <p>© {year} Aditattva Group. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A24A] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
function AppContent() {
  const { data: services = [] } = useServices();
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: projects = [] } = useProjects();
  const { data: testimonials = [] } = useTestimonials();
  const { data: stats } = useCompanyStats();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services services={services} />
        <Industries />
        <Stats stats={stats} />
        <Projects projects={projects} />
        <Leadership members={teamMembers} />
        <Testimonials testimonials={testimonials} />
        <Clients />
        <Careers />
        <Contact />
      </main>
      <Footer />
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
