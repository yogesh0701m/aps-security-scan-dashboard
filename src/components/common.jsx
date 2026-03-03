export const Button = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = 'font-medium rounded-lg transition-all';
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button className={`${baseStyles} ${sizes[size]} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export const Badge = ({ children, variant = 'gray' }) => {
  const variants = {
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const Tab = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'border-b-2 border-teal-600 text-teal-600'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
};

export const Input = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`}
    />
  );
};
