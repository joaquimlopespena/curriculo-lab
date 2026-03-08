import type { FormSection } from "../types/resume";

interface SmartStepperProps {
  sections: FormSection[];
  currentStep: number;
  onStepChange: (nextStep: number) => void;
}

export function SmartStepper({ sections, currentStep, onStepChange }: SmartStepperProps) {
  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-paper">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Stepper Inteligente</p>
      <div className="mt-6 space-y-3">
        {sections.map((section, index) => {
          const active = index === currentStep;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onStepChange(index)}
              className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition ${
                active ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-white text-slate-950" : "bg-slate-200 text-slate-700"}`}>
                {index + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold">{section.title}</span>
                <span className={`mt-1 block text-xs leading-5 ${active ? "text-slate-300" : "text-slate-500"}`}>
                  {section.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
