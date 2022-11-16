import React,{Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      ofertas:[],
      pos:null,
      titulo:'Nuevo',
      oferta:'',
      id:0,
      empresa:'',
      perfil:'',
      nivel:'',
      fecha:''
    })
    this.cambioOferta = this.cambioOferta.bind(this);
    this.cambioEmpresa = this.cambioEmpresa.bind(this);
    this.cambioPerfil = this.cambioPerfil.bind(this);
    this.cambioNivel = this.cambioNivel.bind(this);
    this.cambioFecha = this.cambioFecha.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

  cambioEmpresa(e){
    this.setState({
      empresa: e.target.value
    })
  }
  cambioOferta(e){
    this.setState({
      oferta: e.target.value
    })
  }

  cambioFecha(e){
    this.setState({
      fecha: e.target.value
    })
  }

  cambioPerfil(e){
    this.setState({
      perfil: e.target.value
    })
  }

  cambioNivel(e){
    this.setState({
      nivel: e.target.value
    })
  }
  componentDidMount(){
    axios.get('http://localhost:8000/api/ofertas')
    .then(res =>{
      console.log(res.data);
      this.setState({ofertas: res.data})
    })
  }
  mostrar(cod,index){
    axios.get('http://localhost:8000/api/oferta/'+cod)
    .then(res => {
      this.setState({
        pos: index,
        titulo: 'Editar',
        id: res.data.id,
        oferta :res.data.titulo,
        empresa: res.data.empresa,
        perfil: res.data.perfil,
        nivel : res.data.nivel,
        fecha : res.data.pub_date
      })
    })
  }
  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      titulo: this.state.oferta,
      empresa: this.state.empresa,
      perfil: this.state.perfil,
      nivel: this.state.nivel,
      pub_date : this.state.fecha
    }
    if(cod>0){
      //edición de un registro
      axios.put('http://localhost:8000/api/oferta/'+cod,datos)
      .then(res =>{
        let indx = this.state.pos;
        this.state.ofertas[indx] = res.data;
        var temp = this.state.ofertas;
        this.setState({
          pos:null,
          titulo:'Nuevo',
          id:0,
          oferta:'',
          empresa:'',
          perfil:0,
          nivel:'',
          fecha:'',
          ofertas: temp
        });
      }).catch((error) =>{
        console.log(error.toString());
      });
    }else{
      //nuevo registro
      axios.post('http://localhost:8000/api/ofertas',datos)
      .then(res => {
        this.state.ofertas.push(res.data);
        var temp = this.state.ofertas;
        this.setState({
          id:0,
          oferta:'',
          empresa:'',
          perfil:'',
          nivel:'',
          fecha:'',
          ofertas: temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }
  eliminar(cod){
    let rpta = window.confirm("Desea Eliminar?");
    if(rpta){
      axios.delete('http://localhost:8000/api/oferta/'+cod)
      .then(res =>{
        var temp = this.state.ofertas.filter((oferta_laboral)=>oferta_laboral.id !== cod);
        this.setState({
          ofertas: temp
        })
      })
    }
  }

  render() {
    return (
      <div>
        <Container>
                <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Empresa</th>
                    <th>Perfil</th>
                    <th>Nivel</th>
                    <th>Fecha de publicación</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ofertas.map( (oferta_laboral,index) =>{
                    return (
                      <tr key={oferta_laboral.id}>
                        <td>{oferta_laboral.id}</td>
                        <td>{oferta_laboral.titulo}</td>
                        <td>{oferta_laboral.empresa}</td>
                        <td>{oferta_laboral.perfil}</td>
                        <td>{oferta_laboral.nivel}</td>
                        <td>{oferta_laboral.pub_date}</td>
                        <td>
                        <Button variant="warning" onClick={()=>this.mostrar(oferta_laboral.id,index)}>Editar</Button>
                        <Button variant="danger" onClick={()=>this.eliminar(oferta_laboral.id)}>Eliminar</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <hr />
              <h1>{this.state.titulo}</h1>
              <Form onSubmit={this.guardar}>
                <Form.Control type="hidden" value={this.state.id} />
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el Titulo de la oferta:</Form.Label>
                  <Form.Control type="text" value={this.state.oferta} onChange={this.cambioOferta} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese el nombre de la Empresa:</Form.Label>
                  <Form.Control type="text" value={this.state.empresa} onChange={this.cambioEmpresa} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Perfil:</Form.Label>
                  <Form.Select value={this.state.perfil} onChange={this.cambioPerfil}>
                    <option value="BackEnd" name="BackEnd">BackEnd</option>
                    <option value="FrontEnd" name="FrontEnd">FrontEnd</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nivel:</Form.Label>
                  <Form.Select value={this.state.nivel} onChange={this.cambioNivel}>
                    <option value="Junior" name="Junior">Junior</option>
                    <option value="Semisenior" name="Semisenior">Semisenior</option>
                    <option value="Senior" name="Senior">Senior</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control type="date" value={this.state.fecha} onChange={this.cambioFecha} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  GUARDAR
                </Button>
            </Form>
          </Container>

      </div>
    )
  }
}
export default App;


