import { KeyboardEvent, useCallback } from 'react'
import { ClassificarResponse, DadosTreinamentoProps } from './useClassificar'
import { motion } from 'framer-motion'
import CollapsebleContainer from './CallapsebleContainer'

const Classification = ({
  frase,
  setFrase,
  classificarFrase,
  carregando,
  resultado
}: {
  frase: string
  setFrase: (frase: string) => void
  classificarFrase: () => void
  carregando: boolean
  resultado?: ClassificarResponse
  dadosTreinamento?: DadosTreinamentoProps
}) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        classificarFrase()
      }
    },
    [classificarFrase]
  )

  return (
    <div className='space-y-6'>
      {/* Input de Texto */}
      <textarea
        value={frase}
        onChange={(e) => setFrase(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder='Digite sua frase para análise...'
        className='w-full p-4 bg-gray-900 text-white rounded-lg border-2 border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all'
        rows={1}
      />
      <button
        onClick={classificarFrase}
        disabled={carregando}
        className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl text-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50'
      >
        {carregando ? 'Analisando...' : 'Classificar Texto'}
      </button>
      <p className='text-sm text-gray-400'>
        Pressione <code>Enter</code> para classificar a frase.
      </p>

      {/* Seção de Resultado */}
      {resultado && (
        <div className='p-6 bg-gray-900 text-white rounded-lg shadow-md animate-fade-in'>
          <h2 className='text-2xl font-bold text-blue-400 text-center'>
            📊 Resultado da Análise
          </h2>

          {/* Classificação Final */}
          <div
            className={`mt-4 text-4xl font-bold text-center ${
              resultado.resultado === 'Positivo'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {resultado.resultado}
          </div>

          {/* Barras de Similaridade */}
          <div className='mt-6 space-y-4'>
            <div className='text-sm text-gray-400'>
              Similaridade com Positivo:
            </div>
            <motion.div
              className='h-3 bg-green-500 rounded-lg'
              initial={{ width: 0 }}
              animate={{ width: `${resultado.percentual_positivo}%` }}
              transition={{ duration: 0.6 }}
            />

            <div className='text-sm text-gray-400'>
              Similaridade com Negativo:
            </div>
            <motion.div
              className='h-3 bg-red-500 rounded-lg'
              initial={{ width: 0 }}
              animate={{ width: `${resultado.percentual_negativo}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Palavras Reconhecidas */}
          {resultado.palavras_reconhecidas.length > 0 && (
            <div className='mt-6'>
              <h3 className='text-lg font-semibold text-gray-200'>
                🔤 Palavras Reconhecidas
              </h3>
              <div className='flex flex-wrap gap-2 mt-2'>
                {resultado.palavras_reconhecidas.map((palavra, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-lg'
                  >
                    {palavra}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Classification
