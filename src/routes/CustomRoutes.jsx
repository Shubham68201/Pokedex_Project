import { Routes, Route } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

function CustomRoutes() {
    return(
        <Routes>
            <Route path="/Pokedex_Project/" element={<Pokedex/>} />
            <Route path="/Pokedex_Project/pokemon/:id" element={<PokemonDetails/>} />
        </Routes>
    );
}

export default CustomRoutes;