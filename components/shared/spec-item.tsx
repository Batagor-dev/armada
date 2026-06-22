type SpecItemProps = {
  icon: string;
  title: string;
  value: string | number;
};

export default function SpecItem({
  icon,
  title,
  value,
}: SpecItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-primary/30 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <span className="material-symbols-outlined text-primary">
        {icon}
      </span>

      <p className="mt-2 text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-1 font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}