"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";

interface Planet {
  id: string;
  englishName: string;
  isPlanet: boolean;
  gravity: number;
  meanRadius: number;
  semimajorAxis: number;
  mass: { massValue: number; massExponent: number };
  sideralOrbit: number;
}

export default function PlanetDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchPlanet() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.le-systeme-solaire.net/rest/bodies/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch planet data");
        }
        const data = await response.json();
        setPlanet(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setError(
          "Impossible de charger les données de la planète. Veuillez réessayer."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlanet();
  }, [id]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR").format(num);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux planètes
      </Button>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-12 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-6 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : planet ? (
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-6xl font-extrabold text-center mb-4">
              {planet.englishName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetInfoCard title="Caractéristiques physiques">
                <InfoItem
                  label="Gravité"
                  value={`${planet.gravity.toFixed(2)} m/s²`}
                />
                <InfoItem
                  label="Rayon moyen"
                  value={`${formatNumber(planet.meanRadius)} km`}
                />
                <InfoItem
                  label="Masse"
                  value={`${planet.mass.massValue.toFixed(2)} × 10^${
                    planet.mass.massExponent
                  } kg`}
                />
              </PlanetInfoCard>
              <PlanetInfoCard title="Caractéristiques orbitales">
                <InfoItem
                  label="Distance au Soleil"
                  value={`${formatNumber(planet.semimajorAxis)} km`}
                />
                <InfoItem
                  label="Durée de l'orbite"
                  value={`${formatNumber(planet.sideralOrbit)} jours`}
                />
              </PlanetInfoCard>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>Planète introuvable.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

function PlanetInfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">{children}</ul>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between">
      <span className="text-gray-400">{label}:</span>
      <span className="font-semibold">{value}</span>
    </li>
  );
}
