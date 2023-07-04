import { useState, useRef, useContext } from "react"
import { handle_text_area } from "../handler/z_index"
import { handle_send_message, handle_contact_message_2 } from "../fetch_api/z_index"
import { Context_Value } from "../dashboard/main_page";




function Chats_Send_Message(props) {

    const text_area = useRef();
    const[Send_Message, setSend_Message] = useState("");
    const send_message = { Send_Message, setSend_Message };    
 
    const{ User_Message, Other_User_Info } = useContext(Context_Value);
    const{ User_Messages, setUser_Messages } = User_Message;
    const{ Other_User, setOther_User } = Other_User_Info;
    const[ , userId ] = Other_User;

    const User_Data = JSON.parse(localStorage.getItem("UserData"));


 
    const values = {
        userId, User_Data, send_message, text_area, setUser_Messages , handle_contact_message_2
    }


    return (
        <section className="Send_Message" >
            <div className="Send_Message_box">
                <article>
                    <textarea
                        className="text"
                        placeholder={"Type Your Message Here"}
                        ref={text_area}
                        value={Send_Message}
                        onInput={(e) => handle_text_area(e, text_area)}
                        onChange={(e) => setSend_Message(e.target.value)}
                    >
                    </textarea>
                </article>

                <article>
                    <ion-icon name="happy-outline"></ion-icon>
                    <ion-icon name="attach-sharp"></ion-icon>
                    
                    <div 
                        onClick={() => handle_send_message(values)} 
                    >
                        <ion-icon name="navigate"></ion-icon>               
                    </div>
                </article>
            </div>
        </section>
    )
}





export{ Chats_Send_Message }