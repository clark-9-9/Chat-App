import { useState, useEffect, useContext } from "react"
import
{ 
    handle_display_user, handle_logout, handle_side_bar,
    handle_visible_contact_1, handle_visible_contact_2,
} 
from "../handler/z_index";

import 
{ 
    handle_user_logout, handle_contact_message, 
    handle_other_user_id
} 
from "../fetch_api/z_index";

import { Users, Add_Contact } from "./z_index";
import { useNavigate } from "react-router-dom"
import { Context_Value } from "./main_page";





function Side_bar(props) {

    const{ Side_Bar } = useContext(Context_Value);


    const NavigateTo = useNavigate()
    const{ Side_Bar_Visible, setSide_Bar_Visible } = Side_Bar;
    const[User_Display, setUser_Display] = useState('-85px')

    const[Logout, setLogout] = useState({ visibility: 'hidden', opacity: 0 })
    const[Invisible_Visible_Contact, setInvisible_Visible_Contact] = useState({ display_1: 'flex', display_2: "none" });
    
    const[Not_In_Contact, setNot_In_Contact] = useState([])
    const [Search_Input, setSearch_Input] = useState("")
    
    const[User, setUser] = useState([]);
    
    const User_Data = JSON.parse(localStorage.getItem("UserData"))
    const{ user } = User_Data ? User_Data : {} 
 

    useEffect(() => {

        if(Search_Input.length === 0) {
            setInvisible_Visible_Contact({ display_1: 'flex', display_2: "none" })
        } 

        if(Search_Input.length >= 1 ) {
            setInvisible_Visible_Contact({ display_1: 'none', display_2: "flex" })
        } 

    }, [Search_Input])






    return (
        <div className="SideBar" style={Side_Bar_Visible}>
            <section className="SideBar_Content">
                <article className="SideBar_Header">
                    <div>
                        <p>CHAT</p>

                        <div className="Add_And_Dot_Icon">
                            <ion-icon 
                                name="arrow-back-circle-sharp" 
                                onClick={() => handle_side_bar(Side_Bar)}
                            ></ion-icon>
                            <ion-icon 
                                name="add-circle" 
                                onClick={() => handle_visible_contact_1(setInvisible_Visible_Contact, setSearch_Input)}
                            ></ion-icon>
                            <ion-icon 
                                name="chatbubble"
                                onClick={() => handle_visible_contact_2(setInvisible_Visible_Contact, setSearch_Input)}
                            ></ion-icon>
                        </div>
                    </div>

                    <div>
                        <ion-icon name="search"></ion-icon>
                        <input  
                            type={"search"} 
                            className="Search_Input"
                            value={Search_Input}
                            onChange={(e) => setSearch_Input(e.target.value)}
                        />
                    </div>
                </article>


                <Users 
                    Contacts={Invisible_Visible_Contact}
                    current_user={{ User, setUser }}
                />


                <Add_Contact 
                    Contacts={Invisible_Visible_Contact}
                    current_user={{ User, setUser }}
                    Search_Input={Search_Input}
                    User_NotIn_Contact={{ Not_In_Contact, setNot_In_Contact }}
                />

                <article 
                    className="Current_User_Box"
                    style={{
                        top:User_Display
                    }}
                >
                    <div className="Current_User">
                        <div 
                            className="User_Display_Circle"
                            onClick={() => handle_display_user(User_Display, setUser_Display, setLogout)}
                        ></div>

                        <div className="User_Name_And_icon">
                            <ion-icon name="person-sharp"></ion-icon>
                            
                            <div
                                onClick={() => handle_logout(Logout, setLogout)}
                            >
                                <p>{User_Data ? user.name : "NAME"}</p>
                            </div>

                            <div style={Logout} onClick={() => handle_user_logout(User_Data, NavigateTo)}>
                                <p>LOGOUT</p>
                            </div>
                        </div>
                    </div>
                </article>

            </section>
        </div>
    )

}

 
 




export{ Side_bar }