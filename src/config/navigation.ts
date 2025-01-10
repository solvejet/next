// src/config/navigation.ts
export interface SubMenuItem {
  title: string;
  href: string;
}

export interface Section {
  title: string;
  items: SubMenuItem[];
}
export interface SubSection {
  title: string;
  items: SubMenuItem[];
}

export interface MenuItem {
  title: string;
  href: string;
  sections?: Section[];
  items?: SubMenuItem[];
}

export interface DesktopMenuItemProps {
  item: MenuItem;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  closeAll: () => void;
}

export const menuItems: MenuItem[] = [
  {
    title: "What We Do",
    href: "/what-we-do",
    sections: [
      {
        title: "Services",
        items: [
          {
            title: "Technology Consulting",
            href: "/services/technology-consulting",
          },
          {
            title: "Custom Software Engineering",
            href: "/services/custom-software",
          },
          { title: "MVP Development", href: "/services/mvp-development" },
          { title: "Team Augmentation", href: "/services/team-augmentation" },
        ],
      },
      {
        title: "Expertise",
        items: [
          { title: "Web", href: "/expertise/web" },
          { title: "Mobile", href: "/expertise/mobile" },
          { title: "Cloud", href: "/expertise/cloud" },
          { title: "AI & ML", href: "/expertise/ai-ml" },
          { title: "Blockchain", href: "/expertise/blockchain" },
          { title: "UI/UX", href: "/expertise/ui-ux" },
        ],
      },
    ],
  },
  {
    title: "Industries",
    href: "/industries",
    items: [
      { title: "Real Estate", href: "/industries/real-estate" },
      { title: "Ecommerce", href: "/industries/ecommerce" },
      { title: "eLearning", href: "/industries/elearning" },
      { title: "Logistics", href: "/industries/logistics" },
      { title: "Construction", href: "/industries/construction" },
    ],
  },
  {
    title: "Technologies",
    href: "/technologies",
    sections: [
      {
        title: "Front-end",
        items: [
          { title: "React", href: "/technologies/react" },
          { title: "Angular", href: "/technologies/angular" },
          { title: "Vue.js", href: "/technologies/vue" },
        ],
      },
      {
        title: "Backend",
        items: [
          { title: "Node.js", href: "/technologies/nodejs" },
          { title: "Python", href: "/technologies/python" },
          { title: "PHP", href: "/technologies/php" },
          { title: "Java", href: "/technologies/java" },
          { title: ".NET", href: "/technologies/dotnet" },
        ],
      },
      {
        title: "Mobile",
        items: [
          { title: "Android", href: "/technologies/android" },
          { title: "iOS", href: "/technologies/ios" },
          { title: "Swift", href: "/technologies/swift" },
          { title: "Kotlin", href: "/technologies/kotlin" },
          { title: "React Native", href: "/technologies/react-native" },
        ],
      },
      {
        title: "Cloud",
        items: [
          { title: "AWS", href: "/technologies/aws" },
          { title: "Azure", href: "/technologies/azure" },
          { title: "GCP", href: "/technologies/gcp" },
        ],
      },
    ],
  },
  {
    title: "Company",
    href: "/company",
    items: [
      { title: "About Us", href: "/about" },
      { title: "Vendor Partnership", href: "/vendor-partnership" },
      { title: "Sales Partnership", href: "/sales-partnership" },
      { title: "Blogs", href: "/blogs" },
      { title: "Career", href: "/career" },
    ],
  },
];
