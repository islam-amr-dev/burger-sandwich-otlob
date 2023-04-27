import * as actionTypes from './actionTypes.js'
import axios from '../../AxiosOrder'

export const addIngredient = (ingName)=>{
    console.log("addIngredient ")
    return{
        
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingName 
    }
}

export const removeIngredient = (ingName)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingName
    }
}

export const setIngredients = (ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngrdientsFailed = ()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = ()=>{
    return dispatch=>{
        
        axios.get("https://burger-sandwich-otlob.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch( err => {
            dispatch(fetchIngrdientsFailed())
        })

    }
}