import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PaymentScreen = ({ cardData, isCardFrozen, setIsCardFrozen }) => {
  const [activeMode, setActiveMode] = useState('card')
  const [showCopyFeedback, setShowCopyFeedback] = useState(false)

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
              {/* Card pattern overlay */}
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
                opacity: isCardFrozen ? 0.3 : 0.6
              }} />
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
            </div>
          </motion.div>

          {/* Card Actions */}
          <div className="card-actions">
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
                animate={{ rotate: isCardFrozen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isCardFrozen ? (
                  <path d="M8 12h8m-4-4v8" />
                ) : (
                  <>
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7z"/>
                    <path d="M8 12h8"/>
                  </>
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
