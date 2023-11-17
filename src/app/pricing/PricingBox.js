import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";

export const PricingBox = ({ data, isAuthenticated }) => {
  return (
    <Card className="lg:w-1/3 md:w-1/2 ">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold">
            {data.price}
          </h2>
          <div className="text-md font-semibold">Per Month</div>
        </div>

        <div className="text-sm font-semibold">Features:</div>
        <div>
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
            >
              {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
              <GiCheckMark />
              <div className="space-y-1">
                <p className="text-sm  leading-none">{feature}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {isAuthenticated ? (
          <>
            {data.title === "Pro" ? (
              <Button className="w-full">Upgrade to Pro</Button>
            ) : (
              <Button variant="outline" disabled className="w-full">
                Active Plan
              </Button>
            )}
          </>
        ) : (
          <div className="w-full">
            <Link href="/signup">
              <Button className="w-full">{data.cta}</Button>
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
