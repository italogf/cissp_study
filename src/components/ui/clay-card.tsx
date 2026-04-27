type ClayCardProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "surface" | "dashed" | "matcha" | "dark";
  size?: "md" | "lg";
};

export function ClayCard({
  children,
  className,
  tone = "surface",
  size = "md"
}: ClayCardProps) {
  const classes = [
    "clay-card",
    `clay-card--${tone}`,
    `clay-card--${size}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return <section className={classes}>{children}</section>;
}
