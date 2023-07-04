import{ useState, useEffect } from "react";
import{ useNavigate, NavLink } from 'react-router-dom';
import { handle_form_login } from "../handler/z_index";





function Login() {


    const[Email, setEmail] = useState('')
    const[Password, setPassword] = useState('')
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
            onSubmit={
                (e) => handle_form_login(e, Email, Password, setEmail, setPassword, NavigateTo)
            }
        > 
            <section className="Register_Login_Welcome_Box">

                <article className="Register_Login_Side">
                    
                    <div className="Register_Login_Header">
                        <p>HELLO!</p>
                        <p>SIGN UP TO YOUR ACCOUNT</p>
                    </div>


                    <div className="Two_Separate_Inputs">
                        
                        <Single_Inputs 
                            Email={Email}
                            setEmail={setEmail}
                            Password={Password}
                            setPassword={setPassword}
                        />

                    </div>


                    <div className="Register_Login_Bottom">

                        <div className="Sign_Btn">
                            <button 
                                type={"submit"}
                            >
                            SIGN IN
                            </button>
                        </div>

                        <div className="Navigate_To_Text">
                            <p>DONT HAVE AN ACCOUNT ?</p>
                            <NavLink to="/register" id="link_to_register">
                                REGISTER
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

                </article>

            </section>
        </form>
    )

} 



function Single_Inputs({ Email, Password, setEmail, setPassword }) {
    

    return (
        <article 
            className="Register_Login_Inputs_1"
        >


            <div className="Single_Input_Box">
                <ion-icon name="mail"></ion-icon>
                <input 
                    className="Inputs" 
                    placeholder="EMAIL"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="Single_Input_Box">
                <ion-icon name="lock-closed"></ion-icon>
                <input 
                    className="Inputs" 
                    type={"password"} placeholder="PASSWORD"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

        </article>
    )
}



export{ Login }