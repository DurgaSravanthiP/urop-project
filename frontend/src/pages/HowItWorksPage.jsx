const overall = [
  "Doctor",
  "Select MRI or CT",
  "Upload scan",
  "Preprocessing",
  "AI model",
  "Feature extraction",
  "Classification",
  "Prediction",
  "Save result",
  "History",
];
const pathway = (title, items) => (
  <section className="surface">
    <div className="surface-header">
      <div>
        <h3>{title}</h3>
        <p>Separate model pathways keep each modality explicit.</p>
      </div>
    </div>
    <div className="surface-body">
      <div className="workflow-grid">
        {items.map((item, index) => (
          <div className="workflow-step" key={item}>
            <em>0{index + 1}</em>
            <strong>{item}</strong>
            <p>
              {index === 0
                ? "Input scan"
                : index === items.length - 1
                  ? "Reviewable output"
                  : "Processing stage"}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="page-intro">
        <span className="eyebrow">System guide</span>
        <h2>How MediScan AI works</h2>
        <p>
          A simple, transparent workflow from scan selection to saved analysis
          history.
        </p>
      </div>
      <div className="space-y-5">
        <section className="surface">
          <div className="surface-header">
            <div>
              <h3>Overall workflow</h3>
              <p>Every case follows the same review sequence.</p>
            </div>
          </div>
          <div className="surface-body">
            <div className="workflow-grid">
              {overall.map((item, index) => (
                <div className="workflow-step" key={item}>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  <strong>{item}</strong>
                  <p>
                    {index === 0
                      ? "Doctor-led review"
                      : "Next stage in the case flow"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {pathway("Brain MRI workflow", [
          "MRI image",
          "Preprocessing",
          "CNN model",
          "Feature extraction",
          "Classification",
          "Brain prediction",
        ])}
        {pathway("Lung CT workflow", [
          "CT image",
          "Preprocessing",
          "CNN model",
          "Feature extraction",
          "Classification",
          "Lung prediction",
        ])}
        <section className="surface">
          <div className="surface-header">
            <div>
              <h3>Technology architecture</h3>
              <p>Planned service boundaries for the full system.</p>
            </div>
          </div>
          <div className="surface-body">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {[
                "React frontend",
                "Node.js + Express",
                "REST API",
                "Python ML service",
                "MRI / CT model",
                "MongoDB",
              ].map((item, index) => (
                <div
                  className="rounded-xl border border-[#dbe8ed] bg-[#f6fbfc] p-4 text-center text-sm font-bold text-[#31566e]"
                  key={item}
                >
                  {index + 1}. {item}
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-[#f1dfb8] bg-[#fff9eb] p-4 text-sm leading-6 text-[#765523]">
              This system is an AI-assisted research tool. Predictions should
              not be considered a definitive medical diagnosis.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
