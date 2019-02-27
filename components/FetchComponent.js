import React from 'react';
import { FlatList, Animated, Text, View, TextInput, Button,TouchableHighlight, ListView, Image, StyleSheet, Dimensions} from 'react-native';
import { LinearGradient } from 'expo';

var width= Dimensions.get('window').width;
var height= Dimensions.get('window').height;

export default class FetchComponent extends React.Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({
		rowHasChanged: (r1,r2) => r1 !== r2
	})

    this.state ={ isLoading: true,
    			 city: '',
    			todoDataSource: ds,
    			tempDataSource: '',
    			error: '',
    			color: "#119bd0",
    		}
  }

    _getWeather = () =>{
  	console.log(this.state.city)
  	var request_1_url = 'https://api.openweathermap.org/data/2.5/weather?q='+ this.state.city+ '&units=metric&appid=6947bedc28b782353d67cfb2c81d46ab';
    var substring = "clouds";
  	return fetch(request_1_url)
      .then((response) => response.json())
      .then((responseJson) => {
      	var resCode = responseJson.cod;
      	var currentTemp = 0;
      	if (resCode == 200){
      		var arrTemp = [];
	        console.log(responseJson.weather)
	        arrTemp.push(responseJson.main)
	        console.log(arrTemp)

	        this.setState({
	          isLoading: false,
	          dataSource: responseJson.weather,
	          tempDataSource: arrTemp,
	          error: ''
	        }, function(){

	        }),

	        console.log("printing from array temp" , arrTemp[0].temp)
	        if ( arrTemp[0].temp < 9){
	        	this.setState({
	        		color: "#0ea5a1"
	        	});
	        }else if ( 9 <= arrTemp[0].temp && arrTemp[0].temp <= 22){
	        	this.setState({
	        		color: "#B98300"
	        	});
	        }else if (22 < arrTemp[0].temp){
	        	console.log("color greater than 23")
	        	this.setState({
	        		color: "#ec5c1d"
	        	});
	        }
	     }else{
	     	this.setState({
	          error: "please enter a valid city name ",
	          city: ''
	        });
	     }
	     
      });    
  }

  render(){
	
    return(


    	<View>
           <LinearGradient
            colors={[this.state.color, "white"]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              height: height,
              width: width,
            
            }} >

            <Text style = {{top: 230, fontSize: 20, left: 20, color: 'red'}}> {this.state.error} </Text>
            <Text style = {{ top: 60, fontSize: 25, color: 'white', left: 30, fontWeight: 'bold', fontFamily: 'Helvetica'}}>Enter a city: </Text>
   			<TextInput
			    style={{ top: 80,height: 40, width: 240, borderColor: 'white', borderWidth: 1, marginTop: 0,  left: 30, color:'white'}}
			    onChangeText={(text) => this.setState({city:text})}
			    value= {this.state.city}
			  />

		  	<View style = {{position: 'absolute', top: 130, left: 285, width: 60, height: 40, fontFamily: 'Helvetica'}}>
			  	<Button 
				 onPress={this._getWeather}
				  title="Enter"
				  color="white"
				  fontSize= "25"
				  accessibilityLabel="Learn more about this purple button"
				/>
		    </View>

            <FlatList
            style = {{position: "absolute", marginTop: 1, marginBottom: 0, top:187, height: 300, width: 330}}
	        data={this.state.dataSource}
	        renderItem={({item}) => <Text style= {{fontSize: 35, color: 'white', left: 30,fontWeight: 'bold', fontFamily: 'Helvetica'}}>{item.description}</Text>}
	        keyExtractor={(item,index)=>index.toString()}
	        />

        	<View style = {{ marginLeft: 0, height: 280, width: 140,  top: 240, marginTop: 0, left: 210
        	}}>
		  		 <FlatList
		          data={this.state.dataSource}
		          renderItem={({item}) => <Image source={{uri: 'http://openweathermap.org/img/w/' + item.icon + '.png'}}
		         		style={{width: 100, height: 100}} />}
		          keyExtractor={(item,index)=>index.toString()}
		        />
		    </View>

		    <View style = {{height: 260, width: 149,  left: 26}}>
			    <FlatList
		        	data={this.state.tempDataSource}
		          	renderItem={({item}) => <Text style = {{fontSize: 30, color: '#1D9595', left: 15, fontWeight: 'bold' , fontFamily: 'Helvetica'}}>  {item.temp}&deg;C </Text>}
		 		    keyExtractor={(item,index)=>index.toString()}
		 		    scrollEnabled={false}
		        />
	        	<FlatList
	        	data={this.state.tempDataSource}
	          	renderItem={({item}) => <Text style ={{fontSize: 21, color: '#1D9595', left: 15, fontWeight: 'bold' , fontFamily: 'Helvetica'}}>Min: {item.temp_min}&deg;C    Max: {item.temp_max}&deg;C </Text>}
	 		    keyExtractor={(item,index)=>index.toString()}
	 		   	scrollEnabled={false}
	        	/>
	    
	        </View> 
            </LinearGradient>
        </View>
    );
  }
}


const styles = StyleSheet.create({
	imageCloud: {
		width: 30,
		height: 30,
		position: 'absolute'
	}


})