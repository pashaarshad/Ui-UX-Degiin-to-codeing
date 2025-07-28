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
                    linear-gradient(135deg, 
                      #1a1d2e 0%, 
                      #2a3441 20%, 
                      #3d4855 40%, 
                      #2c3844 60%, 
                      #1f2633 80%, 
                      #151821 100%
                    )
                  `,
                  backgroundSize: '400% 400%',
                  animation: 'cardShimmer 4s ease-in-out infinite'
                }}>
                  {/* Red geometric lines pattern */}
                  <svg 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0.8
                    }}
                    viewBox="0 0 300 200"
                  >
                    {/* Main diagonal lines */}
                    <path 
                      d="M50,30 L120,100 L90,130 L20,60 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="2"
                      opacity="0.9"
                    />
                    <path 
                      d="M80,20 L150,90 L120,120 L50,50 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="1.5"
                      opacity="0.7"
                    />
                    <path 
                      d="M200,60 L270,130 L240,160 L170,90 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="2"
                      opacity="0.8"
                    />
                    <path 
                      d="M180,80 L250,150 L220,180 L150,110 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    {/* Additional angular patterns */}
                    <path 
                      d="M30,120 L100,50 L130,80 L60,150 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="1"
                      opacity="0.5"
                    />
                    <path 
                      d="M160,40 L230,110 L200,140 L130,70 Z" 
                      fill="none" 
                      stroke="#ff3b30" 
                      strokeWidth="1"
                      opacity="0.4"
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
              {/* Only show content when not frozen or minimal content */}
              {!isCardFrozen && (
                <>
                  <div className="card-header">
                    <div className="yolo-logo">YOLO</div>
                    <div className="card-network">DEBIT</div>
                  </div>

                  <div className="card-number">
                    {formatCardNumber(cardData?.number)}
                  </div>

                  <div className="card-details">
                    <div className="card-expiry">
                      <div className="card-label">expiry</div>
                      <div className="card-value">{formatCardData(cardData?.expiry)}</div>
                    </div>
                    <div className="card-cvv">
                      <div className="card-label">cvv</div>
                      <div className="card-value">{formatCardData(cardData?.cvv)}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Card Actions */}
          <div className="card-actions">
            {!isCardFrozen && (
              <motion.button 
                className="copy-details-btn"
                onClick={handleCopyDetails}
                whileTap={{ scale: 0.95 }}
                animate={showCopyFeedback ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {showCopyFeedback ? 'copied!' : 'copy details'}
              </motion.button>
            )}

            <motion.div 
              className="freeze-toggle"
              onClick={handleFreezeToggle}
              whileTap={{ scale: 0.95 }}
              style={{ 
                marginLeft: isCardFrozen ? 'auto' : '0',
                justifyContent: isCardFrozen ? 'center' : 'flex-end'
              }}
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
