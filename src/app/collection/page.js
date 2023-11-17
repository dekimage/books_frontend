"use client";
import { useGetMyFavoriteBooks } from "@/api/fetchers";
import BookCard from "@/components/books/BookCard";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlinePlus } from "react-icons/ai";

const BookMapper = ({ books }) => {
  return (
    <div>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default function CollectionBooksPage() {
  const { data, loading, error } = useGetMyFavoriteBooks();

  return (
    <SettingsHeader title="Books" description="Manage all books in one place">
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
              Add Book
            </Button>
          </div>
        </div>
        <TabsContent value="liked" className="border-none p-0 outline-none">
          <BookMapper books={data} />
        </TabsContent>
        <TabsContent value="saved" className="border-none p-0 outline-none">
          {/* <BookMapper /> */}
        </TabsContent>
      </Tabs>
    </SettingsHeader>
  );
}
