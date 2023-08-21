import axios from "axios";
import { useState, useEffect } from "react"
import EachUser from "../EachUser";
import { Button } from 'primereact/button';

const Tab1 = () => {
    const [listUser, setListUser] = useState([])
    const [searchPhoneNumber, setSearchPhoneNumber] = useState("");

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

    const handleSearchChange = (event) => {
        setSearchPhoneNumber(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const res = await axios.get(`/users?phoneNumber=${searchPhoneNumber}`);
            setListUser(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
            <div className="flex justify-center items-center">
            <input
                type="text"
                placeholder="Search by Phone Number"
                value={searchPhoneNumber}
                onChange={handleSearchChange}
                className=" my-4 px-2 py-3 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
            />
            <Button
                className='my-2 mx-1 bg-amber-500 border-0'
                icon='pi pi-search'
                onClick={handleSearch} />
            </div>
            <div className="grid grid-cols-6 gap-4 text-yellow-300 font-bold text-2xl">
                <div className="py-2 px-4 ">
                    Username
                </div>
                <div className="py-2 px-4 ">
                    Name
                </div>
                <div className="py-2 px-4 col-span-2">
                    Email
                </div>
                <div className="py-2 px-4">
                    Phone
                </div>
                <div className="py-2 px-4">
                    Action
                </div>
            </div>
            {listUser
                .filter((user) =>
                    user.phoneNumber.includes(searchPhoneNumber)
                ).map((each, index) => (
                    <EachUser data={each} key={index} onDelete={handleDelete} />
                ))}
        </div>
    )
}
export default Tab1