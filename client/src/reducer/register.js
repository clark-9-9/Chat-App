
export const Action = {
    Progress: { width:"57%" }, 

    First_Inputs_Visibility: {
        visibility: "visible",
        opacity: 1,
        transform: "translateX(0%)"
    },

    Second_Inputs_Visibility: {
        visibility: "hidden",
        opacity: 0,
        transform: "translateX(100%)"
    },

    Prev_Btn_Visibility: {
        visibility: "hidden",
        opacity: 0
    },

    Next_Btn_Visibility: {
        visibility: "visible",
        opacity: 1
    },

    Set_Name: {
        Name:"",
    },

    Set_Email: {
        Email:"",
    },

    Set_Password: {
        Password:"",
    },

    Set_LastName: {
        LastName:"",
    },

    Set_Location: {
        Location:"",
    },

    Set_Discription: {
        Discription:"",
    },

    Clear_Form:''

}



function Reducer(state, action) {

    // console.log(state, "<---------- 111");
    // console.log(action.type, "<---------- 222");
    // console.log(action, "<---------- 333");
    // console.log(action.payload.value);

    switch (action.type) {

        case Action.Progress:
            return action.payload.btn === "next" 
                ? { ...state, Progress: { width: "100%" }}
                : { ...state, Progress: { width: "57%" }}
        ;
    
        case Action.First_Inputs_Visibility:
            return action.payload.inputs === "true" 
                ? {
                    ...state,
                    First_Inputs_Visibility: {
                        visibility: "visible", 
                        opacity: 1,
                        transform: "translateX(0%)"
                    }
                }
                : {
                    ...state,
                    First_Inputs_Visibility: {
                        visibility: "hidden", 
                        opacity: 0,
                        transform: "translateX(-100%)"
                    }
                }
            ;
        ;

        case Action.Second_Inputs_Visibility:
            return action.payload.inputs === "true"
                ? {
                    ...state, 
                    Second_Inputs_Visibility: {
                        visibility: "visible", 
                        opacity: 1,
                        transform: "translateX(0%)"
                    }    
                } 
                : {
                    ...state,
                    Second_Inputs_Visibility: {
                        visibility: "hidden", 
                        opacity: 0,
                        transform: "translateX(100%)"
                    }
                }
            ;
        ;

        case Action.Next_Btn_Visibility:
            return action.payload.btn === "true"
                ? {
                    ...state,
                    Next_Btn_Visibility: {
                        visibility: "visible",
                        opacity: 1        
                    }    
                }
                :{
                    ...state,
                    Next_Btn_Visibility: {
                        visibility: "hidden",
                        opacity: 0        
                    }    
                }
            ;
        ;
            
        case Action.Prev_Btn_Visibility:
            return action.payload.btn === "true"
                ? {
                    ...state,
                    Prev_Btn_Visibility: {
                        visibility: "visible",
                        opacity: 1        
                    }    
                }
                :{
                    ...state,
                    Prev_Btn_Visibility: {
                        visibility: "hidden",
                        opacity: 0        
                    }    
                }
            ;
        ;

//+_______________________________________________________________________________

        case Action.Set_Name: 
            return {
                ...state,
                Set_Name:{
                    Name: action.payload.value  
                }
            }
        ;

        case Action.Set_Email: 
            return {
                ...state,
                Set_Email:{
                    Email: action.payload.value  
                }
            }
        ;

        case Action.Set_Password: 
            return {
                ...state,
                Set_Password:{
                    Password: action.payload.value  
                }
            }
        ;

        case Action.Set_LastName: 
            return {
                ...state,
                Set_LastName:{
                    LastName: action.payload.value  
                }
            }
        ;

        case Action.Set_Location: 
            return {
                ...state,
                Set_Location:{
                    Location: action.payload.value  
                }
            }
        ;

        case Action.Set_Discription: 
            return {
                ...state,
                Set_Discription:{
                    Discription: action.payload.value  
                }
            }
        ;

        case Action.Clear_Form:
            return {
                ...state,
                Set_Name: { Name: "" },
                Set_Email: { Email: "" },
                Set_Password: { Password : "" },
                Set_LastName: { LastName : "" },
                Set_Location: { Location : "" },
                Set_Discription: { Discription: "" }
                
            }

        default: 
            return state 
        ;

    }
}


export{ Reducer }

