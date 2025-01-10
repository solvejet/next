import { MenuItem } from "@/config/navigation";
import { BaseMegaMenuItem } from "./BaseMegaMenu";

// src/components/layout/Header/MegaMenus/CompanyMenu.tsx
export function CompanyMenu({
  item,
  closeAll,
}: {
  item: MenuItem;
  closeAll: () => void;
}) {
  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
        {item.items?.map((subItem) => (
          <div key={subItem.title} className="group relative">
            <BaseMegaMenuItem {...subItem} onClick={closeAll} />
          </div>
        ))}
      </div>
    </div>
  );
}
