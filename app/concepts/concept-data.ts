export const conceptProjects = [
  {
    id: "depthfield",
    number: "01",
    title: "Depthfield",
    short: "Market depth, rendered as history",
    description:
      "A browser-based market-depth workstation that reconstructs a live order book and renders liquidity history with WebGPU.",
    detail:
      "Sequence-aware state, multi-resolution history, public exchange data, and no application backend.",
    stack: ["TypeScript", "WebGPU", "WebSockets"],
    status: "Live demo",
    source: "https://github.com/beejmaxx/depthfield",
    demo: "https://beejmaxx.github.io/depthfield/",
  },
  {
    id: "bells",
    number: "02",
    title: "Bells",
    short: "A physical-feeling browser instrument",
    description:
      "A velocity-sensitive bell instrument where pointer gesture controls the strike and modal synthesis generates the sound.",
    detail:
      "The interaction and visual system are written in Rust, compiled to WebAssembly, and paired with Web Audio synthesis.",
    stack: ["Rust", "WebAssembly", "Web Audio"],
    status: "Playable",
    source: "https://github.com/beejmaxx/bells",
    demo: "https://beejmaxx.github.io/bells/",
  },
  {
    id: "quantbox",
    number: "03",
    title: "QuantBox",
    short: "A research system that keeps the evidence",
    description:
      "A Rust-first environment for systematic-trading research, simulation, runtime decisions, and review.",
    detail:
      "The system treats reproducibility, experiment evidence, execution boundaries, and operator visibility as one problem.",
    stack: ["Rust", "Python", "Research systems"],
    status: "Active research",
    source: "https://github.com/beejmaxx/aikido-systematic-trading",
    demo: "/aikido/",
    image: "/assets/screenshots/strategy-explorer.png",
  },
  {
    id: "bot-defense",
    number: "04",
    title: "HTTP Bot Defense Lab",
    short: "Security policy you can replay",
    description:
      "A synthetic environment for testing bot-detection policy without touching real users or production traffic.",
    detail:
      "Deterministic traffic connects request signals, longer-window behavior, replay, shadow policy, enforcement, and analyst evidence.",
    stack: ["Go", "Security", "Evaluation"],
    status: "Public lab",
    source: "https://github.com/beejmaxx/http-bot-defense-lab",
    demo: "",
  },
];

export const secondaryProjects = [
  ["Aikido", "Technical overview and architecture for a research, policy, simulation, and execution system", "/aikido/"],
  ["Marketplace Integrity", "An evidence-backed report connecting four synthetic anti-bot and intervention labs", "/case-studies/marketplace-integrity.html"],
  ["Polymarket MCP", "Typed market data, replay, simulation, and opt-in execution in Rust", "https://github.com/beejmaxx/polymarket-mcp-rs"],
  ["Trading Operations Workstation", "Real-time control surface for multi-account execution and incident response", "/case-studies/operations-workstation"],
  ["Airline Enterprise Graph", "A mock Apollo Federation supergraph for agent and GraphQL research", "https://github.com/beejmaxx/airline-enterprise-graph"],
  ["Vector Backtester", "ClickHouse-backed strategy testing through SQL-native vectorized execution", "https://github.com/beejmaxx/vector-backtester"],
  ["Engine Simulator", "An interactive browser engine simulation with eleven cached engine models", "/engine-sim/"],
] as const;

export const conceptLinks = [
  ["Current", "/"],
  ["Site system lab", "/concepts/site-system"],
  ["Personal web", "/concepts/personal-web"],
  ["Hybrid", "/concepts/hybrid"],
  ["01 Project-led", "/concepts/project-led"],
  ["02 Notebook", "/concepts/notebook"],
  ["03 Technical index", "/concepts/technical-index"],
] as const;
