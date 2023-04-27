import React, {Component} from "react";
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import {Route} from "react-router-dom"

class Checkout extends Component{
    
    
/**
 * state= {
        ingredients:{
            bacon:0,
            cheese:0,
            meat:0,
            salad:0
        },
        price:0
        
    }
 * 
 * 
 * componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);  
        const ingredients = {};
        let price = 0 ;
        for(let param of query.entries()){
            if(param[0] === "price" ){
                price = param[1];
            }else{ingredients[param[0]] = +param[1]}   
        }         
        
        this.setState({ingredients:ingredients,price:price})
    }
 */
    

    cancelcheckoutHandler = ()=>{
        this.props.history.goBack();
        console.log("hi from cancel Button");
    }

    continuecheckoutHandler =()=>{
        this.props.history.replace("/checkout/contact-data");
        console.log("hi from continue Button")
    }



    render(){

        return(
            <div>
                <CheckOutSummary
                    ingredients = {this.props.ingredients}
                    cancelcheckout = {this.cancelcheckoutHandler}
                    continuecheckout={this.continuecheckoutHandler}
                />
                                {console.log("price  from checkout Containaer")}
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    component = {ContactData}
                />
            </div>
            
            
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        ingredients:state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);