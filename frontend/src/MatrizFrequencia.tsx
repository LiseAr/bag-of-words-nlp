import { motion } from 'framer-motion'

interface MatrizFrequenciaProps {
  values: number[]
  maxItems?: number
  label?: string
}

const MatrizFrequencia: React.FC<MatrizFrequenciaProps> = ({
  values,
  maxItems = 1000,
  label
}) => {
  const items = values.slice(0, maxItems)

  return (
    <div className='p-4 bg-gray-700 rounded-lg overflow-auto max-h-48'>
      {label && (
        <div className='text-white mb-2 text-xs font-semibold'>{label}</div>
      )}

      <div className='flex flex-wrap gap-1'>
        {items.map((item, i) => (
          <motion.div
            key={i}
            className='flex items-center justify-center p-2 bg-gray-800 text-white rounded-md shadow-md text-xs font-medium w-fit h-fit text-center'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            style={{
              fontSize: `clamp(8px, 2vw, 12px)`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            title={String(item)}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { MatrizFrequencia }
