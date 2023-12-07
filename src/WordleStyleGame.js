import { useTheme } from "./ThemeContext"

function WordleStyleGame() {
    const { theme } = useTheme();
    return (
        <div style={{
            background: theme === "light" ? "white" : "black",
            color: theme === "light" ? "black" : "white",
            border: "3px solid"
        }}>This is the WordleStyleGame
            I want to create a game where each day you are given a song and have to try and fill in as many of the lyrics as possible.
            Inspiree by Lyricle. They use Lyrics.com for lyrics.
        </div>
    )
}

export default WordleStyleGame