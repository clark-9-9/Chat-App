import React, { Fragment, useEffect, useState } from "react"
import{ Side_bar, Chat_Messages } from "./z_index"
import{ useNavigate } from "react-router-dom"
// import {  } from "../fetch_api/z_index"

export const Context_Value = React.createContext()


function Main_Page() {

    const NavigateTo = useNavigate()
    const[Window, setWindow] = useState(window.innerWidth)
    const User_Data = JSON.parse(localStorage.getItem("UserData"))

    const[User_Messages, setUser_Messages] = useState([])
    const User_Message = { User_Messages, setUser_Messages };
    
    const[Other_User, setOther_User] = useState([])
    const Other_User_Info = { Other_User, setOther_User }
    
    const[Side_Bar_Visible, setSide_Bar_Visible] = useState({ marginLeft: "-25rem" })
    const Side_Bar = { Side_Bar_Visible, setSide_Bar_Visible }



    
    useEffect(() => {

        if(User_Data && !User_Data.msg) {
            NavigateTo("/") 
        } else {
            NavigateTo("/login")
        }

    }, [])

    
    useEffect(() => {
        const handle_resize = () => setWindow(window.innerWidth)

        window.addEventListener('resize', handle_resize)
        
        return () => {
            window.removeEventListener("resize", handle_resize)
        }
    }, [])


    useEffect(() => {

        if(Window >= 1000) {
            setSide_Bar_Visible({ marginLeft: "0rem" })
        } else {
            setSide_Bar_Visible({ marginLeft: "-25rem" })
        }

    }, [Window])



    return (
        <Fragment> 
            <Context_Value.Provider value=
                {{
                    User_Message, Other_User_Info, Side_Bar
                }}
            >

                <Side_bar />

                <Chat_Messages />

            </Context_Value.Provider>
        </Fragment>
    )
}



export{ Main_Page }


 

