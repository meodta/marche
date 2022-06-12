import React from 'react'
import * as $ from './styles'
import Navbar from 'components/Navbar'
import MainView from 'views/Main'
 
function App() {
  return (
    <$.AppContainer>
      <Navbar />
      <MainView />
    </$.AppContainer>
  )
}

export default App
