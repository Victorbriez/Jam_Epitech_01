"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Calendar, Info, Loader2, RefreshCw } from "lucide-react";

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

async function getApod(): Promise<ApodData> {
  const response = await fetch("/api/apod");
  if (!response.ok) {
    throw new Error("Failed to fetch APOD data");
  }
  return response.json();
}

export default function PictureOfTheDayPage() {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const fetchApodData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getApod();
      setApodData(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApodData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <Card className="max-w-4xl mx-auto bg-gray-800 text-white shadow-xl overflow-hidden">
        <CardHeader className="text-center bg-gray-700 py-6">
          <CardTitle className="text-3xl sm:text-4xl font-bold mb-2">
            Image Astronomique du Jour
          </CardTitle>
          <CardDescription className="text-gray-300">
            Découvrez l'univers à travers les yeux de la NASA
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : apodData ? (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                {imageLoading && (
                  <Skeleton className="absolute inset-0 bg-gray-700" />
                )}
                {apodData.media_type === "image" ? (
                  <Image
                    src={apodData.url}
                    alt={apodData.title}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                ) : apodData.media_type === "video" ? (
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    allowFullScreen
                    className="w-full h-full"
                    onLoad={() => setImageLoading(false)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-700 text-gray-300">
                    Média non pris en charge
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {apodData.title}
                </h2>
                <div className="flex items-center text-gray-400 mb-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    {new Date(apodData.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  {apodData.explanation}
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>
        {apodData && (
          <CardFooter className="bg-gray-700 py-3 flex justify-between items-center">
            <p className="text-sm text-gray-400">
              {apodData.copyright
                ? `© ${apodData.copyright}`
                : "Image credit: NASA"}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchApodData}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Rafraîchir
            </Button>
          </CardFooter>
        )}
      </Card>
      <div className="mt-6 text-center">
        <a
          href="https://apod.nasa.gov/apod/astropix.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <Info className="mr-2 h-4 w-4" />
          En savoir plus sur APOD
        </a>
      </div>
    </div>
  );
}
