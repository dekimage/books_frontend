export default function SettingsHeader({ title, description, children }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div>{children}</div>
    </div>
  );
}
