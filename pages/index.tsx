import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/common/Footer'
import NavBar from '../components/common/NavBar'
import Feature from '../components/landingPage/Feature'
import Hero from '../components/landingPage/Hero'
import Pricing from '../components/landingPage/Pricing'
import Team from '../components/landingPage/Team'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>NUS Connect | NotAwakeStudio</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Hero />
      <div className="container mx-auto pt-2 text-center  ">
        <div className="container flex flex-col w-full items-center justify-center">
          <ul className="flex flex-col">
            <Link href="/dashboard">
              <li className="border-gray-400 flex flex-row mb-2">
                <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex items-center p-4">
                  <div className="flex flex-col w-auto h-10 justify-center items-center mr-4">
                    <h2 className="cursor-pointer bg-indigo-700 px-2 text-gray-200">Dashboard</h2>
                  </div>
                  <div className="flex-1 pl-1 md:mr-16">
                    <div className="font-medium dark:text-white">Yongliang</div>
                    <div className="text-gray-600 dark:text-gray-200 text-sm">Developer</div>
                  </div>
                </div>
              </li>
            </Link>
            <Link href="/quiz">
              <li className="border-gray-400 flex flex-row mb-2">
                <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                  <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <h2 className="cursor-pointer bg-indigo-700 px-2 text-gray-200">Quiz</h2>
                  </div>
                  <div className="flex-1 pl-1 md:mr-16">
                    <div className="font-medium dark:text-white">Yongliang</div>
                    <div className="text-gray-600 dark:text-gray-200 text-sm">Developer</div>
                  </div>
                </div>
              </li>
            </Link>
            <Link href="/forum">
              <li className="border-gray-400 flex flex-row mb-2">
                <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                  <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <h2 className="cursor-pointer bg-indigo-700 px-2 text-gray-200">Forum</h2>
                  </div>
                  <div className="flex-1 pl-1 md:mr-16">
                    <div className="font-medium dark:text-white">Jun Xiong</div>
                    <div className="text-gray-600 dark:text-gray-200 text-sm">Developer</div>
                  </div>
                </div>
              </li>
            </Link>
          </ul>
        </div>
        <Feature />
        <Team />
        <Pricing />
      </div>

      <Footer />
    </>
  )
}
