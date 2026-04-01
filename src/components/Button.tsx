import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  link: string;
  text: string;
  className?: string;
};

export const Button: FC<Props> = ({ link, text, className }) => (
  <Link
    href={link}
    className={clsx(
      "rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700",
      className,
    )}
  >
    {text}
  </Link>
);
