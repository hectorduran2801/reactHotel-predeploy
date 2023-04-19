import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";

const Filter = () => {
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [minCalificacion, setMinCalificacion] = useState(0);
  const [maxCalificacion, setMaxCalificacion] = useState(0);

  useEffect(() => {
    fetchData();
  }, [categoria, minCalificacion, maxCalificacion]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44385/api/Hotels/Filter?categoria=${categoria}&minCalificacion=${minCalificacion}&maxCalificacion=${maxCalificacion}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <h3>
        2. Método para listar los hoteles filtrando por: Categoría, por
        calificaciones.
      </h3>
      <div className="m-5">
        <Container>
          <Form>
            <Row>
              <Col>

              <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option>Categoría</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </Form.Select>
    
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <Form.Control
                  className="mb-3 mt-3"
                  placeholder="Minima Calificación"
                  onChange={(e) => setMinCalificacion(parseInt(e.target.value))}
                />
              </Col>
              <Col>
                <Form.Control
                  className="mb-3 mt-3"
                  placeholder="Maxima Calificación"
                  onChange={(e) => setMaxCalificacion(parseInt(e.target.value))}
                />
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

export default Filter;
