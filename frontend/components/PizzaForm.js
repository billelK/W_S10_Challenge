import React, {useReducer} from 'react'
import { useCreateOrderMutation } from '../state/pizzaApi'

const CHANGE_NAME = "CHANGE_NAME"
const SELECT_SIZE = "SELECT_SIZE" 
const CHECK_TOPPINGS = "CHOSE_TOPPINGS"
const RESET_FORM = "RESET_FORM"

const initialFormState = { // suggested
  fullName: '',
  size: '',
  Pepperoni: false,
  Greenpeppers: false,
  Pineapple: false,
  Mushrooms: false,
  Ham: false,
}

const reducer = (state,action) => {
  switch(action.type) {
    case CHANGE_NAME:
      return {...state, fullName: action.payload}
    case SELECT_SIZE:
      return {...state, size: action.payload}
    case CHECK_TOPPINGS:
      if (action.payload === "Pepperoni") return {...state, Pepperoni: !state.Pepperoni}
      if (action.payload === "Greenpeppers") return {...state, Greenpeppers: !state.Greenpeppers}
      if (action.payload === "Pineapple") return {...state, Pineapple: !state.Pineapple}
      if (action.payload === "Mushrooms") return {...state, Mushrooms: !state.Mushrooms}
      return {...state, Ham: !state.Ham}
    case RESET_FORM:
      return {...initialFormState}
  }
}

export default function PizzaForm() {
  const [state,dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, {error,isLoading}] = useCreateOrderMutation()

  const onInputChange = ({target: {value}}) => {
    dispatch({type: CHANGE_NAME, payload: value})
  }

  const onSelect = ({target: {value}}) => {
    dispatch({type: SELECT_SIZE, payload: value})
  }

  const onChecking = ({target: {name}}) => {
    dispatch({type: CHECK_TOPPINGS, payload: name})
  }

  const resetForm = () => {
    dispatch({type: RESET_FORM})
  }

  const onNewOrder = (e) => {
    e.preventDefault()
    const {fullName, size} = state
    const toppings = []

    if (state.Pepperoni) toppings.push("1")
    if (state.Greenpeppers) toppings.push("2")
    if (state.Pineapple) toppings.push("3")
    if (state.Mushrooms) toppings.push("4")
    if (state.Ham) toppings.push("5")


    createOrder({fullName,size,toppings})
    .unwrap()
    .then(res => {
      console.log(res)
      resetForm()
    }).catch(err => console.log(err))
    // restForm()
  }
  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>{error.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            value={state.fullName}
            onChange={onInputChange}
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select value={state.size} onChange={onSelect}  data-testid="sizeSelect" id="size" name="size">
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input onChange={onChecking} checked={state.Pepperoni} data-testid="checkPepperoni" name="Pepperoni" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input onChange={onChecking} checked={state.Greenpeppers} data-testid="checkGreenpeppers" name="Greenpeppers" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input onChange={onChecking} checked={state.Pineapple} data-testid="checkPineapple" name="Pineapple" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input onChange={onChecking} checked={state.Mushrooms} data-testid="checkMushrooms" name="Mushrooms" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input onChange={onChecking} checked={state.Ham} data-testid="checkHam" name="Ham" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
