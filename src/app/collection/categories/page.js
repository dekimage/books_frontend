"use client";
import CategoryBadge from "@/components/categories/CategoryBadge";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { useAuth } from "@/context/auth";

export default function CollectionCategoriesPage() {
  const { user } = useAuth();

  return (
    <SettingsHeader
      title="Categories"
      description="Manage the categories you are interested in"
    >
      <div>
        {user.interests.map((c) => (
          <CategoryBadge key={c.id} category={c} />
        ))}
      </div>
    </SettingsHeader>
  );
}
