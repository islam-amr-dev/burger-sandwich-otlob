import React from "react";
import classes from './Order.css'


const Order = (props)=>{
 
    const ingredients =[];

    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        })
    }

    let ingredientsOutput = ingredients.map(ig=>{
        return <span 
            style = {{
                textTransform : "capitalize",
                border: "1px solid #ccc",
                display:"inline-block",
                margin:"0 8px",
                padding:"5px"
            }}
            key = {ig.name}
            >{ig.name} {ig.amount}
        </span>
    })
    return(

        
        <div className ={classes.Order}>
            {ingredientsOutput}
            <p>the price is <strong>{props.price}</strong></p>
        </div>
    )
}

export default Order;