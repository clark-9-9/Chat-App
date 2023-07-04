import { useState, useEffect, useContext } from "react"
import { Context_Value } from "../dashboard/main_page";
import { handle_side_bar_chats_header } from "../handler/z_index";



function Chats_Header(props) {

    const{ Side_Bar, Other_User_Info } = useContext(Context_Value)
    const{ Other_User, setOther_User } = Other_User_Info;
    const{ other_user } = Other_User[0] !== undefined ? Other_User[0] : "";


    return (
        <section className="Chats_Header">
   
            <article className="Online_Status_And_Name">
                <div 
                    className="Icon_Box" 
                    onClick={() => handle_side_bar_chats_header(Side_Bar)}
                >
                    <ion-icon name="people"></ion-icon>
                </div>
                
                <p>{ other_user ? `${other_user.name} ${other_user.lastname}` : "Unknown"}</p> 
            </article>

            {/* <input type={'file'} /> */}
            
            <article className="Call_Videocam_info_Icons">
                <div className="Icon_Box" >
                    <ion-icon name="call"></ion-icon>    
                </div>

                <div className="Icon_Box">
                    <ion-icon name="videocam"></ion-icon>
                </div>

                <div className="Icon_Box">
                    <ion-icon name="information-circle-sharp"></ion-icon>
                </div>
            </article>

        </section>
    )

}




export{ Chats_Header }