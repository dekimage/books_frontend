import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Idea } from "./Idea";
import { useGetBookFavorites, useGetMyBookIdeas } from "@/api/fetchers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function IdeasTabContent({ bookId, ideas, myTab, setMyTab }) {
  const {
    data: savedIdeas,
    loading: favIdeasLoading,
    error: favIdeasError,
  } = useGetBookFavorites(bookId);

  const likedIdeas = [];

  const isSaved = (idea) => savedIdeas.some((item) => item.id === idea.id);
  const isLiked = (idea) => likedIdeas.some((item) => item.id === idea.id);

  return (
    <div>
      <div className="flex space-between items-center">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="my-4">
            <TabsTrigger
              className="w-1/2"
              value="All"
              onClick={() => setMyTab("All")}
            >
              Explore ({ideas.length})
            </TabsTrigger>
            <TabsTrigger
              className="w-1/2"
              value="Saved"
              onClick={() => setMyTab("Saved")}
            >
              Saved ({savedIdeas.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">By Likes</SelectItem>
              <SelectItem value="banana">By Saves</SelectItem>
              <SelectItem value="blueberry">By Shares</SelectItem>
              <SelectItem value="grapes">Newest</SelectItem>
              <SelectItem value="pineapple">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col">
        {myTab === "All" &&
          ideas.map((idea, i) => (
            <Idea
              i={i}
              idea={{ ...idea, saved: isSaved(idea), liked: isLiked(idea) }}
              key={i}
            />
          ))}

        {myTab === "Saved" &&
          savedIdeas.map((idea, i) => (
            <Idea
              i={i}
              idea={{ ...idea, saved: true, liked: isLiked(idea) }}
              key={i}
            />
          ))}
      </div>
    </div>
  );
}
