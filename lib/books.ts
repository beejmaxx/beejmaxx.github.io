export type BookOnePager = {
  kicker: string;
  promise: string;
  problem: string;
  outcomes: string[];
  decisions: Array<{ label: string; title: string; description: string }>;
  audience: string[];
  evidence: string;
};

export type Book = {
  id: string;
  title: string;
  status: string;
  thesis: string;
  description: string;
  demo?: string;
  source?: string;
  onePager?: BookOnePager;
};

export const books: Book[] = [
  {
    id: "platform-integrity",
    title: "Platform Integrity",
    status: "working draft",
    thesis: "Engineering detection, decisions, and enforcement against bots, fraud, and abuse.",
    description: "A decision framework for defending digital ecosystems without reducing every problem to bot detection.",
    demo: "https://beejmaxx.github.io/platform-integrity/",
    source: "https://github.com/beejmaxx/platform-integrity",
    onePager: {
      kicker: "A field guide for adversarial systems",
      promise: "Build integrity systems that can explain what they know, why they act, and what happens when they are wrong.",
      problem: "Platforms often begin with the wrong question: “Is this a bot?” A detector can be accurate while the policy is vague, the attribution is weak, the intervention is disproportionate, and the appeal cannot repair the damage. Platform integrity is the larger engineering discipline that connects those decisions.",
      outcomes: [
        "Define the ecosystem harm before selecting a detector.",
        "Separate direct observations from features, identity links, and inferences.",
        "Choose rules, behavioral models, machine learning, graphs, and client controls for the evidence they can actually produce.",
        "Match confidence and urgency to a proportionate, reversible intervention.",
        "Measure prevented harm, legitimate-user burden, recourse, and attacker adaptation—not accuracy alone.",
      ],
      decisions: [
        { label: "01 / define", title: "What are we protecting?", description: "Map actors, incentives, scarce resources, and measurable harm before writing policy." },
        { label: "02 / observe", title: "What can we know?", description: "Build a governed evidence supply chain and keep request, session, device, account, person, and organization distinct." },
        { label: "03 / decide", title: "What action is justified?", description: "Set evidence standards according to severity, breadth, duration, reversibility, and decision latency." },
        { label: "04 / operate", title: "How does defense adapt?", description: "Connect appeals, investigations, metrics, and attacker response into a production learning loop." },
      ],
      audience: ["Staff and principal engineers", "Security, fraud, and risk leaders", "Trust and safety teams", "Data scientists and investigators", "Product, policy, and platform leaders"],
      evidence: "The public research trail includes NIST risk and identity frameworks, IETF and W3C standards, peer-reviewed abuse-market research, legislation and enforcement actions, platform contracts, and trust-and-safety scholarship. Each structured note preserves claims, assumptions, limitations, and implications.",
    },
  },
  {
    id: "rust-api-gallery",
    title: "Rust API Design Guidebook",
    status: "working",
    thesis: "Consumer-visible API decisions, specimen by specimen.",
    description: "Complete programs and implementation trails from important Rust libraries, organized around API-design questions.",
    demo: "https://beejmaxx.github.io/rust-api-gallery/",
    source: "https://github.com/beejmaxx/rust-api-gallery",
  },
  {
    id: "async-rust-guidebook",
    title: "Async Rust Guidebook",
    status: "working",
    thesis: "A consumer-first guide to asynchronous Rust.",
    description: "Complete programs, observed output, ordering timelines, cancellation, and library-level async design.",
    demo: "https://beejmaxx.github.io/async-rust-guidebook/",
    source: "https://github.com/beejmaxx/async-rust-guidebook",
  },
  {
    id: "building-dependable-data-systems",
    title: "Building Dependable Data Systems",
    status: "local draft",
    thesis: "A practical guide to dependable data-intensive systems.",
    description: "A book in progress. Its repository is currently local and has not been published to GitHub yet.",
  },
  {
    id: "distributed-systems-guidebook",
    title: "Distributed Systems Guidebook",
    status: "local draft",
    thesis: "A practical guide to distributed-systems concepts and design.",
    description: "A book in progress. Its repository is currently local and has not been published to GitHub yet.",
  },
];

export function getBook(id: string) {
  return books.find((book) => book.id === id);
}

export function getOnePagerBookIds() {
  return books.filter((book) => book.onePager).map((book) => book.id);
}
