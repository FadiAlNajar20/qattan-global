import { clsx } from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  narrow?: boolean;
  wide?: boolean;
}

export default function Container({
  children,
  className,
  as: Tag = "div",
  narrow,
  wide,
}: Props) {
  return (
    <Tag
      className={clsx(
        "container-qg",
        narrow && "max-w-3xl",
        wide && "max-w-[1440px]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
