import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../../../assets/slideHome.css'
const SlideHome = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };
    const arr = [
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F4IFP2cH4CAoL27OMlLxRKxr36t7fdsIxruG3EK1QI00%2Fpreset%3Araw%2Fplain%2F8727a06a57f370e90b6bb6ff0830f291-2870185137901482783.jpg&w=256&q=95', name: 'Thanh lý size lầm' },
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FYAZT-yk1q6NsX00pyCMCkztFxEX1LT9OW2G1B8WlaXk%2Fpreset%3Araw%2Fplain%2Fae798f4ba155d2c9f30d555b77a526b6-2853893244263399934.jpg&w=256&q=95', name: 'Thu mua điện thoại' },
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FvmzgXwahsyAR3yqOFOxlC4I54sBtGC8KeSqPhnVqo3M%2Fpreset%3Araw%2Fplain%2Fea30aa00d4c36d21a6d56fe745397327-2741458954087890671.jpg&w=256&q=95', name: 'Nạp đồng tốt' },
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FBJ2sRQGytbTbBoxCqR3juzBaObXNvsJz9Q9KC8O73gQ%2Fpreset%3Araw%2Fplain%2F930641d458c0e05889f865e35a0edefb-2763757223248164734.jpg&w=256&q=95', name: 'Chợ tốt Ưu Đãi' },
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2Fpu3VBwfaHY7VoKkMMkZjYA1tKHBZtt8GDpIYaJgrweU%2Fpreset%3Araw%2Fplain%2Fd5647aa85eaa65381b0a8032499cb915-2815961809231084449.jpg&w=256&q=95', name: 'Thu mua ô tô' },
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FlRml-H3PO0o270WLS26nv9eNs5TDVVfiuSVsHXENpIc%2Fpreset%3Araw%2Fplain%2F425fc9c8bdb4d028d8cc52628fbd047d-2804905330699599227.jpg&w=256&q=95', name: 'Gói Pro' },
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FPeH_Zz-8hDT7yZ8F2Mm-BI4p7HWGasDhgq8I_7xdXyk%2Fpreset%3Araw%2Fplain%2Fe16cec7ca2ff9d7649268427ea9c1e4e-2741458979427623023.jpg&w=256&q=95', name: 'Tin đăng đã lưu' },
        { image: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FBJ2sRQGytbTbBoxCqR3juzBaObXNvsJz9Q9KC8O73gQ%2Fpreset%3Araw%2Fplain%2F930641d458c0e05889f865e35a0edefb-2763757223248164734.jpg&w=256&q=95', name: 'Đăng tin cho tặng' },
    ]
    return (
        <div className="bg-white p-4 rounded shadow ">
            <div className="slide-container">
                <Slider {...settings}>
                    <div className="w-full " style={{ flex: "0 0 100%", scrollSnapAlign: "start" }}>
                        <img className="w-full h-full object-cover" src="https://cdn.chotot.com/admincentre/n7qtGDKACkBUcIBngZ8k6UTViVhsvmUdNsUnxzxGZGU/preset:raw/plain/535ac1ee75274be158be148cdae80735-2862504091815441220.jpg" alt="" />
                    </div>
                    <div className="w-full" style={{ flex: "0 0 100%" }}>
                        <img className="w-full h-full object-cover" src="https://cdn.chotot.com/admincentre/ohIMAFIX9-8rCWt-vMuT0MOTayyZJI6yIhJnJD-VY5k/preset:raw/plain/ca8540e723a5dee6d33069a763ee0b9a-2868438735120187412.jpg" alt="" />
                    </div>
                    <div className="w-full" style={{ flex: "0 0 100%" }}>
                        <img className="w-full h-full object-cover" src="https://cdn.chotot.com/admincentre/cWLoju8Y2ym11MLx91SMfazlWXQ-cTcKmYT9v1Lmfp8/preset:raw/plain/ef3be935782d496456bf9b8e5e7f072a-2824954100074025769.jpg" alt="" />
                    </div>
                </Slider>
            </div>
            <div className='pt-4'>
                <div className=' flex gap-6 justify-between'>
                    {arr.map((item, index) => {
                        return (
                            <div key={index} className=' text-center'>
                                <img className='w-[30px] h-[30px] rounded-md m-auto' src={item.image} alt="" />
                                <p className=' text-sm'> {item.name} </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SlideHome