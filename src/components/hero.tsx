import {Link} from "react-router-dom";
export const Hero:React.FC=()=>{
    return(
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="hero.png"
              alt="Background Image"
              className="object-cover object-center "
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Welcome to Post Application
            </h1>
            <Link
              to={`/posts`}
              className="bg-slate-200 text-blue-600 hover:bg-purple-600 hover:text-white py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
    )
}