import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-semibold">
            Houston, nous avons un problème
          </h2>
          <p className="text-gray-400">
            La page que vous recherchez semble s'être perdue dans l'espace.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Retour à la base</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
