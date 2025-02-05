import CollapsebleContainer from './CallapsebleContainer'

const HowItWorks = () => {
  return (
    <CollapsebleContainer
      title='ℹ️ Como funciona?'
      subtitle='O sistema analisa o texto usando um modelo baseado em Bag of Words (BoW) e cálculo de similaridade.'
    >
      <h3 className='text-lg font-semibold text-gray-200 mt-6'>
        🔍 Etapas da Classificação:
      </h3>
      <ul className='list-disc list-inside mt-2 text-gray-400 space-y-1'>
        <li>Converter a frase de entrada em um vetor BoW.</li>
        <li>
          Calcular o produto escalar entre o vetor da frase e os vetores de soma
          das classes.
        </li>
        <li>A classe com o maior produto escalar é escolhida.</li>
      </ul>

      <h3 className='text-lg font-semibold text-gray-200 mt-6'>
        📐 Produto Escalar:
      </h3>
      <p className='text-gray-400 mt-2'>
        Mede a similaridade entre dois vetores. Quanto maior o valor, mais
        semelhante o texto é a determinada classe.
      </p>

      <h4 className='text-sm font-medium text-gray-300 mt-3'>Fórmula:</h4>
      <div className='p-3 bg-gray-800 rounded-md mt-2 text-center font-mono text-blue-300'>
        a ⋅ b = ∑<sub>i=1</sub>
        <sup>n</sup> a<sub>i</sub> × b<sub>i</sub>
      </div>
    </CollapsebleContainer>
  )
}

export default HowItWorks
