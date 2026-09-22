import ErrorMessage from '../components/ErrorMessage.jsx'
import Modal from '../components/Modal.jsx'
import Spinner from '../components/Spinner.jsx'
import useFetch from '../hooks/useFetch.js'
import { getAnime, getRecommendations } from '../services/jikan.js'
import AnimeDetail from './AnimeDetail.jsx'

function AnimeDetailModal({ id, onClose, onOpen }) {
  const { data, loading, error } = useFetch(
    () => (id ? Promise.all([getAnime(id), getRecommendations(id)]) : Promise.resolve(null)),
    [id],
  )

  const [anime, recommendations] = data ?? []

  return (
    <Modal open={Boolean(id)} onClose={onClose} title={anime ? undefined : 'Detalhe do anime'}>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {anime && <AnimeDetail anime={anime} recommendations={recommendations} onOpen={onOpen} />}
    </Modal>
  )
}

export default AnimeDetailModal
