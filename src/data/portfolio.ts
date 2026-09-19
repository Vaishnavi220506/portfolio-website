export interface Project {
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  highlights: string[];
  repoUrl: string;
  liveUrl?: string;
  tags: string[];
  visual: "kavach" | "stempulse" | "rescue" | "clarity" | "race";
}

export interface Contribution {
  project: string;
  repo: string;
  pullRequest: string;
  url: string;
  description: string;
  status: "Merged" | "Open";
  tags: string[];
}

export interface StackGroup {
  label: string;
  description: string;
  items: string[];
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  label: string;
  image: string;
  url: string;
}

export const githubStats = {
  publicRepositories: 22,
};

export const projects: Project[] = [
  {
    title: "KAVACH",
    eyebrow: "01 / Computer vision systems",
    description:
      "An explainable video-intelligence prototype that turns warehouse footage into tracked objects, evidence-backed safety events, and replayable incident records.",
    detail:
      "I built it around structured evidence first: YOLO perception, ByteTrack identities, temporal behaviour rules, SQLite incident history, and a grounded assistant that explains only what the evidence supports.",
    highlights: ["YOLO + ByteTrack temporal tracking", "Explainable behaviour and risk scoring", "SQLite evidence replay + grounded assistant"],
    repoUrl: "https://github.com/Vaishnavi220506/kavach-video-intelligence",
    tags: ["Python", "OpenCV", "YOLO", "FastAPI"],
    visual: "kavach",
  },
  {
    title: "STEMPulse",
    eyebrow: "02 / Social impact product",
    description:
      "A women-first STEM pathways platform for learning, opportunities, evidence-aware confidence, and career re-entry support.",
    detail:
      "The product maps people to a practical next step instead of treating confidence or career breaks as missing potential: profile evidence, skill freshness, opportunity matching, and a shortest-path plan.",
    highlights: ["Learn, work, fund, and re-entry pathways", "Evidence-aware confidence signals", "Explainable opportunity matching"],
    repoUrl: "https://github.com/Vaishnavi220506/StemPulse",
    tags: ["React", "Python", "FastAPI", "Career UX"],
    visual: "stempulse",
  },
  {
    title: "RescueLink",
    eyebrow: "03 / Product engineering",
    description:
      "A real-time emergency coordination platform that helps people request support, offer resources, and share trusted local updates.",
    detail:
      "I designed it around a calm response workspace: role-aware access, a clear request lifecycle, location-aware maps, community confirmation, and atomic volunteer claims.",
    highlights: ["Location-aware requests and resources", "Community-confirmed hazard reports", "Atomic volunteer claims"],
    repoUrl: "https://github.com/Vaishnavi220506/RescueLink",
    liveUrl: "https://rescue-link-clarity-loop-ai.vercel.app/",
    tags: ["React", "TypeScript", "Express", "PostGIS"],
    visual: "rescue",
  },
  {
    title: "ClarityLoop",
    eyebrow: "04 / AI systems",
    description:
      "An open-source workspace that stress-tests a project idea before time, money, and effort are spent building it.",
    detail:
      "Six focused agents examine requirements, evidence, resources, risks, and scope before turning the result into confidence scores, tasks, and an honest project plan.",
    highlights: ["Six-agent feasibility pipeline", "Evidence and assumption tracking", "Local Ollama or cloud Gemini support"],
    repoUrl: "https://github.com/Vaishnavi220506/ClarityLoop-ai",
    liveUrl: "https://clarityloop-ai.vercel.app/",
    tags: ["Next.js", "FastAPI", "Gemini", "Ollama"],
    visual: "clarity",
  },
  {
    title: "RaceVerse",
    eyebrow: "05 / Experimental ML",
    description:
      "A browser-based 3D racing prototype with procedural tracks, local multiplayer, AI opponents, and a trained racing policy.",
    detail:
      "Tracks are created from seeds, while the AI learns in a small simulator and runs locally in the browser. The project is a practical way to explore games, reinforcement learning, and interaction design together.",
    highlights: ["Seeded procedural tracks", "Local multiplayer and AI Arena", "50 unseen seeds evaluated"],
    repoUrl: "https://github.com/Vaishnavi220506/RaceVerse",
    liveUrl: "https://raceverse.vercel.app/",
    tags: ["React", "Babylon.js", "Python", "NumPy"],
    visual: "race",
  },
];

export const contributions: Contribution[] = [
  {
    project: "ONNX",
    repo: "onnx/onnx",
    pullRequest: "#8448",
    url: "https://github.com/onnx/onnx/pull/8448",
    description:
      "Fixed custom callback lifetime handling in shape inference so callbacks remain valid for the full inference operation.",
    status: "Merged",
    tags: ["C++", "ONNX", "Memory safety"],
  },
  {
    project: "PyRIT",
    repo: "microsoft/PyRIT",
    pullRequest: "#2356",
    url: "https://github.com/microsoft/PyRIT/pull/2356",
    description:
      "Fixed stereo audio frequency conversion so multi-channel WAV input no longer causes NumPy broadcasting failures.",
    status: "Merged",
    tags: ["Python", "NumPy", "Audio"],
  },
  {
    project: "CrewAI",
    repo: "crewAIInc/crewAI",
    pullRequest: "#6881",
    url: "https://github.com/crewAIInc/crewAI/pull/6881",
    description:
      "Made the project’s pre-commit hooks portable on Windows by removing Unix-only environment activation.",
    status: "Merged",
    tags: ["Python", "AI agents", "Developer tools"],
  },
  {
    project: "AirLLM",
    repo: "lyogavin/airllm",
    pullRequest: "#363",
    url: "https://github.com/lyogavin/airllm/pull/363",
    description:
      "Proposed support for PyTorch tokenizer inputs in the MLX generation pipeline.",
    status: "Open",
    tags: ["PyTorch", "MLX", "Inference"],
  },
  {
    project: "OpenHands SDK",
    repo: "OpenHands/software-agent-sdk",
    pullRequest: "#4878",
    url: "https://github.com/OpenHands/software-agent-sdk/pull/4878",
    description:
      "Proposed agent-server proxy support for cloud runtime requests.",
    status: "Open",
    tags: ["TypeScript", "Agentic systems", "Cloud API"],
  },
  {
    project: "blind-assist",
    repo: "violetljj/blind-assist",
    pullRequest: "#49",
    url: "https://github.com/violetljj/blind-assist/pull/49",
    description:
      "Proposed accessibility hardening for the default flow at large font sizes.",
    status: "Open",
    tags: ["Android", "Accessibility", "UI"],
  },
  {
    project: "Ersilia model template",
    repo: "ersilia-os/eos-template",
    pullRequest: "#95",
    url: "https://github.com/ersilia-os/eos-template/pull/95",
    description:
      "Proposed automatic model releases when generated outputs change.",
    status: "Open",
    tags: ["GitHub Actions", "Release automation", "Python"],
  },
  {
    project: "Ersilia workflows",
    repo: "ersilia-os/ersilia-model-workflows",
    pullRequest: "#7",
    url: "https://github.com/ersilia-os/ersilia-model-workflows/pull/7",
    description:
      "Proposed reusable workflow automation for model releases when outputs change.",
    status: "Open",
    tags: ["GitHub Actions", "CI/CD", "Automation"],
  },
  {
    project: "vLLM",
    repo: "vllm-project/vllm",
    pullRequest: "#56444",
    url: "https://github.com/vllm-project/vllm/pull/56444",
    description:
      "Proposed a bugfix for N-gram PLE with pipeline parallelism.",
    status: "Open",
    tags: ["PyTorch", "CUDA", "Inference"],
  },
  {
    project: "vLLM",
    repo: "vllm-project/vllm",
    pullRequest: "#56413",
    url: "https://github.com/vllm-project/vllm/pull/56413",
    description:
      "Proposed avoiding duplicate host allocation for UVA weights.",
    status: "Open",
    tags: ["PyTorch", "CUDA", "Memory"],
  },
];

export const stackGroups: StackGroup[] = [
  {
    label: "Languages",
    description: "The tools I reach for to think clearly and build from first principles.",
    items: ["Python", "C++", "Java", "JavaScript", "TypeScript", "C"],
  },
  {
    label: "Web & product",
    description: "A practical web toolkit for turning an idea into something people can use.",
    items: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express", "FastAPI", "Vite", "REST APIs", "Streamlit"],
  },
  {
    label: "ML & data",
    description: "Libraries and ideas for experiments that stay grounded in real constraints.",
    items: ["PyTorch", "Hugging Face", "scikit-learn", "OpenCV", "Ultralytics YOLO", "Transformers", "NumPy", "Pandas", "Ollama"],
  },
  {
    label: "Tools & data",
    description: "The infrastructure around the code: shipping, testing, and making it dependable.",
    items: ["Git", "GitHub Actions", "Docker", "PostgreSQL", "PostGIS", "MySQL", "SQLite", "SQLAlchemy", "Vercel"],
  },
];

export const achievements: Achievement[] = [
  {
    title: "WINS-AID AI Hackathon 2026",
    issuer: "British Council · VIT Vellore",
    date: "02–03 Sep 2026",
    label: "Hackathon participation",
    image: "achievement-wins-aid.png",
    url: "https://lnkd.in/p/d7Sxt8tw",
  },
  {
    title: "Advanced Generative AI",
    issuer: "IBM Career Education Program",
    date: "16 Jul 2026",
    label: "Professional certificate",
    image: "achievement-ibm.png",
    url: "https://courses.ibmcep.cognitiveclass.ai/certificates/e6e8e6d0defb451a8b27bf824cebcfda",
  },
  {
    title: "Adobe University Hackathon 2026",
    issuer: "Adobe · Unstop",
    date: "09 Aug 2026",
    label: "Hackathon participation",
    image: "achievement-adobe.png",
    url: "https://unstop.com/certificate-preview/a6807747-82df-43c7-8f64-bfcc3b6952f2?utm_campaign=site-emails&utm_medium=d2c-automated&utm_source=wow-look-at-your-certificate-adobe-university-hackathon-2026",
  },
];

export const focusAreas = [
  {
    number: "01",
    title: "Machine learning",
    description: "Deep learning, computer vision, transformers, and practical model building.",
  },
  {
    number: "02",
    title: "AI systems",
    description: "Agent tooling, inference, evaluation, and reliable developer workflows.",
  },
  {
    number: "03",
    title: "Product engineering",
    description: "Full-stack apps that make everyday problems easier to handle.",
  },
  {
    number: "04",
    title: "Open source",
    description: "Learning in public, reviewing code, and contributing fixes upstream.",
  },
];
