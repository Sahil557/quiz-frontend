"use client";

import { useState, useEffect } from "react";
import { Button } from "../atoms";
import type { IconName } from "../atoms/Icon";

type Tab = {
  label: string;
  content: React.ReactNode;
  icon?: IconName;
};

type TabsProps = {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
  onTabChange?: (index: number) => void;
};

export default function Tabs({
  tabs,
  defaultIndex = 0,
  className = "",
  onTabChange,
}: TabsProps) {
  const [active, setActive] = useState(defaultIndex);

  // 🔥 Fix: update active tab when defaultIndex changes
  useEffect(() => {
    setActive(defaultIndex);
  }, [defaultIndex]);

  const handleTabClick = (index: number) => {
    setActive(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className={className}>
      <div className="flex justify-center">
        <div className="flex gap-1 p-1 bg-mist rounded-full w-fit">
          {tabs.map((tab, i) => (
            <Button
              key={i}
              onClick={() => handleTabClick(i)}
              className={`
                py-1.5 rounded-full transition-all
                ${
                  active === i
                    ? "shadow-sm pointer-events-none"
                    : "bg-mist text-abyss hover:bg-silver"
                }
              `}
              text={tab.label}
              icon={tab.icon}
              iconSize={20}
            />
          ))}
        </div>
      </div>

      <div className="text-left mt-4">
        {tabs[active].content}
      </div>
    </div>
  );
}
