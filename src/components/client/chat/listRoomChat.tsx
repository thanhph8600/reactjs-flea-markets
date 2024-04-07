import { Link } from "react-router-dom";
import { User } from "../../../hook/admin/contexts/info";
import { formatTimeDifference, RoomChat } from "../../../util"

const ListRoomChat = ({ roomChat, infoUser }: { roomChat: RoomChat, infoUser: User }) => {
  const infoReceiver = roomChat.id_customer.find(customer => customer._id != infoUser.sub)
  const classCheckWatch = roomChat.theLastMess.isWatched ||
    infoUser.sub == roomChat.theLastMess.id_customer[0]
    ? 'text-gray-500' :
    'font-semibold text-gray-900'

  return (
    <>
      <Link to={`/chat/${infoReceiver?._id}`} className="border-b border-gray-100 p-2 flex gap-3">
        <div className="">
          <img src={infoReceiver?.avata} className=" w-10 h-10 object-cover rounded-full"></img>
        </div>
        <div className=" w-4/5">
          <div className=" flex justify-between items-center">
            <p className={` ${classCheckWatch} text-sm`}> {infoReceiver?.name} </p>
            <p className=" text-xs text-gray-500 flex justify-end"> {formatTimeDifference(roomChat.theLastMess.created_at)} </p>
          </div>

          <p className={`text-xs  truncate ${classCheckWatch}`}>
            {infoUser.sub == roomChat.theLastMess.id_customer[0] ? 'Bạn: ' : ''}  {roomChat.theLastMess.messenger}
          </p>
        </div>
      </Link>
    </>
  )
}

export default ListRoomChat