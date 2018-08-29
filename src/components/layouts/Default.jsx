import React from 'react'
import { Link, Redirect , withRouter } from 'react-router-dom'
import swal from 'sweetalert2'
import Client from '../../api/Client'

class Default extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: null
        }
        this.addList = this._addList.bind(this);
        this.removeList = this._removeList.bind(this);
    }
    
    componentWillMount() {
        Client.get('lists').then(res => {
            this.setState({
                lists: res.data
            })
        });
    }

    render() {
        let { lists } = this.state;
        let { guid } = this.props.match.params;
        
        if (lists === null) {
            return (
                <div className="container has-text-centered">
                    <div className="todo-loading"/>
                </div>
            )
        }
        
        if (typeof guid === 'undefined' || typeof lists[guid] === 'undefined') {
            let key = Object.keys(lists)[0];
            return (
                <Redirect to={`/list/${key}`}/>
            )
        }

        return (
            <div id="todo--layout" className="box container">
                <div className="columns">
                    <div className="column is-3">
                        <button className="button is-primary is-fullwidth" onClick={ this.addList }>
                            New List
                        </button>
                        <br/>
                        <aside className="menu">
                            <ul className="menu-list">
                                {
                                    Object.keys(lists).map(key => {
                                        return (
                                            <li key={key}>
                                                <Link  
                                                    to={`/list/${key}`}
                                                    className={ guid === key ? 'is-active' : '' }>
                                                    { lists[key].name }
                                                    { 
                                                        Object.keys(lists).length > 1 && 
                                                        <button 
                                                            className="delete is-pulled-right" 
                                                            onClick={ this.removeList.bind(this, key) }/> 
                                                    }
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </aside> 
                    </div>
                    <div className="column todo--layout-main">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }

    _addList() {
        swal({
            title: 'New list name',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            preConfirm: (name) => {
                return Client.post('lists', { name }).then(response => response.data)
            }
        }).then(result => {
            if (result.value) {
                let { lists } = this.state;
                let { guid, name } = result.value;
                this.setState({ lists: { ...lists, [guid]: { name } } });
            }
        })
    }

    _removeList(guid) {
        let { lists } = this.state;
        swal({
            title: `Delete list '${lists[guid].name}'`,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            preConfirm: (name) => {
                return Client.delete(`lists/${guid}`).then(response => response.data)
            }
        }).then(result => {
            if (result.value) {
                let listsCopy = Object.assign({}, this.state.lists);
                delete listsCopy[guid];
                this.setState({ lists: listsCopy });
            }
        })
    }
}

export default withRouter(Default)
