import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [nameHotel, setNameHotel] = useState("");
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [qualification, setQualification] = useState(0);
  const [comment, setComment] = useState("");

  const [editHotelId, setEditHotelId] = useState("");
  const [editNameHotel, setEditNameHotel] = useState("");
  const [editCategory, setEditCategory] = useState(0);
  const [editPrice, setEditPrice] = useState("");
  const [editPicture, setEditPicture] = useState("");
  const [editQualification, setEditQualification] = useState(0);
  const [editComment, setEditComment] = useState("");

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

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:44385/api/Hotels/${id}`)
      .then((response) => {
        const hotelToEdit = response.data;
        setEditNameHotel(hotelToEdit.hotelname);
        setEditCategory(hotelToEdit.categoria);
        setEditPrice(hotelToEdit.precio);
        setEditPicture(hotelToEdit.fotos);
        setEditQualification(hotelToEdit.calificacion);
        setEditComment(hotelToEdit.comentario);
        setEditHotelId(id);

        // Load all hotels and update data state
        axios
          .get(`https://localhost:44385/api/Hotels`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar a este Hotel?.") === true) {
      axios
        .delete(`https://localhost:44385/api/Hotels?id=${id}`)
        .then((response) => {
          processData(response.data);

          if (response.status === 204) {
            toast.success("El hotel fue eliminado exitosamente.");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:44385/api/Hotels/${editHotelId}`;
    const data = {
      hotelid: editHotelId,
      hotelname: editNameHotel,
      categoria: editCategory,
      precio: editPrice,
      fotos: editPicture,
      calificacion: editQualification,
      comentario: editComment,
    };

    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success(`El hotel ${nameHotel} fue editado exitosamente.`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

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

  const handleSave = () => {
    const url = "https://localhost:44385/api/Hotels";
    const data = {
      hotelname: nameHotel,
      categoria: category,
      precio: parseFloat(price),
      fotos: picture,
      calificacion: qualification,
      comentario: comment,
    };

    axios
      .post(url, data)
      .then((result) => {
        toast.success(`El hotel ${nameHotel} fue agregado exitosamente.`);
        clear();
        getData();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setNameHotel("");
    setCategory(0);
    setPrice(0);
    setPicture("");
    setQualification(0);
    setComment("");
  };

  return (
    <Fragment>
      <h3>4. Métodos para todo el CRUD de hoteles.</h3>
      <div className="m-5">
        <ToastContainer />

        <Container>
          <Form>
            <Row>
              <Col>
                <input
                  type="text"
                  className="form-control mb-3 mt-3"
                  placeholder="Nombre del Hotel"
                  value={nameHotel}
                  onChange={(e) => setNameHotel(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3 mt-3"
                  value={category}
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                >
                  <option>Categoría</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </Form.Select>
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control mb-3 mt-3"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Control
                    type="file"
                    multiple
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  value={qualification}
                  onChange={(e) => setQualification(parseInt(e.target.value))}
                >
                  <option>Calificación</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <button
                  className="btn btn-success mb-3 mt-3"
                  onClick={() => handleSave()}
                >
                  Agregar
                </button>
              </Col>
            </Row>
          </Form>
        </Container>

        <hr />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Hotel</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Fotos</th>
              <th>Calificación</th>
              <th>Comentario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0
              ? data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.hotelid}</td>
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
                      <td>
                        <img src={item.fotos} alt="Imagen del hotel" />
                      </td>
                      <td>{item.calificacion}</td>
                      <td>{item.comentario}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(item.hotelid)}
                        >
                          Editar
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.hotelid)}
                        >
                          Eliminar
                        </button>
                        &nbsp;
                      </td>
                    </tr>
                  );
                })
              : "Cargando..."}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Hotel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form>
                <Row>
                  <Col>
                    <input
                      type="text"
                      className="form-control mb-3 mt-3"
                      placeholder="Nombre del Hotel"
                      value={editNameHotel}
                      onChange={(e) => setEditNameHotel(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      className="mb-3 mt-3"
                      value={editCategory}
                      onChange={(e) =>
                        setEditCategory(parseInt(e.target.value))
                      }
                    >
                      <option>Categoría</option>
                      <option value="1">⭐</option>
                      <option value="2">⭐⭐</option>
                      <option value="3">⭐⭐⭐</option>
                      <option value="4">⭐⭐⭐⭐</option>
                      <option value="5">⭐⭐⭐⭐⭐</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <input
                      type="text"
                      className="form-control mb-3 mt-3"
                      placeholder="Precio"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Control
                        type="file"
                        multiple
                        value={editPicture}
                        onChange={(e) => setEditPicture(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      className="mb-3"
                      value={editQualification}
                      onChange={(e) =>
                        setEditQualification(parseInt(e.target.value))
                      }
                    >
                      <option>Calificación</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Comentario"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          {error ? <p>{error}</p> : <p>¡Datos cargados con éxito!</p>}
          {/* Render the received data here */}
        </div>
      </div>
    </Fragment>
  );
};

export default CRUD;
