function SectionHeading({ jp, title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-jp text-3xl text-vermilion leading-none">{jp}</span>
      <h2 className="font-display text-3xl uppercase">{title}</h2>
      <svg
        width="96"
        height="10"
        viewBox="0 0 96 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-ink"
        aria-hidden="true"
      >
        <path d="M2 6c6-6 10-6 16 0s10 6 16 0 10-6 16 0 10 6 16 0 10-6 16 0 10 6 12 2" />
      </svg>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading
