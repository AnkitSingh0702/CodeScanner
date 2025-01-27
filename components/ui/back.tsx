"use client";

import { cn } from "@/lib/utils";
import GridPattern from "./grid-pattern";

export function Back() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#18181b] h-screen">
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
    </div>
  );
}
