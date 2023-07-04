import { useEffect, useReducer } from "react"
import { Action, Reducer } from "../reducer/z_index";
import{ handle_next_btn, handle_prev_btn, handle_form_submit } from "../handler/z_index"
import{ useNavigate, NavLink } from "react-router-dom"





function Register() {

    const [State, Dispatch] = useReducer(Reducer, Action);
    const NavigateTo = useNavigate()


    const User_Data = JSON.parse(localStorage.getItem("UserData"))

    useEffect(() => {
        if(User_Data && !User_Data.msg) {
            NavigateTo("/")
        }

    }, [])

    



    return (
        <form 
            className="Authentication_Grid"
            onSubmit={(e) => handle_form_submit(e, State, Dispatch, NavigateTo)}
        > 
            <section className="Register_Login_Welcome_Box">

                <article className="Register_Login_Side">
                    
                    <div className="Register_Login_Header">
                        <p>HELLO!</p>
                        <p>SIGN UP TO YOUR ACCOUNT</p>
                    </div>


                    <div className="Prev_Next_Btn">
                        <button 
                            type="button" 
                            className="Prev_Btn"
                            onClick={() => handle_prev_btn( State, Dispatch )}
                            style={State.Prev_Btn_Visibility}
                        >
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </button>

                        <button 
                            type="button" 
                            className="Next_Btn"
                            onClick={() => handle_next_btn( State, Dispatch )}
                            style={State.Next_Btn_Visibility}
                        >
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </button>
                    </div>

                    <div className="Two_Separate_Inputs">
                        <Single_Inputs 
                            State={State}
                            Dispatch={Dispatch}
                        />

                        <Single_Inputs_2
                            State={State}
                            Dispatch={Dispatch}
                        />
                    </div>


                    <div className="Register_Login_Bottom">

                        <div className="Sign_Btn">
                            <button 
                                type={"submit"}
                            >
                            SIGN UP
                            </button>
                        </div>

                        <div className="Navigate_To_Text">
                            <p>ALREADY A HAVE AN ACCOUNT ?</p>
                            <NavLink to='/login' id="link_to_login">
                                LOGIN
                            </NavLink>
                        </div>

                    </div>

                </article>




                <article className="Welcome_Side">

                    <div className="Welcom_Text_Box">
                        <p>Welcom Back!</p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua
                        </p>
                    </div>

                    <div className="Progress_Box">
                        <div className="Progress_1">
                            <div 
                                className="Progress_2" 
                                style={State.Progress}
                            >    
                            </div>
                        </div>
                    </div>

                </article>

            </section>
        </form>
    )

} 



function Single_Inputs(props) {

    const{ State, Dispatch } = props;
    
    const {
        First_Inputs_Visibility,
        Set_Name: { Name }, 
        Set_Email: { Email }, 
        Set_Password: { Password }, 
    } 
    = State;



    return (
        <article 
            className="Register_Login_Inputs_1"
            style={First_Inputs_Visibility}
        >

            <div className="Single_Input_Box">
                <ion-icon name="person-sharp"></ion-icon>
                <input 
                    className="Inputs" 
                    placeholder="NAME"
                    value={Name}
                    onChange={(e) => Dispatch({
                        type: Action.Set_Name,
                        payload: {
                            value: e.target.value
                        }
                    })}
                />
            </div>

            <div className="Single_Input_Box">
                <ion-icon name="mail"></ion-icon>
                <input 
                    className="Inputs" 
                    placeholder="EMAIL"
                    value={Email}
                    onChange={(e) => Dispatch({
                        type: Action.Set_Email,
                        payload: {
                            value: e.target.value
                        }
                    })}
                />
            </div>

            <div className="Single_Input_Box">
                <ion-icon name="lock-closed"></ion-icon>
                <input 
                    className="Inputs" 
                    type={"password"}
                    placeholder="PASSWORD"
                    value={Password}
                    onChange={(e) => Dispatch({
                        type: Action.Set_Password,
                        payload: {
                            value: e.target.value
                        }
                    })}
                />
            </div>

        </article>
    )
}


function Single_Inputs_2(props) {

    const{ State, Dispatch } = props;

    const {
        Second_Inputs_Visibility, 
        Set_LastName: { LastName }, 
        Set_Location: { Location }, 
        Set_Discription: { Discription }    
    } 
    = State;


    return(
        <article 
            className="Register_Login_Inputs_2"
            style={Second_Inputs_Visibility}
        >

            <div className="Single_Input_Box">
                <ion-icon name="person-sharp"></ion-icon>
                <input 
                    className="Inputs" 
                    placeholder="LAST NAME"
                    value={LastName}
                    onChange={(e) => Dispatch({
                        type: Action.Set_LastName,
                        payload: {
                            value: e.target.value
                        }
                    })}                
                />
            </div> 

            <div className="Single_Input_Box">
                <ion-icon name="location-sharp"></ion-icon>
                <input 
                    className="Inputs"
                    placeholder="LOCATION"
                    value={Location}
                    onChange={(e) => Dispatch({
                        type: Action.Set_Location,
                        payload: {
                            value: e.target.value
                        }
                    })}
                />
            </div>

            <div className="Single_Input_Box">
                <ion-icon name="book-sharp"></ion-icon>
                <input 
                    className="Inputs" 
                    placeholder="DISCRIPTION"
                    value={Discription}
                    onChange={(e) => Dispatch({
                        type: Action.Set_Discription,
                        payload: {
                            value: e.target.value
                        }
                    })}                
                />
            </div>

        </article>
    )
}


export { Register }