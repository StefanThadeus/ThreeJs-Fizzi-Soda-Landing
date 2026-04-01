import { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export function Bounded({ className, children, ...restProps }: BoundedProps) {
  return (
    <section
      className={clsx(
        "px-6 py-[clamp(2.5rem,5vw,4rem)] [.header+&]:pt-44 [.header+&]:md:pt-32",
        className,
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
