/*Para rotas, baixe a lib, npm install  react-router-dom*/
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filmes";
import Error from "./pages/Error"
import Header from "./components/header";
import Favoritos from "./pages/Favoritos";
function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/>}/>
                <Route path="/filmes/:id" element={<Filme/>}/>
                <Route path="/favoritos" element={<Favoritos/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;