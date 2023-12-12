// components/TableComponent.js
import React from 'react';
import { VStack,Center,Box,IconButton, ButtonGroup,useToast} from '@chakra-ui/react'
import { useTable, useSortBy, useFilters, usePagination,useGlobalFilter } from 'react-table';
import {ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon, ViewIcon } from '@chakra-ui/icons';
import Search from './search';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
const TableComponent = ({ data, columns }) => {
  
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize,globalFilter },
    gotoPage,
    pageCount,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, 
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
   
  );

  function formatUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); 
    return date.toLocaleString(); 
  }

  const safeGotoPage = (page) => {
    const safePage = Math.min(page, pageCount - 1);
    gotoPage(safePage);
  };

  const redirectToArticle = (articleLink) => {
    
    window.open(articleLink,'_blank');
  };

  

  return (
    <Center align="stretch" paddingTop={4}>
      <VStack spacing={2}>
      <Search filter={globalFilter} setFilter={setGlobalFilter} />
     <Box>
      <TableContainer>

      <Table {...getTableProps()} className="table">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                 <Td {...cell.getCellProps()}>
                   {cell.column.Header === 'Article' ? (
                     <IconButton
     
                     colorScheme='green'
                     aria-label='article'
                    
                     onClick={() => redirectToArticle(cell.value)}
                     
                      icon={<ViewIcon/>}
                    />
                    
             
            ) : cell.column.Header === 'Launch Time' ? (
              <span>{formatUnixTimestamp(cell.value)}</span>
            ) : 
            cell.column.Header === 'Video' ? (
              <IconButton

              colorScheme='red'
              aria-label='article'
             
              onClick={() => redirectToArticle(cell.value)}
              
               icon={<ViewIcon/>}
             />
             
      
     ) :
            
            (
              cell.render('Cell')
            )}
                 </Td>
                 
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      </TableContainer>

      </Box>

      
      <Box>
       
        <ButtonGroup gap='1'>

       <IconButton
     
     colorScheme='blue'
     aria-label='first-page'
     className='first-page'
     onClick={() => safeGotoPage(0)} 
     disabled={pageIndex === 0}
      icon={<ArrowLeftIcon/>}
    />
       

       <IconButton
      colorScheme='blue'
      aria-label='previous-page'
      className='previous-page'
      onClick={()=>safeGotoPage(pageIndex- 1)} 
      disabled={pageIndex === 0}
       icon={<ArrowBackIcon />}
     />

       <IconButton
      colorScheme='blue'
      aria-label='next-page'
      className='next-page'
      onClick={()=>safeGotoPage(pageIndex+1)} disabled={pageIndex === pageCount - 1}
       icon={<ArrowForwardIcon />}
     />
     
     <IconButton  
     colorScheme='blue'
     aria-label='last-page'
     className='last-page'
     onClick={() => safeGotoPage(pageCount- 1)} 
     disabled={pageIndex === pageCount - 1}
      icon={<ArrowRightIcon/>}
    />
    </ButtonGroup>        
      </Box>
      </VStack>
    </Center>
  );
};

export default TableComponent;
