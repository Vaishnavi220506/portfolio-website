import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clipboard,
  Code2,
  Github,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Pause,
  Play,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { achievements, contributions, focusAreas, githubStats, projects, stackGroups } from "@/data/portfolio";

const EMAIL = "vaishnaviharish2006@gmail.com";
const ASSET_BASE = import.meta.env.BASE_URL;
const asset = (filename: string) => `${ASSET_BASE}assets/${filename}`;
const RESUME_URL = asset("resume-polished-final.pdf");

function ProjectVisual({ type }: { type: "kavach" | "stempulse" | "rescue" | "clarity" | "race" }) {
  const visualImages = {
    kavach: asset("kavach-front-page.png"),
    rescue: asset("rescue-first-screen.png"),
    clarity: asset("clarity-project.png"),
    race: asset("race-project.png"),
  };
  const visualLabels = {
    kavach: "Explainable video intelligence",
    stempulse: "STEM pathways · evidence",
    rescue: "Emergency coordination",
    clarity: "AI feasibility workspace",
    race: "Procedural racing · AI",
  };

  return (
    <div className={`project-visual project-visual-${type}`} data-testid={`project-${type}-visual`} aria-hidden="true">
      {type === "stempulse" ? (
        <div className="project-visual-surface project-visual-surface-stempulse">
          <span className="project-visual-surface-kicker">STEM / PATHWAYS / RETURN</span>
          <strong>Build confidence<br />with evidence.</strong>
          <div className="project-visual-surface-steps"><span>01 Learn</span><span>02 Grow</span><span>03 Restart</span></div>
        </div>
      ) : (
        <img src={visualImages[type]} alt="" className={`project-visual-image project-visual-image-${type}`} />
      )}
      <div className="project-visual-shade" />
      <span className="project-visual-label">{visualLabels[type]}</span>
    </div>
  );
}

function SectionKicker({ children, number }: { children: string; number: string }) {
  return (
    <div className="mb-4 flex items-center gap-3" data-testid={`section-kicker-${number}`}>
      <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-rose-500 dark:text-rose-300">{number}</span>
      <span className="h-px w-8 bg-rose-300 dark:bg-rose-800" />
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">{children}</span>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contributionFilter, setContributionFilter] = useState<"all" | "Merged" | "Open">("all");
  const [contributionQuery, setContributionQuery] = useState("");
  const [stackIndex, setStackIndex] = useState(0);
  const [achievementIndex, setAchievementIndex] = useState(0);
  const [achievementAutoPlay, setAchievementAutoPlay] = useState(true);
  const [achievementPaused, setAchievementPaused] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [emailDraft, setEmailDraft] = useState<{ gmail: string; mailto: string } | null>(null);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealItems.forEach((item) => item.classList.add("reveal-ready"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const filteredContributions = useMemo(() => {
    const query = contributionQuery.trim().toLowerCase();
    return contributions.filter((item) => {
      const matchesFilter = contributionFilter === "all" || item.status === contributionFilter;
      const matchesQuery = !query || `${item.project} ${item.repo} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  }, [contributionFilter, contributionQuery]);

  const moveAchievement = (direction: number) => {
    setAchievementIndex((current) => (current + direction + achievements.length) % achievements.length);
  };

  const currentAchievement = achievements[achievementIndex];
  const mergedContributionCount = contributions.filter((item) => item.status === "Merged").length;

  useEffect(() => {
    if (!achievementAutoPlay || achievementPaused || achievements.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setAchievementIndex((current) => (current + 1) % achievements.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [achievementAutoPlay, achievementPaused]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied", { description: "I’ll be happy to hear from you." });
    } catch {
      toast.info(EMAIL, { description: "Copy this address to reach me." });
    }
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Portfolio message");
    const body = encodeURIComponent(`From: ${contactEmail}\n\n${contactMessage}`);
    const mailtoUrl = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${subject}&body=${body}`;
    const emailWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    if (!emailWindow) window.location.assign(gmailUrl);
    setEmailDraft({ gmail: gmailUrl, mailto: mailtoUrl });
    toast.success("Opening your email draft", { description: "The message is addressed to Vaishnavi." });
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#open-source", label: "Open source" },
    { href: "#stack", label: "Stack" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-svh overflow-x-hidden bg-transparent text-foreground">
      <div className="scenic-backdrop" style={{ backgroundImage: `linear-gradient(120deg, rgba(8,35,29,.48) 8%, rgba(8,35,29,.2) 47%, rgba(8,35,29,.58) 100%), url("${asset("scenic-backdrop.jpg")}")` }} aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fbf9f5]/90 backdrop-blur-md dark:border-stone-800/70 dark:bg-[#121110]/90" data-testid="site-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3" data-testid="header-logo-link" onClick={() => setMobileMenuOpen(false)}>
            <img src={asset("github-avatar.jpg")} alt="Vaishnavi GitHub profile picture" className="h-9 w-9 rounded-full border border-rose-300 object-cover shadow-[4px_4px_0_#1c1917] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" data-testid="github-avatar" />
            <span className="font-heading text-xl tracking-tight">Vaishnavi</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation" data-testid="desktop-navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link" data-testid={`header-nav-${link.label.toLowerCase().replaceAll(" ", "-")}`}>{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className={cn(buttonVariants({ size: "sm" }), "hidden rounded-full bg-foreground px-4 text-background shadow-none hover:bg-rose-500 hover:text-white sm:inline-flex")} data-testid="header-contact-button">Get in touch</a>
            <Button variant="outline" size="icon-sm" className="md:hidden" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle navigation menu" data-testid="mobile-menu-toggle-button">
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="border-t border-stone-200/70 px-4 py-3 md:hidden dark:border-stone-800/70" aria-label="Mobile navigation" data-testid="mobile-navigation">
            <div className="mobile-navigation-grid mx-auto max-w-6xl sm:px-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link" onClick={() => setMobileMenuOpen(false)} data-testid={`mobile-nav-${link.label.toLowerCase().replaceAll(" ", "-")}`}>{link.label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28" data-testid="hero-section">
          <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div className="reveal-item" data-reveal="hero-copy">
              <div className="mb-8 flex flex-wrap items-center gap-3" data-testid="hero-location-line">
                <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"><MapPin size={13} /> VIT Vellore, India</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone-500 dark:text-stone-300">CSE student · builder · open source</span>
              </div>
              <p className="mb-5 max-w-xl font-mono text-xs uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400" data-testid="hero-kicker">Hello, I’m Vaishnavi</p>
              <h1 className="max-w-4xl font-heading text-5xl leading-[0.97] tracking-[-0.055em] text-balance sm:text-6xl lg:text-8xl" data-testid="hero-heading">
                I build useful things for <span className="relative whitespace-nowrap text-rose-500">real problems<span className="scribble-underline" /></span>.
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg" data-testid="hero-description">
                I’m a Computer Science student at VIT Vellore building across AI/ML, computer vision, full-stack products, and developer tools. I like turning a rough idea into something people can actually use — and explain.
              </p>
              <div className="hero-actions mt-9 flex flex-wrap gap-3" data-testid="hero-actions">
                <a href="#projects" className={cn(buttonVariants({ size: "lg" }), "hero-projects-button rounded-full px-5")} data-testid="hero-projects-button">See my projects</a>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "hero-resume-button rounded-full px-5")} data-testid="hero-resume-button">Read my resume</a>
              </div>
              <div className="mt-12 flex items-center gap-4" data-testid="hero-social-links">
                <a href="https://github.com/Vaishnavi220506" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Open Vaishnavi's GitHub" data-testid="hero-github-link"><Github size={18} /></a>
                <button type="button" onClick={copyEmail} className="social-link" aria-label="Copy Vaishnavi's email" data-testid="hero-email-copy-button"><Mail size={18} /></button>
                <span className="h-px w-12 bg-stone-300 dark:bg-stone-700" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500" data-testid="hero-status-label"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />open to learning & building</span>
              </div>
            </div>

            <div className="reveal-item relative mx-auto w-full max-w-sm lg:pb-4" data-reveal="hero-art" data-testid="hero-profile-card">
              <div className="absolute -right-2 -top-6 z-10 flex h-20 w-20 rotate-6 animate-float items-center justify-center rounded-full border border-rose-200 bg-rose-100 text-center font-mono text-[10px] uppercase leading-4 tracking-widest text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300">keep<br />building</div>
              <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[12px_12px_0_#f4d6d9] dark:border-stone-700 dark:bg-stone-900 dark:shadow-[12px_12px_0_#3d1d24]">
                <div className="hero-scene relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-200 dark:bg-stone-800" style={{ backgroundImage: `linear-gradient(145deg, rgba(20,45,37,.08), rgba(20,45,37,.52)), url("${asset("github-avatar.jpg")}")` }} data-testid="hero-scenic-art">
                  <div className="hero-scene-hill hero-scene-hill-back" /><div className="hero-scene-hill hero-scene-hill-front" />
                  <div className="hero-scene-quote"><Sparkles size={18} /><span>make it useful<br />then make it clear</span></div>
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/50 bg-[#fbf9f5]/85 p-4 backdrop-blur-md dark:border-stone-700/80 dark:bg-stone-950/80">
                    <div className="flex items-end justify-between gap-4">
                      <div><p className="font-heading text-2xl" data-testid="hero-profile-name">Devulapalli Naga Sri Vaishnavi</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-stone-500" data-testid="hero-profile-role">CSE @ VIT Vellore</p></div>
                      <span className="font-mono text-[10px] text-rose-500 dark:text-rose-300" data-testid="hero-profile-handle">@Vaishnavi220506</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-stat-row mt-6 grid grid-cols-3 gap-3" data-testid="hero-stat-row">
                <div className="stat-cell"><strong data-testid="hero-stat-repositories">{githubStats.publicRepositories}</strong><span>repositories</span></div>
                <div className="stat-cell"><strong data-testid="hero-stat-contributions">{contributions.length}</strong><span>PRs highlighted</span></div>
                <div className="stat-cell"><strong data-testid="hero-stat-projects">{projects.length}</strong><span>flagship builds</span></div>
              </div>
            </div>
          </div>
          <a href="#about" className="mt-20 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-rose-500 lg:inline-flex" data-testid="hero-scroll-link"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 dark:border-stone-700"><ChevronDown size={14} /></span> scroll to explore</a>
        </section>

        <section id="about" className="border-y border-stone-200/45 bg-stone-950/5 dark:border-white/10 dark:bg-emerald-950/20" data-testid="about-section">
          <div className="reveal-item mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-reveal="about-story">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div><SectionKicker number="01">A little context</SectionKicker><h2 className="max-w-sm font-heading text-4xl leading-tight tracking-tight sm:text-5xl" data-testid="about-heading">Curious about how things work — and how to make them better.</h2></div>
              <div>
                <div className="max-w-3xl space-y-5 text-lg leading-8 text-stone-600 dark:text-stone-300" data-testid="about-story">
                  <p>I’m a CSE student at VIT Vellore, and I learn best by making. My projects move between AI systems, computer vision, web products, and tools that help people learn, work, or respond to real problems.</p>
                  <p>I enjoy taking a project from the first sketch to a working version, then making it clearer through feedback. Readable code, simple interfaces, and useful outcomes matter to me more than making a demo look impressive for a minute.</p>
                  <p>Open source is where that habit becomes a conversation. I contribute fixes, read unfamiliar code, and try to leave a project a little easier for the next person to work with.</p>
                </div>
                <div className="mt-12 grid gap-3 sm:grid-cols-2" data-testid="focus-area-grid">
                  {focusAreas.map((area) => <div key={area.number} className="focus-card" data-testid={`focus-card-${area.number}`}><span>{area.number}</span><div><h3 data-testid={`focus-title-${area.number}`}>{area.title}</h3><p data-testid={`focus-description-${area.number}`}>{area.description}</p></div></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee-section reveal-item" data-reveal="focus-marquee" data-testid="focus-marquee" aria-label="Areas of focus">
          <div className="marquee-track">{["DESIGN", "DATA", "AI SYSTEMS", "OPEN SOURCE", "PRODUCT ENGINEERING", "DESIGN", "DATA", "AI SYSTEMS", "OPEN SOURCE", "PRODUCT ENGINEERING"].map((item, index) => <span className="marquee-item" key={`${item}-${index}`} data-testid={`marquee-item-${index}`}>{item}<Sparkles size={13} /></span>)}</div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="projects-section">
              <div className="reveal-item mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end" data-reveal="projects-heading"><div><SectionKicker number="02">Selected work</SectionKicker><h2 className="font-heading text-4xl tracking-tight sm:text-5xl" data-testid="projects-heading">The work behind the experiments.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300" data-testid="projects-subheading">Explore the interfaces, then open a project to see the thinking behind it.</p></div><a href="https://github.com/Vaishnavi220506?tab=repositories" target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-2" data-testid="all-projects-link">All repositories</a></div>
          <div className="grid gap-5 lg:grid-cols-2" data-testid="projects-grid">
            {projects.map((project, index) => (
              <Card key={project.title} className={cn("project-card project-gallery-card reveal-item group overflow-hidden border-stone-200/60 bg-stone-950/5 py-0 dark:border-white/15 dark:bg-emerald-950/65", index === 0 && "lg:col-span-2")} data-reveal={`project-${project.visual}`} style={{ transitionDelay: `${index * 100}ms` }} data-testid={`project-card-${project.title.toLowerCase().replaceAll(" ", "-")}`}>
                <ProjectVisual type={project.visual} />
                <CardContent className="flex min-h-[285px] flex-col p-6 sm:p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-500 dark:text-rose-300" data-testid={`project-eyebrow-${project.visual}`}>{project.eyebrow}</p>
                  <h3 className="mt-4 font-heading text-3xl tracking-tight" data-testid={`project-title-${project.visual}`}>{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300" data-testid={`project-description-${project.visual}`}>{project.description}</p>
                  <div className={cn("project-detail-panel", expandedProject === project.title && "project-detail-panel-open")} aria-hidden={expandedProject !== project.title} data-testid={`project-detail-panel-${project.visual}`}><p className="text-sm leading-6 text-stone-500 dark:text-stone-400" data-testid={`project-detail-${project.visual}`}>{project.detail}</p><ul className="mt-4 space-y-2">{project.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-2 text-xs text-stone-500 dark:text-stone-400"><Check size={14} className="mt-0.5 shrink-0 text-rose-500" />{highlight}</li>)}</ul></div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6" data-testid={`project-tags-${project.visual}`}>{project.tags.map((tag) => <Badge key={tag} variant="secondary" className="rounded-full bg-[#f3ece3] font-mono text-[10px] font-normal text-stone-600 dark:bg-stone-800 dark:text-stone-300">{tag}</Badge>)}</div>
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-stone-200 pt-5 dark:border-stone-800"><button type="button" onClick={() => setExpandedProject((current) => current === project.title ? null : project.title)} className="inline-flex items-center gap-2 text-xs font-semibold transition-colors hover:text-rose-500" aria-expanded={expandedProject === project.title} data-testid={`project-expand-button-${project.visual}`}><Sparkles size={14} /> {expandedProject === project.title ? "Close case study" : "Read case study"}</button><a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold transition-colors hover:text-rose-500" data-testid={`project-repo-link-${project.visual}`}><Github size={14} /> View code <ArrowUpRight size={13} /></a>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-300 transition-colors hover:text-rose-300" data-testid={`project-live-link-${project.visual}`}><Globe2 size={14} /> Live demo <ArrowUpRight size={13} /></a>}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="open-source" className="border-y border-stone-200/45 bg-stone-950/5 dark:border-white/10 dark:bg-emerald-950/35" data-testid="open-source-section">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div><SectionKicker number="03">Open source</SectionKicker><h2 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl" data-testid="open-source-heading">Small fixes can make a big difference.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-stone-600 dark:text-stone-300" data-testid="open-source-intro">I’m learning in public by working upstream. Here are a few contributions across AI, inference, accessibility, developer tooling, and compilers.</p><div className="mt-8 flex items-center gap-3"><span className="font-heading text-4xl text-rose-500 dark:text-rose-300" data-testid="open-source-merged-count">{String(mergedContributionCount).padStart(2, "0")}</span><span className="max-w-[120px] font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-stone-500 dark:text-stone-300">merged contributions, with more in review</span></div></div>
              <div><div className="mb-6 flex flex-col gap-3 sm:flex-row" data-testid="open-source-controls"><div className="relative flex-1"><Clipboard size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" /><Input value={contributionQuery} onChange={(event) => setContributionQuery(event.target.value)} placeholder="Search projects, tools, or ideas" className="h-11 rounded-full border-stone-300 bg-white pl-10 text-sm dark:border-stone-700 dark:bg-stone-950" aria-label="Search open source contributions" data-testid="open-source-search-input" /></div><div className="flex rounded-full border border-stone-300 bg-white p-1 dark:border-stone-700 dark:bg-stone-950" data-testid="open-source-filter-group">{(["all", "Merged", "Open"] as const).map((filter) => <button key={filter} type="button" onClick={() => setContributionFilter(filter)} className={cn("rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors", contributionFilter === filter ? "bg-foreground text-background" : "text-stone-500 hover:text-foreground")} data-testid={`open-source-filter-${filter.toLowerCase()}`}>{filter === "all" ? "All" : filter}</button>)}</div></div>
                <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-950" data-testid="contributions-list">{filteredContributions.length ? filteredContributions.map((item, index) => <a key={item.pullRequest} href={item.url} target="_blank" rel="noopener noreferrer" className="contribution-row reveal-item group block p-5 sm:p-6" data-reveal={`contribution-${item.pullRequest}`} style={{ transitionDelay: `${index * 70}ms` }} data-testid={`contribution-${item.project.toLowerCase().replaceAll(" ", "-")}`}><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><span className="font-heading text-xl" data-testid={`contribution-project-${item.pullRequest}`}>{item.project}</span><Badge variant="outline" className={cn("rounded-full font-mono text-[9px] uppercase tracking-wide", item.status === "Merged" ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300")}>{item.status}</Badge></div><p className="mt-1 font-mono text-[10px] text-stone-500" data-testid={`contribution-repo-${item.pullRequest}`}>{item.repo} · {item.pullRequest}</p></div><ArrowUpRight size={17} className="shrink-0 text-stone-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rose-500" /></div><p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600 dark:text-stone-300" data-testid={`contribution-description-${item.pullRequest}`}>{item.description}</p><div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="font-mono text-[10px] uppercase tracking-wide text-stone-400">#{tag.replaceAll(" ", "-")}</span>)}</div></a>) : <div className="p-8 text-sm text-stone-500" data-testid="contributions-empty-state">No contributions match that search yet.</div>}</div>
              </div></div>
          </div>
        </section>

        <section id="stack" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="stack-section">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"><div><SectionKicker number="04">The toolkit</SectionKicker><h2 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl" data-testid="stack-heading">A stack that follows the problem.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-stone-600 dark:text-stone-300" data-testid="stack-intro">I don’t collect tools for the sake of it. I pick the simplest set that helps an idea become clear, useful, and dependable.</p></div><div className="stack-detail-column"><div className="stack-tabs-above"><div className="mt-0 flex flex-wrap gap-2" data-testid="stack-category-tabs">{stackGroups.map((group, index) => <button type="button" key={group.label} onClick={() => setStackIndex(index)} className={cn("stack-tab", stackIndex === index && "stack-tab-active")} data-testid={`stack-tab-${group.label.toLowerCase().replaceAll(" ", "-")}`}>{group.label}</button>)}</div></div><div className="relative min-h-[350px] overflow-hidden rounded-[2rem] border border-stone-200/45 bg-stone-950/10 p-7 dark:border-white/15 dark:bg-emerald-950/75 sm:p-10" data-testid="stack-detail-panel"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-rose-200/50 dark:border-rose-300/20" /><div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-rose-200/50 dark:border-rose-300/20" /><div className="relative"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-500 dark:text-rose-300" data-testid="stack-active-label">{stackGroups[stackIndex].label}</span><Code2 size={19} className="text-rose-500" /></div><h3 className="mt-7 max-w-lg font-heading text-3xl tracking-tight sm:text-4xl" data-testid="stack-active-heading">{stackGroups[stackIndex].description}</h3><div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3" data-testid="stack-items-grid">{stackGroups[stackIndex].items.map((item) => <div key={item} className="flex items-center gap-2 border-b border-stone-300/70 pb-3 text-sm dark:border-stone-700"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" /><span data-testid={`stack-item-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</span></div>)}</div></div></div></div></div>
        </section>

        <section className="border-y border-emerald-900/70 bg-[#102e27] text-stone-50 dark:border-white/10 dark:bg-[#081c18]" data-testid="resume-section"><div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8 lg:py-20"><div><SectionKicker number="05">A quick resume view</SectionKicker><h2 className="max-w-2xl font-heading text-4xl leading-tight tracking-tight sm:text-5xl" data-testid="resume-heading">Strong foundations, practical experiments, and a lot more to learn.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-stone-300" data-testid="resume-summary">I’m pursuing a B.Tech in Computer Science at VIT Vellore with a 9.05/10 CGPA. I’ve also completed IBM’s Generative AI Career Education Program and keep building projects that connect theory with real use.</p><a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-7 rounded-full bg-rose-500 text-white hover:bg-rose-400")} data-testid="resume-download-button">Open full resume</a></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-emerald-800 bg-emerald-800" data-testid="resume-facts-grid"><div className="bg-emerald-950/70 p-5"><span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">education</span><strong className="mt-4 block font-heading text-2xl" data-testid="resume-education-value">VIT Vellore</strong><span className="mt-1 block text-xs text-stone-400">Computer Science</span></div><div className="bg-emerald-950/70 p-5"><span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">cgpa</span><strong className="mt-4 block font-heading text-2xl" data-testid="resume-cgpa-value">9.05/10</strong><span className="mt-1 block text-xs text-stone-400">academic foundation</span></div><div className="bg-emerald-950/70 p-5"><span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">internship</span><strong className="mt-4 block font-heading text-xl" data-testid="resume-internship-value">IBM GenAI</strong><span className="mt-1 block text-xs text-stone-400">career education</span></div><div className="bg-emerald-950/70 p-5"><span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">mindset</span><strong className="mt-4 block font-heading text-xl" data-testid="resume-mindset-value">Keep learning</strong><span className="mt-1 block text-xs text-stone-400">keep it useful</span></div></div></div></section>

        <section id="achievements" className="border-y border-stone-200/45 bg-stone-950/5 dark:border-white/10 dark:bg-emerald-950/35" data-testid="achievements-section">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between" data-reveal="achievements-header">
              <div>
                <SectionKicker number="07">Achievements</SectionKicker>
                <h2 className="max-w-2xl font-heading text-4xl leading-tight tracking-tight sm:text-5xl" data-testid="achievements-heading">A few milestones worth keeping.</h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300" data-testid="achievements-intro">A few certificates from programs and challenges that have shaped my journey so far. Tap a card to open its verification page.</p>
              </div>
              <div className="achievement-controls" role="group" aria-label="Achievement carousel controls" onMouseEnter={() => setAchievementPaused(true)} onMouseLeave={() => setAchievementPaused(false)} onFocusCapture={() => setAchievementPaused(true)} onBlurCapture={(event) => { const nextTarget = event.relatedTarget; if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) setAchievementPaused(false); }}>
                <button type="button" className="achievement-control" onClick={() => moveAchievement(-1)} aria-label="Show previous achievement" data-testid="achievement-prev"><ChevronLeft size={17} /></button>
                <span className="achievement-counter" aria-live="polite" data-testid="achievement-counter">{String(achievementIndex + 1).padStart(2, "0")} / {String(achievements.length).padStart(2, "0")}</span>
                <button type="button" className="achievement-control" onClick={() => moveAchievement(1)} aria-label="Show next achievement" data-testid="achievement-next"><ChevronRight size={17} /></button>
                <button type="button" className="achievement-control" onClick={() => setAchievementAutoPlay((playing) => !playing)} aria-pressed={achievementAutoPlay} aria-label={achievementAutoPlay ? "Pause automatic slideshow" : "Play automatic slideshow"} data-testid="achievement-autoplay">{achievementAutoPlay ? <Pause size={16} /> : <Play size={16} />}</button>
              </div>
            </div>
            <div className="achievement-carousel mt-10" data-reveal="achievement-slide" onMouseEnter={() => setAchievementPaused(true)} onMouseLeave={() => setAchievementPaused(false)} onFocusCapture={() => setAchievementPaused(true)} onBlurCapture={(event) => { const nextTarget = event.relatedTarget; if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) setAchievementPaused(false); }}>
              <a href={currentAchievement.url} target="_blank" rel="noopener noreferrer" className="achievement-slide" aria-label={"Open " + currentAchievement.title} data-testid="achievement-slide">
                <div className="achievement-image-wrap">
                  <img src={asset(currentAchievement.image)} alt={currentAchievement.title + " certificate"} className="achievement-image" loading="lazy" />
                </div>
                <div className="achievement-copy">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-500 dark:text-rose-300" data-testid="achievement-label">{currentAchievement.label}</span>
                    <ArrowUpRight size={17} className="shrink-0 text-rose-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-rose-300" />
                  </div>
                  <h3 className="mt-8 font-heading text-3xl tracking-tight sm:text-4xl" data-testid="achievement-title">{currentAchievement.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-300" data-testid="achievement-issuer">{currentAchievement.issuer}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-stone-200/80 pt-5 dark:border-stone-700">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400" data-testid="achievement-date">{currentAchievement.date}</span>
                    <span className="h-1 w-1 rounded-full bg-rose-500" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">Open verification</span>
                  </div>
                </div>
              </a>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4" data-testid="achievement-pagination">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">One milestone at a time</p>
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose achievement">
                {achievements.map((achievement, index) => <button type="button" role="tab" key={achievement.title} className={cn("achievement-dot", achievementIndex === index && "achievement-dot-active")} onClick={() => setAchievementIndex(index)} aria-label={"Show " + achievement.title} aria-selected={achievementIndex === index} aria-current={achievementIndex === index ? "step" : undefined} data-testid={"achievement-dot-" + index} />)}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-testid="contact-section"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><SectionKicker number="08">Say hello</SectionKicker><h2 className="max-w-md font-heading text-4xl leading-tight tracking-tight sm:text-5xl" data-testid="contact-heading">Have an idea, a question, or a good problem?</h2><p className="mt-6 max-w-sm text-sm leading-7 text-stone-600 dark:text-stone-300" data-testid="contact-copy">I’m always happy to talk about thoughtful software, open source, AI systems, or what you’re building next.</p><button type="button" onClick={copyEmail} className="mt-8 inline-flex items-center gap-3 font-mono text-xs text-rose-500 dark:text-rose-300 transition-colors hover:text-rose-600 dark:hover:text-rose-200" data-testid="contact-email-copy-button"><Mail size={15} /> {EMAIL} <Clipboard size={13} /></button><div className="mt-7 flex gap-2"><a href="https://github.com/Vaishnavi220506" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Open GitHub profile" data-testid="contact-github-link"><Github size={17} /></a><a href={`mailto:${EMAIL}?subject=Portfolio%20message`} className="social-link" aria-label="Send an email" data-testid="contact-mail-link"><Send size={17} /></a></div></div><Card className="border-stone-200 bg-white p-2 shadow-none dark:border-stone-800 dark:bg-stone-900" data-testid="contact-form-card"><CardContent className="rounded-2xl bg-[#f5f0e9] p-6 dark:bg-stone-950 sm:p-8"><form onSubmit={submitContact} className="space-y-5" data-testid="contact-form"><div><label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500">Your email</label><Input id="contact-email" type="email" required value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="you@example.com" className="h-12 rounded-xl border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900" data-testid="contact-email-input" /></div><div><label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500">Your note</label><Textarea id="contact-message" required value={contactMessage} onChange={(event) => setContactMessage(event.target.value)} placeholder="Tell me what you’re working on..." className="min-h-32 resize-none rounded-xl border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900" data-testid="contact-message-input" /></div><Button type="submit" size="lg" className="w-full rounded-xl bg-foreground text-background hover:bg-rose-500 hover:text-white" data-testid="contact-submit-button">Open email draft</Button>{emailDraft && <div className="rounded-xl border border-rose-300 bg-[#fff2f4] p-3 text-center dark:border-rose-400 dark:bg-[#35151d]" data-testid="contact-email-fallback"><p className="font-mono text-[10px] font-semibold leading-5 text-[#2b171b] dark:text-rose-100">If Gmail did not open, choose a different email option.</p><div className="mt-2 flex flex-wrap justify-center gap-2"><a href={emailDraft.gmail} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#1c1917] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-rose-600" data-testid="contact-gmail-fallback">Open Gmail draft</a><a href={emailDraft.mailto} className="inline-flex items-center justify-center rounded-full border border-[#7a3b4a] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3b1b21] transition-colors hover:border-rose-600 hover:text-rose-700 dark:border-rose-300 dark:text-rose-100 dark:hover:border-rose-200 dark:hover:text-white" data-testid="contact-mailto-fallback">Try email app</a></div></div>}</form></CardContent></Card></div></section>
      </main>

      <footer className="border-t border-stone-200/80 dark:border-stone-800/80" data-testid="site-footer"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500" data-testid="footer-copy">© 2026 Vaishnavi</p><a href="#top" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 transition-colors hover:text-rose-500" data-testid="footer-back-to-top">Back to top <ArrowUpRight size={13} /></a></div></footer>
    </div>
  );
}
