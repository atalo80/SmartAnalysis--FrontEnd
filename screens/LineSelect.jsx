import React from "react";
import { useState, useEffect } from 'react'; 
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Moment from 'moment';
import LineChart from './LineChart';
import { COLORS, FONTS, SIZES, icons   } from '../constants'; 

 
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

import { VictoryPie, VictoryBar, VictoryGroup , VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
// import { Svg,Line } from 'react-native-svg'; 

  const LineSelect = props => {  
  const options= props.data[1];  
  const [selectedItems, setSelectedTeams] = useState([]) 
  const [dataTosand, setdataTosand] =  useState(null) 
  const [data, setdatad] = useState([]);
  const x= props.data[0]; 
   const [viwe, setViwe] =  useState(x[0].name);  
  const [selectedCategory, setSelectedCategory]  = useState(data); 

  const newlist = options.map((obj)=>{  
    return  {   
    item :  obj ,
    id :  obj ,
    }

 }) 
 useEffect(() => { 
  
  if(x[0]){ 
    (x).map((item) => { 
       let newP =[];
     (item.problems).map((i) => {  
      let iy=(i.twitte).sort((a, b) => (new Date(b.date) )- (new Date(a.date)));
      console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuu",iy) 
      newP.push(iy)
      })  
      setdatad(oldArray  => [...oldArray , { id: item.id , name:item.name ,twitte :item.twitte , problems:item.problems }])
       
         console.log("s[problemsproblemsproblemsproblems.s]",newP);  
      }) 
   }
 },[x])

   useEffect(() => {  
    console.log("selectedItems]", selectedItems);  
    if(selectedCategory[0]!== "undefined" && selectedCategory[0] != null   )
    {   
 
    console.log("filerrrrr-------------]", selectedCategory[0].problems.filter((r) => { return selectedItems.includes(r.x)})); 
     let dateArr = ( selectedCategory[0].problems.filter((r) => { return selectedItems.includes(r.x)}) ).map((i) => {
      console.log("11111111-----xxxxxxxxxxxx:::::::::::---------]", i.x )   
      return  {
        x: i.x,
        y:  i.twitte,
      }
    })  
    const ArrCoun ={}; 
    console.log("dateArr-----xxxxxxxxxxxx:::::::::::---------]", dateArr ) 
    const fdata = dateArr.map((i)=>{  
      (i.y).forEach(element => {
        const d = new Date(element.date);
      let format = Moment(d).format('YYYY/MM') 
      ArrCoun[format] = (ArrCoun[format] || 0) + 1  
    }); 
 
  })
  console.log("ArrCoun:::::::::::---------]", ArrCoun )  
  let  x = Object.keys(ArrCoun).map((element) => {
    return  {
      x:element,
      y: ArrCoun[element],
    }  
  }); 
  
  console.log("fdata:::::::::::---------]", x )  
   setdataTosand(x) ;   
}
   
else  {console.log("else]", dataTosand);  } 
console.log("dataTosand]", dataTosand);  
      
   },[selectedItems]);
  
  const onSelectedNewChange = (selectedItems) => {
   let maxItems = 1
      if ( selectedItems.length > maxItems ) {     
          return;     }     
       setSelectedTeams(selectedItems)   
 }  
 function addBTN() {
  console.log("selectedCategory ",selectedCategory) 
  const renderItem = ({ item }) => (  
      <TouchableOpacity
              onPress={(() =>{  
                  setSelectedCategory([item])
                  setViwe(item.name) 
                 
               })
          }
             
              style={{
                  flex: 1,
                  flexDirection: 'row',
                  margin: 5,
                  borderRadius: 5,
                  paddingVertical: SIZES.radius,
                  paddingHorizontal: SIZES.padding, 
                  backgroundColor: (viwe ==item.name)?  COLORS.secondary :COLORS.white,
                  ...style.shadow,
              }}
          >
          <Image
              source={item.icon}
              style={{
                  width: 20,
                  height: 20,
               
              }}
          />
          <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>{item.name}</Text>
      </TouchableOpacity>
    
  )

  return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
         
              <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => `${item.id}`}
                  numColumns={2}
              />
      </View>
  )

}  


       return (  
      <View>   
        {addBTN() }
        
       {  <View> 
              <SectionedMultiSelect 
                    items={newlist}
                    displayKey="item"
                    uniqueKey="item"
                    showDropDowns={true}
                    readOnlyHeadings={false}
                    IconRenderer={Icon}
                    selectText="Select Feature"
                    onSelectedItemsChange={onSelectedNewChange}
                    selectedItems={selectedItems}
                    showChips={true}
                  />   
                   { ( dataTosand !== "undefined") &&( dataTosand!= null  ) && 
                          <View>  
                      <LineChart  data={dataTosand}/>
           
             </View>  
             
             }    

          </View> }
     </View> ) 

}
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
export default LineSelect