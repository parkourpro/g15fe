import Tab1 from "./tab/tab1"
import Tab2 from "./tab/tab2"
import Tab3 from "./tab/tab3"
import Tab4 from "./tab/tab4"
import Tab5 from "./tab/tab5"

import TopMain from "./topmainbar"

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
                    {/* main tab4 */}
                    {activeTab == 'tab4' && <>
                        <div>
                            <Tab4 />
                        </div>
                    </>}
                    {/* main tab5 */}
                    {activeTab == 'tab5' && <>
                        <div>
                            <Tab5 />
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}
export default Mainbar