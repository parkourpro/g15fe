import Tab1 from "./tab/tab1"
import Tab2 from "./tab/tab2"
import Tab3 from "./tab/tab3"
import TopMain from "./topmainbar"
import mainImg from "../img/mainb.jpg"

const Mainbar = ({ activeTab }) => {
    return (
        <div>
            {/* //top main */}
            <div className="">
                <TopMain />
            </div>
            <div className="bg-amber-900 h-full">
                <div>
                    {/* main tab1 */}
                    {activeTab == 'tab1' && <>
                        <div>
                            <Tab1 />
                        </div>
                    </>}
                    {/* main tab2 */}
                    {activeTab == 'tab2' && <>
                        <div>
                            <Tab2 />
                        </div>
                    </>}
                    {/* main tab3 */}
                    {activeTab == 'tab3' && <>
                        <div>
                            <Tab3 />
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}
export default Mainbar