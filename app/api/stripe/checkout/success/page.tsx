export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold">Deposit received</h1>
      <p className="mt-4 text-lg text-slate-600">
        Thanks — your payment went through. I’ll be in touch shortly to confirm
        the next steps for your project.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-2 text-sm font-medium"
      >
        Back to site
      </a>
    </main>
  );
}
