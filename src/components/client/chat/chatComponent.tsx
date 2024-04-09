import { useContext } from "react"
import { infoUserContext } from "../../../hook/admin/contexts"
import { useGetListRoomChatQuery } from "../../../redux/rtkQuery/messenger"
import ListRoomChat from "./listRoomChat"
import { RoomChat } from "../../../util"
import { useParams } from "react-router-dom"
import ListMessenger from "./ListMessenger"

const ChatComponent = () => {
  const { infoUser } = useContext(infoUserContext)
  const { idCustomer } = useParams()
  const { data: listRoomChat, isLoading, isSuccess, refetch } = useGetListRoomChatQuery(infoUser.sub)  
  const handleShowListRoom = () => {
    refetch()
  }
  
  return (
    <div className="  lg:w-[950px] m-auto py-4">
        <div className=" bg-white rounded shadow-md max-h-[650px] h-[80vh]">
            <div className="flex h-full">
              <div className=" w-2/5 border-r h-full">
                <div className=" h-full flex flex-col">
                    <div className=" p-4">
                      <input type="text" className=" w-full border rounded-md outline-none p-2" placeholder="Nhập số điện thoại...." />
                    </div>
                    <div className=" h-full border-t overflow-y-auto">

                      { !isLoading && isSuccess &&
                        listRoomChat.map((item:RoomChat)=>{
                          return <ListRoomChat key={item._id} roomChat={item} infoUser={infoUser} />
                        })
                      }

                    </div>
                </div>
              </div>
              <div className=" w-3/5 h-full">
                { idCustomer ? 
                  <ListMessenger idCustomer={idCustomer} onHandleShowListRoom={handleShowListRoom} infoUser={infoUser} />
                :
                  <div className=" p-5 h-full flex  flex-col items-center justify-center">
                    <img className=" w-full h-full object-cover" src="https://chat.chotot.com/emptyRoom.png" alt="" />
                    <p className=" font-semibold text-base text-center">Tích cực chat, chốc lát chốt đơn</p>
                  </div>
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default ChatComponent