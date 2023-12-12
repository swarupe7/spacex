const Service = {
    getLaunchData: async () => {
      try {
        var response = await fetch('https://api.spacexdata.com/v3/launches');
       const data=await response.json();
       
        return data;
      } catch (error) {
        console.error('Error fetching SpaceX launch data:', error);
        throw error;
      }
    },
  };
  
  export default Service;
  