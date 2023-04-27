import React,{Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler =(WrappedComponent , axios)=>{

    return class extends Component{
        constructor(){
            super()
            axios.interceptors.response.use(res => res , error => {
                this.setState({showError:error})
           })

           axios.interceptors.request.use(req =>{
               this.setState({showError:null})
               return req;
           })
        }
        state = {
            showError : null
        }

        

         errorConfirmedHandler = ()=>{
             this.setState({showError:null})
         }
        render(){

            
            return(
                <Auxiliary>
                    
                    <Modal show = {this.state.showError}  modalClosed = {this.errorConfirmedHandler}>
                        {this.state.showError ? <div> <p>sorry server is under maintainence</p> </div> : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                        
                    
                </Auxiliary>
                

            )
        }

    }
}

export default withErrorHandler ;