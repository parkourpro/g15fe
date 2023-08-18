import Mainbar from "../component/mainbar";
import { useState } from "react";
import sideImage from '../img/side.jpg'
import 'primeicons/primeicons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    const [activeTab, setActiveTab] = useState('tab1')

    return (
        <div className="flex">

            {/* sidebar */}
            <div className="fixed bg-cover bg-no-repeat text-white h-screen w-1/4 py-4"
                style={{ backgroundImage: `url(${sideImage})` }}
            >
                <h1 className="text-2xl font-bold text-center mb-6">PizzaHUST</h1>
                {/* //alltab */}
                <div className="font-bold">
                    {/* //tab1 */}
                    <div

                        className={`p-2 cursor-pointer hover:bg-sky-700 ${activeTab == 'tab1' ? 'bg-sky-700' : ''}`}
                        onClick={() => setActiveTab('tab1')}
                    >
                        <i className="pi pi-user p-2 m-2"></i>
                        USER
                    </div>
                    {/* //tab2 */}
                    <div
                        className={`p-2 cursor-pointer hover:bg-sky-700 ${activeTab == 'tab2' ? 'bg-sky-700' : ''}`}
                        onClick={() => setActiveTab('tab2')}
                    >
                        <i className="pi pi-apple p-2 m-2"></i>
                        MANAGE PIZZA
                    </div>
                    {/* //tab3 */}
                    <div
                        className={`p-2 cursor-pointer hover:bg-sky-700 ${activeTab == 'tab3' ? 'bg-sky-700' : ''}`}
                        onClick={() => setActiveTab('tab3')}
                    >
                        <i className="pi pi-shopping-bag p-2 m-2"></i>
                        MANAGE TOPPING
                    </div>
                </div>
            </div>
            {/* mainbar */}
            <div className="w-3/4"
            style={{marginLeft:"25vw"}}
            >
                <Mainbar activeTab={activeTab} />
            </div>
        </div>
    );
}


export default Home