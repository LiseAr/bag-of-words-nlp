import { useState } from 'react'

export const useClassificar = () => {
  const [frase, setFrase] = useState('')
  const [resultado, setResultado] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [positivas, setPositivas] = useState<string[]>([])
  const [negativas, setNegativas] = useState<string[]>([])
  const [modeloCriado, setModeloCriado] = useState(false)

  const handleFileUpload =
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
    }

  const criarModelo = async () => {
    if (positivas.length === 0 || negativas.length === 0) {
      alert('Por favor, carregue os arquivos de frases positivas e negativas.')
      return
    }

    setCarregando(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/criar-modelo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          positivas,
          negativas
        })
      })
      const data = await response.json()
      if (data.message === 'Modelo criado com sucesso!') {
        setModeloCriado(true)
      }
    } catch (erro) {
      console.error('Erro ao criar o modelo:', erro)
      alert('Ocorreu um erro ao criar o modelo. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  const classificarFrase = async () => {
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
        body: JSON.stringify({
          frase
        })
      })
      const data = await response.json()
      setResultado(data.resultado)
    } catch (erro) {
      console.error('Erro ao classificar a frase:', erro)
      alert('Ocorreu um erro ao classificar a frase. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return {
    frase,
    setFrase,
    resultado,
    carregando,
    criarModelo,
    classificarFrase,
    handleFileUpload,
    modeloCriado
  }
}
