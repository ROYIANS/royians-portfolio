import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "ROYIANS",
  lastName: "",
  name: `ROYIANS`,
  role: "Frontend Engineer",
  avatar: "/images/avatar.jpg",
  email: "royians@vidorra.life",
  location: "Asia/Shanghai", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["中文", "Español", "English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/ROYIANS",
    essential: true,
  },
  {
    name: "Bilibili",
    icon: "bilibili",
    link: "https://space.bilibili.com/32267413/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>用代码编织视觉诗意</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Print Template Designer</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/print-template-designer",
  },
  subline: (
    <>
    我是 <Text as="span" size="xl" weight="strong">ROYIANS</Text>，一名前端工程师，<br />在像素与代码之间寻找设计的诗意。
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        在代码与设计的交汇处，我寻找着诗意的表达。<br />
        君子不器，正道直行——这是我信奉的哲学，也是我对待技术与设计的态度。<br /><br />
        我相信，优秀的前端开发不仅仅是技术的堆砌，更是艺术的呈现。<br />
        每一行代码都是一笔，每一个组件都是一幅画。<br />
        我致力于在像素与逻辑之间，编织出优雅而富有诗意的用户体验。
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "React & Next.js",
        description: (
          <>使用 React 生态系统构建现代化的用户界面，通过 Next.js 实现服务端渲染和静态生成，打造极致的性能体验。</>
        ),
        tags: [
          {
            name: "React",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
        ],
        images: [],
      },
      {
        title: "TypeScript",
        description: (
          <>用类型系统守护代码的健壮性，在编译时发现潜在问题，让代码如诗般优雅而可靠。</>
        ),
        tags: [
          {
            name: "TypeScript",
            icon: "typescript",
          },
        ],
        images: [],
      },
      {
        title: "CSS & Styling",
        description: (
          <>精通 CSS Modules、SCSS、Tailwind CSS 等多种样式方案，用样式编织视觉的诗意。</>
        ),
        tags: [
          {
            name: "CSS",
            icon: "css",
          },
          {
            name: "SCSS",
            icon: "sass",
          },
        ],
        images: [],
      },
      {
        title: "UI/UX Design",
        description: (
          <>关注用户体验的每一个细节，用设计思维驱动开发，让技术服务于人。</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        images: [],
      },
      {
        title: "State Management",
        description: (
          <>熟练运用 Redux、Zustand、Context API 等状态管理方案，让数据流动如诗般流畅。</>
        ),
        tags: [
          {
            name: "Redux",
            icon: "redux",
          },
        ],
        images: [],
      },
      {
        title: "Build Tools",
        description: (
          <>掌握 Webpack、Vite、Turbopack 等构建工具，优化开发体验和生产性能。</>
        ),
        tags: [
          {
            name: "Webpack",
            icon: "webpack",
          },
          {
            name: "Vite",
            icon: "vite",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
