import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function FormularioRestaurante() {
  const [restaurante, setRestaurante] = useState("");

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/v2/restaurantes/", {
        nome: restaurante,
      })
      .then(() => alert("Restaurante cadastrado com sucesso"))
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
