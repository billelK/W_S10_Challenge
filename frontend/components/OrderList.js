import React, {useState}from 'react'
import { useGetHistoryQuery } from '../state/pizzaApi'

export default function OrderList() {
  const [filter, setFilter] = useState("All")
  const {data: orders} = useGetHistoryQuery()
  // let orders = []
  const hundler = (e) => {
    const {name} = e.target
    setFilter(name)
  }
  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders && 
          orders.filter(or => {
            if (filter === "All") return or
            else if (or.size === filter) return or
          }).map(order => {
            return (
              <li key={order.id}>
                <div>
                  {`${order.customer} ordered a size ${order.size} 
                  with ${order.toppings ? order.toppings.length : "no"} toppings`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${filter === size ? ' active' : ''}`
            return <button
              onClick={hundler}
              name={size}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
