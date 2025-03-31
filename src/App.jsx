import React from "react"
import {BrowserRouter,Routes, Route} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import LoginPage from "./Components/Pages/LoginPage"
import SignUpPage from "./Components/Pages/SignUpPage"
import MainPage from "./layouts/MainPage"

function App() {
  const queryClient =new QueryClient()

  return (
    <QueryClientProvider client={queryClient} >
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/home" element={<MainPage />} />
      
    </Routes>
    
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
