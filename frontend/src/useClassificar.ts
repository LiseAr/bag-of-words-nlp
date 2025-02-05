import { useState, useCallback } from 'react'

export type DadosTreinamentoProps = {
  vocabulario: string[]
  ocorrenciaPositivo: number[]
  ocorrenciaNegativo: number[]
}

export type ClassificarResponse = {
  vetor_correspondencia: number[]
  palavras_reconhecidas: string[]
  percentual_negativo: number
  percentual_positivo: number
  resultado: string
  similaridade_negativo: number
  similaridade_positivo: number
}

export const useClassificar = () => {
  const [frase, setFrase] = useState('')
  const [resultado, setResultado] = useState<ClassificarResponse>()
  const [carregando, setCarregando] = useState(false)
  const [positivas, setPositivas] = useState<string[]>([])
  const [negativas, setNegativas] = useState<string[]>([])
  const [modeloCriado, setModeloCriado] = useState(false)
  const [estagioTreinamento, setEstagioTreinamento] = useState<
    | 'upload'
    | 'processamento'
    | 'construcao_vocabulario'
    | 'calculo_similaridades'
    | 'pronto'
  >('upload')
  const [dadosTreinamento, setDadosTreinamento] =
    useState<DadosTreinamentoProps>()
  const [stepsList, setStepsList] = useState<string[]>([])

  const atualizarProgresso = useCallback(
    (novosDados: Partial<DadosTreinamentoProps>) => {
      setDadosTreinamento(
        (prev) => ({ ...prev, ...novosDados } as DadosTreinamentoProps)
      )
    },
    []
  )

  const updateStep = useCallback((novoEstagio: string) => {
    setStepsList((prev) =>
      prev.includes(novoEstagio) ? prev : [...prev, novoEstagio]
    )
  }, [])

  const handleFileUpload = useCallback(
    (tipo: 'positivo' | 'negativo') =>
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          const lines = content
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)

          if (tipo === 'positivo') {
            setPositivas(lines)
          } else {
            setNegativas(lines)
          }
        }
        reader.readAsText(file)
      },
    []
  )

  const criarModelo = useCallback(async () => {
    setCarregando(true)
    try {
      setEstagioTreinamento('processamento')
      updateStep('processamento')
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await fetch('http://127.0.0.1:5000/criar-modelo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positivas, negativas })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao criar o modelo.')
      }

      const successResponse = await response.json()

      const data = successResponse.dados_vis

      setDadosTreinamento(
        (prev) =>
          ({
            ...prev,
            vocabulario: data.vocabulario,
            ocorrenciaPositivo: data.ocorrencia_positivo,
            ocorrenciaNegativo: data.ocorrencia_negativo
          } as DadosTreinamentoProps)
      )

      setEstagioTreinamento('pronto')
      updateStep('pronto')
      setModeloCriado(true)
    } catch (erro: any) {
      console.error('Erro ao criar o modelo:', erro)
      alert(
        erro.message || 'Ocorreu um erro ao criar o modelo. Tente novamente.'
      )
    } finally {
      setCarregando(false)
    }
  }, [positivas, negativas, updateStep])

  const classificarFrase = useCallback(async () => {
    if (!frase.trim()) {
      alert('Por favor, digite uma frase.')
      return
    }

    if (!modeloCriado) {
      alert('Por favor, crie o modelo primeiro.')
      return
    }

    setCarregando(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/classificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frase })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao classificar a frase.')
      }

      const data: ClassificarResponse = await response.json()

      setResultado(data)
    } catch (erro: any) {
      console.error('Erro ao classificar a frase:', erro)
      alert(
        erro.message ||
          'Ocorreu um erro ao classificar a frase. Tente novamente.'
      )
    } finally {
      setCarregando(false)
    }
  }, [frase, modeloCriado])

  return {
    frase,
    setFrase,
    resultado,
    carregando,
    criarModelo,
    classificarFrase,
    handleFileUpload,
    modeloCriado,
    estagioTreinamento,
    dadosTreinamento,
    atualizarProgresso,
    stepsList
  }
}
