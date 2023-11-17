// import { Separator } from "@/registry/new-york/ui/separator"
// "use client";
import { ProfileForm } from "@/components/settings/ProfileForm";

const SettingsProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
};

export default SettingsProfilePage;
