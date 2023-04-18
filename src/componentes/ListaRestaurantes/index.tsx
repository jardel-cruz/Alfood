import axios from "axios";
import { useEffect, useState } from "react";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import type IRestaurante from "../../interfaces/IRestaurante";
import type { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [data, setRestaurantes] = useState<{
    restaurantes: IRestaurante[];
    proximaPagina: string | null;
    paginaAnterior: string | null;
  }>({ restaurantes: [], proximaPagina: null, paginaAnterior: null });

  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("id");

  const request = (
    url: string,
    opcoes?: {
      params: {
        search: string;
        ordering?: string;
      };
    }
  ) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes).then(({ data }) =>
      setRestaurantes({
        paginaAnterior: data.previous,
        proximaPagina: data.next,
        restaurantes: data.results,
      })
    );
  };

  useEffect(() => {
    const url = "http://localhost:8000/api/v1/restaurantes/";
    request(url);
  }, []);

  const paginar = (action: "next" | "previous") => {
    const { paginaAnterior, proximaPagina } = data;
    const commands = {
      next: () => {
        if (proximaPagina) {
          request(proximaPagina);
        }
      },
      previous: () => {
        if (paginaAnterior) {
          request(paginaAnterior);
        }
      },
    };

    return commands[action]();
  };

  const buscarPratos = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    request("http://localhost:8000/api/v1/restaurantes/", {
      params: { search: busca, ordering: ordem },
    });
  };
  const definirOrdem = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdem(target.value);
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscarPratos}>
        <input
          type="text"
          value={busca}
          onChange={({ target }) => setBusca(target.value)}
        />
        <select value={ordem} onChange={definirOrdem}>
          <option value="id">Por Id</option>
          <option value="nome">Por nome</option>
        </select>
        <button type="submit">Buscar</button>
      </form>
      {data.restaurantes.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {data.paginaAnterior && (
        <button onClick={() => paginar("previous")}>Pagina anterior</button>
      )}
      {data.proximaPagina && (
        <button onClick={() => paginar("next")}>Proxima página</button>
      )}
    </section>
  );
};

export default ListaRestaurantes;
