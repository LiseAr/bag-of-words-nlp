import { motion } from 'framer-motion'

type MatrizAnimationProps = {
  values: string[]
}

const MatrizAnimation = ({ values }: MatrizAnimationProps) => {
  return (
    <div className='p-4 bg-gray-700 rounded-lg overflow-auto max-h-48'>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2'>
        {values.map((item, i) => (
          <motion.div
            key={i}
            className='flex items-center justify-center p-2 bg-gray-800 text-white rounded-md shadow-md text-[8px] font-medium truncate max-w-[80px] max-h-[30px]'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            title={item} // Exibe a palavra completa ao passar o mouse
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { MatrizAnimation }
