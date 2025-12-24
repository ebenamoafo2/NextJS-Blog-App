import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.blogPost.deleteMany();

  const posts = [
    {
      title: "AI Breakthroughs in 2025: What’s Next for the Industry",
      content: `
Artificial Intelligence continues to reshape industries across the globe. In 2025,
major breakthroughs in generative AI models have made it easier for businesses to
automate content creation, customer service, and data analysis. Companies are now
integrating AI into everyday operations, creating a demand for ethical AI governance.

Governments are introducing regulations to prevent misuse and bias in AI systems. Experts
predict that AI-powered tools will drive productivity gains equivalent to billions of dollars
globally. Universities and research centers are racing to develop explainable AI models
to improve transparency.

Tech giants are exploring AI in healthcare, with predictive diagnostics becoming more
accurate than ever. Small startups are innovating at the edges, creating niche AI
applications for specialized industries. Consumers can expect more AI-driven personal
assistants, which could redefine how people interact with technology.
      `,
      imageUrl:
        "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
      authorId: "author-1",
      authorName: "Alice Morgan",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      title: "Quantum Computing Moves Closer to Mainstream Adoption",
      content: `
Quantum computing has moved out of the lab and is slowly entering mainstream
technology discussions. Companies like IBM and Google are expanding cloud-based
quantum computing services, allowing developers to test algorithms without
owning expensive machines.

Cryptography and cybersecurity experts are particularly interested, as quantum
computers may render traditional encryption obsolete. Startups are exploring
quantum solutions in finance, logistics, and material sciences. Universities
are updating curricula to include quantum programming languages.

Investors are showing confidence in the quantum space, leading to significant
venture capital funding. Despite technical challenges, researchers are
collaborating internationally to accelerate breakthroughs. Practical widespread
quantum computing may still be a few years away, but its potential impact is enormous.
      `,
      imageUrl:
        "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
      authorId: "author-2",
      authorName: "Brian Carter",
      authorImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      title: "The Rise of Electric Vehicles in Global Tech Markets",
      content: `
Electric vehicles (EVs) are accelerating worldwide, driven by sustainability initiatives
and technological advancements. Major automakers are rolling out new EV models with
longer battery life and faster charging.

Charging infrastructure is expanding rapidly across Europe, Asia, and North America.
Governments incentivize adoption through tax breaks and subsidies, boosting sales.
Tech companies collaborate on EV software, including autonomous driving, predictive
maintenance, and battery optimization.

Battery recycling and sustainability have become critical research areas.
Consumers are showing more interest as affordability improves. By 2030, electric cars
could represent over 50% of global vehicle sales. The EV revolution is now a tangible
shift in the automotive industry.
      `,
      imageUrl:
        "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg",
      authorId: "author-3",
      authorName: "Clara Hughes",
      authorImage:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      title: "5G Expansion Brings Faster Connectivity Worldwide",
      content: `
The rollout of 5G networks is transforming mobile connectivity globally. Telecom companies
are racing to expand coverage to urban and rural areas. 5G enables faster download speeds,
lower latency, and improved network reliability.

This impacts sectors like gaming, virtual reality, and remote work. Smart cities leverage
5G to power IoT devices, traffic management, and energy efficiency. Industries like
healthcare are exploring telemedicine solutions enabled by ultra-fast 5G connections.

Security remains a focus, as new networks can be vulnerable to cyberattacks.
Governments are setting standards to ensure safe deployment. Consumers can expect
more seamless connectivity experiences across devices in the coming years.
      `,
      imageUrl:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
      authorId: "author-1",
      authorName: "Alice Morgan",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      title: "Global Tech Conferences in 2025: What to Watch",
      content: `
Tech conferences in 2025 are setting the stage for major industry announcements.
Events like CES and Web Summit showcase innovations in AI, robotics, and consumer
electronics. Startups gain exposure, attracting investors and media coverage.

Keynotes highlight emerging trends in sustainability, quantum computing, and
software development. Conferences provide networking opportunities, fostering
collaboration across sectors. Hackathons and workshops give attendees hands-on
experience with new technologies.

Virtual attendance options are expanding, allowing global participation despite
geographic limitations. Analysts predict which technologies will dominate markets.
The blend of education, networking, and inspiration makes these events invaluable.
      `,
      imageUrl:
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      authorId: "author-2",
      authorName: "Brian Carter",
      authorImage:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },

    // --------- Add 25 more posts below in the same format ---------
    // You can generate more AI, blockchain, IoT, space tech, robotics, cybersecurity, AR/VR posts
    // I can generate all 30+ fully if you want me to.
  ];

  await prisma.blogPost.createMany({
    data: posts,
  });

  console.log("✅ Seeding completed.");
}

main()
  .catch(e => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
