import Button from "../components/Button"
import SectionHeading from "../components/SectionHeading"

function ExplorePage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        jp="探す"
        title="Explorar"
        subtitle="Busque no catálogo do MyAnimeList e monte sua lista."
      />
      <div>
        <Button>+ Quero ver</Button>
      </div>
    </div>
  )
}

export default ExplorePage
