import { useState, useEffect, useContext } from "react"
import
{ 
    get_user, handle_delete_contact, handle_contact_message,
    handle_other_user_id
} 
from "../fetch_api/z_index";
import { Context_Value } from "./main_page";


function Users({ Contacts, current_user }) {

    const {
        User_Message, Other_User_Info, 

    } = useContext(Context_Value);

    const{ User_Messages, setUser_Messages } = User_Message;
    const{ Other_User, setOther_User } = Other_User_Info;


    const{ display_1, display_2 } = Contacts;
    const{ User, setUser } = current_user
    const User_Data = JSON.parse(localStorage.getItem("UserData"));


    //- get contacts of current user
    useEffect(() => {
        if(User_Data) {
            get_user(User_Data, setUser)
        }
    }, [])



    
    return (
        <article 
            className="Current_User_Contacts"
            style={{
                display: display_1
            }}  
        >

            {!User.user &&   
                <div
                    style={{
                        position: "absolute",
                        top:"50%",
                        left:"50%",
                        transform:"translateX(-50%)"
                    }}  
                > 
                    Loding....
                </div> 
            }


            {User.user &&
                User.user.contact.map((user) => {

                    let last_messages;

                    if(user.messages_from_this_person[0].body === undefined) {
                        last_messages = user.messages_from_this_person[0] + "....."
                    } 
                    else {
                        last_messages = user.messages_from_this_person[0].body.length >= 25 
                            ? user.messages_from_this_person[0].body.substr(0,25) + "....." 
                            : user.messages_from_this_person[0].body
                    }
 
                    return (
                        <div 
                    
                            className="User" 
                            //! The HTML tabindex attribute is used to manage keyboard focus. Used wisely, it can effectively handle focus within web widgets. Used unwisely however, the tabindex attribute can destroy the usability of web content for keyboard users
                            // tabIndex="1"
                            key={user.userId} 
                            data-id={user.userId}
                        > 

                            {/* <img src={user} /> */}
                            <div 
                                id="Circle" 
                                data-id={user.userId}
                                onClick={(e) => {
                                        handle_contact_message(e, User_Data, setUser_Messages)
                                        handle_other_user_id(e, setOther_User)
                                    }
                                }  
                            ></div>  

                            <div 
                                className="Name_And_Message"
                                data-id={user.userId}
                                onClick={(e) => {
                                        handle_contact_message(e, User_Data, setUser_Messages)
                                        handle_other_user_id(e, setOther_User)
                                    }
                                }  
                            >
                                <p data-id={user.userId}>{ `${user.name} ${user.lastname}` }</p>
                                <p data-id={user.userId}>{ last_messages }</p>
                            </div>       

                            <div 
                                className="Number_Of_Messages" 
                                data-id={user.userId} 
                                onClick={(e) => handle_delete_contact(e, User_Data, setUser)}
                            >
                                <ion-icon name="close-outline" data-id={user.userId}></ion-icon>
                            </div>          
                        </div>
                    )
                }) 
            }

        </article>
    )
}




export{ Users }