import { MenuItem } from "@/types/navigation.types";
import { BaseMegaMenuItem } from "./BaseMegaMenu";

// src/components/layout/Header/MegaMenus/TechnologiesMenu.tsx
export function TechnologiesMenu({
  item,
  closeAll,
}: {
  item: MenuItem;
  closeAll: () => void;
}) {
  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-4 gap-8">
        {item.sections?.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <div className="grid gap-2">
              {section.items.map((subItem) => (
                <BaseMegaMenuItem
                  key={subItem.title}
                  {...subItem}
                  onClick={closeAll}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
