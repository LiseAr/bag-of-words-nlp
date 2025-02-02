import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { useClassificar } from './useClassificar'

const App: React.FC = () => {
  const {
    frase,
    setFrase,
    resultado,
    carregando,
    criarModelo,
    classificarFrase,
    handleFileUpload,
    modeloCriado
  } = useClassificar()

  const [nomeArquivoPositivo, setNomeArquivoPositivo] = useState<string>('')
  const [nomeArquivoNegativo, setNomeArquivoNegativo] = useState<string>('')

  const handleFileChange =
    (tipo: 'positivo' | 'negativo') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        if (tipo === 'positivo') {
          setNomeArquivoPositivo(file.name)
        } else {
          setNomeArquivoNegativo(file.name)
        }
        handleFileUpload(tipo)(event)
      }
    }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      classificarFrase()
    }
  }

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center justify-center p-8'>
      <div className='bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-lg'>
        <h1 className='text-5xl font-bold text-center text-white mb-8 text-shadow'>
          Classificador de Texto
        </h1>

        {!modeloCriado ? (
          <div>
            <div className='mb-6'>
              <label className='w-full p-4 bg-gray-900 text-white border-2 border-gray-700 rounded-lg flex items-center cursor-pointer'>
                <FaFileUpload className='mr-2' />
                {nomeArquivoPositivo ||
                  'Carregar frases positivas (TXT ou CSV)'}
                <input
                  type='file'
                  accept='.txt,.csv'
                  onChange={handleFileChange('positivo')}
                  className='hidden'
                />
              </label>
            </div>

            <div className='mb-6'>
              <label className='w-full p-4 bg-gray-900 text-white border-2 border-gray-700 rounded-lg flex items-center cursor-pointer'>
                <FaFileUpload className='mr-2' />
                {nomeArquivoNegativo ||
                  'Carregar frases negativas (TXT ou CSV)'}
                <input
                  type='file'
                  accept='.txt,.csv'
                  onChange={handleFileChange('negativo')}
                  className='hidden'
                />
              </label>
            </div>

            <button
              onClick={criarModelo}
              disabled={carregando}
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out disabled:bg-gray-600 transform hover:scale-105'
            >
              {carregando ? (
                <div className='flex justify-center items-center'>
                  <div className='w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin'></div>
                </div>
              ) : (
                'Criar Modelo'
              )}
            </button>
          </div>
        ) : (
          <div>
            <h2 className='text-2xl font-semibold text-white mb-4'>
              Digite uma frase para classificar
            </h2>
            <textarea
              value={frase}
              onChange={(e) => setFrase(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Digite uma frase...'
              className='w-full p-4 border-2 border-gray-700 rounded-lg text-white bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500 mb-6 text-lg transition-all duration-300 ease-in-out transform hover:scale-105'
              rows={5}
            />
            <button
              onClick={classificarFrase}
              disabled={carregando}
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out disabled:bg-gray-600 transform hover:scale-105'
            >
              {carregando ? (
                <div className='flex justify-center items-center'>
                  <div className='w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin'></div>
                </div>
              ) : (
                'Classificar Frase'
              )}
            </button>

            {resultado && (
              <div className='mt-8 text-center'>
                <h2 className='text-3xl font-semibold text-white mb-2'>
                  Resultado:
                </h2>
                <p
                  className={`text-4xl font-bold transition-all duration-500 ease-in-out ${
                    resultado === 'Positivo' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {resultado}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
