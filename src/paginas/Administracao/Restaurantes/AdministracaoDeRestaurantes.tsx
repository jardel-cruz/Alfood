import { useEffect, useState } from "react";
import axios from "axios";

import type IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function AdministracaoDeRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const excluir = (restaurante: Omit<IRestaurante, "pratos">) => {
    const url = `http://localhost:8000/api/v2/restaurantes/${restaurante.id}/`;
    axios.delete(url).then(() => {
      const listaRestaurantes = restaurantes.filter(
        (item) => item.id !== restaurante.id
      );
      setRestaurantes([...listaRestaurantes]);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>
                  <Link to={`/admin/restaurantes/${item.id}`}>Editar</Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(item)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        onClick={() => navigate("/admin/restaurantes/novo")}
      >
        Adicionar
      </Button>
    </>
  );
}
