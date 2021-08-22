import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Button, SafeAreaView, Platform, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { getRandomArbitrary, randomizedOperationFuncs, randomizedOperationNumbers, shuffleArray } from './gameLogic';
import {
  evaluate,
} from 'mathjs'

const operationEval = (leftHandSide, op, rightHandSide) => {
  const result = evaluate(`${leftHandSide} ${op} ${rightHandSide}`)
  return result
}



const GameScreen = () => {
    const [numbers, setNumbers] = useState({})
    const [numsInCaseSubtraction, setNumsInCaseSubtraction] = useState()
    const [operationResult, setOperationResult] = useState()
    const [operation, setOperation] = useState()
    const [shuffledArrayChoices, setShuffledArrayChoices] = useState([])


     const choices = [operationResult, 5, 2]

    
    const nums = randomizedOperationNumbers()
    const randOp = randomizedOperationFuncs()
    useEffect(() => {
      // IN CASE LEFT-HAND-SIDE NUMBER IS LESS THAN RIGHT-HAND-SIDE ONLY IN SUBTRACTION
      if(nums.leftHandSideNumber && nums.rightHandSideNumber) {
          if(nums.leftHandSideNumber < nums.rightHandSideNumber && randOp === '-') {
              const leftNum = nums.leftHandSideNumber
              const rightNum = nums.rightHandSideNumber
              nums.leftHandSideNumber =  rightNum
              nums.rightHandSideNumber = leftNum
              setNumbers(nums)
          }
          else {
            setNumbers(nums) 
          }
      } 
      setOperation(randOp)  
    }, [])
    
    useEffect(() => {
      if(numbers.leftHandSideNumber && numbers.rightHandSideNumber) {
         const opResult = operationEval(numbers.leftHandSideNumber , operation, numbers.rightHandSideNumber)
         setOperationResult(opResult)
      }
      for (let i = 0; i < choices.length; i++) {
          if(choices[i] !== NaN && choices[i] !== undefined) {
            const shuffledArray = shuffleArray(choices)
            setShuffledArrayChoices(shuffledArray)
          } 
          return 
      }
  }, [numbers])


   setTimeout(() => {
      console.log(shuffledArrayChoices);
   }, 1000);




    return ( 
        <SafeAreaView style={styles.container}>
               <View style= {gridStyles.playerTwoGrid}>    
                  <View style={gridStyles.operation}>
                           <Text style={{color: 'white'}}> {numbers.leftHandSideNumber} {''}

                              {operation === '*' ? '×' : 
                               [
                                 operation === '/' ? '÷': operation
                               ]
                              
                              } 
                              {' '}                              
                               {numbers.rightHandSideNumber} 
                             </Text>
                        </View>   

                   <View style={gridStyles.choiceButtonContainer}>
                  {choices.map(choice => <TouchableOpacity style= {gridStyles.choiceButton}>
                         <Text style={{color: 'white'}}> {choice}  </Text>
                   </TouchableOpacity>)}
                  </View>   

                  <View style={gridStyles.counter}>

                  </View>

                
              </View> 


       {/* ---------------------   -------------- PLAYER ONE -------------------------------------- */}           
         <View style={styles.midScreenMenu}>
            <TouchableOpacity style={styles.pauseButton}>
                        <FontAwesomeIcon icon={ faPause } size={ 36 } color={'white'} />
            </TouchableOpacity>
       </View>
              

          <View style={styles.playerOneContainer} >

             

              <View style= {gridStyles.playerOneGrid}>
                 <View style={gridStyles.operation}>
                           <Text style={{color: 'white'}}> {numbers.leftHandSideNumber} {''}

                              {operation === '*' ? '×' : 
                               [
                                 operation === '/' ? '÷': operation
                               ]
                              
                              } 
                              {' '}                             
                               {numbers.rightHandSideNumber} </Text>
                        </View> 

                  <View style={gridStyles.choiceButtonContainer}>
                  {choices.map(choice => <TouchableOpacity style= {gridStyles.choiceButton}>
                         <Text style={{color: 'white'}}> {choice}  </Text>
                   </TouchableOpacity>)}
                  </View>

                  <View style={gridStyles.counter}>

                  </View>              
              </View> 
          </View>             
      </SafeAreaView> 



    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'space-between',    
      paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
      height: '10%'
    },   
    
    playerOneContainer: {  
        flex: 1,    
        backgroundColor: '#14A9B2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '47.5%'

    },
    
    playerTwoContainer: {
          backgroundColor: '#14A9B2',
          alignItems: 'center',
          justifyContent: 'center',  
          width: '100%',
          height: '47.5%',

        },

        midScreenMenu: {
            backgroundColor: '#df5745',
            alignItems: 'center',
            justifyContent: 'center',  
            width: '100%',
            height: '7%',
  
          },
        pauseButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '20%',
            backgroundColor: 'orange', 
            color: 'white',
            borderRadius: 12
        }

    });


    const gridStyles = StyleSheet.create({
      playerOneGrid: {
        flex: 1, 
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly', 
        alignItems: 'center' 
      }, 
      playerTwoGrid: {
        flex: 1, 
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        transform: [{rotate: '180deg'}],
        backgroundColor: '#14A9B2'
      },

      operation: {
         width: '70%',
         height: 50,
         backgroundColor: "#313f4d",
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 10
      },
      choiceButtonContainer: {
          width: '80%',
          height: 60,
          justifyContent: 'space-evenly',
          flexDirection: 'row'
      }, 
      choiceButton: {
        width:  80,
        height: 60,
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5    
      },

      counter: {
        width:  80,
        height: 60,
        backgroundColor: "#ed864a",
        alignItems: 'center',
        justifyContent: 'center',  
        borderRadius: 6    
      }
    })
    

export default GameScreen




{/* <View style={styles.childOne} >  
<TouchableOpacity style={styles.pauseButton}>
   <FontAwesomeIcon icon={ faPause } size={ 36 } color={'white'} />
</TouchableOpacity>

</View> */} 