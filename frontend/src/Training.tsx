import { motion } from 'framer-motion'
import { useState } from 'react'
import { MatrizAnimation } from './MatrizAnimation'
import { MatrizFrequencia } from './MatrizFrequencia'
import { DadosTreinamentoProps } from './useClassificar'
import CollapsebleContainer from './CallapsebleContainer'

const Training = ({
  dadosTreinamento
}: {
  dadosTreinamento: DadosTreinamentoProps
}) => {
  return (
    <CollapsebleContainer
      title='⚙️ Treinamento'
      subtitle='O modelo é treinado usando a técnica Bag-of-Words (BoW).'
    >
      <h3 className='text-lg font-semibold text-gray-200'>
        📌 Bag-of-Words (BoW)
      </h3>
      <ul className='list-disc list-inside text-gray-400 mt-2 space-y-1'>
        <li>
          <span className='font-semibold'>Dimensão:</span> O vetor tem tamanho
          igual ao vocabulário.
        </li>
        <li>
          <span className='font-semibold'>Objetivo:</span> Criar um "perfil" de
          cada classe (Positivo/Negativo) somando os vetores das frases de
          treinamento.
        </li>
        <li>
          <span className='font-semibold'>Funcionamento:</span> Para cada
          classe, soma-se os vetores BoW de todas as frases. O resultado
          representa a frequência acumulada das palavras na classe.
        </li>
      </ul>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='mt-6'
      >
        <h3 className='text-lg font-semibold text-green-400'>
          📊 Dados de Treinamento - Positivo
        </h3>
        {dadosTreinamento?.ocorrenciaPositivo && (
          <MatrizFrequencia values={dadosTreinamento?.ocorrenciaPositivo} />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='mt-6'
      >
        <h3 className='text-lg font-semibold text-red-400'>
          📉 Dados de Treinamento - Negativo
        </h3>
        {dadosTreinamento?.ocorrenciaNegativo && (
          <MatrizFrequencia values={dadosTreinamento?.ocorrenciaNegativo} />
        )}
      </motion.div>
    </CollapsebleContainer>
  )
}

export default Training
