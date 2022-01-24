import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {nombre: "Bitcoin", valor: 40000},
  {nombre: "NFT", valor: 55000},
];

class App extends React.Component{
  state={
    data:data,
    form:{
      nombre:'',
      valor:''
    },
    modalInsertar:false,
    modalEditar: false,
  };

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value,
      }
    });
  }

mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}
ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}

mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form: registro});
}
ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}

insertar=()=>{
  var valorNuevo={...this.state.form};
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar:false});
}

editar=(dato)=>{
  var contador = 0;
  var lista= this.state.data;
  lista.map((registro)=>{
    if(registro.nombre===dato.nombre){
      lista[contador].nombre=dato.nombre;
      lista[contador].valor=dato.valor;
    }
    contador++;
  });
  this.setState({data: lista, modalEditar:false});
}

eliminar=(dato)=>{
  var opcion=window.confirm("Desea eliminar"+dato.nombre);
  if(opcion){
    var contador =0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.nombre === dato.nombre){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data:lista});
  }
}

  render(){
    return(
      <>
      <Container>
      <br/>
      <h1>Aplicación de Criptomonedas</h1>
      <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Ingresar Cripto nueva</Button>
      <br/><br/>
      
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Editar/Borrar</th>
          </tr>  
        </thead>
        <tbody>
          {this.state.data.map((elemento)=>(
          <tr>
            <td>{elemento.nombre}</td>
            <td>{elemento.valor}</td>
            <td>
              <Button color='primary' onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
              <Button color='danger' onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
            </td>
          </tr>
            ))
          }

        </tbody>
      </Table>

      </Container>
      <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Registro</h3></div>
          </ModalHeader>

          <ModalBody>           
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor: 
              </label>
              <input
                className="form-control"
                name="valor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.valor}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Insertar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Datos de Criptomoneda</h3></div>
          </ModalHeader>

          <ModalBody>            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.ocultarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Registros</h3></div>
          </ModalHeader>

          <ModalBody>            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                value={this.state.form.nombre}
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                value={this.state.form.valor}
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={()=>this.editar(this.state.form)}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={()=>this.ocultarModalEditar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    )
  }
}

export default App;
