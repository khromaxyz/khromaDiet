import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.04)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
      <SliderPrimitive.Range className="absolute h-full bg-[linear-gradient(90deg,var(--accent-primary),var(--accent-primary-bright))]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-[rgba(255,255,255,0.75)] bg-[var(--bg-card)] shadow-[0_8px_20px_rgba(0,0,0,0.35),0_0_0_6px_rgba(16,185,129,0.12)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
