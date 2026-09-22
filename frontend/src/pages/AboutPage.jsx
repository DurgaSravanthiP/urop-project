export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-7">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Project purpose
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          About this medical imaging project
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="leading-7 text-slate-700">
          This project aims to build a multimodal medical diagnosis system for
          research and educational use. It focuses on AI-assisted image
          classification for medical scans, helping users understand how deep
          learning models can support image-based analysis in healthcare
          workflows.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-bold text-slate-900">
            Brain MRI analysis
          </h3>
          <p className="mt-3 leading-7 text-slate-700">
            The brain MRI model classifies medical images into Normal and Tumor
            classes using a trained EfficientNetB0 model.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-bold text-slate-900">Lung CT analysis</h3>
          <p className="mt-3 leading-7 text-slate-700">
            The lung CT model classifies images into Cancerous and Non-Cancerous
            classes using the same image-analysis workflow.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">
          AI and machine learning approach
        </h3>
        <p className="mt-3 leading-7 text-slate-700">
          The system uses Python, TensorFlow, Keras, and EfficientNetB0 for
          image preprocessing, feature extraction, and classification. The
          trained models are saved as Keras files and invoked from a Node.js
          backend for real-time prediction.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-xl font-bold text-slate-900">Technology stack</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Frontend: React.js + Vite
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Backend: Node.js + Express
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Database: MongoDB
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Machine Learning: Python + TensorFlow + Keras
          </span>
          <span className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Model: EfficientNetB0
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
        This project is intended for educational and research purposes, not as a
        substitute for professional medical diagnosis.
      </div>
    </div>
  );
}
