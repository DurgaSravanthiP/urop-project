import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Disclaimer from "../components/Disclaimer";
import { useAuth } from "../context/AuthContext";

const modalityCards = [
  {
    title: "Brain MRI",
    description: "Tumor / Normal",
  },
  {
    title: "Lung CT",
    description: "Cancerous / Non-Cancerous",
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const ctaPath = isAuthenticated ? "/analyze" : "/login";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-teal-700">
            AI-assisted research platform
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Multimodal Medical Diagnosis System
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            An AI-assisted image analysis system for research and educational
            purposes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to={ctaPath}>
              <Button className="px-8 py-3 text-base">Start Analysis</Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="secondary" className="px-8 py-3 text-base">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {modalityCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-3 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700">
                Medical imaging
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {card.title}
              </h2>
              <p className="mt-2 text-base text-slate-600">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Disclaimer />
        </div>
      </section>
    </div>
  );
}
