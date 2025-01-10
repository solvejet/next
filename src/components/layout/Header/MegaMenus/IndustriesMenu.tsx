import { MenuItem } from "@/types/navigation.types";
import { BaseMegaMenuItem } from "./BaseMegaMenu";

// src/components/layout/Header/MegaMenus/IndustriesMenu.tsx
export function IndustriesMenu({
  item,
  closeAll,
}: {
  item: MenuItem;
  closeAll: () => void;
}) {
  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
        {item.items?.map((subItem) => (
          <div key={subItem.title} className="group relative">
            <BaseMegaMenuItem {...subItem} onClick={closeAll} />
          </div>
        ))}
      </div>
    </div>
  );
}
