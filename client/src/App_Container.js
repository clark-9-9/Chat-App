import{ Fragment } from "react";
import{ Routes, Route } from "react-router-dom"
import{ Register, Login } from "./pages/z_index"
import{ Main_Page } from "./dashboard/z_index"


function AppContainer() {


    return (
        <Fragment>
            <Routes>
                
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route 
                    path="/" 
                    element={<Main_Page />} 
                />
                    {/* <Route index element={<Chat_Messages />} /> */}

                {/* </Route> */}
            

            </Routes>            
        </Fragment>
    )
}





export{ AppContainer }