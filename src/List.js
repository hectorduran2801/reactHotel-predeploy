import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Task = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const processData = (data) => {
    setData(data);
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get("https://localhost:44385/api/Hotels")
        .then((response) => {
          processData(response.data);
        })
        .catch((error) => {
          setError("Ocurrió un error al obtener datos.");
        });
    };

    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:44385/api/Hotels")
      .then((response) => {
        processData(response.data);
      })
      .catch((error) => {
        setError("Ocurrió un error al obtener datos.");
      });
  };

  return (
    <Fragment>
      <h3>1.	Método que devuelva un listado de Hoteles, lista completa sin filtros.</h3>
      <div className="m-5">
        <hr />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>ID</th> */}
              <th>Nombre del Hotel</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0
              ? data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/*<td>{item.hotelid}</td>*/}
                      <td>{item.hotelname}</td>
                    </tr>
                  );
                })
              : "Cargando..."}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default Task;
