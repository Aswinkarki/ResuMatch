interface AlertProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive";
}

export function Alert({ children, className = "", variant = "default" }: AlertProps) {
  const variantClasses =
    variant === "destructive"
      ? "bg-red-100 border-red-500 text-red-700"
      : "bg-green-100 border-green-500 text-green-700";

  return (
    <div className={`border-l-4 p-4 ${variantClasses} ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function AlertDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>;
}