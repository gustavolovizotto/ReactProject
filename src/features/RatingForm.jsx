import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '../components/Button.jsx'
import Field, { inputClass } from '../components/Field.jsx'
import { STATUS, useList } from '../state/ListContext.jsx'

const schema = yup.object({
  status: yup.string().oneOf(Object.values(STATUS)).required('Escolha um status'),
  score: yup
    .number()
    .transform((v) => (Number.isNaN(v) ? null : v))
    .nullable()
    .min(1)
    .max(10)
    .when('status', {
      is: STATUS.DONE,
      then: (s) => s.required('Dê uma nota para o que você assistiu'),
    }),
  comment: yup.string().max(200, 'Máximo de 200 caracteres'),
})

const SCORES = Array.from({ length: 10 }, (_, i) => i + 1)

function RatingForm({ anime, initial, onSaved }) {
  const { add, update, remove } = useList()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initial
      ? { status: initial.status, score: initial.score ?? '', comment: initial.comment }
      : { status: STATUS.PLAN, score: null, comment: '' },
  })

  const onSubmit = (data) => {
    if (!initial) add(anime, data.status)
    update(anime.id, data)
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-lg border-2 border-ink bg-sand p-6">
      <h3 className="font-display text-xl uppercase">
        {initial ? 'Editar na minha lista' : 'Adicionar à minha lista'}
      </h3>
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-44">
          <Field label="Status" id="rating-status" error={errors.status?.message}>
            <select id="rating-status" className={inputClass} {...register('status')}>
              {Object.values(STATUS).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="w-44">
          <Field label="Sua nota (1 a 10)" id="rating-score" error={errors.score?.message}>
            <select id="rating-score" className={inputClass} {...register('score')}>
              <option value=""></option>
              {SCORES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="flex-1 min-w-48">
          <Field label="Comentário" id="rating-comment" error={errors.comment?.message}>
            <input id="rating-comment" type="text" className={inputClass} {...register('comment')} />
          </Field>
        </div>
        <Button type="submit">Salvar</Button>
        {initial && (
          <Button type="button" variant="outline" onClick={() => remove(anime.id)}>
            Remover da lista
          </Button>
        )}
      </div>
      <p className="text-xs text-muted">A nota é obrigatória quando o status é "Assisti".</p>
    </form>
  )
}

export default RatingForm
