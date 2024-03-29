import { Category } from "../../../util"
import { categoryContext } from "../../../hook/admin/contexts/categories"
import { useContext } from "react"
import ItemSectionCategory from "./itemSectionCategory"

const SectionCategory = () => {
  const { listCategory } = useContext(categoryContext)
  
  return (
    <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-base font-semibold">Khám khá danh mục</h3>
                    <div className=" flex gap-5 py-4 flex-wrap justify-around px-4">
                        {listCategory.map((item: Category, index: number) => {
                            return <ItemSectionCategory key={index} item={item} />
                        })}
                    </div>
                </div>
  )
}

export default SectionCategory