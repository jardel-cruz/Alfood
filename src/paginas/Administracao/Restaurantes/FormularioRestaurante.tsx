import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
  const parametros = useParams();
  const [restaurante, setRestaurante] = useState("");

  useEffect(() => {
    if (parametros.id) {
      console.log(1);
      const url = `http://localhost:8000/api/v2/restaurantes/${parametros.id}/`;
      axios
        .get<Omit<IRestaurante, "pratos">>(url)
        .then(({ data }) => setRestaurante(data.nome))
        .catch((err) => console.log(err));
    }
  }, [parametros]);

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let obj = parametros.id
      ? {
          method: "put",
          url: `http://localhost:8000/api/v2/restaurantes/${parametros.id}/`,
        }
      : { method: "post", url: "http://localhost:8000/api/v2/restaurantes/" };

    axios[obj.method as "post"](obj.url, {
      nome: restaurante,
    })
      .then(() =>
        alert(
          `Restaurante ${
            parametros.id ? "atualizado" : "cadastrado"
          } com sucesso`
        )
      )
      .catch((err) => console.log("Erro na requisição", err));
  };

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        label="Nome do Restaurante"
        variant="standard"
        value={restaurante}
        onChange={({ target }) => setRestaurante(target.value)}
      ></TextField>
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
}
