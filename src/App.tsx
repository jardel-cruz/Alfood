import { Routes, Route } from "react-router-dom";
import AdministracaoDeRestaurantes from "./paginas/Administracao/Restaurantes/AdministracaoDeRestaurantes";
import FormularioRestaurante from "./paginas/Administracao/Restaurantes/FormularioRestaurante";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route
        path="/admin/restaurantes"
        element={<AdministracaoDeRestaurantes />}
      />
      <Route
        path="/admin/restaurantes/novo"
        element={<FormularioRestaurante />}
      />
      <Route
        path="/admin/restaurantes/:id"
        element={<FormularioRestaurante />}
      />
    </Routes>
  );
}

export default App;
