import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import PaymentScreen from './components/PaymentScreen'
import BottomNavigation from './components/BottomNavigation'
import './App.css'

function App() {
  const [cardData, setCardData] = useState(null)
  const [isCardFrozen, setIsCardFrozen] = useState(false)

  useEffect(() => {
    // Generate fake card data using faker.js
    const generateCardData = () => {
      const cardNumber = '8124-4212-3456-7890' // Fixed number to match design
      const expiryMonth = '01'
      const expiryYear = '28'
      const cvv = '345'
      
      return {
        number: cardNumber,
        expiry: `${expiryMonth}/${expiryYear}`,
        cvv: cvv,
        holderName: faker.person.fullName()
      }
    }

    setCardData(generateCardData())
  }, [])

  return (
    <Router>
      <div className="app">
        <div className="mobile-container">
          <Routes>
            <Route 
              path="/" 
              element={
                <PaymentScreen 
                  cardData={cardData}
                  isCardFrozen={isCardFrozen}
                  setIsCardFrozen={setIsCardFrozen}
                />
              } 
            />
            <Route path="/home" element={<PaymentScreen cardData={cardData} isCardFrozen={isCardFrozen} setIsCardFrozen={setIsCardFrozen} />} />
            <Route path="/yolo-pay" element={<PaymentScreen cardData={cardData} isCardFrozen={isCardFrozen} setIsCardFrozen={setIsCardFrozen} />} />
            <Route path="/ginie" element={<PaymentScreen cardData={cardData} isCardFrozen={isCardFrozen} setIsCardFrozen={setIsCardFrozen} />} />
          </Routes>
          <BottomNavigation />
        </div>
      </div>
    </Router>
  )
}

export default App
