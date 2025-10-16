import express from "express";
import cors from "cors";
import { data } from "./const.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server listening on PORT:", PORT);
});

// Función auxiliar para fecha y hora actual
const getDateTime = () => new Date().toLocaleString();

const ProcessingAllData = (request, response) => {
  response.send({
    status: true,
    data,
    dateTime: getDateTime(),
  });
};
app.get("/allData", ProcessingAllData);

const ProcessingDataById = (request, response) => {
  const { idItem } = request.params;
  const item = data.find((e) => e.id === idItem);

  response.send({
    status: !!item,
    item: item || null,
    dateTime: getDateTime(),
  });
};
app.get("/dataInfo/:idItem", ProcessingDataById);

const ProcessingDataByStatus = (request, response) => {
  const { status } = request.params;
  const boolStatus = status === "true";
  const filtered = data.filter((e) => e.isActive === boolStatus);

  response.send({
    status: true,
    data: filtered,
    dateTime: getDateTime(),
  });
};
app.get("/dataInfo/status/:status", ProcessingDataByStatus);

const ProcessingDataQuery = (request, response) => {
  let filtered = [...data];
  const queryParams = request.query;

  for (const key in queryParams) {
    filtered = filtered.filter((item) => String(item[key]) === String(queryParams[key]));
  }

  response.send({
    status: true,
    data: filtered,
    dateTime: getDateTime(),
  });
};
app.get("/dataInfoQuery", ProcessingDataQuery);

const ProcessingDataQueryMulti = (request, response) => {
  const queryParams = request.query; // obtiene los parámetros enviados
  let filtered = [...data]; // copia del arreglo original

  // Si no se enviaron parámetros, devolver todos
  if (Object.keys(queryParams).length === 0) {
    return response.send({
      status: true,
      message: "No se enviaron parámetros, se devuelven todos los datos",
      data,
      dateTime: new Date().toLocaleString(),
    });
  }

  // Filtrar dinámicamente por cada parámetro recibido
  for (const key in queryParams) {
    filtered = filtered.filter(
      (item) => String(item[key]) === String(queryParams[key])
    );
  }

  // Responder con el resultado
  response.send({
    status: true,
    params: queryParams,
    data: filtered,
    dateTime: new Date().toLocaleString(),
  });
};

app.get("/dataInfoQueryMulti", ProcessingDataQueryMulti);