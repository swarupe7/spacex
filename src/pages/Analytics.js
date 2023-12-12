import React,{useState,useEffect} from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line,Pie } from "react-chartjs-2";
import Service from '../service';
import { Spinner,Center } from '@chakra-ui/react';


import "./style.css";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Analytics = () => {

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
 
 
  var result=launchData.reduce(function(acc,data){
    if(data.launch_success){
      acc.success++;
    }else{
      acc.failure++;
    }
    return acc;

  },{ success: 0, failure: 0 })

  
  var rocket=launchData.reduce(function(acc,data){
    if(!acc[data.rocket.rocket_id]){
      acc[data.rocket.rocket_id]=1;
    }else{
      acc[data.rocket.rocket_id]++;
    }
    return acc;

  },{});

  var rocketKeys=Object.keys(rocket);
  var rocketVal=rocketKeys.map((data)=>rocket[data]);


  var yearData = launchData.reduce(function(acc, data) {
    var year = data.launch_year;
  
    if (!acc[year]) {
      acc[year] = {
        year: year,
        success: 0,
        failure: 0
      };
    }
  
    if (data.launch_success) {
      acc[year].success++;
    } else {
      acc[year].failure++;
    }
  
    return acc;
  }, {});

var resultArray = Object.values(yearData);



var rocketData = launchData.reduce(function(acc, data) {
  var roc = data.rocket.rocket_id;

  if (!acc[roc]) {
    acc[roc] = {
      roc:roc,
      success: 0,
      failure: 0
    };
  }

  if (data.launch_success) {
    acc[roc].success++;
  } else {
    acc[roc].failure++;
  }

  return acc;
}, {});

var rocketArray = Object.values(rocketData);




 



 

  return (
    <>
     {
      launchData.length > 0 ? (

        <div className="App">
        <div className="dataCard Card">
          <Line 
            data={{
              labels: resultArray.map((data) => data.year),
              datasets: [
                {
                  label: "Success",
                  data: resultArray.map((data) => data.success),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Failure",
                  data: resultArray.map((data) => data.failure),
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Year Wise Performance",
                },
              },
            }}
          />
        </div>

        <div className="dataCard Card">
          <Bar  
            data={{
              labels: rocketArray.map((data) => data.roc),
              datasets: [
                {
                  label: "Success",
                  data: rocketArray.map((data) => data.success),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Failure",
                  data: rocketArray.map((data) => data.failure),
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Rocket Wise Performance",
                },
              },
            }}
          />
        </div>
  
        <div className="dataCard leftCard">
          <Pie 
            data={{
              labels: rocketKeys.map((data) => data),
              datasets: [
                {
                  label: "Count",
                  data: rocketVal.map((data) => data),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Rocket Launch Count",
                },
              },
            }}
          />
        </div>
  
        <div className="dataCard rightCard">
          <Doughnut
            data={{
              labels: ['success' ,'Failure'],
              datasets: [
                {
                  label: "Count",
                  data: [result.success, result.failure],
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)", 
                    "rgba(253, 135, 135, 0.8)",
                  ],
                  borderColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Launch Result Chart",
                },
              },
            }}
          />
        </div>
      </div>
      ):
      
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
        
    </>
  );
};

export default Analytics;





