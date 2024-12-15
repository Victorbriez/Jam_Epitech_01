"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";

interface Planet {
  id: string;
  englishName: string;
  isPlanet: boolean;
  gravity: number;
}

export default function PlanetesPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.le-systeme-solaire.net/rest/bodies/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch planets data");
      }
      const data = await response.json();

      // Filtrer uniquement les planètes
      const filteredPlanets = data.bodies.filter(
        (body: Planet) => body.isPlanet
      );
      setPlanets(filteredPlanets);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      setError(
        "Impossible de charger les données des planètes. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            Les Planètes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Explorez les planètes de notre système solaire et découvrez leurs
            caractéristiques uniques.
          </p>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(8)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-8 w-3/4 mx-auto" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planets.map((planet) => (
            <Card
              key={planet.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  <Link
                    href={`/planetes/${planet.id}`}
                    className="hover:underline"
                  >
                    {planet.englishName}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Gravité : {planet.gravity.toFixed(2)} m/s²
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button onClick={fetchPlanets} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Rafraîchir les données
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
