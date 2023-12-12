import React from 'react';
import {Input } from '@chakra-ui/react'

const Search = ({filter,setFilter}) => {
  return (
    <>
        
        <Input value={filter || ""} placeholder="Search here " onChange={(e)=>setFilter(e.target.value)} />
    </>
  )
}

export default Search;