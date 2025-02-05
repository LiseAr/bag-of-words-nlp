import { ChangeEvent, useCallback, useState } from 'react'
import { FaFileUpload, FaCheckCircle, FaSpinner } from 'react-icons/fa'

const UploadFiles = ({
  handleFileUpload,
  criarModelo,
  carregando
}: {
  handleFileUpload: (
    tipo: 'positivo' | 'negativo'
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  criarModelo: () => void
  carregando: boolean
}) => {
  const [nomeArquivoPositivo, setNomeArquivoPositivo] = useState<string>('')
  const [nomeArquivoNegativo, setNomeArquivoNegativo] = useState<string>('')

  const onFileChange = useCallback(
    (tipo: 'positivo' | 'negativo') =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
          if (tipo === 'positivo') setNomeArquivoPositivo(file.name)
          else setNomeArquivoNegativo(file.name)

          handleFileUpload(tipo)(event)
        }
      },
    [handleFileUpload]
  )

  return (
    <div className='w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700'>
      <h1 className='text-2xl font-bold text-center text-white mb-8'>
        🚀 Treinamento do Modelo de Classificação
      </h1>

      <div className='space-y-6'>
        <div className='space-y-4'>
          {/* Upload Positivo */}
          <div className='group relative'>
            <label className='w-full p-4 bg-gray-900/50 text-gray-300 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-between cursor-pointer hover:border-green-500 transition-all duration-300'>
              <div className='flex items-center space-x-3'>
                <FaFileUpload className='text-xl text-green-500' />
                <span className='truncate max-w-[200px]'>
                  {nomeArquivoPositivo ||
                    'Carregar frases positivas (.txt, .csv)'}
                </span>
              </div>
              {nomeArquivoPositivo && (
                <FaCheckCircle className='text-green-500 text-xl ml-2' />
              )}
              <input
                type='file'
                accept='.txt,.csv'
                onChange={onFileChange('positivo')}
                className='hidden'
              />
            </label>
            {nomeArquivoPositivo && (
              <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full'>
                Carregado
              </span>
            )}
          </div>

          {/* Upload Negativo */}
          <div className='group relative'>
            <label className='w-full p-4 bg-gray-900/50 text-gray-300 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-between cursor-pointer hover:border-red-500 transition-all duration-300'>
              <div className='flex items-center space-x-3'>
                <FaFileUpload className='text-xl text-red-500' />
                <span className='truncate max-w-[200px]'>
                  {nomeArquivoNegativo ||
                    'Carregar frases negativas (.txt, .csv)'}
                </span>
              </div>
              {nomeArquivoNegativo && (
                <FaCheckCircle className='text-red-500 text-xl ml-2' />
              )}
              <input
                type='file'
                accept='.txt,.csv'
                onChange={onFileChange('negativo')}
                className='hidden'
              />
            </label>
            {nomeArquivoNegativo && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
                Carregado
              </span>
            )}
          </div>
        </div>

        <div className='space-y-4'>
          <button
            onClick={criarModelo}
            disabled={carregando}
            className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          >
            {carregando ? (
              <>
                <FaSpinner className='animate-spin mr-2' />
                Processando...
              </>
            ) : (
              'Treinar Modelo Personalizado'
            )}
          </button>

          <div className='flex items-center my-4'>
            <div className='flex-1 border-t border-gray-600'></div>
            <span className='px-3 text-gray-400 text-sm'>ou</span>
            <div className='flex-1 border-t border-gray-600'></div>
          </div>

          <button
            onClick={criarModelo}
            disabled={carregando}
            className='w-full bg-gray-900/50 text-gray-300 py-3 px-6 rounded-lg font-semibold border border-gray-600 hover:border-green-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Usar Arquivos de Exemplo
          </button>
        </div>
      </div>

      <p className='text-center text-gray-400 text-sm mt-6'>
        Suporta arquivos de texto (.txt) ou CSV com uma frase por linha
      </p>
    </div>
  )
}

export default UploadFiles
