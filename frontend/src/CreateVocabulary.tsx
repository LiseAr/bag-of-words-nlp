import { motion } from 'framer-motion'
import { MatrizAnimation } from './MatrizAnimation'
import { DadosTreinamentoProps } from './useClassificar'
import CollapsebleContainer from './CallapsebleContainer'

const CreateVocabulary = ({
  dadosTreinamento
}: {
  dadosTreinamento: DadosTreinamentoProps
}) => {
  return (
    <CollapsebleContainer
      title='📖 Criação de Vocabulário'
      subtitle='Lista de palavras identificadas nos textos de treinamento.'
    >
      <div className='flex justify-between items-center w-full'>
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
    </CollapsebleContainer>
  )
}

export default CreateVocabulary
