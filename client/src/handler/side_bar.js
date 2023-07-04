const handle_display_user = (User_Display, setUser_Display, setLogout) => {
    if(User_Display === "-85px") 
        setUser_Display("0px")
    ;
    else setUser_Display("-85px") ;

    setLogout({ visibility: 'hidden', opacity: 0 })
}


const handle_logout = (Logout, setLogout) => {
    return Logout.visibility === "hidden" 
    ? setLogout({ visibility: 'visible', opacity: 1 }) 
    : setLogout({ visibility: 'hidden', opacity: 0 })
}


const handle_side_bar = (Side_Bar) => {

    const{ Side_Bar_Visible, setSide_Bar_Visible } = Side_Bar;

    if(Side_Bar_Visible.marginLeft === "-25rem") {
        setSide_Bar_Visible({ marginLeft: "0" })
    } else {
        setSide_Bar_Visible({ marginLeft: "-25rem" })
    }
}



const handle_visible_contact_1 = (setInvisible_Visible_Contact, setSearch_Input) => {
    setInvisible_Visible_Contact({ display_1: 'none', display_2: "flex" });
    setSearch_Input("")    
}


const handle_visible_contact_2 = (setInvisible_Visible_Contact, setSearch_Input) => {
    setInvisible_Visible_Contact({ display_1: 'flex', display_2: "none" });
    setSearch_Input("")
}








export{
    handle_display_user, 
    handle_logout,
    handle_side_bar,
    handle_visible_contact_1, 
    handle_visible_contact_2,
}