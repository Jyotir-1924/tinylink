export default function ProfileStats({
  total,
  active,
  expired,
  clicks,
}: {
  total: number;
  active: number;
  expired: number;
  clicks: number;
}) {
  const Stat = ({ label, value }: { label: string; value: number }) => (
    <div className="rounded-xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,255,180,0.08)]">
      <p className="text-sm text-white/60 mb-1">{label}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <Stat label="Total Links" value={total} />
      <Stat label="Active Links" value={active} />
      <Stat label="Expired Links" value={expired} />
      <Stat label="Total Clicks" value={clicks} />
    </div>
  );
}
