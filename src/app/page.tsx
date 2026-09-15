import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MyHr } from "@/components/MyHr";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Skills } from "@/components/Skills";
import { Ticker } from "@/components/Ticker";
import { Work } from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Work />
        <MyHr />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
