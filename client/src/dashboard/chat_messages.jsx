import{ 
    Chats_Header, Chats_Send_Message, Messages, 
    Other_User_Information 
} 
from "../component/z_index"




function Chat_Messages(props) {


    return (
        <section className="Chat_Message_Container">
            <article className="chat_">
                <Chats_Header /> 
                <Messages />
                <Chats_Send_Message />

                {/* <Other_User_Information /> */}
            </article>
        </section>
    )
}




export{ Chat_Messages }