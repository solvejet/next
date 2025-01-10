// src/types/navigation.types.ts
export interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
}

export interface Section {
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
