import React, { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/FormSub';
import { List } from './components/List';
import {sub, SubsResponseFromApi} from './components/types'

interface appState {
  subs: Array<sub>,
  newSubsNumber: number,
}

function App() {
  const [subs, setSubs] = useState<appState['subs']>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<appState['newSubsNumber']>(0);
  
  useEffect( ()=> {

    const fetchSubs = (): Promise<SubsResponseFromApi> => {
      return fetch('http://localhost:3001/subs')
      .then(res=>res.json())
    }

    const mapFromApitToSubs = (apiResponse: SubsResponseFromApi): Array<sub> => {
      return apiResponse.map(subFromApi => {
        const {
          nick,
          profileUrl: avatar,
          months: subsMonths,
          description,
        } = subFromApi

        return {
          nick, 
          description,
          avatar, 
          subsMonths,
        }
      })
    }

    fetchSubs()
    .then(apiSubs => {
      const subs = mapFromApitToSubs(apiSubs)
      setSubs(subs)
    })

  }, [])
   
  return (
    <div className="App">
      <h1>midu subs</h1>
     <List subs={subs}/>
     <Form onNewSub={setSubs}/>
    </div>
  );
}

export default App;
