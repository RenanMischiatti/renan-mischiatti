/**
 * Central content file: profile, experience, technologies, projects and copy.
 */

export const profile = {
  firstName: "Renan",
  lastName: "Mischiatti",
  role: "PHP Software Engineer",
  secondaryRole: {
    en: "Backend / Full Stack Developer",
    pt: "Backend & Full Stack",
  },
  location: "São José dos Campos, Brazil",
  work: { en: "Remote / Worldwide", pt: "Remoto / Global" },
  email: "renanmisch.dev@gmail.com",
  cvUrls: {
    en: "assets/renan-mischiatti-cv-en.pdf",
    pt: "assets/renan-mischiatti-cv-pt.pdf",
  },
  status: "AVAILABLE",
};

export const heroTechs = [
  { name: "Laravel", slug: "laravel", hex: "FF2D20" },
  { name: "PHP", slug: "php", hex: "777BB4" },
  { name: "JavaScript", slug: "javascript", hex: "F7DF1E" },
  { name: "MySQL", slug: "mysql", hex: "4479A1" },
  { name: "Docker", slug: "docker", hex: "2496ED" },
];

export const socials = [
  {
    name: "LinkedIn",
    slug: "linkedin",
    url: "https://www.linkedin.com/in/renan-mischiatti/",
    hex: "0A66C2",
  },
  {
    name: "GitHub",
    slug: "github",
    url: "https://github.com/RenanMischiatti",
    hex: "181717",
  },
];

export const experiences = [
  {
    id: "EXP_01",
    period: { en: "JAN 2024 - PRESENT", pt: "JAN 2024 - PRESENTE" },
    year: "2024",
    role: "PHP Software Engineer",
    company: "Alfasoft",
    place: { en: "Lisbon, Portugal / Remote", pt: "Lisboa, Portugal / Remoto" },
    description: {
      en: "Leading end-to-end delivery of concurrent PHP/Laravel projects, from architecture and estimates to production, serving 10,000+ active users.",
      pt: "Liderança do ciclo completo de projetos simultâneos em PHP/Laravel, da arquitetura e estimativas à produção, atendendo mais de 10 mil usuários ativos.",
    },
    bullets: [
      {
        en: "Payment integrations with security, traceability and production reliability",
        pt: "Integrações de pagamento com segurança, rastreabilidade e estabilidade em produção",
      },
      {
        en: "Custom plugins for Magento, WooCommerce, Shopify, Saleor and PrestaShop",
        pt: "Plugins customizados para Magento, WooCommerce, Shopify, Saleor e PrestaShop",
      },
      {
        en: "Code reviews, Pull Request approvals and engineering quality standards",
        pt: "Code reviews, aprovação de Pull Requests e padrões de qualidade de engenharia",
      },
      {
        en: "Direct technical contact with clients, stakeholders and product teams",
        pt: "Contato técnico direto com clientes, stakeholders e times de produto",
      },
    ],
    stack: ["PHP", "Laravel", "Vue.js", "JavaScript", "MySQL", "Docker", "AWS", "GraphQL"],
  },
  {
    id: "EXP_02",
    period: { en: "OCT 2022 - DEC 2023", pt: "OUT 2022 - DEZ 2023" },
    year: "2022",
    role: {
      en: "PHP/Laravel Software Developer",
      pt: "Desenvolvedor de Software Júnior PHP/Laravel",
    },
    company: "Voch Tech",
    place: { en: "São José dos Campos / On-site", pt: "São José dos Campos / Presencial" },
    description: {
      en: "Developed and evolved a robust ERP with complex tax, product and process-automation rules while contributing to architecture and long-term scalability.",
      pt: "Desenvolvimento e evolução de um ERP robusto com regras fiscais, gestão de produtos e automações, contribuindo também para arquitetura e escalabilidade.",
    },
    bullets: [
      {
        en: "Reduced critical response times by up to 30% with MySQL optimization and refactoring",
        pt: "Redução de até 30% no tempo de resposta com otimização MySQL e refatoração",
      },
      {
        en: "NF-e, Correios and other external API integrations",
        pt: "Integrações com NF-e, Correios e outras APIs externas",
      },
      {
        en: "Asynchronous processing for high-volume workloads",
        pt: "Processamento assíncrono de grandes volumes de dados",
      },
      {
        en: "Legacy modernization with Clean Code and Design Patterns",
        pt: "Modernização de legado com Clean Code e Design Patterns",
      },
    ],
    stack: ["PHP", "Laravel", "Vue.js", "jQuery", "MySQL", "Docker", "Linux", "AWS S3"],
  },
  {
    id: "EXP_03",
    period: { en: "JUN 2022 - OCT 2022", pt: "JUN 2022 - OUT 2022" },
    year: "2022",
    role: { en: "PHP Software Developer - Intern", pt: "Desenvolvedor de Software PHP - Estágio" },
    company: "Drops Buffet",
    place: { en: "São José dos Campos / Hybrid", pt: "São José dos Campos / Híbrido" },
    description: {
      en: "Built features for a business-management ERP and maintained its relational data model.",
      pt: "Desenvolvimento de funcionalidades para um ERP e manutenção de seu modelo de dados relacional.",
    },
    bullets: [
      {
        en: "Full Stack features with Laravel, JavaScript, jQuery, HTML and CSS",
        pt: "Funcionalidades Full Stack com Laravel, JavaScript, jQuery, HTML e CSS",
      },
      {
        en: "MySQL modelling, referential integrity and query efficiency",
        pt: "Modelagem MySQL, integridade referencial e eficiência de consultas",
      },
      {
        en: "Bug diagnosis and operational stability improvements",
        pt: "Diagnóstico de bugs e melhorias na estabilidade operacional",
      },
    ],
    stack: ["PHP", "Laravel", "JavaScript", "jQuery", "HTML", "CSS", "MySQL", "GitHub"],
  },
];

export const techGroups = [
  {
    id: "TECH_BACKEND",
    title: "Backend",
    items: [
      { name: "PHP 8+", slug: "php", hex: "777BB4", note: { en: "Core language for production systems.", pt: "Linguagem principal em sistemas de produção." } },
      { name: "Laravel", slug: "laravel", hex: "FF2D20", note: { en: "4+ years building production applications.", pt: "Mais de 4 anos criando aplicações em produção." } },
      { name: "Symfony", slug: "symfony", hex: "000000", note: { en: "Enterprise components and services.", pt: "Componentes e serviços para aplicações robustas." } },
      { name: "REST APIs", slug: "openapiinitiative", hex: "6BA539", note: { en: "API design and complex third-party integrations.", pt: "Design de APIs e integrações complexas." } },
      { name: "GraphQL", slug: "graphql", hex: "E10098", note: { en: "Typed APIs and headless commerce integrations.", pt: "APIs tipadas e integrações com plataformas headless." } },
    ],
  },
  {
    id: "TECH_FRONTEND",
    title: "Frontend",
    items: [
      { name: "JavaScript", slug: "javascript", hex: "F7DF1E", note: { en: "Production interfaces and browser logic.", pt: "Interfaces e lógica de navegador em produção." } },
      { name: "Vue.js", slug: "vuedotjs", hex: "4FC08D", note: { en: "Interfaces for ERPs, dashboards and products.", pt: "Interfaces para ERPs, dashboards e produtos." } },
      { name: "jQuery / AJAX", slug: "jquery", hex: "0769AD", note: { en: "Legacy evolution and asynchronous interfaces.", pt: "Evolução de legados e interfaces assíncronas." } },
      { name: "HTML5", slug: "html5", hex: "E34F26", note: { en: "Semantic interface structure.", pt: "Estrutura semântica de interfaces." } },
      { name: "CSS3", slug: "css3", hex: "1572B6", note: { en: "Responsive layouts and interface styling.", pt: "Layouts responsivos e estilização de interfaces." } },
    ],
  },
  {
    id: "TECH_DATA",
    title: { en: "Data", pt: "Dados" },
    items: [
      { name: "MySQL", slug: "mysql", hex: "4479A1", note: { en: "Modelling, procedures, triggers and query optimization.", pt: "Modelagem, procedures, triggers e otimização de queries." } },
      { name: "Redis", slug: "redis", hex: "FF4438", note: { en: "Caching and asynchronous processing support.", pt: "Cache e suporte a processamento assíncrono." } },
    ],
  },
  {
    id: "TECH_DEVOPS",
    title: "DevOps",
    items: [
      { name: "Docker", slug: "docker", hex: "2496ED", note: { en: "Reproducible environments and deployments.", pt: "Ambientes e deploys reproduzíveis." } },
      { name: "Linux / VPS", slug: "linux", hex: "FCC624", note: { en: "Server administration and production operations.", pt: "Administração de servidores e operação em produção." } },
      { name: "Git", slug: "git", hex: "F05032", note: { en: "Git Flow, reviews and disciplined collaboration.", pt: "Git Flow, reviews e colaboração disciplinada." } },
      { name: "AWS S3", slug: "amazons3", hex: "569A31", note: { en: "Cloud storage integrations.", pt: "Integrações com armazenamento em nuvem." } },
    ],
  },
  {
    id: "TECH_AI",
    title: { en: "Automation / AI", pt: "Automação / IA" },
    items: [
      { name: "Python", slug: "python", hex: "3776AB", note: { en: "Automation and media-analysis services.", pt: "Serviços de automação e análise de mídia." } },
      { name: "OpenAI API", slug: "openai", hex: "412991", note: { en: "Contextual analysis and workflow automation.", pt: "Análise contextual e automação de fluxos." } },
      { name: "FFmpeg", slug: "ffmpeg", hex: "007808", note: { en: "Video editing and transcoding pipelines.", pt: "Pipelines de edição e transcodificação de vídeo." } },
    ],
  },
  {
    id: "TECH_COMMERCE",
    title: "E-commerce",
    items: [
      { name: "Shopify", slug: "shopify", hex: "7AB55C", note: { en: "Custom plugins and third-party integrations.", pt: "Plugins customizados e integrações externas." } },
      { name: "Magento", slug: "magento", hex: "EE672F", note: { en: "Custom commerce integrations.", pt: "Integrações customizadas para e-commerce." } },
      { name: "WooCommerce", slug: "woocommerce", hex: "96588A", note: { en: "Commerce extensions and API integrations.", pt: "Extensões de comércio e integrações via API." } },
      { name: "Saleor", slug: "saleor", icon: "assets/tech/saleor.svg", hex: "161819", note: { en: "GraphQL-native headless commerce integrations.", pt: "Integrações com e-commerce headless nativo em GraphQL." } },
      { name: "PrestaShop", slug: "prestashop", hex: "DF0067", note: { en: "Custom commerce integrations.", pt: "Integrações customizadas para e-commerce." } },
      { name: "WordPress", slug: "wordpress", hex: "21759B", note: { en: "Content and commerce solutions.", pt: "Soluções de conteúdo e comércio." } },
    ],
  },
];

export const projects = [
  {
    id: "PROJECT_001",
    index: "01",
    name: "Clipo",
    category: { en: "AI Video Automation", pt: "Automação de Vídeo com IA" },
    description: {
      en: "Automated platform that turns podcasts and long-form videos into short clips through a scalable, low-cost processing pipeline.",
      pt: "Plataforma que transforma podcasts e vídeos longos em clipes por meio de um pipeline automatizado, escalável e de baixo custo.",
    },
    problem: {
      en: "Laravel orchestrates the asynchronous pipeline; Python and OpenAI identify contextual cut points while FFmpeg handles editing and transcoding.",
      pt: "Laravel orquestra o pipeline assíncrono; Python e OpenAI identificam pontos de corte enquanto o FFmpeg executa edição e transcodificação.",
    },
    stack: ["Laravel", "PHP", "Python", "FFmpeg", "yt-dlp", "OpenAI API", "Docker", "AWS"],
    links: [],
    image: "assets/clipo.png",
    imageClass: "object-contain p-12 md:p-16",
    imageBackground: "#effbff",
    accent: "#20232D",
  },
  {
    id: "PROJECT_002",
    index: "02",
    name: "Monetrize",
    category: { en: "Business Management SaaS", pt: "SaaS de Gestão" },
    description: {
      en: "ERP-grade platform for independent professionals with complex business rules, integrated AI and scalable architecture.",
      pt: "Plataforma de gestão para profissionais autônomos com regras de negócio complexas, IA integrada e arquitetura escalável.",
    },
    problem: {
      en: "Centralizes the operational routine of freelancers in a single product designed for performance and future growth.",
      pt: "Centraliza a rotina operacional de profissionais autônomos em um único produto preparado para performance e crescimento.",
    },
    stack: ["PHP", "Laravel", "MySQL", "OpenAI API", "Docker"],
    links: [],
    image: "assets/monetrize.jpg",
    imageClass: "object-contain p-12 md:p-16",
    imageBackground: "#ffffff",
    accent: "#2B3140",
  },
  {
    id: "PROJECT_003",
    index: "03",
    name: "HighFIT AI",
    category: { en: "Generative AI / Fitness", pt: "IA Generativa / Fitness" },
    description: {
      en: "Intelligent questionnaire that generates fully personalized diet and workout PDF plans from each user's profile and goals.",
      pt: "Questionário inteligente que gera planos personalizados de dieta e treino em PDF a partir do perfil e objetivos de cada usuário.",
    },
    problem: {
      en: "Transforms a structured onboarding flow into an immediately useful, personalized plan with generative AI.",
      pt: "Transforma um onboarding estruturado em um plano personalizado e imediatamente útil com IA generativa.",
    },
    stack: ["PHP", "Laravel", "OpenAI API", "PDF Generation"],
    links: [],
    image: "assets/highfit-ai.png",
    imageClass: "object-contain p-10 md:p-12",
    imageBackground: "#ffffff",
    accent: "#3A4152",
  },
  {
    id: "PROJECT_004",
    index: "04",
    name: { en: "AI Affiliate Automation", pt: "Automação de Afiliados com IA" },
    category: { en: "E-commerce Automation", pt: "Automação de E-commerce" },
    description: {
      en: "Automated product curation and publishing for affiliate programs, including AI-assisted selection and ad copywriting.",
      pt: "Curadoria e publicação automatizada de produtos afiliados, incluindo seleção e copywriting assistidos por IA.",
    },
    problem: {
      en: "Connects AliExpress and Shopee data to an automated publishing flow, reducing repetitive manual work.",
      pt: "Conecta dados de AliExpress e Shopee a um fluxo automatizado de publicação, reduzindo trabalho manual repetitivo.",
    },
    stack: ["PHP", "Laravel", "Python", "OpenAI API", "E-commerce APIs"],
    links: [],
    image: "assets/affiliate-automation.png",
    imageClass: "object-contain p-8 md:p-10",
    imageBackground: "#f7f5ef",
    accent: "#343947",
  },
];

export const highlights = [
  { value: 4, suffix: "+", label: { en: "Years of experience", pt: "Anos de experiência" } },
  { value: 30, suffix: "%", label: { en: "Faster response time", pt: "Melhoria no tempo de resposta" } },
  { value: 10000, suffix: "+", label: { en: "Active users served", pt: "Usuários ativos atendidos" } },
  { value: 20, suffix: "%", label: { en: "Faster delivery cycles", pt: "Ciclos de entrega mais rápidos" } },
];

export const sections = [
  { id: "home", index: "01", label: "Home" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "stack", index: "03", label: "Stack" },
  { id: "projects", index: "04", label: "Projects" },
  { id: "about", index: "05", label: "About" },
  { id: "contact", index: "06", label: "Contact" },
];

export const dict = {
  hello: { en: "Hello, I'm", pt: "Olá, eu sou" },
  tagline: {
    en: "I build scalable PHP/Laravel products, APIs and automations that turn complex business needs into reliable software.",
    pt: "Construo produtos escaláveis em PHP/Laravel, APIs e automações que transformam necessidades complexas em software confiável.",
  },
  viewWork: { en: "View my work", pt: "Ver projetos" },
  downloadCv: { en: "Download CV", pt: "Baixar CV" },
  scroll: { en: "Scroll to explore", pt: "Role para explorar" },
  experience: { en: "Experience", pt: "Experiência" },
  experienceSub: { en: "My professional journey", pt: "Minha trajetória profissional" },
  stackSub: { en: "The ecosystem I build with", pt: "O ecossistema com que construo" },
  projectsSub: {
    en: "Products and automation systems built to solve real operational problems.",
    pt: "Produtos e automações criados para resolver problemas operacionais reais.",
  },
  aboutSub: { en: "Who is behind the code", pt: "Quem está por trás do código" },
  aboutStatement: {
    en: "I turn complex operations into reliable software.",
    pt: "Transformo operações complexas em software confiável.",
  },
  aboutBody1: {
    en: "I'm a PHP Software Engineer with 4+ years of Full Stack experience, specializing in Laravel, REST APIs, scalable architecture and complex e-commerce and ERP integrations.",
    pt: "Sou Engenheiro de Software PHP com mais de 4 anos de experiência Full Stack, especializado em Laravel, APIs REST, arquitetura escalável e integrações complexas com e-commerce e ERP.",
  },
  aboutBody2: {
    en: "I work autonomously from requirements and architecture through production delivery, combining technical leadership, direct client communication, performance work and practical AI automation.",
    pt: "Atuo com autonomia do levantamento e arquitetura à produção, combinando liderança técnica, comunicação direta com clientes, performance e automações práticas com IA.",
  },
  contactQuestion: {
    en: "Have a project, opportunity or complex problem to solve?",
    pt: "Tem um projeto, oportunidade ou problema complexo para resolver?",
  },
  letsTalk: { en: "Let's talk", pt: "Vamos conversar" },
};
