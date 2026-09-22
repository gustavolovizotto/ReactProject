const MAX_HEIGHT = 96
const MIN_HEIGHT = 4

function ScoreHistogram({ histogram }) {
  const max = Math.max(...histogram, 1)

  return (
    <div className="flex items-end gap-2 h-[120px]">
      {histogram.map((count, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-muted">{count}</span>
          <div
            className="w-full bg-vermilion border-2 border-ink rounded-t-sm"
            style={{ height: `${Math.max(MIN_HEIGHT, (count / max) * MAX_HEIGHT)}px` }}
          />
          <span className="text-xs font-semibold">{index + 1}</span>
        </div>
      ))}
    </div>
  )
}

export default ScoreHistogram
