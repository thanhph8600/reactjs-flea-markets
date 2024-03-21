import React, { useContext, useState } from "react"
import { IoAddCircle } from "react-icons/io5";
import { categoryContext } from "../../../hook/admin/contexts/categories"
import { Category, convertToSlug, defaultValueCategory } from "../../../util";
import ItemCategory from "./itemCategory";
import EditCategory from "./editCategory";
import Popup from "../popup";
import requestApi from "../../../helper/api";
import { toast } from "react-toastify";

const ListCategory = () => {
  const { listCategory, callAPI } = useContext(categoryContext)
  const [showPopup, setShowPopup] = useState(false);
  const [formCategory, setFormCategory] = useState(defaultValueCategory)
  const [isEdit, setIsEdit] = useState(false);
  const [errorForm, setErrorForm] = useState('');
  const handlePopup = () => {
    setErrorForm('');
    setShowPopup(!showPopup)
    if (isEdit == true) {
      setIsEdit(false);
      setFormCategory(defaultValueCategory);
    }
  }
  const handleFromCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.name) {
      setFormCategory({ ...formCategory, [target.name]: target.value});
    }
  }
  const checkFromCategory = () => {
    const check = true
    if (formCategory.name.trim().length < 3) {
      setErrorForm('Tên danh mục phải lớn hơn 3 ký tự');
      return false;
    }
    const checkName = listCategory.findIndex((item: Category) => {
        return item.link === convertToSlug(formCategory.name) && item._id !== formCategory._id
    })
    if (checkName !== -1) {
      setErrorForm('Tên danh mục đã tồn tại');
      return false;
    }
    if (formCategory.thumbnail.trim().length < 2) {
      setErrorForm('Hình ảnh không được để trống');
      return false;
    }
    setErrorForm('');
    return check;
  }
  const onSubmid = () => {
    if (checkFromCategory()) {
      formCategory.link = convertToSlug(formCategory.name);
      const {_id, ...body} = formCategory;
      if (!isEdit) {
        requestApi('category', 'POST', body).then(() => {
          onSuccecc();
        },error => {
          error.response.data.message && toast.error(error.response.data.message)
        })
      } else {
        requestApi(`category/${_id}`, 'PATCH', body).then(() => {
          onSuccecc();
        },error => {
          console.log(error);
          error.response.data.message && toast.error(error.response.data.message)
        })
      }
    }
  }
  const onSuccecc = () => {
    callAPI();
    toast.success('Thành công');
    handlePopup();
  }
  const onDelete = (id:string) => {
      requestApi(`category/${id}`, 'DELETE',{}).then(() => {
        onSuccecc()
    }, error => {
        console.log(error);
    })
  }
  return (
    <div>
      {showPopup && <Popup onHandlePopup={handlePopup}>
        <EditCategory value={formCategory} onHandlePopup={handlePopup} onHandleFrom={handleFromCategory} onSubmid={onSubmid} errorForm={errorForm} />
      </Popup>}
      <div className="border p-4 rounded-md shadow-lg">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Hình ảnh</th>
                      <th scope="col" className="px-6 py-4">Tên danh mục</th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4"></th>
                      <th scope="col" className="px-6 py-4">
                        <button onClick={() => {
                          handlePopup()
                          setFormCategory(defaultValueCategory)
                        }} className="px-4 py-2 rounded bg-green-500 text-white flex gap-2 items-center">
                          Thêm mới
                          <IoAddCircle />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCategory.map((item: Category, index) => {
                      return <ItemCategory key={index} setIsEdit={setIsEdit} setFormCategory={setFormCategory} category={item} onHandlePopup={handlePopup} onDelete={onDelete} />
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCategory