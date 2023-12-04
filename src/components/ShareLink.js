import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CopyIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FaShare } from "react-icons/fa6";

export function ShareLink({ id }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FaShare /> <div className="ml-1">Share</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="min-w-[350px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share Reflection</h3>
          <p className="text-sm text-muted-foreground">
            Anyone with this link can access it
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`https://localhost:3000/book/${id}`}
              readOnly
              className="h-9"
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
