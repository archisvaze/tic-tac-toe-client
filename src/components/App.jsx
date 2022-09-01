import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./Game";
import Header from "./Header";
import Home from "./Home";
import OnlineGame from "./OnlineGame";
import PageNotFound from "./PageNotFound";

function App(props) {



    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/:id" element={<OnlineGame />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;