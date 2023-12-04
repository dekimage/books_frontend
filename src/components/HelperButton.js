import Markdown from "react-markdown";
import { Button } from "./ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { FaQuestionCircle } from "react-icons/fa";

export function HelperButton({ title, content, buttonText }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FaQuestionCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="min-w-[350px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            <Markdown>{content}</Markdown>
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Button type="submit" size="sm" className="px-3">
            {buttonText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
