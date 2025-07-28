import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PaymentScreen = ({ cardData, isCardFrozen, setIsCardFrozen }) => {
  const [activeMode, setActiveMode] = useState('card')
  const [showCopyFeedback, setShowCopyFeedback] = useState(true) // Default to frozen state

  const handleCopyDetails = async () => {
    if (!cardData) return
    
    const cardDetails = `Card: ${cardData.number}\nExpiry: ${cardData.expiry}\nCVV: ${cardData.cvv}\nName: ${cardData.holderName}`
    
    try {
      await navigator.clipboard.writeText(cardDetails)
      setShowCopyFeedback(true)
      setTimeout(() => setShowCopyFeedback(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleFreezeToggle = () => {
    setIsCardFrozen(!isCardFrozen)
  }

  const formatCardNumber = (number) => {
    if (!number) return '8124   4212   3456   7890'
    return isCardFrozen ? '••••   ••••   ••••   ••••' : number.replace(/-/g, '   ')
  }

  const formatCardData = (data) => {
    if (!data) return '••'
    return isCardFrozen ? '••' : data
  }

  return (
    <div className="payment-screen">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-time">9:41</div>
        <div className="status-icons">
          <div className="signal-icon"></div>
          <div className="wifi-icon"></div>
          <div className="battery-icon"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="payment-header">
          <h1 className="payment-title">select payment mode</h1>
          <p className="payment-subtitle">
            choose your preferred payment method to<br />
            make payment
          </p>
        </div>

        {/* Payment Mode Buttons */}
        <div className="payment-mode-buttons">
          <button 
            className={`payment-mode-btn ${activeMode === 'pay' ? 'active' : ''}`}
            onClick={() => setActiveMode('pay')}
          >
            pay
          </button>
          <button 
            className={`payment-mode-btn ${activeMode === 'card' ? 'active' : ''}`}
            onClick={() => setActiveMode('card')}
          >
            card
          </button>
        </div>

        {/* Card Section */}
        <div className="card-section">
          <h2 className="card-section-title">Your digital debit card</h2>
          
          <motion.div 
            className={`debit-card ${isCardFrozen ? 'frozen' : ''}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Card Background */}
            <div className={`card-background ${isCardFrozen ? 'frozen' : ''}`}>
              {/* Frozen state pattern overlay */}
              {isCardFrozen && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(ellipse at 30% 20%, #4a5568 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 80%, #2d3748 0%, transparent 50%),
                    radial-gradient(ellipse at 20% 70%, #1a202c 0%, transparent 40%),
                    radial-gradient(ellipse at 80% 30%, #2b3544 0%, transparent 45%),
                    linear-gradient(135deg, #1a1d29 0%, #2c3e50 30%, #34495e 60%, #2c3e50 100%)
                  `,
                  backgroundSize: '200% 200%, 150% 150%, 180% 180%, 160% 160%, 100% 100%',
                  animation: 'smokyBackground 8s ease-in-out infinite'
                }}>
                  {/* Red geometric lines pattern - exact match */}
                  <svg 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0.9
                    }}
                    viewBox="0 0 200 320"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    {/* Top diagonal line */}
                    <path 
                      d="M120 20 L180 80" 
                      stroke="#ff3b30" 
                      strokeWidth="2"
                      fill="none"
                      opacity="0.8"
                    />
                    
                    {/* Main angular shape - top left */}
                    <path 
                      d="M20 60 L80 20 L120 60 L60 120 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="2"
                      opacity="0.9"
                    />
                    
                    {/* Center angular lines */}
                    <path 
                      d="M140 80 L200 140 L160 180 L100 120 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="1.8"
                      opacity="0.7"
                    />
                    
                    {/* Bottom left angular shape */}
                    <path 
                      d="M10 180 L70 140 L110 180 L50 240 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="2"
                      opacity="0.8"
                    />
                    
                    {/* Bottom right lines */}
                    <path 
                      d="M120 200 L180 260 L140 300 L80 240 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    
                    {/* Additional connecting lines */}
                    <path 
                      d="M60 100 L120 160" 
                      stroke="#ff3b30" 
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.5"
                    />
                    
                    <path 
                      d="M100 40 L160 100" 
                      stroke="#ff3b30" 
                      strokeWidth="1"
                      fill="none"
                      opacity="0.4"
                    />
                    
                    {/* Corner accent line */}
                    <path 
                      d="M20 280 L80 320" 
                      stroke="#ff3b30" 
                      strokeWidth="2"
                      fill="none"
                      opacity="0.7"
                    />
                  </svg>
                </div>
              )}
              
              {/* Normal state pattern */}
              {!isCardFrozen && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(circle at 20% 30%, rgba(255, 59, 48, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(255, 149, 0, 0.1) 0%, transparent 50%),
                    linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.02) 50%, transparent 60%)
                  `,
                  opacity: 0.6
                }} />
              )}
            </div>
            
            {/* Freeze Animation Overlay */}
            <AnimatePresence>
              {isCardFrozen && (
                <motion.div
                  className="freeze-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="freeze-lines"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Card Content */}
            <div className={`card-content ${isCardFrozen ? 'frozen' : ''}`}>
              <div className="card-header">
                <div className="yolo-logo">YOLO</div>
                <div className="yes-bank-container">
                  <div className="yes-bank-logo">YES BANK</div>
                  <div className="red-divider"></div>
                </div>
              </div>

              <div className="card-numbers-container">
                <div className="card-number-group">6124</div>
                <div className="card-number-group">4212</div>
                <div className="card-number-group">3456</div>
                <div className="card-number-group">7890</div>
              </div>

              <div className="card-bottom-info">
                <div className="expiry-section">
                  <div className="card-label">EXPIRY</div>
                  <div className="card-value">01/28</div>
                </div>
                <div className="cvv-section">
                  <div className="card-label">CVV</div>
                  <div className="cvv-container">
                    <div className="card-value">***</div>
                    <svg className="eye-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M1 1l22 22"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card Actions - always visible with consistent positioning */}
          <div className="card-actions">
            <motion.button 
              className={`copy-details-btn ${isCardFrozen ? 'frozen' : ''}`}
              onClick={isCardFrozen ? undefined : handleCopyDetails}
              whileTap={isCardFrozen ? {} : { scale: 0.95 }}
              animate={showCopyFeedback && !isCardFrozen ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.2 }}
              style={{
                opacity: isCardFrozen ? 0.6 : 1,
                cursor: isCardFrozen ? 'not-allowed' : 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              {showCopyFeedback && !isCardFrozen ? 'copied!' : 'copy details'}
            </motion.button>

            <motion.div 
              className="freeze-toggle"
              onClick={handleFreezeToggle}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg 
                className={`freeze-icon ${isCardFrozen ? 'frozen' : ''}`}
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                animate={{ rotate: isCardFrozen ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isCardFrozen ? (
                  <>
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7z"/>
                    <path d="M8 12h8"/>
                  </>
                ) : (
                  <path d="M8 12h8m-4-4v8" />
                )}
              </motion.svg>
              <span className="freeze-text">
                {isCardFrozen ? 'unfreeze' : 'freeze'}
              </span>
            </motion.div>
          </div>

          {/* YOLO Prepaid Logo */}
          <div className="yolo-prepaid">
            <div className="yolo-logo-main">RuPay</div>
            <div className="prepaid-text">prepaid</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentScreen
