"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ApodData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

interface ApodImageProps {
  data: ApodData;
}

export function ApodImage({ data }: ApodImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video">
          {isLoading && <Skeleton className="absolute inset-0 rounded-md" />}
          <Image
            src={data.url}
            alt={data.title}
            fill
            className={`object-cover rounded-md transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setIsError(true);
            }}
          />
          {isError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                Failed to load image
              </p>
            </div>
          )}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{data.explanation}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {data.copyright ? `© ${data.copyright}` : "Image credit: NASA"}
        </p>
      </CardFooter>
    </Card>
  );
}
