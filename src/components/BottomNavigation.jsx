import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const BottomNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    {
      id: 'home',
      label: 'home',
      path: '/home',
      icon: (isActive) => (
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="nav-icon"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      )
    },
    {
      id: 'yolo-pay',
      label: 'yolo pay',
      path: '/',
      icon: (isActive) => (
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="nav-icon"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      id: 'ginie',
      label: 'ginie',
      path: '/ginie',
      icon: (isActive) => (
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="nav-icon"
        >
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      )
    }
  ]

  const handleTabClick = (path) => {
    navigate(path)
  }

  return (
    <div className="bottom-navigation">
      <div className="nav-tabs">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (location.pathname === '/' && tab.path === '/')
          
          return (
            <motion.div
              key={tab.id}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.path)}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0 
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.icon(isActive)}
              </motion.div>
              <motion.span 
                className="nav-label"
                animate={{ 
                  opacity: isActive ? 1 : 0.7,
                  fontWeight: isActive ? 600 : 500 
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </motion.span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
