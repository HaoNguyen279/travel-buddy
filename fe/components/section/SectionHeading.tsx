type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-sm text-gray-500 sm:text-base max-w-2xl leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
