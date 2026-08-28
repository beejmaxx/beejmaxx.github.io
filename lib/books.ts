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
  area: "systems" | "rust";
  status: string;
  thesis: string;
  description: string;
  demo?: string;
  source?: string;
  onePager?: BookOnePager;
};

export const books: Book[] = [
  {
    id: "electronic-markets-from-first-principles",
    title: "Electronic Markets from First Principles",
    area: "systems",
    status: "early public draft",
    thesis: "Understand what electronic markets do before modeling or optimizing them.",
    description: "Interactive market mechanics, microstructure, execution, market making, empirical work, and realistic simulation.",
    demo: "https://beejmaxx.github.io/electronic-markets-from-first-principles/",
    source: "https://github.com/beejmaxx/electronic-markets-from-first-principles",
  },
  {
    id: "computer-science-from-first-principles",
    title: "Computer Science from First Principles",
    area: "systems",
    status: "working · data structures v1",
    thesis: "Build a mechanical understanding of high-performance and low-latency systems.",
    description: "Interactive foundations spanning data structures, algorithms, CPUs, operating systems, concurrency, networking, storage, and measurement.",
    demo: "https://beejmaxx.github.io/computer-science-from-first-principles/",
    source: "https://github.com/beejmaxx/computer-science-from-first-principles",
  },
  {
    id: "platform-integrity",
    title: "Platform Integrity",
    area: "systems",
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
    area: "rust",
    status: "working",
    thesis: "Consumer-visible API decisions, specimen by specimen.",
    description: "Complete programs and implementation trails from important Rust libraries, organized around API-design questions.",
    demo: "https://beejmaxx.github.io/rust-api-gallery/",
    source: "https://github.com/beejmaxx/rust-api-gallery",
  },
  {
    id: "async-rust-guidebook",
    title: "Async Rust Guidebook",
    area: "rust",
    status: "working",
    thesis: "A consumer-first guide to asynchronous Rust.",
    description: "Complete programs, observed output, ordering timelines, cancellation, and library-level async design.",
    demo: "https://beejmaxx.github.io/async-rust-guidebook/",
    source: "https://github.com/beejmaxx/async-rust-guidebook",
  },
  {
    id: "rust-by-example",
    title: "Rust by Example: Real Repositories",
    area: "rust",
    status: "working",
    thesis: "Learn Rust by tracing production systems from public API to runtime behavior.",
    description: "Repository walkthroughs that connect execution paths and architectural decisions to Rust's type, ownership, and concurrency models.",
    demo: "https://beejmaxx.github.io/rust-by-example/",
    source: "https://github.com/beejmaxx/rust-by-example",
  },
  {
    id: "rust-hero",
    title: "Rust Hero",
    area: "rust",
    status: "working",
    thesis: "A fast, practical guide to the Rust concepts that appear constantly in real programs.",
    description: "Focused explanations and runnable examples for building fluency with Rust's core language and standard-library patterns.",
    demo: "https://beejmaxx.github.io/rust-hero/",
    source: "https://github.com/beejmaxx/rust-hero",
  },
];

export function getBook(id: string) {
  return books.find((book) => book.id === id);
}

export function getOnePagerBookIds() {
  return books.filter((book) => book.onePager).map((book) => book.id);
}
