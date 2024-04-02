import { useEffect } from "react"
import SectionCategory from "./sectionCategory"
import SectionNewProduct from "./sectionNewProduct"
import SlideHome from "./slideHome"

const Home = () => {
    useEffect(() => {
        document.title = "Trang chủ"
    },[])
    return (
        <>
            <div className="lg:w-[950px] m-auto">
                <div className="pb-2">
                    <SlideHome />
                </div>
                <div className="pb-2">
                    <SectionCategory />
                </div>
                    
                <div className="pb-2">
                    <SectionNewProduct />
                </div>
            </div>
        </>
    )
}
export default Home