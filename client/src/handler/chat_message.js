const handle_text_area = (e, text_area) => {
    text_area.current.style.height = "46px";
    let height = e.target.scrollHeight;
    text_area.current.style.height = `${height}px`
}


const handle_side_bar_chats_header = (Side_Bar) => {

    const{ Side_Bar_Visible, setSide_Bar_Visible } = Side_Bar;

    if(Side_Bar_Visible.marginLeft === "-25rem") {
        setSide_Bar_Visible({ marginLeft: "0" })
    } else {
        setSide_Bar_Visible({ marginLeft: "-25rem" })
    }

}




export{ 
    handle_text_area, handle_side_bar_chats_header 
}