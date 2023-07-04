import { Action } from "../reducer/z_index";




const handle_next_btn = ( State, Dispatch ) => {


    const{
        Set_Name: { Name }, Set_Email: { Email }, Set_Password: { Password },
        // Set_LastName: { LastName }, Set_Location: { Location }, Set_Discription: { Discription }    
    } 
    = State;

    
    if( Name === "" || Email === "" || Password === "") {
        alert("fill out the inputs");
        return;
    }

    else {
        Dispatch({ 
            type: Action.Progress, 
            payload: { btn:"next" } 
        })


        Dispatch({
            type: Action.Next_Btn_Visibility,
            payload:{
                btn: "false"
            }
        })


        Dispatch({
            type: Action.Prev_Btn_Visibility,
            payload:{
                btn: "true"
            }
        })


        Dispatch({
            type: Action.First_Inputs_Visibility,
            payload:{
                inputs: "false"
            }
        })


        Dispatch({
            type: Action.Second_Inputs_Visibility,
            payload:{
                inputs: "true"
            }
        })
    }
}


const handle_prev_btn = ( State, Dispatch ) => {

    Dispatch({ 
        type: Action.Progress, 
        payload: { btn:"prev" } 
    })


    Dispatch({
        type: Action.Next_Btn_Visibility,
        payload:{
            btn: "true"
        }
    })
    

    Dispatch({
        type: Action.Prev_Btn_Visibility,
        payload:{
            btn: "false"
        }
    })


    Dispatch({
        type: Action.First_Inputs_Visibility,
        payload:{
            inputs: "true"
        }
    })


    Dispatch({
        type: Action.Second_Inputs_Visibility,
        payload:{
            inputs: "false"
        }
    })

}


const handle_form_submit = async (e, State, Dispatch, NavigateTo) => {
    
    e.preventDefault()
    
    const{
        Set_Name: { Name }, Set_Email: { Email }, Set_Password: { Password },
        Set_LastName: { LastName }, Set_Location: { Location }, Set_Discription: { Discription }    
    } 
    = State;


    if( Name === "" || Email === "" || Password === "" || LastName === "" || Location === "" || Discription === "") {
        alert("fill out the information");
        return;
    }
    
    else
        try {

            const request_body = {
                name: Name,
                email: Email,
                password: Password,
                lastname: LastName,
                location: Location,
                discription: Discription
            }

            const option = {
                method:"post",
                headers: {
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(request_body)
            }

            const post_info = await fetch("/api/v1/auth/register", option) 
            const get_info = await post_info.json()

            NavigateTo("/login")


        } catch(err) {
            console.log(err);
        }
    ;

    Dispatch({ type: Action.Clear_Form }) 

}


const handle_form_login = async (
    e, Email, Password, setEmail, setPassword, NavigateTo
) => {

    e.preventDefault()

    if( Email === "" || Password === "" ) {
        alert("fill out the information");
        return;
    }
    
    else
        try {

            const request_body = {
                email: Email,
                password: Password,
            }

            const option = {
                method:"post",
                headers: {
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(request_body)
            }

            const post_info = await fetch("/api/v1/auth/login", option) 
            const get_info = await post_info.json()

            localStorage.setItem('UserData', JSON.stringify(get_info))
            
            if(!get_info.msg) {
                NavigateTo("/")
            };
                

        } catch(err) {
            console.log(err);
        }
    ;

    setEmail('')
    setPassword('')

}


export{ 
    handle_next_btn, handle_prev_btn, handle_form_submit,
    handle_form_login
}