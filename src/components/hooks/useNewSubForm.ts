import { useReducer } from "react"
import {sub} from '../types'
interface FormSubState {
    inputValue: sub
  }

  const initial_state = {
    nick: '',
    subMonths: 0,
    avatar: '',
    description: '',
  }
  type FormReducerAction = {
    type: 'change_value',
    payload: {
      inputName: string,
      inputValue: string,
    }
  } | {
    type: 'clear'
  }

  
  
const formReducer = ( state: FormSubState['inputValue'], action: FormReducerAction) => {
    switch(action.type){
      case 'change_value': 
      const {inputName, inputValue} = action.payload
      return{
        ...state,
        [inputName]: inputValue
      }
      case 'clear':
        return initial_state
    }
  }

  const useNewSubForm = () => {
    return useReducer( formReducer, initial_state)
  }

  export default useNewSubForm