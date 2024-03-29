import Slider from 'react-slick';
import { CategoryDetail } from '../../../util';
import { Link } from 'react-router-dom';

const ListCategory = ({ listCategoryDetail }: { listCategoryDetail: CategoryDetail[] }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };
    return (
        <>
            <div className="product-slider-container z-10">
                <Slider {...settings}>
                    {listCategoryDetail.map((item) => {
                        return (
                            <Link to={`/${item.link}`} key={item._id} className=" text-center  z-10">
                                <img className="w-12 h-12 object-contain m-auto  z-10" src={item.thumbnail} alt="" />
                                <p className="text-center text-xs  z-10">{item.name}</p>
                            </Link>
                        )
                    })}
                </Slider>
            </div>
        </>
    )
}

export default ListCategory