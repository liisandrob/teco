import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            last_name: '',
            legajo: '',
            email: '',
            birthday: '',
            users: [],
            _id: ''
        };
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }


    addUser(e) {
        if (this.state._id) {
            fetch(`/api/users/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: data.message });
                    this.setState({
                        name: '',
                        last_name: '',
                        legajo: '',
                        email: '',
                        birthday: '',
                        users: [],
                        _id: ''
                    })
                })
            this.fetchUsers();
        } else {
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: data.message });
                    this.setState({
                        name: '',
                        last_name: '',
                        legajo: '',
                        email: '',
                        birthday: ''
                    });
                })
        }
        this.fetchUsers();
        e.preventDefault();
    }

    resetForm(e) {
        this.setState({
            name: '',
            last_name: '',
            legajo: '',
            email: '',
            birthday: '',
            _id: ''
        })
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('/api/users/')
            .then(res => res.json())
            .then(data => {
                this.setState({ users: data })
            })
    }

    deleteUser(id) {
        if (confirm('Borrar usuario?')) {
            fetch('/api/users/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: data.message });
                });
            this.fetchUsers();
        }
    }

    editUser(id) {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    name: data.name,
                    last_name: data.last_name,
                    legajo: data.legajo,
                    email: data.email,
                    birthday: data.birthday,
                    _id: data._id
                })
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/*NAVEGACION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">TECO</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addUser} onReset={this.resetForm}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="name" type="text" placeholder="Nombre" value={this.state.name} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="last_name" type="text" placeholder="Apellido" value={this.state.last_name} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="legajo" type="text" placeholder="Legajo" value={this.state.legajo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="email" type="text" placeholder="E-Mail" value={this.state.email} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="birthday" type="date" placeholder="Fecha de nacimiento" value={this.state.birthday} />
                                            </div>
                                        </div>
                                        {this.state._id ? <button type="submit" className="btn teal lighten-2">Modificar usuario</button> : <button type="submit" className="btn light-blue darken-4" >Registrar usuario</button>}
                                        {this.state._id ? <button type="reset" className="btn red darken-1" style={{ margin: '4px' }} ><i className="material-icons">cancel</i></button> : <p>*Todos los campos son requeridos</p>}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Legajo</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Edad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(user => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user.legajo}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.age}</td>
                                                    <td>
                                                        <button className="btn teal lighten-2" style={{ margin: '4px' }} onClick={() => this.editUser(user._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn red darken-1" style={{ margin: '4px' }} onClick={() => this.deleteUser(user._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;