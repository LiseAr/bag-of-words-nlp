import { motion } from 'framer-motion'
import { MatrizAnimation } from './MatrizAnimation'
import { MatrizFrequencia } from './MatrizFrequencia'
import { DadosTreinamentoProps } from './useClassificar'

const Processing = ({
  dadosTreinamento
}: {
  dadosTreinamento: DadosTreinamentoProps
}) => {
  return (
    <div className='space-y-8'>
      {/* Seção: Criação de Vocabulário */}
      <div className='bg-gray-900 p-6 rounded-lg shadow-md text-white'>
        <h2 className='text-2xl font-bold text-blue-400'>
          📖 Criação de Vocabulário
        </h2>
        <p className='text-gray-300 mt-2'>
          Lista de palavras identificadas nos textos de treinamento.
        </p>

        <div className='mt-4 flex justify-between items-center'>
          <p className='text-lg font-semibold text-gray-200'>
            📌 Total de Palavras:
          </p>
          <motion.div
            className='text-3xl font-bold text-blue-500'
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {dadosTreinamento?.vocabulario?.length || 0}
          </motion.div>
        </div>

        <div className='mt-6'>
          <MatrizAnimation values={dadosTreinamento?.vocabulario || []} />
        </div>
      </div>

      {/* Seção: Treinamento */}
      <div className='bg-gray-900 p-6 rounded-lg shadow-md text-white'>
        <h2 className='text-2xl font-bold text-purple-400'>⚙️ Treinamento</h2>
        <p className='text-gray-300 mt-2'>
          O modelo é treinado usando a técnica{' '}
          <strong>Bag-of-Words (BoW)</strong>.
        </p>

        <div className='mt-4'>
          <h3 className='text-lg font-semibold text-gray-200'>
            📌 Bag-of-Words (BoW)
          </h3>
          <ul className='list-disc list-inside text-gray-400 mt-2 space-y-1'>
            <li>
              <span className='font-semibold'>Dimensão:</span> O vetor tem
              tamanho igual ao vocabulário.
            </li>
            <li>
              <span className='font-semibold'>Objetivo:</span> Criar um "perfil"
              de cada classe (Positivo/Negativo) somando os vetores das frases
              de treinamento.
            </li>
            <li>
              <span className='font-semibold'>Funcionamento:</span> Para cada
              classe, soma-se os vetores BoW de todas as frases. O resultado
              representa a frequência acumulada das palavras na classe.
            </li>
          </ul>
        </div>

        {/* Matrizes de Frequência */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-green-400'>
            📊 Dados de Treinamento - Positivo
          </h3>
          {dadosTreinamento?.ocorrenciaPositivo && (
            <MatrizFrequencia values={dadosTreinamento?.ocorrenciaPositivo} />
          )}
        </div>

        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-red-400'>
            📉 Dados de Treinamento - Negativo
          </h3>
          {dadosTreinamento?.ocorrenciaNegativo && (
            <MatrizFrequencia values={dadosTreinamento?.ocorrenciaNegativo} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Processing
