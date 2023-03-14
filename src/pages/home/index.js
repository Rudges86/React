import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css';
import api from "../../services/api";
//movie/now_playing
function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key:"7e2a22cf4a08c0b8c1211e0560cc5809",
                    language: "pt-BR",
                    page:1
                }
            })
            
            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        }
        loadFilmes();

    },[])

    if(loading){
        return (
            <h2 className="loading">Carregando filmes ...</h2>
        );
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filmes) => {
                    return(
                        <article key={filmes.id}>
                            <strong>{filmes.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`} alt={filmes.title} />
                            <Link to={`/filmes/${filmes.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;