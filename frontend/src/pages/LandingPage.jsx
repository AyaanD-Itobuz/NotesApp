import react from "react"
import LandingImg from "../assets/notes_landing.png"

export function LandingPage() 
{
    return(
        <>
        <div className = "flex p-[20px] h-[91.2vh] bg-[#1f2937] justify-around items-center landingPage">
            <div className = "w-1/2 text-white text-8xl pl-8 font-extrabold landingPage-content">Notes Taking Made Simple</div>
            <div className = "w-1/2  landingPage-image">
                <img src={LandingImg} alt="Landing Page Image" />
            </div>
        </div>
        </>
    )
}