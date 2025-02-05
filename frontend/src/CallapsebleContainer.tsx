import { motion } from 'framer-motion'
import { useState } from 'react'

const CollapsebleContainer = ({
  children,
  title,
  subtitle
}: {
  children: React.ReactNode | React.ReactNode[] | string | number
  title: string | number | React.ReactNode | React.ReactNode[]
  subtitle?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className='bg-gray-900 p-4 rounded-lg shadow-md text-white h-fit'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className='text-2xl font-bold text-blue-400'>{title}</h2>
          <motion.div
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            🔽
          </motion.div>
        </div>
        <p className='text-gray-300'>{subtitle}</p>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
            overflow: 'hidden',
            marginTop: isOpen ? '1rem' : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CollapsebleContainer
