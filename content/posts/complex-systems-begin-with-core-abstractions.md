---
title: Start with the primitives
date: 2026-08-18
excerpt: Before services, agents, or interfaces, decide which facts the system can represent and who is allowed to change them.
tags: data modeling, architecture, AI, systems design
---

AI does not change the first principle of building software: start with the data.

Before choosing services, agents, queues, interfaces, or frameworks, decide what the system believes exists. Decide how those things are identified, which facts describe them, when those facts are true, who is allowed to change them, and which states must never occur.

I call these the system's **primitives**.

I do not mean primitive types such as integers, strings, and booleans. I mean the smallest domain concepts from which the rest of the system is constructed: an account, an order, an observation, a claim, a policy, an identity, a measurement, an event. A primitive may eventually be represented by a table, record, algebraic data type, message, or object. The representation is secondary. Its meaning comes first.

The core principles are:

1. **Model reality before modeling behavior.** First decide what can be known. Then decide what the system can do.
2. **Separate facts from views of facts.** A cached balance, a dashboard total, and a strategy's position may be useful views. They should not quietly become competing realities.
3. **Give every important fact an authority.** Copies may exist. Ambiguous ownership should not.
4. **Make identity and time explicit.** State without provenance or time semantics cannot be reliably compared, replayed, or corrected.
5. **State the invariants.** A primitive is not adequately defined until we know which values and transitions are invalid.
6. **Keep the model inspectable as it evolves.** A design that was coherent at the beginning can decay through individually reasonable changes.

These are not new principles. They come from a long history of work in data modeling, programming-language design, cybernetics, and software architecture. AI makes them more urgent because it makes implementation much cheaper to produce.

## What it means to start with data

Starting with data does not mean opening a database tool and drawing tables. It means beginning with semantics.

Suppose a system contains a `Position`. Before implementing it, we should be able to write something like this:

```text
Primitive: Position

Identity:
  account + instrument

Authoritative facts:
  executions and explicit adjustments

Effective time:
  when an execution occurred in the external venue

Recorded time:
  when this system learned about it

Invariant:
  every change is attributable to an immutable input

Derived views:
  current quantity, average price, realized P&L, exposure
```

This modest description resolves decisions that would otherwise be distributed across services and rediscovered during incidents. It distinguishes facts from calculations. It makes two kinds of time visible. It states where authority comes from. It gives a retry or replay process something definite to preserve.

Now compare that with a system containing three mutable versions of "current position": one in a strategy process, one in an execution service, and one reconstructed from broker events. That is not primarily a code-duplication problem. It is a disagreement about reality. Every reconnect, retry, late message, and partial fill must negotiate among three possible truths.

No service boundary repairs that ambiguity. The services merely distribute it.

The phrase *data structure* can make this sound like a low-level implementation concern. Historically, it has meant something much larger. C. A. R. Hoare's preface to the 1972 book *Structured Programming* explicitly joined the design of data with the design of programs. Niklaus Wirth made the connection the title of his 1976 book: *Algorithms + Data Structures = Programs*. Their subject was not database administration. It was the intellectual structure of computation.

## A primitive is a claim about reality

Every data model contains an ontology, whether its designers acknowledge it or not. It asserts that certain kinds of things exist, that some distinctions matter, and that other distinctions can be ignored.

A field is a claim that a fact belongs to a concept. A key is a claim about identity. A relationship is a claim about how two things can be connected. A state transition is a claim about causality. A uniqueness constraint is a claim about the world, not merely about storage.

This lineage is visible in E. F. Codd's 1970 relational model. Codd was concerned with protecting users and programs from physical storage decisions, but he also treated derivability, redundancy, and consistency as properties of the logical model. The important separation was between what the data means and how the machine happens to store it.

Peter Chen's 1976 entity-relationship model made the semantic goal even more explicit: a data model should capture information about entities and relationships in the real world, not merely reproduce the access paths of a particular database.

Barbara Liskov and Stephen Zilles approached the same problem through programming languages in their 1974 paper on abstract data types. They wanted programmers to work with abstractions suited to the problem domain, with a defined set of operations, instead of repeatedly manipulating the underlying representation.

These traditions differ in machinery, but they share a direction: move the programmer's attention away from incidental representation and toward stable meaning.

That is what I mean by a primitive. It is not necessarily physically small. It is conceptually prior. Other behavior is defined in terms of it.

## Facts, authority, and derivation

One of the most useful distinctions in a complex system is the distinction between an authoritative fact and a derived view.

An execution is a fact received from a venue. Current position is derived by applying executions and adjustments. Exposure is derived from position and price. A dashboard is a projection of those values. A cache is a temporary copy of a projection.

All of these values may be stored. Storage does not make them equally authoritative.

Codd's work on normalization is often taught as a mechanical procedure for arranging tables. The deeper concern was redundancy and the anomalies it creates. If the same fact is asserted independently in several places, ordinary updates can leave the database describing incompatible worlds.

The same problem now appears across services, topics, caches, feature stores, and agent memory. We have made duplication easier while retaining the old consistency problem.

The rule is not "never copy data." Distributed systems require copies and projections. The rule is:

> For every important fact, be able to name its authority and explain how every other representation is derived.

This makes disagreement resolvable. If two projections differ, the system has a path back to evidence. Without authority, reconciliation becomes negotiation among implementations.

## Identity and time are part of the data

Many systems have reasonable field definitions and still fail because identity and time were treated as incidental details.

Identity asks what makes something the same thing across change. Is a customer the person, the login, the billing account, or the legal entity? Is a retried command the same command or a new attempt? Is a corrected market event the same observation with a new value or a second observation?

Time asks at least two different questions:

- When was this true in the world?
- When did this system know it?

Those questions produce different answers when messages arrive late, external systems correct history, or a decision must be reconstructed. If both times collapse into `updated_at`, the lost distinction will later reappear as special-case code.

Identity and time therefore belong in the primitive model. They should not be added after the "main" fields. They determine what an update, retry, correction, or replay actually means.

## Invariants define the boundary of the concept

A structure is not well designed merely because it can hold the desired examples. It must also prevent or identify states that have no valid interpretation.

This principle has a long formal history. Hoare's 1969 work on an axiomatic basis for programming described program behavior through preconditions and postconditions. Dijkstra's 1972 Turing lecture argued for programs whose correctness and intellectual manageability are developed together rather than inspected only after construction.

In practical data design, this means writing down rules such as:

- an execution belongs to exactly one account and instrument;
- a correction identifies the fact it supersedes;
- an accepted command has a stable idempotency identity;
- a derived position is reproducible from authoritative inputs;
- a decision records the versions of the inputs that justified it.

Some invariants can be enforced by types or constraints. Some require transaction boundaries, state machines, or tests. Some can only be monitored. But an invariant that exists only in an engineer's intuition will eventually be violated by another engineer, an integration, or an AI tool that never received it.

## Boundaries should protect decisions

Once the primitives are clear, components can be organized around them.

David Parnas's 1972 paper on modular decomposition argued that modules should hide design decisions likely to change. This was a correction to the intuitive practice of dividing a system according to its processing steps. A module boundary was valuable because it protected the rest of the system from knowledge it did not need.

The data-centered version of that principle is complementary: a boundary should protect a coherent meaning and its authority. Components should not each invent their own local interpretation of the same primitive.

Organization complicates this. In 1968, Melvin Conway observed that a system's design reflects the communication structure of the organization that produced it. Teams easily turn administrative boundaries into services and then turn those services into competing data owners. The resulting architecture may describe the company more faithfully than it describes the domain.

Beginning with the primitives gives us a way to resist that drift. Team ownership can change. The identity and meaning of an execution should not change with the org chart.

## The real system also exists in the engineer's head

Formal models are necessary, but they are never the entire story.

Michael Polanyi's 1966 work *The Tacit Dimension* gave a name to knowledge that people possess but cannot fully state. Experienced engineers carry this kind of knowledge. They recognize that a boundary feels wrong, that one name is covering two lifecycles, or that a convenient representation will be painful to migrate. Often the judgment appears before its explanation.

Peter Naur's 1985 essay *Programming as Theory Building* applied a closely related idea to software. For Naur, programming was not fundamentally the production of program text. The programmer builds a theory of how the problem and its solution correspond. Code and documentation are products of that understanding, but neither automatically contains all of it.

This explains why a codebase can remain intact while a team's ability to change it decays. The syntax survived; the theory did not.

It also explains an important limitation of AI-assisted development.

## The tool cannot see an unstated model

Some of what gets called "AI slop" is exactly that: generic, overbuilt, visually unconvincing, or technically shallow output. But there is also a mistaken expectation that the tool should perform at the level of an experienced engineer while being given only a fraction of what that engineer knows.

The engineer has a tacit model formed by previous designs, failures, migrations, and production incidents. The AI sees the prompt and whatever context was supplied. It does not automatically see the rejected designs, the operational history, or the subconscious distinction that makes one abstraction honest and another merely plausible.

Good work may take five iterations. It takes reprompting, but more importantly it takes analysis:

```text
state the primitives
→ generate a candidate
→ inspect its assumptions
→ identify the violated invariant
→ make the missing knowledge explicit
→ try again
```

This is not an excuse for weak output. It is a description of where engineering judgment enters the loop.

If a generated solution is wrong, "make it better" usually asks for a more polished version of the same model. The useful response is more specific: this value has two authorities; this type combines distinct identities; this event has no time semantics; this retry creates a second fact; this component stores a view as though it were evidence.

If AI could recover every unstated requirement, choose the right primitives, understand the operational consequences, and recognize its own subtle mistakes, there would be little need for software engineers. That is not the tool we have. The tool we have can explore and implement very quickly when a human supplies context, constraints, and criticism.

AI makes tacit understanding more valuable because effective use requires us to turn some of it into explicit structure.

## AI magnifies whatever primitives it is given

Frederick Brooks distinguished the essential difficulty of software—the construction of complex conceptual structures—from accidental difficulty introduced by tools and representation. AI reduces some accidental work. It does not remove the need to form the conceptual structure.

In fact, it introduces a new risk: accidental complexity is now extremely cheap to produce.

If two components represent the same concept differently, an AI coding tool can quickly create a translator. If the translation is incomplete, it can add a compatibility field, cache, synchronization job, or intermediate type. The immediate task is completed. The disagreement has not been solved; it has acquired infrastructure.

Humans do this too. AI changes the speed and volume.

John Backus warned in his 1977 Turing lecture that programming languages could grow larger without becoming conceptually stronger. The AI-era analogue is a system that gains more implementation without gaining a clearer model.

A good primitive constrains generation productively. It gives both people and tools fewer invalid interpretations to choose from.

## Complexity has to be actively controlled

Complexity does not remain stable by itself.

Herbert Simon's 1962 essay *The Architecture of Complexity* described how hierarchical and nearly decomposable systems become intelligible: interactions are stronger within subsystems than across them. This is a more useful definition of simplicity than counting files or services. A system is manageable when its parts can be understood with limited knowledge of the whole.

M. M. Lehman's 1980 account of software evolution made the maintenance problem explicit: as an evolving program is changed, its complexity tends to increase unless work is done to maintain or reduce it.

Cybernetics provides another useful frame. W. Ross Ashby's 1956 law of requisite variety concerns the capacity required of a regulator facing a range of possible disturbances. In 1970, Roger Conant and Ashby argued that a successful, simple regulator must embody a model of the system it regulates.

Applied carefully—not as a metaphor pretending to be a proof—this suggests something important for software architecture: we cannot govern a complex system with a model that omits its meaningful states and relationships. The monitoring apparatus needs to represent the distinctions that matter.

Today we monitor services through latency, throughput, memory, queue depth, and error rates. These signals tell us when execution is unhealthy. They do not tell us when the data model is becoming incoherent.

We also need to monitor the primitives:

- Where is each primitive defined?
- What gives it identity?
- Which facts are authoritative?
- Which representations are derived?
- Which component may change it?
- Which transitions are valid?
- Which invariants are enforced, merely tested, or only assumed?
- Can a decision be replayed from the evidence available at the time?
- Has a parallel concept appeared under another name?

This should be a living view derived from code, schemas, messages, tests, and runtime evidence where possible—not an architecture diagram made once and slowly abandoned.

## AI should augment the architect

The idea of using computers to extend human reasoning predates modern AI.

J. C. R. Licklider's 1960 paper *Man-Computer Symbiosis* imagined people and computers cooperating on decisions and complex situations, with humans setting goals and criteria while machines performed work that prepared the way for insight. Douglas Engelbart's 1962 report *Augmenting Human Intellect* treated the human, the tools, the language, and the working methods as a system whose collective capability could be improved.

That is the tradition I find most useful here. The goal is not to ask an AI to be the architect while the human waits for an answer. It is to increase the amount of architectural evidence a human can inspect and reason about.

An AI architecture tool should be able to show:

- every representation of a concept across storage and memory;
- the authority and provenance of each field;
- state-transition graphs reconstructed from actual code;
- incompatible meanings hidden behind the same name;
- equivalent meanings hidden behind different names;
- the impact of a proposed change on invariants and replay;
- places where a derived value has become a new source of truth;
- abstractions whose responsibilities or state spaces keep expanding.

The visualization should be a control surface, not decoration. It should allow the architect to interrogate the system and follow claims back to evidence.

## The next frontier is subtraction

Current AI tools are optimized to help create more code, features, integrations, and surface area. The more important architectural capability is deciding what should not exist.

Can two representations become one? Can a stored value become a derivation? Can a queue disappear because the ownership boundary was artificial? Can a new feature fit an existing primitive honestly, or does it introduce a genuinely different lifecycle? Which compatibility layer can be removed after a migration?

This is harder than generation. Simplicity is not smallness. A short program may conceal a dishonest model; a larger one may accurately represent an irreducibly difficult domain.

AI is not yet an expert at making this distinction. It does not naturally bear the long-term cost of the abstractions it proposes. The near-term goal should therefore be augmentation: let the machine collect, compare, trace, and challenge while the human remains responsible for the model.

The scarce resource is not code. Dijkstra was already arguing in 1972 that we must respect the limited capacity of the human mind and design intellectually manageable programs. AI increases the amount of implementation we can produce without increasing the amount any one person can understand.

The next generation of tools should help close that gap.

## A primitive ledger

Before asking an AI—or a team—to implement a major capability, I want a small, versioned ledger of the core concepts:

| Primitive | Meaning | Identity | Authority | Time semantics | Valid changes | Derived views |
| --- | --- | --- | --- | --- | --- | --- |
| `Execution` | A confirmed transfer at a venue | venue + execution ID | venue event log | effective and received time | correction or cancellation | position, fees, P&L |
| `Position` | Net holdings for an account and instrument | account + instrument | derived from executions and adjustments | as-of input sequence | never directly mutated | exposure, risk |
| `Decision` | A choice made from a particular evidence set | decision ID | decision record | decision time plus input versions | superseded, not rewritten | evaluation results |

The exact format does not matter. What matters is whether an engineer can answer the questions without reverse-engineering five services.

The ledger should then be checked against reality:

1. Find every stored and in-memory representation of each primitive.
2. Trace each derived value back to authoritative facts.
3. Record invariants in plain language and attach their enforcement points.
4. Distinguish effective time, observation time, and processing time where they differ.
5. Make state changes occur through named operations or events.
6. Review new structures for semantic duplication, not only code duplication.
7. Ask AI to find contradictions and missing links, not to declare the model correct.
8. Treat removal and consolidation as continuing engineering work.

This is not a process for freezing architecture. Complex systems must change. It is a way to make conceptual change deliberate and reviewable.

## Start here

The foundation is not AI. The foundation is a disciplined account of the data.

What exists? What makes it the same thing over time? Which statements about it are facts? Who may assert them? Which values are derived? Which transitions are valid? What evidence allows a past decision to be reconstructed?

Once those answers are coherent, implementation can change dramatically without destroying the system's meaning. When they are incoherent, more implementation mostly makes the disagreement harder to locate.

AI raises the stakes because it can elaborate either condition at extraordinary speed.

The next frontier is not simply an AI that writes more of the system. It is an AI that helps a human see the system's primitives, detect where their meanings have drifted, and discover how the whole design can become simpler.

## Historical sources

This argument is a synthesis, not a claim to have invented its foundations. The following works are part of its lineage:

- W. Ross Ashby, [*An Introduction to Cybernetics*](https://ashby.info/Ashby-Introduction-to-Cybernetics.pdf) (1956): regulation, state, feedback, and requisite variety.
- J. C. R. Licklider, [*Man-Computer Symbiosis*](https://man.computer/) (1960): computers as partners in formulative thinking and complex decisions.
- Herbert A. Simon, [*The Architecture of Complexity*](https://www2.econ.iastate.edu/tesfatsi/ArchitectureOfComplexity.HSimon1962.pdf) (1962): hierarchy and nearly decomposable systems.
- Douglas C. Engelbart, [*Augmenting Human Intellect: A Conceptual Framework*](https://www.dougengelbart.org/content/view/138/) (1962): improving the combined system of people, language, methods, and tools.
- Michael Polanyi, *The Tacit Dimension* (1966): knowledge that cannot be completely reduced to explicit statements.
- Melvin E. Conway, [*How Do Committees Invent?*](https://www.melconway.com/Home/pdf/committees.pdf) (1968): the relationship between communication structures and system designs.
- C. A. R. Hoare, [*An Axiomatic Basis for Computer Programming*](https://doi.org/10.1145/363235.363259) (1969): preconditions, postconditions, and formal reasoning about program behavior.
- E. F. Codd, [*A Relational Model of Data for Large Shared Data Banks*](https://research.ibm.com/publications/a-relational-model-of-data-for-large-shared-data-banks) (1970): data independence, relations, redundancy, derivability, and consistency.
- Roger C. Conant and W. Ross Ashby, [*Every Good Regulator of a System Must Be a Model of That System*](https://doi.org/10.1080/00207727008920220) (1970): the relationship between effective regulation and modeling.
- Edsger W. Dijkstra, [*The Humble Programmer*](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html) (1972): intellectual manageability, abstraction, and the limits of human reasoning.
- David L. Parnas, [*On the Criteria To Be Used in Decomposing Systems into Modules*](https://doi.org/10.1145/361598.361623) (1972): decomposition by hidden design decision rather than processing step.
- O.-J. Dahl, E. W. Dijkstra, and C. A. R. Hoare, *Structured Programming* (1972): the connected design of program and data structures.
- Barbara Liskov and Stephen Zilles, [*Programming with Abstract Data Types*](https://doi.org/10.1145/942572.807045) (1974): domain-suitable abstractions with controlled operations and hidden representation.
- Peter P. Chen, [*The Entity-Relationship Model—Toward a Unified View of Data*](https://doi.org/10.1145/320434.320440) (1976): conceptual modeling of entities, relationships, and semantic information.
- Niklaus Wirth, [*Algorithms + Data Structures = Programs*](https://openlibrary.org/books/OL5191055M/Algorithms_data_structures_programs) (1976): the inseparability of algorithms and their data structures.
- John Backus, [*Can Programming Be Liberated from the von Neumann Style?*](https://doi.org/10.1145/359576.359579) (1977/1978): a critique of languages that accumulate features without stronger foundations for composition and reasoning.
- M. M. Lehman, [*Programs, Life Cycles, and Laws of Software Evolution*](https://cs.uwaterloo.ca/~a78khan/cs446/additional-material/scribe/27-refactoring/Lehman-LawsOfSoftwareEvolution.pdf) (1980): continuing change and the tendency toward increasing complexity.
- Peter Naur, [*Programming as Theory Building*](https://doi.org/10.1016/0165-6074(85)90032-8) (1985): programming as the construction of human understanding rather than the production of text alone.
- Frederick P. Brooks Jr., [*No Silver Bullet—Essence and Accidents of Software Engineering*](https://www.cs.unc.edu/techreports/86-020.pdf) (1986): essential complexity as the difficulty of constructing and maintaining conceptual structures.
