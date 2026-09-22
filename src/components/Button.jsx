const VARIANTS = {
  primary: "bg-vermilion text-white",
  outline: "bg-paper text-ink",
}

function Button({ variant = "primary", className = "", ...rest }) {
  return (
    <button
      className={`h-11 px-5 rounded border-2 border-ink font-semibold shadow-[4px_4px_0_#1c1a17] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  )
}

export default Button
