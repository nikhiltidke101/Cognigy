import React from "react";
import Chatbot from './Chatbot/Chatbot';
import {Box} from '@material-ui/core'

function App() {
  return (
    <div>

      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <img src="./cognigy.png" style={{width:"25rem"}} alt="" />
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Chatbot />
      </Box>
      
    </div>
  )
}

export default App
