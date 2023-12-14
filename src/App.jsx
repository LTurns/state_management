import { useState, useMemo } from 'react'

// const logo = require('./assets/counter.png');

import counter from './assets/counter.png'
import namelist from './assets/name-list.png'
import reducernamelist from './assets/reducer-name-list.png'
import userform from './assets/user-form.png'

import { useReducer } from 'react';

import './App.css'

//useReducer takes two parameters (just like the reduce JS function)
// the first parameter is a function that takes a state and an action and returns the new state value based on the action (similar to a reducer - the function reduces)
// the second parameter is the initial state - any initial state value, just like useState.

// this shows how simple state changes can be - you do not need numerous different functions because the reducer does everything for you. This is a very nice approach:
// it's useful for complex object states

function UserForm() {
  const [state, dispatch] = useReducer((state, action) => ({
      ...state,
      ...action,
  }), {
    first: "",
    last: ""
  })
  return (
    <div>
      <input type="text"
      value={state.first}
      onChange={(e) => dispatch({first: e.target.value })}
      />

      <input type="text"
      value={state.last}
      onChange={(e) => dispatch({last: e.target.value })}
      />

      <div>
        First: {state.first} Last: {state.last}
      </div>
    </div>
  )
}

function ReducerNameList() {
  const [ state, dispatch ] = useReducer((state, action) => {
    switch(action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      case "ADD_NAME":
        return { ...state, names: [...state.names, state.name], name: ""}
    }
  }, {
    names: [],
    name: ""
  })

  return <div className="">
    <div>{state.names.map((name, index) => (
      <div key={index}>{name}</div>
    ))}</div>

    <input 
      type="text"
      value={state.name}
      onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value})} /> <br></br>

      <button
        onClick={() => dispatch({ type: "ADD_NAME" })}>
        Add Name
      </button>

      <div>Name = {state.name} </div>
  </div>
}

function Counter() {
  const [count, setCount] = useState(10);

  function addOne() {
    setCount(count + 1);
  }

  return (
  <div className='count'>
    <button onClick={addOne}>Count = {count}</button>
  </div>
  )
}

function NameList() {
  const [list, setList] = useState(["Jack", "Jill", "John"])
  const [name, setName] = useState(() => "Jack");

  const onAddName = () => {
    setList([...list, name])
    setName("");
  }

  return (
    <div>
      <ul>
        {list.map((name) => (
          <span key={name}>{name}, </span>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
  <br></br>
      <button onClick={onAddName}>
        Add Name
      </button>
    </div>
  )
}

function App() {
  return (
    <div class="container">
            <h1>State Management</h1>
      <div class="row">
        <div class="column">

      <h2>UseState</h2>
      <p>useState is an array, where the first index is the state, and the second is the setter function used to set that aforementioned state.</p>

      <p>useState returns an array with exactly two items:</p>

      The current state of this state variable, initially set to the initial state you provided.
      The set function that lets you change it to any other value in response to interaction.
      To update what’s on the screen, call the set function with some next state:

      <h4>Count Example:</h4>

      <img src={counter} />

      <Counter />

      <h4>NameList Example:</h4>

      <img src={namelist} />

      <NameList />
      </div>
      <div class="column">

      <h2>UseReducer</h2>

      <p>The useReducer hook is similar to useState, but gives us a more structured approach for updating complex values.</p>

<p>We typically use useReducer when our state has multiple sub-values, e.g. an object containing keys that we want to update independently.</p>

<h4>NameList Example:</h4>
<img src={reducernamelist} />
      <ReducerNameList />

      <h4>User Form Example:</h4>

      <img src={userform} />


      <UserForm />
    </div>
    </div>
    </div>
  )
}

export default App
