// src/components/layout/Header/MegaMenus/BaseMegaMenu.tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SubMenuItem } from "@/types/navigation.types";
import { cn } from "@/lib/utils";

export const menuVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

interface BaseMegaMenuItemProps extends SubMenuItem {
  onClick?: () => void;
}

export const BaseMegaMenuItem = ({
  href,
  title,
  description,
  onClick,
}: BaseMegaMenuItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="group flex flex-col p-3 rounded-lg transition-colors duration-200"
  >
    <div className="flex items-center justify-between">
      <span
        className={cn(
          "text-base font-medium text-foreground",
          "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
          "after:origin-left after:scale-x-0 after:bg-primary",
          "after:transition-transform after:duration-300 after:ease-out",
          "group-hover:after:scale-x-100"
        )}
      >
        {title}
      </span>
      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
    </div>
    {description && (
      <span className="text-sm text-muted-foreground mt-1">{description}</span>
    )}
  </Link>
);
