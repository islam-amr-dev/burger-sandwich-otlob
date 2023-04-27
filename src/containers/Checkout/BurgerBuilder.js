import React, { Component , Fragment } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../AxiosOrder';
import * as burgerBuilderActions from '../../store/actions/index.js'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
    }


    // after the component is mounted get burger data from the server  

    componentDidMount(){         
        this.props.onInitIngredients();
    }


    //update the purshase property state 

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 ;
    }

    //adding ingredients throught a handler then pass it as refrence for the BuildControls props 

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
     /*   
        this.setState({loading:true});
        const order = {
            
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer:{
                name:"islam",
                address:{
                    street:"testStreet",
                    zipcode:"testzipcode",
                    country:"cairo"
                },
                email:"testemail@gmail"
            },
            deliveryMethod:"faster than anyone"
        }

        axios.post('/orders.json',order)
        .then(response => {this.setState({loading:false, purchasing:false})})
        .catch(error => {this.setState({loading:false, purchasing:false})})
        */
       /**
        * const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" +encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice )
        const queryString = queryParams.join("&")
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });
        * 
        */
       
        this.props.history.push("/checkout");

    }

    
    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        
        let orderSummary = null ; 
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p>:<Spinner /> 

        if(this.props.ingredients){
            console.log("hellow from burger condition")
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} totalPrice = {this.props.totalPrice} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}
                    />
                </Auxiliary>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />

        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                { burger}
            </Fragment>
        );
    }   
}

const mapStateToProps = state =>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        error:state.error
     }
}

const mapDispatchToProps = dispatch=>{
    return {
        onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients())       
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));