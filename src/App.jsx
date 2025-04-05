import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MainPage from "./layouts/MainPage"
import LoginForm from "./Components/Forms/LoginForm"
import SignUpForm from "./Components/Forms/SignUpForm"
import { MusicProvider } from "./Components/Store/Music"
import ProtectedRoute from "./Routes/ProtectedRoute"
import useAuth from "./Routes/useAuth"
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'


function App() {
  const queryClient = new QueryClient()
  const { user, isLoading } = useAuth()
  if (isLoading) {
    return <Waveform
      size="35"
      stroke="3.5"
      speed="1"
      color="black"
    />
  }

  return (
    <QueryClientProvider client={queryClient} >
      <MusicProvider>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/*"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              } />

          </Routes>

        </BrowserRouter>
      </MusicProvider>
    </QueryClientProvider>
  )
}

export default App
