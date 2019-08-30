import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
//import console = require('console');
//import { RNCamera } from 'react-native-camera'

//import Reactotron from 'reactotron-react-native';


export default class ProjetoLocaliza extends Component{
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
  
  componentDidMount(){
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut:20000,
      maximumAge:60 *60 * 24
    };
    this.setState({ready:false, error:null});
    //navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure, geoOptions);
    this.monitorarPosicao();
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
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
      
          this.setState({ location });
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }else{
      alert("Erro não localizou nada!")
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
