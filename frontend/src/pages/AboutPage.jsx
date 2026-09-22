const groups = [
  ["Frontend", "React", "JavaScript", "Tailwind CSS"],
  ["Backend", "Node.js", "Express.js"],
  ["AI / ML", "Python", "TensorFlow / PyTorch", "CNN", "OpenCV", "NumPy"],
  ["Database", "MongoDB"],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="page-intro">
        <span className="eyebrow">Research project</span>
        <h2>About MediScan AI</h2>
        <p>
          MediScan AI is an AI-assisted medical image analysis system designed
          to analyze MRI and CT scan images and provide machine-learning-based
          predictions for selected diseases.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="surface">
          <div className="surface-header">
            <div>
              <h3>What the system does</h3>
              <p>Two focused analysis pathways.</p>
            </div>
          </div>
          <div className="surface-body space-y-4">
            <div className="rounded-xl bg-[#e9f8f6] p-5">
              <strong className="text-[#18324b]">MRI analysis</strong>
              <p className="mt-2 text-sm leading-6 text-[#456174]">
                Brain image → preprocessing → AI model → prediction
              </p>
            </div>
            <div className="rounded-xl bg-[#edf5fb] p-5">
              <strong className="text-[#18324b]">CT analysis</strong>
              <p className="mt-2 text-sm leading-6 text-[#456174]">
                Lung image → preprocessing → AI model → prediction
              </p>
            </div>
          </div>
        </section>
        <section className="surface">
          <div className="surface-header">
            <div>
              <h3>Technologies used</h3>
              <p>Planned project stack.</p>
            </div>
          </div>
          <div className="surface-body space-y-4">
            {groups.map(([title, ...items]) => (
              <div key={title}>
                <span className="field-label">{title}</span>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span className="status-pill slate" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="mt-5 rounded-2xl bg-[#123f5b] p-6 text-white">
        <p className="eyebrow" style={{ color: "#9de3dd" }}>
          Responsible use
        </p>
        <h3 className="mt-2 text-xl font-bold">
          Built for academic research and clinical workflow exploration.
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d7f0ef]">
          This student research project is an AI-assisted tool. It does not
          replace professional medical judgment, diagnosis, or treatment
          decisions.
        </p>
      </section>
    </div>
  );
}
