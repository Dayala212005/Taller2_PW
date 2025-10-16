import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados para los filtros
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [multiFilters, setMultiFilters] = useState({
    isActive: "",
    gender: "",
  });

  const API = "http://localhost:3001";

  const getAllBooks = async () => {
    setLoading(true);
    const res = await fetch(`${API}/allData`);
    const data = await res.json();
    setBooks(data.data || []);
    setLoading(false);
  };

  const getBookById = async () => {
    if (!id) return alert("Ingresa un ID para buscar");
    setLoading(true);
    const res = await fetch(`${API}/dataInfo/${id}`);
    const data = await res.json();
    setBooks(data.item ? [data.item] : []);
    setLoading(false);
  };

  const getBooksByStatus = async () => {
    if (!status) return alert("Selecciona un estado");
    setLoading(true);
    const res = await fetch(`${API}/dataInfo/status/${status}`);
    const data = await res.json();
    setBooks(data.data || []);
    setLoading(false);
  };

  const getBooksByGender = async () => {
    if (!gender) return alert("Escribe un género para buscar");
    setLoading(true);
    const res = await fetch(`${API}/dataInfoQuery?gender=${gender}`);
    const data = await res.json();
    setBooks(data.data || []);
    setLoading(false);
  };

  const getBooksByMultiFilters = async () => {
    const params = new URLSearchParams(multiFilters).toString();
    setLoading(true);
    const res = await fetch(`${API}/dataInfoQueryMulti?${params}`);
    const data = await res.json();
    setBooks(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1> Biblioteca Virtual</h1>

      {/* === Filtros === */}
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Filtro por ID */}
        <div>
          <input
            type="text"
            placeholder="Buscar por ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ padding: "5px", marginRight: "5px" }}
          />
          <button onClick={getBookById}>Buscar</button>
        </div>

        {/* Filtro por estado */}
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: "5px", marginRight: "5px" }}
          >
            <option value="">-- Estado --</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          <button onClick={getBooksByStatus}>Filtrar por estado</button>
        </div>

        {/* Filtro por género */}
        <div>
          <input
            type="text"
            placeholder="Buscar por género"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ padding: "5px", marginRight: "5px" }}
          />
          <button onClick={getBooksByGender}>Filtrar por género</button>
        </div>

        {/* Filtro múltiple */}
        <div>
          <select
            value={multiFilters.isActive}
            onChange={(e) =>
              setMultiFilters({ ...multiFilters, isActive: e.target.value })
            }
            style={{ padding: "5px", marginRight: "5px" }}
          >
            <option value="">-- Estado --</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>

          <input
            type="text"
            placeholder="Género"
            value={multiFilters.gender}
            onChange={(e) =>
              setMultiFilters({ ...multiFilters, gender: e.target.value })
            }
            style={{ padding: "5px", marginRight: "5px" }}
          />

          <button onClick={getBooksByMultiFilters}>Filtrar múltiple</button>
        </div>

        {/* Mostrar todos */}
        <div>
          <button onClick={getAllBooks}>Mostrar todos</button>
        </div>
      </div>

      {/* === Resultados === */}
      {loading ? (
        <p>Cargando datos...</p>
      ) : books.length === 0 ? (
        <p>No hay resultados para mostrar.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Imagen</th>
              <th>Género</th>
              <th>Activo</th>
              <th>Fecha de Publicación</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.nameBook}</td>
                <td>{b.picture}</td>
                <td>{b.gender}</td>
                <td>{b.isActive ? "Activo " : "No activo "}</td>
                <td>{b.datePublish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;