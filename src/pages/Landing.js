// components/LandingPage.js
import React, { useEffect, useState } from 'react';
import Service from '../service';
import TableComponent from '../components/TableComponent';
import { Spinner,Center } from '@chakra-ui/react'

const LandingPage = () => {
  const [launchData, setLaunchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Service.getLaunchData();
        setLaunchData(data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    
    { Header: 'Flight NO', accessor: 'flight_number' },
    { Header: 'Mission ', accessor: 'mission_name' },
    { Header: 'Rocket Type', accessor: 'rocket.rocket_type' },
    { Header: 'Launch Year', accessor: 'launch_year' },
    { Header: 'Rocket ', accessor: 'rocket.rocket_name' },
    { Header: 'Launch Site', accessor: 'launch_site.site_name' },
    { Header: 'Launch Time', accessor: 'launch_date_unix' },
    { Header: 'Article', accessor: 'links.article_link'},
    { Header: 'Video', accessor: 'links.video_link'}

   
  ];

  return (
    <div>
      
     {launchData.length > 0 ?  <TableComponent data={launchData} columns={columns} />
     :
     <Center paddingTop={5}>
     <Spinner 
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
</Center>
 } 
    </div>
  );
};

export default LandingPage;
