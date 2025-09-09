import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto'>No.1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search,Apply & <br />Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id perspiciatis magni adipisci, illum nihil earum?</p>
<div className='flex w-[40%] shadow-xs border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto h-12'>
    <input type="text" placeholder='Find your dream jobs' className='outline-none border-none w-full h-full ' />
    <Button className={"rounded-r-full h-full w-16"}>
        <Search />
    </Button>
</div>
        </div>
    </section>
  )
}

export default HeroSection