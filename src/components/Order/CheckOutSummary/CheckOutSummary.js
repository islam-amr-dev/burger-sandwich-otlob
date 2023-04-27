import React from "react"
import Burger from "../../Burger/Burger";
import classes from './CheckOutSummary.css'
import Button from '../../UI/Button/Button'

const CheckOutSummary = (props)=>{

    return(
        <div className = {classes.CheckOutSummary}>
            <h1>bona apete</h1>
            <div style ={{width:"100%", margin:"auto"}}>
                   <Burger ingredients ={props.ingredients} price = {props.price} />
                      
            </div>
            {console.log("price  from checkoutsummay")}
            {console.log(props.price)}
            <Button
                btnType = "Danger"
                clicked = {props.cancelcheckout }
            >Cancel</Button>
            <Button
                btnType = "Success"
                clicked = {props.continuecheckout}
            >Continue</Button>
        </div>
    )
}

export default CheckOutSummary;
