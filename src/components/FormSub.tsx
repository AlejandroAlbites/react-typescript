import React, { useReducer, useState } from 'react'
import useNewSubForm from './hooks/useNewSubForm'
import {sub} from './types'

interface FormProps {
  onNewSub: React.Dispatch<React.SetStateAction<sub[]>>
}

export const Form = ( {onNewSub}: FormProps ) => {
  
  const [inputValue, dispatch] = useNewSubForm()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onNewSub(sub=>([...sub, inputValue ]))
      dispatch( {type: 'clear'})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'change_value',
        payload: {
          inputName: e.target.name,
          inputValue: e.target.value
        }
      })
    }
  
    const handleClear = () => {

      dispatch( {type: 'clear'})
    }

  return (
    <div>
        <form onSubmit={handleSubmit}> 
            <input onChange={handleChange} type='text' name="nick" placeholder='nick' />
            <input onChange={handleChange} type='text' name="subsMonths" placeholder='subsMonths' />
            <input onChange={handleChange} type='text' name="avatar" placeholder='avatar' />
            <input onChange={handleChange} type='text' name="description" placeholder='description' />
            
            <button onClick={handleClear} type='button'>Clear</button>
            <button type='submit'>Save new sub</button>

        </form>
    </div>
  )
}
