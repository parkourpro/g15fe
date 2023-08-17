import axios from "axios";
import { useState, useEffect } from "react"
import EachUser from "../EachUser";

const Tab1 = () => {
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/users")
                //   console.log(res)
                setListUser(res.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData()
    }, [])

    const handleDelete = (deletedId) => {
        // Cập nhật lại danh sách người dùng sau khi xóa thành công
        const updatedUsers = listUser.filter(user => user._id !== deletedId);
        setListUser(updatedUsers);
    };


    if (!listUser)
        return (
            <div>
                Loading...
            </div>
        )


    return (
        <div>
            <div className="grid grid-cols-6 gap-4">
                <div className="py-2 px-4 font-bold text-orange-500 text-2xl">
                    Username
                </div>
                <div className="py-2 px-4 font-bold text-orange-500 text-2xl">
                    Name
                </div>
                <div className="py-2 px-4 col-span-2 font-bold text-orange-500 text-2xl">
                    Email
                </div>
                <div className="py-2 px-4 font-bold text-orange-500 text-2xl">
                    Phone
                </div>
                <div className="py-2 px-4 font-bold text-orange-500 text-2xl">
                    Action
                </div>
            </div>
            {listUser.map((each, index) => (
                <EachUser data={each} key={index} onDelete={handleDelete} />
            ))}
        </div>
    )
}
export default Tab1