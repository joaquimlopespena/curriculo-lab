import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export function FormSectionShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm lg:p-8">
      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
        Etapa do formulario
      </span>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-900">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function FloatingLabelInput({
  label,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  valid?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="relative rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition focus-within:border-slate-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(15,23,42,0.05)]">
        <input
          {...props}
          className="w-full border-0 bg-transparent px-0 py-0.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-300"
        />
      </div>
    </label>
  );
}

export function FloatingLabelTextarea({
  label,
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="relative rounded-[24px] border border-slate-300 bg-slate-50 px-4 py-3 transition focus-within:border-slate-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(15,23,42,0.05)]">
        <textarea
          {...props}
          className="min-h-40 w-full resize-none border-0 bg-transparent px-0 py-0.5 text-[15px] leading-7 text-slate-900 outline-none placeholder:text-slate-300"
        />
      </div>
    </label>
  );
}

export function PillButton({
  children,
  active,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      {...props}
      className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
      } ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
