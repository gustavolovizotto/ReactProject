function ListCounter({ count }) {
  return (
    <div className="px-4 py-2 border-2 border-ink shadow-[3px_3px_0_#1c1a17] bg-paper text-sm font-semibold">
      <span className="font-jp text-vermilion">リスト</span> {count} na lista
    </div>
  )
}

export default ListCounter
