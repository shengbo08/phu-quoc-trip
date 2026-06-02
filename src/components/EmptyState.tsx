interface EmptyStateProps {
  label?: string;
}

export function EmptyState({ label = '尚未填寫' }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-white/70 px-4 py-6 text-center text-sm text-stone-500">
      {label}
    </div>
  );
}
