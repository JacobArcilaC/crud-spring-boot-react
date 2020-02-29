import React, { Component } from 'react';
import './App.css';
import { PersonaService } from './service/PersonaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      persona: {
        id: null,
        nombre: null,
        apellido: null,
        contraseña: null,
        telefono : null
      },
      selectedPersona : {

      }
    };
    this.items = [
      {
        label : 'Nuevo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.personaService.getAll().then(data => this.setState({personas: data}))
  }

  save() {
    this.personaService.save(this.state.persona).then(data => {
      this.setState({
        visible : false,
        persona: {
          id: null,
          nombre: null,
          apellido: null,
          contraseña: null,
          telefono : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.personaService.getAll().then(data => this.setState({personas: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.personaService.delete(this.state.selectedPersona.id).then(data => {
        this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.personaService.getAll().then(data => this.setState({personas: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="CRUD PERSONAS CON REACT Y SPRING BOOT">
            <DataTable value={this.state.personas} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedPersona} onSelectionChange={e => this.setState({selectedPersona: e.value})}>
              <Column field="id" header="Cedula"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="apellido" header="Apellido"></Column>
              <Column field="contraseña" header="Contraseña"></Column>
              <Column field="telefono" header="Teléfono"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear persona" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
            <span className="p-float-label">
                <InputText value={this.state.persona.id} style={{width : '100%'}} id="id" onChange={(e) => {
                  let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.id = val;
                        return { persona };
                    })}
                  } />
                <label htmlFor="id">ID</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.nombre} style={{width : '100%'}} id="nombre" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.nombre = val;

                        return { persona };
                    })}
                  } />
                <label htmlFor="nombre">Nombre</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.apellido} style={{width : '100%'}} id="apellido" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.apellido = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="apellido">Apellido</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.contraseña} style={{width : '100%'}} id="contraseña" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.contraseña = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="contraseña">contraseña</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.telefono} style={{width : '100%'}} id="telefono" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.telefono = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="telefono">Teléfono</label>
              </span>
            </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      persona : {
        id: null,
        nombre: null,
        apellido: null,
        contraseña: null,
        telefono : null
      }
    });
  }

  showEditDialog() {
    this.setState({
      visible : true,
      persona : {
        id: this.state.selectedPersona.id,
        nombre: this.state.selectedPersona.nombre,
        apellido: this.state.selectedPersona.apellido,
        contraseña: this.state.selectedPersona.contraseña,
        telefono : this.state.selectedPersona.telefono
      }
    })
  }
}
