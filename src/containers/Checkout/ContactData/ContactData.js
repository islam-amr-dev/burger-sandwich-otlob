import React, {Component} from "react";
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../AxiosOrder";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component{
    
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:"text",
                    placeholder:"Your Name"
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:"textarea",
                    placeholder:"Your Street Address"
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:"number",
                    placeholder:"Your Postal"
                },
                value:'',
                validation:{
                    required:true,
                    maxLength:5,
                    minLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:"text",
                    placeholder:"Your Country Name"
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:"email",
                    placeholder:"Your Email"
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:"fastest", displayValue:'Fastest'},
                        {value:"cheapst", displayValue:"Cheapest"}
                    ]
                },
                value:'',
                validation:{},
                valid:true
            },
        },
        loading:false,
        formIsValid:false
        

    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value  
        }
        const order = {            
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            orderData:formData
            
        }

        axios.post('/orders.json',order)
        .then(response => {
            this.props.history.push('/')
            this.setState({loading:false})
        })
        .catch(error => {this.setState({loading:false})})
    }

    checkValidity =(value,rules)=>{
        let isValid = true;
        
        if(!rules.required){
            return true
        }

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        if(rules.minLength){
            isValid = value.length <= rules.minLength && isValid
        }



        return isValid;
    }

    changeInputHandler = (event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedElementForm = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedElementForm.value = event.target.value;
        updatedElementForm.valid = this.checkValidity(updatedElementForm.value,updatedElementForm.validation)
        updatedElementForm.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElementForm;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        console.log(updatedElementForm)
        this.setState({orderForm:updatedOrderForm,formIsValid})
    }
    
    render(){
        
        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (
            
            <form onSubmit = {this.orderHandler} >
                {formElementsArray.map(formElement => (
                    <Input 
                        key = {formElement.id}
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidat = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed ={(event)=>this.changeInputHandler( event,formElement.id)}
                    />
                ))}
                <Button btnType = 'Success' disabled = {!this.state.formIsValid} >Order</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner/> ;
        }

        return(
            <div className = {classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form} 
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return { 
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)