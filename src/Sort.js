import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";

const Sort = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [orderBy, setOrderBy] = useState("asc");

  const processData = (data) => {
    setData(data);
  };

  const getData = () => {
    axios
      .get(`https://localhost:44385/api/Hotels/Sort?sortBy=${orderBy}`)
      .then((response) => {
        processData(response.data);
      })
      .catch((error) => {
        setError("Ocurrió un error al obtener datos.");
      });
  };

  useEffect(() => {
    getData();
  }, [orderBy]);

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <Fragment>
      <h3>
        3. Método que devuelva los hoteles ordenados por Precio (de mayor a
        menor y/o viceversa).
      </h3>
      <div className="m-5">
        <Container>
          <Form>
            <Row>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  value={orderBy}
                  onChange={handleOrderChange}
                >
                  <option value="asc">ASCENDENTE</option>
                  <option value="desc">DESCENDENTE</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Container>

        <hr />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>ID</th> */}
              <th>Nombre del Hotel</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Fotos</th>
              <th>Calificación</th>
              <th>Comentario</th>
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
                      <td>
                        {(() => {
                          switch (item.categoria) {
                            case 1:
                              return (
                                <span role="img" aria-label="1 estrella">
                                  ⭐
                                </span>
                              );
                            case 2:
                              return (
                                <span role="img" aria-label="2 estrellas">
                                  ⭐⭐
                                </span>
                              );
                            case 3:
                              return (
                                <span role="img" aria-label="3 estrellas">
                                  ⭐⭐⭐
                                </span>
                              );
                            case 4:
                              return (
                                <span role="img" aria-label="4 estrellas">
                                  ⭐⭐⭐⭐
                                </span>
                              );
                            case 5:
                              return (
                                <span role="img" aria-label="5 estrellas">
                                  ⭐⭐⭐⭐⭐
                                </span>
                              );
                            default:
                              return null;
                          }
                        })()}
                      </td>
                      <td>{item.precio.toFixed(2)}</td>
                      <td>{item.fotos}</td>
                      <td>{item.calificacion}</td>
                      <td>{item.comentario}</td>
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

export default Sort;
