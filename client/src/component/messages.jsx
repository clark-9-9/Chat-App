import{ useEffect, useContext } from "react"
import { Context_Value } from "../dashboard/main_page";



function Messages(props) {


    const{ User_Message, Other_User_Info } = useContext(Context_Value);
    const{ User_Messages, setUser_Messages } = User_Message;
    const{ Other_User, setOther_User } = Other_User_Info;
 
    const[ ,id ] = Other_User; 
    const userId = id === undefined ? "" : id
    const User_Data = JSON.parse(localStorage.getItem("UserData"));
 



    

    return ( 
        <section className="Messages_Box" >
            <ul className="List_Of_Messages">
                <div className="No_Message">No Message Sent or Received</div>


                {User_Messages.messages &&
                    User_Messages.messages.map((message, index) => {


                        return (
                            <li 
                                key={index}
                                className={
                                    message.from === User_Data.user.userId ? "Right_Message" : "Left_Message"
                                }
                            >
                                <div></div>

                                <div>
                                    <p>{message.body}</p>
                                </div>

                            </li>
                        )
                    })
                }

            </ul>
        </section>
    )
}





export{ Messages }