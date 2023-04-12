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

  const request = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url).then(({ data }) =>
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

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
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
