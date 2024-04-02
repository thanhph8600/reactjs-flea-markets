import { useContext, useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom"
import { categoryContext,  } from '../../../hook/admin/contexts/categories';
import { Category, CategoryDetail } from "../../../util";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/slideHome.css'
import ListCategory from "./listCategory";
import SectionListProduct from "./sectionListProduct/listProduct";
import FilterProduct from "./filter/filter";
const ListProductClient = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { 
    getCategoryBySlug, 
    getListCategoryDetailBySlug, 
    listCategory, 
    listCategoryDetail,
    getIdCategoryOrCategoryDetailBySlug
   } = useContext(categoryContext)
  const [category, setCategory] = useState({} as Category | CategoryDetail )
  const [listCategoryDetailShow, setListCategoryDetailShow] = useState([] as CategoryDetail[])
  const [showCategoryDetail, setShowCategoryDetail] = useState(true)
  const [idCategory, setIdCategory] = useState('')
  useEffect(() => {
    if (slug) {
      setIdCategory(getIdCategoryOrCategoryDetailBySlug(slug))
      const cateDetail = getListCategoryDetailBySlug(slug)
      const itemCategory = getCategoryBySlug(slug)
      if (cateDetail.length != 0){
        setCategory(itemCategory)
        setListCategoryDetailShow(cateDetail)
        setShowCategoryDetail(true)
      }else {
        const checkCateDetail = listCategoryDetail.find((item)=> item.link == slug )
        if (checkCateDetail){
          setCategory(checkCateDetail)
          setShowCategoryDetail(false)
        }
      }
    }
  }, [getCategoryBySlug, getIdCategoryOrCategoryDetailBySlug, getListCategoryDetailBySlug, listCategory, listCategoryDetail, navigate, slug])

  return (
    <>
      <div className=" py-2 bg-white">
        <div className="w-[950px] m-auto text-sm">
          <FilterProduct />
        </div>
      </div>
      
      <div className="w-[950px] m-auto">
        <div className="py-2">
          <div className=" py-2 flex gap-2 items-center text-sm">
            <Link to={'/'} >Chợ cũ</Link>
            <FaAngleDoubleRight />
            <p>{category.name}</p>
          </div>
        </div>
      </div>
    
      <div className="w-[950px] m-auto">
        <div className="w-[600px]">

         {showCategoryDetail && <div className=" p-4 bg-white shadow-sm rounded-sm my-2">
            <ListCategory listCategoryDetail={listCategoryDetailShow} />
          </div>}

          <div className=" pb-2">
            {idCategory && <SectionListProduct idCate={idCategory} />}
          </div>
          
        </div>
      </div>
    </>
  )
}

export default ListProductClient