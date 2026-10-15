const workflow = [
  {
    number: "01",
    title: "Select the patient",
    detail: "Enter the patient ID so each submitted scan is linked to the correct history.",
  },
  {
    number: "02",
    title: "Add imaging",
    detail: "Upload a brain MRI, a lung CT, or both. Each scan is handled by its corresponding model.",
  },
  {
    number: "03",
    title: "Review classifications",
    detail: "View the model classification and confidence for each scan in the current review.",
  },
  {
    number: "04",
    title: "Return to the record",
    detail: "Find saved results in analysis history by patient ID, scan type, and date.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-9 max-w-3xl">
        <p className="eyebrow">Workflow</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          A clear path from scan upload to saved result
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          Patient-linked analysis keeps MRI and CT review organized in one
          workspace.
        </p>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2">
        {workflow.map((step) => (
          <li
            key={step.number}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <span className="text-sm font-semibold tracking-wider text-teal-700">
              {step.number}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-base font-semibold text-slate-900">
          Supported imaging workflows
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4">
            <p className="font-medium text-slate-900">Brain MRI</p>
            <p className="mt-1 text-sm text-slate-600">
              Brain tumor / normal classification
            </p>
          </div>
          <div className="rounded-xl bg-white p-4">
            <p className="font-medium text-slate-900">Lung CT</p>
            <p className="mt-1 text-sm text-slate-600">
              Cancerous / non-cancerous classification
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
