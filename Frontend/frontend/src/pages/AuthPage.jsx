import Login from './auth/Login';
import CatBackground from '../assets/CatBackground.png';
import HollowKnight from '../assets/HollowKnight.png'
import Register from './auth/Registration';

const AuthPage = ({isLogin}) => {
  return (
    <div className="relative w-full h-[100vh] bg-black">
      <img
        src={HollowKnight}
        alt="background"
        className="w-full absolute inset-0 h-full object-cover "
      />
      <div className="flex relative  z-10 h-full  bg-opacity-0 backdrop-blur-sm px-2 py-2 transtion-all duration-300">
        <div className="flex w-1/2 flex-col justify-center items-center transition-all duration-300">
          <div>
            <span className="text-8xl font-extrabold text-slate-100 z-50 mb-4">SPIK-</span>
            <span className="text-8xl font-extrabold text-green-700 z-50 mb-4">X</span>
          </div>
          <p className="text-3xl font-extrabold mt-4 text-slate-100 px-2 w-3/4 z-50">
            A Streaming platform where you can watch movies for free, also watch with friends in
            WatchParty mode while Chatting with your friends...
          </p>
        </div>
        <div className="w-1/2 flex justify-center items-center px-52 py-48 z-50 transition-all duration-300">
          {isLogin?<Login/>:<Register/>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
