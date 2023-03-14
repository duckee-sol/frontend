import { cn } from '~/lib/utils';

interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

export function TypographyH1({ className, children }: TypographyProps) {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>{children}</h1>
  );
}

interface TypographyH2Props extends TypographyProps {
  noBorder?: boolean;
}

export function TypographyH2({ className, children, noBorder = false }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        'mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        !noBorder ? 'border-b border-b-slate-200 dark:border-b-slate-700' : '',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ className, children }: TypographyProps) {
  return <h3 className={cn('mt-8 scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>;
}

export function TypographyH4({ className, children }: TypographyProps) {
  return <h4 className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>;
}

export function TypographyBlockquote({ className, children }: TypographyProps) {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200',
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

export function TypographyList({ className, children }: TypographyProps) {
  return <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>{children}</ul>;
}

export function TypographyInlineCode({ className, children }: TypographyProps) {
  return (
    <code
      className={cn(
        'relative rounded bg-slate-100 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400',
        className,
      )}
    >
      {children}
    </code>
  );
}
export function TypographyLead({ className, children }: TypographyProps) {
  return <p className={cn('text-xl text-slate-700 dark:text-slate-400', className)}>{children}</p>;
}

export function TypographyP({ className, children }: TypographyProps) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>;
}

export function TypographyLarge({ className, children }: TypographyProps) {
  return <div className={cn('text-lg font-semibold text-slate-900 dark:text-slate-50', className)}>{children}</div>;
}
export function TypographySmall({ className, children }: TypographyProps) {
  return <small className={cn('text-sm font-medium leading-none', className)}>{children}</small>;
}

export function TypographySubtle({ className, children }: TypographyProps) {
  return <p className={cn('text-sm text-slate-500 dark:text-slate-400', className)}>{children}</p>;
}
