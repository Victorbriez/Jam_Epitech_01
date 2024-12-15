import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Star, Users, Trophy } from "lucide-react";

export default function AProposPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center">
        À propos de la JAM Epitech :
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Rocket className="mr-2" />
            L'événement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            La JAM Epitech sur le thème de l'espace est un événement où des
            étudiants collaborent pour créer des projets autour de l'exploration
            spatiale. Pendant 72 heures, les participants travaillent en équipe
            pour développer des solutions innovantes qui combinent créativité et
            technologie.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2" />
            Les défis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Intégrer un élément de Noël dans un projet interactif lié à
              l'espace
            </li>
            <li>
              Simuler un effet de gravité zéro dans une application ou un jeu
            </li>
            <li>
              Développer une fonctionnalité déclenchée par la touche espace
            </li>
            <li>
              Faire un groupe inter-promo pour pouvoir partager les
              connaissances
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2" />
            Idées de projets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Simulateur de gravité zéro de Noël</CardTitle>
                <CardDescription>
                  Une interacion avec la touche espace pour faire apparaitre des
                  cadeaux en effet de gravité zéro
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Explorateur du système solaire</CardTitle>
                <CardDescription>
                  Une page ou l'on peut explorer les planètes du système solaire
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Image du Jour</CardTitle>
                <CardDescription>
                  Une page qui affiche une image de l'espace différente chaque
                  jour avec un petit texte explicatif
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>A propos</CardTitle>
                <CardDescription>
                  Une page qui explique le but de la JAM et présente les membres
                  de l'équipe
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2" />
            Notre équipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Notre groupe est composé de 5 étudiants motivés qui participent à la
            JAM Epitech :
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Badge className="mr-2">Membre 1</Badge>
              Remi Deroussent
            </li>
            <li className="flex items-center">
              <Badge className="mr-2">Membre 2</Badge>
              Mathys Dupont
            </li>
            <li className="flex items-center">
              <Badge className="mr-2">Membre 3</Badge>
              Victor Briez
            </li>
            <li className="flex items-center">
              <Badge className="mr-2">Membre 4</Badge>
              Mathilde Lekens
            </li>
            <li className="flex items-center">
              <Badge className="mr-2">Membre 5</Badge>
              Emmanuel Picaud
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
