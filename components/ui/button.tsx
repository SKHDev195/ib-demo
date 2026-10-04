import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "dashed";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: IconName;
  iconRight?: IconName;
  fullWidth?: boolean;
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: undefined };
type LinkButtonProps = CommonProps & { href: string };

const variants: Record<Variant, string> = {
  primary: "bg-brand-green-strong text-white hover:bg-[#056a30]",
  secondary: "border border-line bg-surface text-ink hover:bg-canvas",
  dashed: "border border-dashed border-line bg-canvas text-ink hover:bg-surface rounded-[10px]",
};

const sizes: Record<Size, string> = {
  sm: "gap-1 px-3 py-1.5 text-xs",
  md: "gap-2 px-[18px] py-2.5 text-sm",
  lg: "gap-2 px-5 py-3 text-sm",
};

const iconSizes: Record<Size, number> = { sm: 13, md: 16, lg: 16 };

/** Classes for the button look; also used for non-interactive, button-styled labels. */
export function classesFor({ variant = "secondary", size = "md", fullWidth, className }: CommonProps) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-deep",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variant !== "dashed" && "rounded-full",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

function Content({ children, iconLeft, iconRight, size = "md" }: CommonProps) {
  return (
    <>
      {iconLeft && <Icon name={iconLeft} size={iconSizes[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSizes[size]} />}
    </>
  );
}

/** CXM pill button. Renders a Next.js Link when `href` is given. */
export function Button(props: ButtonProps | LinkButtonProps) {
  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classesFor(props)}>
        <Content {...props} />
      </Link>
    );
  }
  const { variant, size, iconLeft, iconRight, fullWidth, className, children, type = "button", ...rest } = props;
  const common = { variant, size, iconLeft, iconRight, fullWidth, className, children };
  return (
    <button type={type} className={classesFor(common)} {...rest}>
      <Content {...common} />
    </button>
  );
}
