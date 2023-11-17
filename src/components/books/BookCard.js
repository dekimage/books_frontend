import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { baseUrl } from "@/app/utils/url";
import CategoryBadge from "../categories/CategoryBadge";

const BookCard = ({ book }) => {
  const { title, author, description, image, category, id } = book;

  return (
    <Link href={`/book/${id}`}>
      <Card className="m-4 p-y-4 w-80 cursor-pointer">
        <div className="flex justify-center items-center p-6 pb-0">
          <Image
            src={`${baseUrl}${image.url}`}
            alt={title}
            height={100}
            width={100}
          />
        </div>

        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{author}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <CategoryBadge category={category} /> */}
          {/* <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {description}
          </p> */}
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button className="w-full">Read</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default BookCard;
