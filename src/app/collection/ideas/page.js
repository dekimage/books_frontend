"use client";
import { useGetAllMyIdeas } from "@/api/fetchers";
import { Idea } from "@/app/book/[id]/Idea";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlinePlus } from "react-icons/ai";

const IdeasMapper = ({ ideas }) => {
  return (
    <div>
      {ideas.map((idea, i) => (
        <Idea key={idea.id} idea={idea} i={i} />
      ))}
    </div>
  );
};

export default function CollectionIdeasPage() {
  const { data, loading, error } = useGetAllMyIdeas();
  return (
    <SettingsHeader title="Ideas" description="Manage all ideas in one place">
      <Tabs defaultValue="liked" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="liked" className="relative">
              Liked
            </TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <div className="ml-auto mr-4">
            <Button>
              <AiOutlinePlus className="mr-2 h-4 w-4" />
              Create Idea
            </Button>
          </div>
        </div>
        <TabsContent value="liked" className="border-none p-0 outline-none">
          {data && <IdeasMapper ideas={data} />}
        </TabsContent>
        <TabsContent value="saved" className="border-none p-0 outline-none">
          {/* <BookMapper /> */}
        </TabsContent>
      </Tabs>
    </SettingsHeader>
  );
}
