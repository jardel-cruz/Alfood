import {
  Box,
  Button,
  TextField,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Link,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
  const parametros = useParams();
  const [restaurante, setRestaurante] = useState("");

  useEffect(() => {
    if (parametros.id) {
      const url = `restaurantes/${parametros.id}/`;
      http
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
          url: `restaurantes/${parametros.id}/`,
        }
      : { method: "post", url: "restaurantes/" };

    http[obj.method as "post"](obj.url, {
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
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link>
                <Button sx={{ my: 2, color: "#fff" }}>Restaurantes</Button>
              </Link>
              <Link>
                <Button sx={{ my: 2, color: "#fff" }}>Novo Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h6">
                Formulário restaurante
              </Typography>
              <Box component="form" onSubmit={aoSubmeterForm}>
                <TextField
                  label="Nome do Restaurante"
                  variant="standard"
                  value={restaurante}
                  onChange={({ target }) => setRestaurante(target.value)}
                  fullWidth
                  required
                ></TextField>
                <Button
                  sx={{ marginTop: 1 }}
                  type="submit"
                  variant="outlined"
                  fullWidth
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
