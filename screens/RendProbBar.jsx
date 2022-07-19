  
import React from "react"; 
import { useState, useEffect } from 'react';
import { COLORS,   SIZES, icons   } from '../constants'; 
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Animated,
    Platform
} from 'react-native';
 
import { VictoryLabel, VictoryBar, VictoryGroup , VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
// import { Svg,Line } from 'react-native-svg'; 
const RendProbBar = props => { 
    const  data = props.data  ;  
    const [brData, setBrData] = useState([]);    
    const type =[COLORS.darkgray ,COLORS.gray ,COLORS.red] 

    useEffect(() => { 
    if(data.length > 0 ){ 
      let arr =[]
      for (let i = 0; i < data[0].length; i++) {
        const y = data.map((item) => {  
         console.log("item[item[i]item[i]]",item[i]);  
             return {
               x:item[i].x ,
               y:item[i].y ,
               z: item[i].z ,
               item:item[i].item
             }
        })
        arr.push(y) 
      } 
      setBrData(arr);    
      console.log("item   wwww  ww",arr);  
       }
      },[data]) 
    return (

     <View  
        style={{   
            flex: 1,
            margin: 5, 
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...style.shadow,  paddingTop:20, alignItems: 'center', justifyContent: 'center' }}>
 
   
         <VictoryChart  padding={{ top: 35, bottom: 30, left: 45, right: 10 }}
             colorScale={"qualitative"}

      theme={VictoryTheme.material} 
      height={220} 
      domainPadding={{ x: 70 }}>
           <VictoryAxis
           
        style={{
          tickLabels: {
            fontSize:10
          }
        }}
      />
    <VictoryAxis
        dependentAxis 
        style={{ tickLabels: {fontSize: 10} }}
      
      />
<VictoryGroup 
  offset={25}
 colorScale={type}
 animate={{
    duration: 1000,
    onLoad: { duration: 1000 },
  }}
  style={{
    data: {
      fillOpacity: 0.7
    }
  }}

>   
 {   brData &&
   brData.map((s)=>{
      return(  
      <VictoryBar  
      barRatio={1}
      cornerRadius={2}
      alignment='middle'
      labels={({ datum }) => (` ${datum.z}% ${datum.item}`) }
      labelComponent={
        <VictoryLabel   angle={30}      dx={15}  textAnchor="end"
        verticalAnchor="start"/>
      }
      data= {s}
       /> 
       )
      })   
      
  }
</VictoryGroup>
</VictoryChart> 
   {/* { (data != undefined) && 
   ( data.length >0 )&&  
    <Text> 
       {   
   data.problems.map((s)=>{
    console.log("aaaaaaaaaaaaaa",s.x);   
      return(  
        <Text style={{ color: 'rgba(245, 215, 145, 0.8)' }} > {s.x} </Text>  
        )
      })   
      
  }
   </Text>
  } */}
        </View>  
  
    )}
    
    const style = StyleSheet.create({
      shadow: {
          shadowColor: "#000",
          shadowOffset: {
              width: 2,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
      }
  })  
 export default RendProbBar;