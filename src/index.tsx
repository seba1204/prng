// implement Pseudo-random Number Generators
// https://en.wikipedia.org/wiki/Pseudorandom_number_generator

// https://en.wikipedia.org/wiki/Linear_congruential_generator
// https://en.wikipedia.org/wiki/Lehmer_random_number_generator


import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
