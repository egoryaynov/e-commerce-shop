import SignIn from "./pages/SignIn"
import {TokenContext} from "./context/TokenContext";

const App = () => {
    return (
        <TokenContext.Provider value={}>
            <SignIn/>
        </TokenContext.Provider>
    )
}

export default App
