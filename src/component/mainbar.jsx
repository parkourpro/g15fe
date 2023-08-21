import Tab1 from "./tab/tab1"
import Tab2 from "./tab/tab2"
import Tab3 from "./tab/tab3"
import Tab4 from "./tab/tab4"
import Tab5 from "./tab/tab5"
import Tab6 from "./tab/tab6"
import Tab7 from "./tab/tab7"

import TopMain from "./topmainbar"

const Mainbar = ({ activeTab }) => {
    return (
        <div className="bg-amber-900">
            {/* //top main */}
            <div className="">
                <TopMain />
            </div>
            <div className="bg-amber-900">
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
                     {/* main tab6 */}
                     {activeTab == 'tab6' && <>
                        <div>
                            <Tab6 />
                        </div>
                    </>}
                    {/* main tab7 */}
                    {activeTab == 'tab7' && <>
                        <div>
                            <Tab7 />
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}
export default Mainbar