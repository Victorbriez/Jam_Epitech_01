"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGlobe, FaCameraRetro, FaRocket } from "react-icons/fa";

export default function HomePage() {
  useEffect(() => {
    const starryBackground = document.querySelector(".starry-background");
    if (starryBackground) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starryBackground.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black relative overflow-hidden flex justify-center items-center">
        <div className="starry-background absolute inset-0"></div>
        <div className="container px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
              Bienvenue dans notre{" "}
              <span className="text-primary">Système Solaire</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl lg:text-2xl">
              Explorez les merveilles de notre voisinage cosmique, des planètes
              rocheuses aux géantes gazeuses.
            </p>
            <motion.div
              className="space-x-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/planetes">
                <Button variant="outline" size="lg" className="text-lg">
                  Découvrir les Planètes
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            <FeaturedCard
              title="Planètes"
              description="Explorez les huit planètes de notre système solaire, de la rocheuse Mercure à la glaciale Neptune."
              icon={<FaGlobe className="text-6xl text-primary" />}
              link="/planetes"
            />
            <FeaturedCard
              title="Image du Jour"
              description="Découvrez une nouvelle image fascinante de l'espace chaque jour, fournie par la NASA."
              icon={<FaCameraRetro className="text-6xl text-primary" />}
              link="/picture-of-the-day"
            />
            <FeaturedCard
              title="À Propos"
              description="Apprenez-en plus sur notre projet et notre passion pour l'exploration spatiale."
              icon={<FaRocket className="text-6xl text-primary" />}
              link="/about"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground flex justify-center">
        <div className="container px-4 md:px-6 max-w-4xl text-center">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Prêt à explorer l'univers ?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl lg:text-2xl">
              Rejoignez-nous dans cette aventure cosmique et découvrez les
              secrets de notre système solaire.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/planetes">
                <Button variant="secondary" size="lg" className="text-lg">
                  Commencer l'Exploration
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center space-y-4 p-6 bg-card text-card-foreground rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl border border-border"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
        {icon}
      </div>

      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Link href={link}>
        <Button variant="outline" className="w-full">
          En savoir plus
        </Button>
      </Link>
    </motion.div>
  );
}
