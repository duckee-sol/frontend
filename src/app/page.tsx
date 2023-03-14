export default function IndexPage() {
  return (
    <div className="px-8 py-6">
      <section className="grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Welcome to Duckee
          </h1>
          <p className="max-w-[750px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            This page is used as internal page in duckee-android.{' '}
            <span className="font-semibold">Use this to build your own Duckee client library</span>.
          </p>
        </div>
      </section>
    </div>
  );
}
