const capabilities = [
  {
    title: "Brain MRI",
    category: "Brain tumor classification",
    description:
      "A trained image-classification model returns a tumor or normal class with a confidence score.",
  },
  {
    title: "Lung CT",
    category: "Lung cancer classification",
    description:
      "A separate image-classification model returns a cancerous or non-cancerous class with a confidence score.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="max-w-3xl">
        <p className="eyebrow">MediScan AI</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Medical imaging review workspace
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          MediScan AI brings brain MRI and lung CT image classification into a
          single patient-organized workflow. Clinicians can submit either scan
          type, review model output, and return to saved results from history.
        </p>
      </header>

      <section aria-labelledby="supported-scans">
        <div className="mb-4">
          <h3
            id="supported-scans"
            className="text-xl font-semibold text-slate-900"
          >
            Supported analysis
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Each modality uses its corresponding trained classification model.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-teal-700">{item.title}</p>
              <h4 className="mt-2 text-lg font-semibold text-slate-900">
                {item.category}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Designed for consistent review
        </h3>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
          Each result is stored with its patient ID, scan type, disease focus,
          model classification, confidence score, and submission date. MRI and
          CT scans can be submitted independently or together.
        </p>
      </section>
    </div>
  );
}
