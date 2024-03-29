import { Link } from "react-router-dom";
import { Category } from "../../../util";

const ItemSectionCategory = ({ item }: { item: Category }) => {
  return (
    <>
    <Link to={`/${item.link}`} className=" flex flex-col items-center gap-2">
      <img
        src={item.thumbnail}
        alt="category"
        className="w-16 h-16 object-cover rounded-xl"
      />
      <p className=" text-sm max-w-32 text-center">{item.name}</p>
    </Link>
    </>
  );
};

export default ItemSectionCategory;
