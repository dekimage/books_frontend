import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Idea } from "./Idea";
import { useGetBookFavorites, useGetMyBookIdeas } from "@/api/fetchers";

export default function IdeasTabContent({ bookId, ideas, myTab, setMyTab }) {
  const {
    data: myIdeas,
    loading: myIdeasLoading,
    error: myIdeasError,
  } = useGetMyBookIdeas(bookId);

  const {
    data: favoriteIdeas,
    loading: favIdeasLoading,
    error: favIdeasError,
  } = useGetBookFavorites(bookId);

  const isLiked = (idea) => favoriteIdeas.some((item) => item.id === idea.id);

  return (
    <TabsContent value="ideas">
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="w-full my-6">
          <TabsTrigger
            className="w-full"
            value="All"
            onClick={() => setMyTab("All")}
          >
            ALL ({ideas.length})
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="My"
            onClick={() => setMyTab("My")}
          >
            MY ({myIdeas.length})
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="Saved"
            onClick={() => setMyTab("Saved")}
          >
            SAVED ({favoriteIdeas.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {myTab == "All" && (
        <div className="flex flex-wrap">
          {ideas.map((idea, i) => {
            return (
              <Idea i={i} idea={{ ...idea, liked: isLiked(idea) }} key={i} />
            );
          })}
        </div>
      )}

      {myTab == "My" && (
        <div className="flex flex-wrap">
          {myIdeas.map((idea, i) => {
            return (
              <Idea i={i} idea={{ ...idea, liked: isLiked(idea) }} key={i} />
            );
          })}
        </div>
      )}

      {myTab == "Saved" && (
        <div className="flex flex-wrap">
          {favoriteIdeas.map((idea, i) => {
            return <Idea i={i} idea={{ ...idea, liked: true }} key={i} />;
          })}
        </div>
      )}
    </TabsContent>
  );
}
