import { useContext, useState } from 'react'
import Search from './components/Search'
import Stories from './components/Stories'
import Pagination from './components/Pagination'
import './App.css'

function App() {
  return (

    <div>
    <Search />
    <Stories />
    <Pagination />
    </div>

      
  )
}

export default App
