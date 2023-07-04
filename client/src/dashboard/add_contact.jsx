import { useState, useEffect, useCallback } from "react"
import{ handle_not_in_contact, handle_add_contact } from "../fetch_api/z_index";
import{ get_user } from "../fetch_api/z_index";

 

function Add_Contact(props) {

    const{
        Contacts, User_NotIn_Contact, Search_Input, current_user
    } = props;

    const{ display_1, display_2 } = Contacts;
    const{ User, setUser } = current_user;

    
    const User_Data = JSON.parse(localStorage.getItem("UserData"));
    const{ Not_In_Contact, setNot_In_Contact } = User_NotIn_Contact;
    const{ user: Users } = Not_In_Contact;


    useEffect(() => {
        handle_not_in_contact(User_Data, setNot_In_Contact) 
    }, [])




    return (
        
        <article 
            className="Current_User_Contacts_Add_Contact"
            style={{
                display: display_2
            }}
        >
            
        {Users &&
            Users.map((user) => {
                if(
                    user.name.toLowerCase().includes(Search_Input.toLowerCase()) ||
                    user.lastname.toLowerCase().includes(Search_Input.toLowerCase())
                ) {

                return (                            
                    <div className="User" key={user._id}> 
                        <div id="Circle"></div>  

                        <div className="Name_And_Message">
                            <p>{`${user.name} ${user.lastname}`}</p>
                        </div>    
                        
                        <ion-icon 
                            name="checkmark-circle"
                            data-id={user._id}
                            onClick={(e) => handle_add_contact(e, User_Data, setUser, setNot_In_Contact)}
                        ></ion-icon>

                    </div>
                )
            }})
        }
        </article>
    )
}




export{ Add_Contact }