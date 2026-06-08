import { Routes, Route } from "react-router-dom";
import { ThreeBackground } from "@/components/portfolio/ThreeBackground";
import { HomePage } from "@/pages/HomePage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";

export default function App() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <ThreeBackground />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </main>
  );
}
