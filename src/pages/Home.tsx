import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()

    const suggestions = [
        "/stream/naruto/1",
        "/stream/sousou-no-frieren/1",
        "/stream/black-clover/1",
        "/stream/rezero-kara-hajimeru-break-time/1",
        "/stream/mob-psycho-100/1",
    ]

    function suggest(): string {
        return suggestions[Math.floor(Math.random() * suggestions.length)]
    }

    return (
        <div>
            <div className="text-red-500 text-center font-bold p-10">
                <p className="text-6xl">Woo!</p>
                <p className="text-5xl">Seems like home is under construction</p>
                <p className="text-3xl text-white">You can still search for the anime you want through the navbar :)</p>
                <p className="text-2xl text-white">And, you can checkout your bookmarks as well</p>
                <div className="p-10 flex flex-col space-y-5 justify-center">
                <Link to="/bookmarks" className="bg-red-500 text-white p-5 text-center m-auto hover:bg-black rounded-lg">Go to bookmarks</Link>

                <button onClick={
                    ((e) => {
                        e.preventDefault()
                        navigate(suggest())
                    })
                } className="hover:bg-red-500 text-white p-5 text-center m-auto bg-black rounded-lg">Suggest Me Something</button>
                </div>
            </div>

        </div>
    )
}