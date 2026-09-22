export default function HowItWorksPage() {
  const steps = [
    "User",
    "Upload Medical Image",
    "React Frontend",
    "Node.js + Express Backend",
    "Python ML Service",
    "EfficientNetB0 Model",
    "Prediction + Confidence",
    "MongoDB",
    "Result + History",
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Workflow
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          How the system works
        </h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center justify-center gap-3 text-center"
          >
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              {step}
            </div>
            {index < steps.length - 1 && (
              <span className="text-xl text-slate-400">↓</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
        <p className="leading-7">
          A user uploads a medical image in the React frontend. The image is
          sent to the Node.js + Express backend, which runs the correct Python
          prediction file. That Python service loads the trained EfficientNetB0
          model, processes the uploaded image, and returns a prediction with a
          confidence score. The result is then stored in MongoDB so the user can
          review the outcome and access their analysis history.
        </p>
      </div>
    </div>
  );
}
