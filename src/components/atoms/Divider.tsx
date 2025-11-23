interface DividerProps {
  label?: string;
  className?: string;
  lineClass?: string;
}

export default function Divider({ label, className = '', lineClass }: DividerProps) {
  if (!label) {
    return <div className={`w-full h-px bg-smoke ${className}`} />;
  }

  return (
    <div className={`flex items-center gap-4 text-mist text-sm ${className}`}>
      <div className={`flex-1 h-px bg-mist ${lineClass}`} />
      <span className="whitespace-nowrap">{label}</span>
      <div className={`flex-1 h-px bg-mist ${lineClass}`} />
    </div>
  );
}
