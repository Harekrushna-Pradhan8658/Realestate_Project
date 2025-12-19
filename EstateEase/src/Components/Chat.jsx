import React, { useState } from 'react'

const Chat = () => {

  const [chat, setChat] = useState(true);

  return (
     <div className="h-full flex flex-col bg-base-200 p-4 space-y-4">
      {/* Messages List */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-scroll">
        <h1 className="text-white text-xl">Messages</h1>

        {[
          {
            name: "ShahRuk Khan",
            img: "https://www.masala.com/public/images/2019/11/11/Shah-Rukh-Khan-Baadhshah-Of-Bollywood.jpg"
          },
          {
            name: "Amir Khan",
            img: "https://tse4.mm.bing.net/th?id=OIP.FMRnw8zUwJzWreSGMAzGvQHaEK&pid=Api&P=0&h=220"
          },
          {
            name: "Salman Khan",
            img: "https://s.yimg.com/zb/imgv1/27f7f7c9-b05d-392f-9d37-d44557ebc3c9/t_500x300"
          },
          {
            name: "Akshy Kumar",
            img: "https://tse2.mm.bing.net/th?id=OIP.AonRyRTuMyCH2BmlWnVtrwHaFj&pid=Api&P=0&h=220"
          },
          {
            name: "Hritik Rosan",
            img: "https://tse3.mm.bing.net/th?id=OIP.MDa6W0xm6Q2fIrLqEIWTHQHaFB&pid=Api&P=0&h=220"
          },
          {
            name: "Ajay Devgon",
            img: "https://tse1.mm.bing.net/th?id=OIP.8wRKaWenHDKnHdxZRVb_8wHaJ3&pid=Api&P=0&h=220"
          },
          {
            name: "ShahRuk Khan",
            img: "https://www.masala.com/public/images/2019/11/11/Shah-Rukh-Khan-Baadhshah-Of-Bollywood.jpg"
          },
          {
            name: "Amir Khan",
            img: "https://tse4.mm.bing.net/th?id=OIP.FMRnw8zUwJzWreSGMAzGvQHaEK&pid=Api&P=0&h=220"
          },
          {
            name: "Salman Khan",
            img: "https://s.yimg.com/zb/imgv1/27f7f7c9-b05d-392f-9d37-d44557ebc3c9/t_500x300"
          },
          {
            name: "Akshy Kumar",
            img: "https://tse2.mm.bing.net/th?id=OIP.AonRyRTuMyCH2BmlWnVtrwHaFj&pid=Api&P=0&h=220"
          },
          {
            name: "Hritik Rosan",
            img: "https://tse3.mm.bing.net/th?id=OIP.MDa6W0xm6Q2fIrLqEIWTHQHaFB&pid=Api&P=0&h=220"
          },
          {
            name: "Ajay Devgon",
            img: "https://tse1.mm.bing.net/th?id=OIP.8wRKaWenHDKnHdxZRVb_8wHaJ3&pid=Api&P=0&h=220"
          }
        ].map((person, index) => (
          <div
            key={index}
            className="bg-base-100 p-5 rounded-lg flex items-center gap-5 cursor-pointer hover:shadow-md"
          >
            <img
              src={person.img}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <span className="font-bold">{person.name}</span>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet...</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      {chat && (
        <div className="flex-1 bg-gray- flex flex-col justify-between shadow-lg rounded-lg">
          {/* Top Bar */}
          <div className="bg-base-200 p-5 flex justify-between items-center font-bold">
            <div className="flex items-center gap-4">
              <img
                src="https://s.yimg.com/fz/api/res/1.2/psfQjFAAKfXuCSAmYsVKyA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cT04MDt3PTE5Mg--/https://s.yimg.com/zb/imgv1/c05d7984-5186-3908-accf-e13beb711613/s_140x140"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>Amir Khan</span>
            </div>
            <span className="cursor-pointer" onClick={() => setChat(false)}>X</span>
          </div>

          {/* Messages Area */}
          <div className="h-[350px] overflow-y-scroll p-5 flex flex-col gap-5">
            {Array(10).fill().map((_, idx) => (
              <div
                key={idx}
                className={`w-1/2 p-3 rounded-md ${
                  idx % 2 === 0 ? "self-start bg-base-100" : "self-end text-right bg-base-100"
                }`}
              >
                <p>Lorem ipsum dolor sit amet</p>
                <span className="text-xs bg-base-100 px-2 py-1 rounded-md mt-2 inline-block">1 hour ago</span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t-2 border-gray-300 h-16 flex items-center justify-between mb-6">
            <textarea
              className="flex-1 h-full border-none p-4 focus:outline-none resize-none"
              placeholder="Type your message..."
            ></textarea>
            <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white h-full  font-bold cursor-pointer">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat;