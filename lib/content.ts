export type ContentLink = {
  label: string;
  href: string;
};

export type ContentItem = {
  id: string;
  title: string;
  type?: string;
  description: string;
  topics: string[];
  links: ContentLink[];
  image?: string;
  imageLight?: string;
  imageDark?: string;
  featured?: boolean;
  year?: string;
};

export const publications: ContentItem[] = [
  {
    id: 'timex-paper',
    title: 'Time-explicit Life Cycle Assessment: A Flexible Framework for Coherent Consideration of Temporal Dynamics',
    type: 'Journal Paper',
    description:
      'We propose a time-explicit LCA framework that captures when processes and emissions occur, enabling dynamic assessments of evolving product systems.',
    topics: ['Journal Paper', 'Life Cycle Assessment', 'Time Dynamics'],
    links: [
      { label: 'Paper', href: 'https://link.springer.com/article/10.1007/s11367-025-02539-3' },
      { label: 'Code', href: 'https://github.com/brightway-lca/bw_timex/blob/main/notebooks/paper_case_study.ipynb' },
    ],
    featured: true,
    year: '2025',
  },
  {
    id: 'welding',
    title: 'DVS Focus Report: Sustainability in Welding Manufacturing',
    type: 'Focus Report',
    description:
      'Investigation on the state of sustainability considerations in welding manufacturing. By conducting Life Cycle Assessments on two representative welding parts, we identify the main drivers of environmental impacts in welding manufacturing and highlight opportunities for future improvements within the sector. Report available in German language only.',
    topics: ['Focus Report', 'Life Cycle Assessment', 'Case Study'],
    links: [
      { label: 'Report', href: 'https://publications.rwth-aachen.de/record/1011748' },
    ],
    featured: true,
    year: '2025',
  },  
  {
    id: 'timex-joss-paper',
    title: 'bw_timex: A Python Package for Time-explicit Life Cycle Assessment',
    type: 'Journal Paper',
    description:
      'We propose a time-explicit LCA framework that captures when processes and emissions occur, enabling dynamic assessments of evolving product systems.',
    topics: ['Journal Paper', 'Life Cycle Assessment'],
    links: [
      { label: 'Paper', href: 'https://joss.theoj.org/papers/10.21105/joss.09621' },
      { label: 'Package', href: 'https://github.com/brightway-lca/bw_timex?tab=readme-ov-file' },
    ],
    featured: false,
    year: '2026',
  },
];

export const presentations: ContentItem[] = [
  {
    id: "timex-workshop-brightcon-2025",
    title: "Time-explicit LCA with bw_timex",
    type: "Advanced Teaching Course · BrightCon Conference (Grenoble, FR)",
    description:
      "Workshop on time-explicit LCA and hands-on session with bw_timex, our time-explicit LCA python package based on Brightway",
    topics: ["Teaching", "Life Cycle Assessment"],
    links: [
      { label: "Material", href: "https://github.com/Depart-de-Sentier/brightcon-2025-material/tree/main/courses/advanced/bw_timex" },
    ],
    featured: false,
    year: '2025',
  },
  {
    id: "ieday-2024",
    title: "What year is it? Navigating time in LCA",
    type: "Session · Industrial Ecology Day (Online)",
    description:
      "We chaired a session on temporal aspects of Life Cycle Assessment, discussing recent advances and open challenges.",
    topics: ["Session", "Life Cycle Assessment"],
    links: [
      { label: "Recording", href: "https://www.youtube.com/watch?v=H2oPMH1mPFM" },
      { label: "Slides", href: "https://zenodo.org/records/14198448" },
      { label: "Event", href: "https://is4ie.org/events/event/international-industrial-ecology-day-2024" },
    ],
    imageLight: "/teasers/ieday_logo.png",
    imageDark: "/teasers/ieday_logo.png",
    featured: false,
    year: '2024',
  },
  {
    id: "brightcon-2024",
    title: "Time-explicit LCA with bw_timex",
    type: "Conference Workshop · BrightCon Conference (Hamburg, DE)",
    description:
      "Presenting the concept of time-explicit LCA and showcasing bw_timex, our time-explicit LCA python package based on Brightway",
    topics: ["Conference Presentation", "Life Cycle Assessment"],
    links: [
      {
        label: "Recording",
        href: "https://www.youtube.com/watch?v=5ksD0_f3fiA&t=1539s",
      },
      {
        label: "Slides",
        href: "https://github.com/Depart-de-Sentier/brightcon-2024-material/blob/main/talks/Thursday/bw_timex/0_bw_timex_presentation.pdf",
      },
      {
        label: "Further Material",
        href: "https://github.com/Depart-de-Sentier/brightcon-2024-material/tree/main/talks/Thursday/bw_timex",
      },
      { label: "Event", href: "https://2024.brightcon.link" },
    ],
    imageLight: "/teasers/brightcon.png",
    imageDark: "/teasers/brightcon.png",
    featured: true,
    year: '2024',
  },
  {
    id: "isie-2025",
    title: "Optimizing Transition Pathways using Time-Explicit Life Cycle Assessment",
    type: "Conference Presentation · ISIE25 (Singapore)",
    description: "Conference Presentation on the new tool optimex for transition pathway optimization based on time-explicit LCA.",
    topics: ["Conference Presentation", "Optimization", "Life Cycle Assessment"],
    links: [
      { label: "Abstract", href: "https://isie2025.exordo.com/programme/presentation/372" },
      { label: "Slides", href: "https://publications.rwth-aachen.de/record/1015673/files/1015673.pdf" },
    ],
    imageLight: "/teasers/isie25.png",
    imageDark: "/teasers/isie25.png",
    featured: true,
    year: '2025',
  },
  {
    id: "timex-setac",
    title: "Dynamic-Prospective Life Cycle Assessment using Time-Explicit Life Cycle Inventory: Methodology and Implementation",
    type: "Poster Presentation · SETAC Europe Annual Meeting (Seville, ES)",
    description: "Poster presenting the background of dynamic-prospective LCA and its implementation in the bw_timex software package.",
    topics: ["Poster Presentation", "Life Cycle Assessment"],
    links: [
      { label: "Abstract", href: "https://setac.confex.com/setac/europe2024/meetingapp.cgi/Paper/22593" },
    ],
    featured: false,
    year: '2024',
  },
];

export const codingProjects: ContentItem[] = [
  {
    id: 'bw_timex',
    title: 'bw_timex · Time-explicit Life Cycle Assessment Framework',
    type: 'Python Package',
    description:
      'Assess environmental impacts considering the temporal distribution and temporal evolution of processes and their supply chains.',
    topics: ['Brightway'],
    links: [
      { label: 'Repository', href: 'https://github.com/brightway-lca/bw_timex' },
      { label: 'Documentation', href: 'https://docs.brightway.dev/projects/bw-timex/en/latest/' },
    ],
    imageLight: '/teasers/bw_timex_light_rtd.svg',
    imageDark: '/teasers/bw_timex_dark_rtd.svg',
    featured: true,
  },
  {
    id: 'optimex',
    title: 'optimex  · Time-explicit Transition Pathway Optimization',
    type: 'Python Package',
    description:
      'Opinionated infrastructure templates that standardize experiment tracking, evaluation, and rollout for ML teams.',
    topics: ['Brightway', 'Optimization'],
    links: [
      { label: 'Repository', href: 'https://github.com/TimoDiepers/optimex' },
      { label: 'Documentation', href: 'https://optimex.readthedocs.io/en/latest/' },
    ],
    imageLight: '/teasers/optimex_light_rtd.svg',
    imageDark: '/teasers/optimex_dark_rtd.svg',
    featured: true,
  },
  {
    id: 'dynamic-characterization',
    title: 'dynamic_characterization · Functions for dynamic LCIA',
    type: 'Python Package',
    description: 'Functions for dynamic characterization of life cycle inventories with temporal information.',
    topics: ['Brightway', 'Dynamic LCIA'],
    links: [
      { label: 'Repository', href: 'https://github.com/brightway-lca/dynamic_characterization' },
      { label: 'Documentation', href: 'https://dynamic-characterization.readthedocs.io/en/latest/' },
    ],
    featured: false,
  },
  {
    id: 'timex-app',
    title: 'bw_timex_app · Streamlit WebApp for Time-explicit LCA',
    type: 'Web App',
    description: 'A streamlit web application for performing time-explicit life cycle assessments using bw_timex.',
    topics: ['Brightway', 'WebApp', 'Time Dynamics'],
    links: [
      { label: 'Repository', href: 'https://github.com/TimoDiepers/bw_timex_app' },
      { label: 'WebApp', href: 'https://bw-timex.streamlit.app/' },
    ],
    featured: false,
  },
  {
    id: 'grid-expansion-impacts',
    title: 'grid-expansion-impacts · Demo · Interactive Visualization of Grid Expansion Impacts',
    type: 'Website Demo',
    description: 'A static website for scroll-based visualization of the impacts of electricity grid expansion.',
    topics: ['Website', 'Case Study'],
    links: [
      { label: 'Repository', href: 'https://github.com/TimoDiepers/grid-expansion-impacts' },
      { label: 'Website', href: 'https://timodiepers.github.io/grid-expansion-impacts/' },
    ],
    featured: false,
  },   
  {
    id: 'portfolio-website',
    title: 'Personal Website · Source Code of this Website',
    type: 'Website',
    description: 'The source code for my personal portfolio website.',
    topics: ['Website'],
    links: [
      { label: 'Repository', href: 'https://github.com/TimoDiepers/nextjs-portfolio' },
    ],
    featured: false,
  },
];
