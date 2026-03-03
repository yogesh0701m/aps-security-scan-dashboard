// Reusable severity badge component
export const SeverityBadge = ({ severity }) => {
  const colorMap = {
    Critical: "bg-red-500",
    High: "bg-orange-400",
    Medium: "bg-yellow-400",
    Low: "bg-green-500"
  };

  return (
    <span className={`${colorMap[severity] || "bg-gray-500"} text-white text-xs font-bold px-2 py-1 rounded`}>
      {severity}
    </span>
  );
};

// Reusable status chip component
export const StatusChip = ({ status }) => {
  const statusStyles = {
    Completed: "bg-green-100 text-green-700",
    Scheduled: "bg-blue-100 text-blue-700",
    Failed: "bg-red-100 text-red-600"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

// Reusable button component
export const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const baseStyles = "font-medium transition-all rounded-md";
  
  const variants = {
    primary: "bg-teal-500 text-white hover:opacity-95 active:scale-95",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "text-red-600 border border-red-300 hover:bg-red-50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
