function Frame({ children }) {
  return (
    <div className="min-h-screen p-4 bg-vermilion">
      <div className="min-h-[calc(100vh-2rem)] rounded-[22px] border-2 border-ink bg-cream overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export default Frame
