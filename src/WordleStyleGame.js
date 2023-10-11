import { useTheme } from "./ThemeContext"

function WordleStyleGame(){
    const { theme } = useTheme();
    return(
        <div>This is the WordleStyleGame</div>
    )
}

export default WordleStyleGame