import { useTheme } from "./ThemeContext"

function WordleStyleGame(){
    const { theme } = useTheme();
    return(
        <div>This is the WordleStyleGame
            I want to create a game where each day you are given a song and have to try and fill in as many of the lyrics as possible.
            Inspiree by Lyricle. They use Lyrics.com for lyrics.
        </div>
    )
}

export default WordleStyleGame