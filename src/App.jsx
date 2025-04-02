import React from "react"
import {BrowserRouter,Routes, Route} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import MainPage from "./layouts/MainPage"
import LoginForm from "./Components/Forms/LoginForm"
import SignUpForm from "./Components/Forms/SignUpForm"
import TrackCard from "./Components/Forms/TrackCard"

function App() {
  const queryClient =new QueryClient()

  return (
    <QueryClientProvider client={queryClient} >
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/sign-up" element={<SignUpForm />} />
      <Route path="/*" element={<MainPage />} />
      
    </Routes>
    
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
