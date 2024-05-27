import { useContext, useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom"
import { categoryContext, } from '../../../hook/admin/contexts/categories';
import { CategoryDetail, defaultValueSelectAddress, typeValueSelectAddress } from "../../../util";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/slideHome.css'
import ListCategory from "./listCategory";
import FilterProduct from "./filter/filter";
import SetProductByCategory from "./sectionListProduct/setProductByCategory";
import SetProductBySearch from "./sectionListProduct/setProductBySearch";
import SetProductByCategoryDetail from "./sectionListProduct/setProductByCategoryDetail";
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
  const [nameTitle, setNameTitle] = useState('')
  const [listCategoryDetailShow, setListCategoryDetailShow] = useState([] as CategoryDetail[])
  const [showCategoryDetail, setShowCategoryDetail] = useState(true)
  const [idCategory, setIdCategory] = useState('')
  useEffect(() => {
    if (slug) {
      setIdCategory(getIdCategoryOrCategoryDetailBySlug(slug))
      const cateDetail = getListCategoryDetailBySlug(slug)
      const itemCategory = getCategoryBySlug(slug)
      if (cateDetail.length != 0) {
        setNameTitle(itemCategory.name)
        setListCategoryDetailShow(cateDetail)
        setShowCategoryDetail(true)
      } else {
        const checkCateDetail = listCategoryDetail.find((item) => item.link == slug)
        if (checkCateDetail) {
          setNameTitle(checkCateDetail.name)
          setShowCategoryDetail(false)
        } else {
          setShowCategoryDetail(false)
          setNameTitle(slug)
        }
      }
    }
  }, [getCategoryBySlug, getIdCategoryOrCategoryDetailBySlug, getListCategoryDetailBySlug, listCategory, listCategoryDetail, navigate, slug])


  const [filterAddress, setFillterAddress] = useState(defaultValueSelectAddress)
  const handleValueAddress = (select: typeValueSelectAddress) => {
    setFillterAddress(select)
  }
  const [filterPrice, setFillterPrice] = useState({} as { min: number, max: number })
  const handleFilterPrice = (min: number, max: number) => {
    setFillterPrice({ min, max })
  }

  return (
    <>
      <div className=" py-2 bg-white">
        <div className="lg:w-[950px] m-auto text-sm">
          <div className="md:w-[600px]  md:m-auto lg:m-0">

          <FilterProduct
            onHandleValueAddress={handleValueAddress}
            filterAddress={filterAddress}
            onHandleFilterPrice={handleFilterPrice}
            filterPrice={filterPrice}
          />
          </div>
        </div>
      </div>

      <div className="lg:w-[950px] w-full m-auto">
        <div className="py-2 px-4 md:px-0 md:w-[600px]  md:m-auto lg:m-0">
          <div className=" py-2 flex gap-2 items-center text-sm">
            <Link to={'/'} >Chợ cũ</Link>
            <FaAngleDoubleRight />
            <p>{nameTitle}</p>
          </div>
        </div>
      </div>

      <div className="lg:w-[950px]  m-auto">
        <div className="md:w-[600px]  md:m-auto lg:m-0">

          {showCategoryDetail && <div className=" p-4 bg-white shadow-sm rounded-sm my-2">
            <ListCategory listCategoryDetail={listCategoryDetailShow} />
          </div>}

          <div className=" pb-2">
            {
              idCategory && showCategoryDetail &&
              <SetProductByCategory
                idCate={idCategory}
                fillterAddress={filterAddress}
                filterPrice={filterPrice}
              />
            }
            {
              idCategory && !showCategoryDetail &&
              <SetProductByCategoryDetail
                idCategoryDetail={idCategory}
                fillterAddress={filterAddress}
                filterPrice={filterPrice}
              />
            }
            {
              !idCategory && slug &&
              <SetProductBySearch
                valueSearch={slug}
                fillterAddress={filterAddress}
                filterPrice={filterPrice}
              />
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default ListProductClient