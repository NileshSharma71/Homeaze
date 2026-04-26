import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopWorkers from '../components/TopWorkers'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <SpecialityMenu></SpecialityMenu>
      <TopWorkers></TopWorkers>
      <Banner></Banner>
    </div>
  )
}

export default Home