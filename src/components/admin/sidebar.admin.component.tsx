import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className="p-4 border-2 shadow-lg h-screen text-gray-700"  >
            <div>
                <div className='pb-10'>
                    <img className='w-[120px] h-[120px] border shadow m-auto rounded-full object-cover' src="https://tranhtomaudep.com/wp-content/uploads/2023/09/to-mau-khung-canh-cho-ben-thanh.jpg" alt="" />
                </div>
                <div className="flex flex-col gap-6 w-48 m-auto">
                    <Link to='/' className='  font-semibold hover:text-gray-900'>Dashboard</Link>
                    <Link to="/user" className='  font-semibold hover:text-gray-900'>User</Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar