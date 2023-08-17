import { useState } from "react";
import DialogConfirmLogout from "../dialog/confirmlogout";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons


const TopMain = () => {

    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };


    return (
        <div className="font-medium cursor-pointer bg-gray-300 w-full h-10 flex justify-between">
            <div className="text-xl p-2 hover:bg-sky-700 flex items-center">
                Dashboard
            </div>
            <div className="flex">
                <div className="cursor-pointer p-2 mx-2 hover:bg-sky-700">
                    Account
                </div>
                <div
                className="cursor-pointer p-2 mx-2 hover:bg-sky-700"
                onClick={showDialog}
                >
                    Logout
                </div>
                
            </div>
            <DialogConfirmLogout
            visible={visible}
            onHide={()=>setVisible(false)}
            />
        </div>
    )
}
export default TopMain