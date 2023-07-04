const get_user = async (User_Data, setUser) => {


    const option = {
        method:"get",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        }
    }

    try {
        const get_data = await fetch('/api/v1/chat-messages/current-user', option)
        const get_info = await get_data.json()
        setUser(get_info)

    } catch(err) { 
        console.log(err); 
    } 
  
}  

  
const handle_contact_message = async (e, User_Data, setUser_Messages) => {

    const userId =  e.target.dataset.id; 
    // const userId = e; 

    const option = {  
        method:"get", 
        headers: {
            Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        } 
    }    

    
    try {
        const get_data = await fetch(`/api/v1/chat-messages/get-messages/${userId}`, option)
        const get_info = await get_data.json() 
        setUser_Messages(get_info)

    }
     catch(err) {
        console.log(err);
    }
} 


const handle_contact_message_2 = async (id, User_Data, setUser_Messages) => {

    const userId = id; 
    
    const option = {  
        method:"get", 
        headers: {
            Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        } 
    }    
    
    try {
        const get_data = await fetch(`/api/v1/chat-messages/get-messages/${userId}`, option)
        const get_info = await get_data.json() 
        setUser_Messages(get_info)
    }
     catch(err) {
        console.log(err);
    }

} 




const handle_other_user_id = async (e, setOther_User) => {

    const userId =  e.target.dataset.id; 

    const get_data = await fetch(`/api/v1/chat-messages/other-user/info/${userId}`, { method: "get" })
    const get_info = await get_data.json()  
    setOther_User([get_info, userId])
}




const handle_send_message = async (values) => {

    const{
        userId, User_Data, send_message, text_area, setUser_Messages , handle_contact_message_2
    } = values

    const{ Send_Message, setSend_Message } = send_message
 
    const body_request = { the_message: Send_Message }

    const option = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        },

        body: JSON.stringify(body_request)
    }

    

    try {
        const post_data = await fetch(`/api/v1/chat-messages/send-message/${userId}`, option)
        const get_info = await post_data.json()
        text_area.current.style.height = "46px";
        handle_contact_message_2(userId, User_Data, setUser_Messages)
        setSend_Message("")
    }
    catch(err) {
        console.log(err);
    }
    
}




const handle_user_logout = async (User_Data, NavigateTo) => {

    const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        },
    };
      
    const post_data = await fetch(`/api/v1/auth/logout`, options)
    const remove_data = await post_data.json() 
    localStorage.removeItem("UserData")
    NavigateTo('/login')

}



const handle_not_in_contact = async (User_Data, setNot_In_Contact) => {

    const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        }
    };
    try {
        const get_data = await fetch('/api/v1/chat-messages/not-in-contat', options)
        const get_info = await get_data.json()
        setNot_In_Contact(get_info)
    }
    catch(err) {
        console.log(err);
    }
}


const handle_add_contact = async (e, User_Data, setUser, setNot_In_Contact) => {

    const userId = e.target.dataset.id

    const options = {
        method: 'POST', 
        headers: {
          Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        }
    };
      
    const post_data = await fetch(`/api/v1/chat-messages/contact/${userId}`, options)
    const get_info = await post_data.json()
    handle_not_in_contact(User_Data, setNot_In_Contact)
    get_user(User_Data, setUser)
}



const handle_delete_contact = async (e, User_Data, setUser) => {
        
    const userId = e.target.dataset.id

    const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${User_Data ? User_Data.token : ""}`
        }
    };
      
    const delete_data = fetch(`/api/v1/chat-messages/contact/${userId}`, options)
    const delete_info = await (await delete_data).json()
    get_user(User_Data, setUser)

}




export{ 
    get_user,  
    handle_contact_message, 
    handle_contact_message_2,
    handle_other_user_id, 
    handle_send_message, 
    handle_user_logout, 
    handle_not_in_contact,
    handle_add_contact,
    handle_delete_contact
}