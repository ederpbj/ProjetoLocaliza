//import React, { Component } from 'react';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
//import console = require('console');
//import { RNCamera } from 'react-native-camera'

//import Reactotron from 'reactotron-react-native';

import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';


export default class ProjetoLocaliza extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ready:false,
      where: {lat: null, long:null},
      error:null
    };

    this.pegarPosicao = this.pegarPosicao.bind(this);
    this.monitorarPosicao = this.monitorarPosicao.bind(this);

    
  }

  async componentWillMount() {
    await requestLocationPermission()
    }
  
  componentDidMount() {
    // Instead of navigator.geolocation, just use Geolocation.
    if (Geolocation) {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }else{
      alert("Não tem permissão");
    }
}

  geoSuccess = (position) =>{
    console.log(position.coords.latitude);

    
    this.setState({
      ready:true,
      where: {lat: position.coords.latitude, long:position.coords.longitude}
    })
  }

  geoFailure = (err)=>{
    this.setState({error: err.message});
  }

  pegarPosicao(){
    //Teste1
    //if(navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition)
    /* if(navigator )
    {
      navigator.geolocation.getCurrentPosition((data)=>{
        //alert("Pegou a localização!");
        alert(JSON.stringify(data));
      }, ()=>{
        alert("Deu erro!");
      });
    }else{
      alert("navigator.geolocation não localizado!")
    } */

    //Teste2
    /* if(navigator){

        navigator.geolocation.getCurrentPosition(function(position){
      
        alert(position);
      
    }, function(error){
      
        alert(error);
      
      })
      
      }else{
      
        alert('ops');
      
      } */

      //Teste3
      /* 
      Reactotron.log('hello rendering world')
      if(navigator)
    {
      navigator.geolocation.getCurrentPosition((data)=>{
        //alert("Pegou a localização!");
        alert(JSON.stringify(data));
      }, ()=>{
        alert("Deu erro!");
      });
    }else{
      alert("navigator.geolocation não localizado!")
    }
     */
    
  }
  
  monitorarPosicao(){
    if(Geolocation){
      console.log("PASSOU AQUI!")
      Geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
      
          this.setState({ location });
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }else{
      console.log("Erro não localizou nada!");
      console.log(Geolocation);
    }
  }

  async requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      alert("You can use the location");
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}

  render(){
    return(
      <View style={styles.container}>
        <Button title="Pegar Posição" onPress={this.pegarPosicao} />
        <Button title="Monitorar Posição" onPress={this.monitorarPosicao} />

        <View style={styles.container}>
          { !this.state.ready && (
            <Text style={styles.big}>Using Geolocation in React Native</Text>
          )}
          
          { this.state.error && (
            <Text style={styles.big}>{this.state.error}</Text>
          )}
          
          { this.state.ready && (
            <Text style={styles.big}>{
              `Latitude: ${this.state.where.lat}
              Longitude: ${this.state.where.long}`
            }
            </Text>
          )}


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  }
});
