function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  icon,
}) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary: "text-white shadow-sm hover:opacity-90",
    danger:  "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-gray-200 text-gray-600 hover:bg-gray-50",
    ghost:   "text-gray-500 hover:bg-gray-100 hover:text-gray-800",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-sm px-6 py-3",
  };

  const primaryStyle = variant === "primary"
    ? { backgroundColor: "#002c2f" }
    : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={primaryStyle}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;