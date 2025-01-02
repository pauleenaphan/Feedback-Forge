import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import "./styles/global.css";

import { Navbar } from './components/Nav';
import { Homepage } from './pages/Home';
import { Profilepage } from './pages/Profile';
import { Signuppage } from './pages/Signup';
import { Loginpage } from './pages/Login';

import { client } from './services/apolloClient';

function App() {
  return (
    <ApolloProvider client = {client}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/profile" element={<Profilepage/>}/>
          <Route path="/signup" element={<Signuppage/>}/>
          <Route path="/login" element={<Loginpage/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
    
  )
}

export default App
