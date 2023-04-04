import axios from "axios";
import { useEffect, useState } from "react";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import type IRestaurante from "../../interfaces/IRestaurante";
import type { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [{ proximaPagina, restaurantes }, setRestaurantes] = useState<{
    restaurantes: IRestaurante[];
    proximaPagina: string;
  }>({ restaurantes: [], proximaPagina: "" });

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) =>
        setRestaurantes({
          restaurantes: resposta.data.results,
          proximaPagina: resposta.data.next,
        })
      );
  }, []);

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina).then((resposta) =>
      setRestaurantes({
        restaurantes: [...restaurantes, ...resposta.data.results],
        proximaPagina: resposta.data.next,
      })
    );
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
