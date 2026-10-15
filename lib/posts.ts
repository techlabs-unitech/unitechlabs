export interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  dateISO: string
  author: string
  authorRole: string
  content: Section[]
}

interface Section {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'blockquote' | 'divider'
  text?: string
  items?: string[]
}

export const posts: Post[] = [
  {
    slug: '7-essential-data-center-sustainability-strategies-for-2026',
    title: '7 Essential Data Center Sustainability Strategies for 2026',
    excerpt: 'As energy demands surge globally, data centers face mounting pressure to reduce their environmental footprint. Explore seven key strategies that leading operators are adopting to improve efficiency and sustainability.',
    category: 'Sustainability',
    readTime: '6 min read',
    date: 'Oct 8, 2025',
    dateISO: '2025-10-08',
    author: 'Emily',
    authorRole: 'Marketing Rep, UnitechLabs',
    content: [
      {
        type: 'p',
        text: "Data centers now consume roughly 1–2% of global electricity — a figure set to double by 2030 as AI workloads, cloud adoption, and IoT connectivity explode. For technology companies and operators, sustainability is no longer a PR exercise. It's an engineering imperative with real cost and compliance consequences."
      },
      {
        type: 'p',
        text: "At UnitechLabs, we work with infrastructure teams to design systems that are not just powerful but responsible. Here are seven strategies that will define data center sustainability in 2026 and beyond."
      },
      { type: 'divider' },
      {
        type: 'h2',
        text: '1. Optimise Power Usage Effectiveness (PUE)'
      },
      {
        type: 'p',
        text: "PUE remains the gold-standard metric for data center efficiency. A PUE of 1.0 is perfect — every watt goes directly to compute. The global average hovers around 1.58, but hyperscale operators like Google and Microsoft regularly achieve below 1.2."
      },
      {
        type: 'p',
        text: "Reducing PUE starts with cooling. Legacy raised-floor cooling with computer room air conditioners (CRACs) wastes enormous energy on mixing hot and cold air. Hot-aisle/cold-aisle containment, blanking panels, and computational fluid dynamics (CFD) modelling can dramatically cut cooling overhead without a full infrastructure rebuild."
      },
      {
        type: 'h2',
        text: '2. Shift to Liquid and Immersion Cooling'
      },
      {
        type: 'p',
        text: "Air cooling has a physics ceiling. As GPU-dense AI racks push beyond 30–50 kW per rack, traditional CRAC units simply cannot keep up. Direct Liquid Cooling (DLC) — circulating chilled water through cold plates attached to CPUs and GPUs — is now mainstream in high-performance computing."
      },
      {
        type: 'p',
        text: "Immersion cooling takes this further, submerging servers directly in dielectric fluid. Immersion eliminates fans entirely and can achieve PUE approaching 1.03. The upfront cost is higher, but the total cost of ownership over a 5–7 year cycle is typically lower when factoring in cooling infrastructure and energy savings."
      },
      {
        type: 'h2',
        text: '3. Procure Renewable Energy with Matching'
      },
      {
        type: 'p',
        text: "Purchasing Renewable Energy Certificates (RECs) or entering Power Purchase Agreements (PPAs) is now table stakes. But the quality of renewable procurement matters. Annual matching — where you buy enough renewable MWh annually to cover your consumption — is weak. Hourly matching, which aligns renewable energy production with actual consumption hour by hour, is the emerging standard."
      },
      {
        type: 'p',
        text: "Google achieved 100% hourly carbon-free energy across all its data centers in 2023. Microsoft and Amazon have committed to the same by 2030. For smaller operators, virtual PPAs and community solar subscriptions offer an accessible path to meaningful renewable procurement."
      },
      {
        type: 'h2',
        text: '4. Deploy AI-Driven Cooling Optimisation'
      },
      {
        type: 'p',
        text: "Ironically, AI is both the problem and the solution. DeepMind's collaboration with Google demonstrated a 40% reduction in cooling energy at their data centers using reinforcement learning — the AI continuously adjusts chiller setpoints, cooling tower fan speeds, and pump flows based on real-time load and ambient conditions."
      },
      {
        type: 'p',
        text: "Open-source tools like EnergyPlus and commercial DCIM (Data Center Infrastructure Management) platforms with AI modules are now accessible to mid-sized operators. Even a simple regression model trained on historical thermal data can improve cooling decisions significantly over static setpoints."
      },
      {
        type: 'h2',
        text: '5. Leverage Waste Heat Recovery'
      },
      {
        type: 'p',
        text: "Every server that runs produces heat — and that heat is energy. Forward-thinking operators are capturing this waste heat for district heating networks, greenhouse agriculture, or on-site hot water systems. Data centers in Stockholm and Helsinki now feed heat into municipal networks, effectively becoming energy producers rather than just consumers."
      },
      {
        type: 'p',
        text: "In Indian climates, waste heat recovery is less straightforward due to cooling demands, but hybrid approaches — using recovered heat to drive absorption chillers — are technically viable and worth evaluation for large-scale deployments."
      },
      {
        type: 'h2',
        text: '6. Adopt a Circular Hardware Economy'
      },
      {
        type: 'p',
        text: "Manufacturing a single server generates roughly 1–2 tonnes of CO₂ equivalent — often more than the server will consume in electricity over its operational life. Extending server lifespans, refurbishing hardware, and working with certified e-waste recyclers directly reduces embodied carbon."
      },
      {
        type: 'p',
        text: "Hyperscalers are designing Open Compute Project (OCP) hardware specifically for longevity and repairability. Even if you're not operating at that scale, specifying hardware with longer support windows and building refurbishment partnerships into procurement policy can make a meaningful difference."
      },
      {
        type: 'h2',
        text: '7. Invest in Real-Time Carbon Monitoring'
      },
      {
        type: 'p',
        text: "You cannot manage what you do not measure. Deploying real-time carbon intensity APIs — services like Electricity Maps or WattTime that provide live grid carbon intensity data — allows workload schedulers to shift flexible compute jobs to times when the local grid is cleanest."
      },
      {
        type: 'p',
        text: "This temporal workload shifting, combined with geographic flexibility for distributed cloud workloads, can reduce operational carbon by 20–40% without any physical infrastructure change. It requires investment in scheduling software but no capital expenditure on hardware."
      },
      { type: 'divider' },
      {
        type: 'h2',
        text: 'The Road Ahead'
      },
      {
        type: 'p',
        text: "Sustainability and performance are no longer in tension. The most efficient data centers today are also the most economical to operate. The seven strategies above — from PUE optimisation and liquid cooling to AI-driven management and carbon monitoring — form a layered approach that any operator can begin implementing today."
      },
      {
        type: 'p',
        text: "At UnitechLabs, we integrate sustainability thinking into IoT, infrastructure, and software projects from day one. If you're building or scaling a technology infrastructure and want to design for efficiency, reach out — we'd be glad to help."
      },
    ]
  },
  {
    slug: 'how-ai-is-changing-the-face-of-digital-marketing',
    title: 'How AI Is Changing The Face Of Digital Marketing',
    excerpt: 'Artificial intelligence is reshaping every aspect of digital marketing — from content creation and hyper-personalisation to predictive analytics and real-time campaign optimisation. Here is what business owners need to understand.',
    category: 'Technology',
    readTime: '5 min read',
    date: 'Jun 12, 2024',
    dateISO: '2024-06-12',
    author: 'Emily',
    authorRole: 'Marketing RepUnitechLabs',
    content: [
      {
        type: 'p',
        text: "Marketing has always been about understanding people — their desires, behaviours, and decision-making patterns. For decades, this understanding came from intuition, surveys, and aggregate data. Artificial intelligence has changed that equation entirely. Today, AI processes billions of data points in real time to predict, personalise, and optimise marketing at a scale no human team could match."
      },
      {
        type: 'p',
        text: "This isn't a distant future — it's happening right now, and businesses that fail to adapt are already losing ground. Here's a clear-eyed look at how AI is transforming digital marketing and what it means for your business strategy."
      },
      { type: 'divider' },
      {
        type: 'h2',
        text: 'Hyper-Personalisation at Scale'
      },
      {
        type: 'p',
        text: "Traditional segmentation divided audiences into broad buckets — age, geography, income bracket. AI-powered personalisation goes several levels deeper, building individual-level models that predict what each user wants to see, when they want to see it, and on which device."
      },
      {
        type: 'p',
        text: "Netflix's recommendation engine is the most famous example — reportedly responsible for 80% of content watched on the platform. Spotify's Discover Weekly has the same effect for music. But these principles now apply directly to e-commerce product recommendations, email subject line testing, and dynamic website content that changes based on a visitor's behaviour history."
      },
      {
        type: 'p',
        text: "For businesses in India, where purchasing behaviour varies sharply across regions, languages, and demographics, personalisation is not a luxury — it's a competitive necessity."
      },
      {
        type: 'h2',
        text: 'AI-Powered Content Creation'
      },
      {
        type: 'p',
        text: "Large language models (LLMs) like GPT-4 and Claude are changing how content teams operate. AI can now draft first-pass blog posts, product descriptions, social media captions, and ad copy in seconds. This doesn't eliminate writers — it changes their role from drafting to editing, strategy, and brand voice enforcement."
      },
      {
        type: 'p',
        text: "More significantly, AI enables content at volumes that were previously impossible. A team of three can now publish at the volume that once required fifteen. The bottleneck shifts from production to editorial quality and distribution strategy."
      },
      {
        type: 'blockquote',
        text: "The marketers winning with AI are not the ones replacing their teams with it — they're the ones using it to amplify their team's best thinking."
      },
      {
        type: 'h2',
        text: 'Predictive Analytics and Lead Scoring'
      },
      {
        type: 'p',
        text: "Machine learning models trained on historical CRM data can now predict which leads are most likely to convert, which customers are about to churn, and which product a user is most likely to purchase next. This turns reactive marketing into proactive relationship management."
      },
      {
        type: 'p',
        text: "Salesforce Einstein, HubSpot's AI scoring, and custom models built on platforms like BigQuery ML are all making this accessible to businesses of all sizes. The key input is quality data — companies that have invested in clean CRM data and customer journey tracking have a significant advantage."
      },
      {
        type: 'h2',
        text: 'Programmatic Advertising and Real-Time Bidding'
      },
      {
        type: 'p',
        text: "Today, over 90% of digital display advertising is bought programmatically — meaning AI systems are bidding on individual ad impressions in real-time auctions that complete in under 100 milliseconds. The AI evaluates the user's profile, the context of the page, historical performance data, and your campaign objectives to decide whether to bid, and at what price."
      },
      {
        type: 'p',
        text: "Google Performance Max campaigns and Meta's Advantage+ are both AI-driven ad systems that automate creative selection, audience targeting, and budget allocation simultaneously. These tools can deliver strong results, but they require rigorous data inputs and clear conversion tracking to function effectively."
      },
      {
        type: 'h2',
        text: 'Conversational Marketing with AI'
      },
      {
        type: 'p',
        text: "AI-powered chatbots and voice assistants are handling the top of the marketing funnel in ways that were unimaginable five years ago. Modern conversational AI can qualify leads, answer product questions, book demos, and handle objections — all without human intervention."
      },
      {
        type: 'p',
        text: "At UnitechLabs, we build custom AI assistants and conversational interfaces for our clients. The ROI is tangible: faster response times, 24/7 availability, and consistent brand voice across every interaction — something human teams inevitably struggle to maintain at scale."
      },
      {
        type: 'h2',
        text: 'The Challenges You Cannot Ignore'
      },
      {
        type: 'p',
        text: "AI in marketing is not without risks. Over-reliance on automation can produce generic content that erodes brand distinctiveness. Poorly tuned personalisation algorithms can feel invasive rather than helpful. And AI systems trained on biased data can amplify discriminatory targeting patterns."
      },
      {
        type: 'p',
        text: "There's also the regulatory dimension. India's Digital Personal Data Protection Act (DPDPA) and GDPR in Europe impose strict requirements on how personal data is collected and used for marketing. Any AI-driven marketing system must be built with data governance as a first principle, not an afterthought."
      },
      { type: 'divider' },
      {
        type: 'h2',
        text: 'Where to Start'
      },
      {
        type: 'p',
        text: "The best entry point for most businesses is not the most sophisticated AI — it's the most foundational: clean data. Before investing in AI marketing tools, ensure your CRM is accurate, your website analytics are correctly configured, and your conversion tracking is reliable. AI is only as good as the data it learns from."
      },
      {
        type: 'p',
        text: "From there, start with a single high-impact use case — personalised email campaigns, AI-assisted content, or predictive lead scoring — and build outward from demonstrated results. If you need help designing an AI marketing architecture that fits your business, our team at UnitechLabs is always open to a conversation."
      }
    ]
  },
  {
    slug: 'exploring-the-ethics-of-ai-and-robotics-in-society',
    title: 'Exploring The Ethics Of AI And Robotics In Society',
    excerpt: 'As AI and robotics become deeply embedded in everyday life — from healthcare decisions to autonomous vehicles — the ethical frameworks governing their development have never been more consequential. A grounded exploration of the key issues.',
    category: 'Insight',
    readTime: '7 min read',
    date: 'Jun 12, 2024',
    dateISO: '2024-06-12',
    author: 'Emily',
    authorRole: 'Marketing Rep, UnitechLabs',
    content: [
      {
        type: 'p',
        text: "We are in the middle of a technological transition that has no precise historical parallel. AI systems are making consequential decisions about who gets a loan, who is flagged by a surveillance system, which patients receive priority care, and — in automated vehicles — who survives a crash. Robotics is entering homes, hospitals, and factories faster than our legal and ethical frameworks can adapt."
      },
      {
        type: 'p',
        text: "The ethical questions this raises are not abstract philosophy. They are engineering decisions, policy choices, and business judgements that practitioners in the technology industry make every day. This piece attempts a grounded exploration of the most pressing issues."
      },
      { type: 'divider' },
      {
        type: 'h2',
        text: 'The Alignment Problem: Building Systems That Do What We Intend'
      },
      {
        type: 'p',
        text: "The foundational ethical challenge in AI is alignment — ensuring that an AI system actually pursues the objectives we intend, rather than a misspecified proxy. The classic example is the 'paperclip maximiser' thought experiment: an AI tasked with making paperclips that, if sufficiently capable, might convert all available matter into paperclips. The objective was specified correctly in narrow terms but catastrophically in broader ones."
      },
      {
        type: 'p',
        text: "Real-world misalignment is less dramatic but common. Content recommendation algorithms optimised for engagement reliably surface outrage and misinformation because outrage drives clicks. Predictive policing systems trained on historical crime data reproduce and amplify historical biases. In both cases, the system is doing exactly what it was mathematically optimised to do — and causing significant harm."
      },
      {
        type: 'p',
        text: "Solving alignment requires more than technical work. It requires clear articulation of what values we want systems to pursue, which is fundamentally a social and political question before it is an engineering one."
      },
      {
        type: 'h2',
        text: 'Bias, Fairness and Representation'
      },
      {
        type: 'p',
        text: "Machine learning systems learn from data. When that data reflects historical patterns of discrimination — in hiring, lending, criminal justice, medical diagnosis — the systems will reproduce and sometimes amplify those patterns. This is not a bug in the algorithm; it is a consequence of learning from a biased world."
      },
      {
        type: 'p',
        text: "Facial recognition systems have been documented to have significantly higher error rates for darker-skinned faces, particularly women, because training datasets have historically over-represented lighter-skinned men. Medical AI trained predominantly on data from Western populations can perform poorly when applied to South Asian or African patient populations."
      },
      {
        type: 'p',
        text: "Addressing this requires investment in diverse training datasets, regular bias audits, and a genuine commitment to including affected communities in the design process — not as an afterthought, but as a structural requirement."
      },
      {
        type: 'h2',
        text: 'Autonomy, Accountability and the Attribution Gap'
      },
      {
        type: 'p',
        text: "When an autonomous vehicle causes an accident, who is responsible — the passenger, the manufacturer, the software developer, the training data curator? When an AI hiring system rejects a qualified candidate, who do they appeal to? Current legal frameworks struggle to assign accountability in systems where decision-making is distributed across humans, algorithms, and training processes."
      },
      {
        type: 'p',
        text: "The European Union's AI Act is the most ambitious attempt to address this through regulation, classifying AI applications by risk level and imposing mandatory requirements on high-risk systems. India's AI governance framework is still developing, but the direction of travel globally is towards mandatory transparency, explainability, and human oversight for high-stakes AI decisions."
      },
      {
        type: 'blockquote',
        text: "Automation does not remove moral responsibility — it redistributes it. When we delegate a decision to a system, we are still choosing to delegate."
      },
      {
        type: 'h2',
        text: 'Privacy, Surveillance and the Erosion of Anonymity'
      },
      {
        type: 'p',
        text: "AI-powered surveillance is qualitatively different from CCTV cameras. Computer vision systems can identify individuals in real time from body gait, face geometry, and clothing patterns. Predictive systems can infer mood, political affiliation, and health status from aggregated behavioural data. The combination of ubiquitous sensors and capable inference engines creates environments where true anonymity in public spaces may cease to exist."
      },
      {
        type: 'p',
        text: "This has profound implications for political dissent, personal freedom, and the presumption of innocence. Several cities in the United States have banned government use of facial recognition technology. China has deployed one of the most extensive AI surveillance systems in history. India sits at a critical decision point regarding how surveillance technology is deployed and regulated."
      },
      {
        type: 'h2',
        text: 'Robotics in High-Stakes Environments'
      },
      {
        type: 'p',
        text: "Surgical robots, autonomous military drones, care robots for the elderly — these represent different ends of a spectrum where robotic autonomy meets high ethical stakes. In healthcare, robotic systems have demonstrably improved precision in certain procedures, but questions of consent, liability when systems fail, and equitable access remain unresolved."
      },
      {
        type: 'p',
        text: "Lethal autonomous weapons systems (LAWS) — drones and ground robots capable of selecting and engaging targets without human input — represent perhaps the most urgent ethics challenge. A growing coalition of AI researchers and ethics organisations have called for an international ban, arguing that delegating life-and-death decisions to algorithms violates fundamental principles of human dignity and international humanitarian law."
      },
      {
        type: 'h2',
        text: 'Labour Displacement and Economic Disruption'
      },
      {
        type: 'p',
        text: "Estimates of AI and automation's impact on employment range from cautious to alarming. The IMF estimated in 2024 that AI could affect 40% of jobs globally, with advanced economies facing higher exposure. The historical precedent of industrial automation suggests that new jobs do emerge, but the transition period can span generations and cause significant suffering for displaced workers."
      },
      {
        type: 'p',
        text: "The distributional question is as important as the aggregate one. If productivity gains from AI accrue primarily to capital owners while labour bears the transition costs, the social and political consequences could be severe. This demands proactive investment in retraining, education systems that teach durable skills, and serious policy consideration of mechanisms like progressive automation taxation or universal basic services."
      },
      { type: 'divider' },
      {
        type: 'h2',
        text: 'Building Ethical AI: A Practitioner\'s Perspective'
      },
      {
        type: 'p',
        text: "At UnitechLabs, we don't work on weapons or surveillance infrastructure. But we do build AI systems that make recommendations, automate decisions, and interact with people. We believe ethical AI practice begins with honest acknowledgement of a system's limitations and potential for harm — before any code is written."
      },
      {
        type: 'p',
        text: "In practice, this means asking hard questions upfront: Who does this system affect? What happens when it's wrong? Who has oversight? Can it be audited and corrected? These are not obstacles to innovation — they are the discipline that makes innovation sustainable."
      },
      {
        type: 'p',
        text: "The frameworks for AI ethics — from the EU AI Act to UNESCO's Recommendation on the Ethics of AI — provide useful structures. But frameworks only matter if the people building systems take them seriously. That requires a culture of ethical responsibility within engineering and product teams, not just compliance checklists."
      },
      {
        type: 'p',
        text: "The ethical challenges of AI and robotics are not going to be resolved quickly. But they are being resolved — through regulation, through social pressure, through the choices of individual engineers and companies. The question is not whether these choices will be made. It's whether they will be made thoughtfully."
      }
    ]
  }
]

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map(p => p.slug)
}
