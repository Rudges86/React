import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css";

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme,setFilme]= useState({});
    const [load,setLoad] = useState(true);
    useEffect(()=>{
            async function loadFilme(){
                await api.get(`/movie/${id}`,{
                    params:{
                        api_key:"7e2a22cf4a08c0b8c1211e0560cc5809",
                        language: "pt-BR",
                        page:1
                    }
                })
                .then((response)=>{
                    setFilme(response.data);
                    setLoad(false);
                })
                .catch(()=>{
                    console.log("FILME NÂO ENCONTRADo")
                    navigate("/",{replace: true});
                    return;
                })
            }

            
            loadFilme();

            return () => {
                console.log("O componente foi desmontado")
            }
       
    },[]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id === filme.id) // comparando para saber se o que ta lá no localstorage é o mesmo que está na página

        if(hasFilme){
            alert("Já ta na lista")
            return ;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix",JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso")
    }
    if(load){
        return (
            <div className="filme-info">
                <h2 className="loading">Carregando detalhes ...</h2>
            </div>
        );
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {Math.round(filme.vote_average)} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a tarrget="blank"rel="external" href={`https://youtube.com/results?search_query=${filme.title}`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;