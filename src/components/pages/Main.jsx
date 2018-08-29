import React from 'react'
import { withRouter } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'
import Client from '../../api/Client'

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            items: []
        }
        this.idleTimer = null;
        this.feachList = this._feachList.bind(this);
        this.addItem = this._addItem.bind(this);
        this.removeItem = this._removeItem.bind(this);
        this.saveState = this._saveState.bind(this);
        this.onIdle = this._onIdle.bind(this);
    }

    componentWillReceiveProps(props) {
        let { guid } = this.props.match.params;
        let nextGuid = props.match.params.guid;
        
        if (guid !== nextGuid) {
            this.saveState(guid).then(() => {
                this.feachList(nextGuid);
            });
        }
    }

    componentWillMount() {
        let { guid } = this.props.match.params;
        this.feachList(guid);
    }

    render() {
        let { name, items } = this.state;

        return (
            <IdleTimer 
                ref={ref => { this.idleTimer = ref }}
                element={document}
                onIdle={this.onIdle}
                timeout={1000 * 5}>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <h1 className="title">
                            { name }
                        </h1>
                    </div>
                </section>
                <div className="todo--layout-content">
                    <ul className="todo--list">
                        {
                            items.map((item, index) => {
                                return (
                                    <li key={`todo--list-item-${index}`}>
                                        <label className="todo--list-checkbox">
                                            <input 
                                                tabIndex="-1"
                                                name="is_checked" 
                                                type="checkbox" 
                                                checked={ item.is_checked } 
                                                onChange={ this.handleChange.bind(this, index) } /> 
                                            <span className="check"/>
                                        </label>
                                        <input 
                                            name="description" 
                                            type="text" 
                                            value={ item.description } 
                                            onChange={ this.handleChange.bind(this, index) } 
                                            onBlur={ this.handleBlur.bind(this, index) }
                                            className={ item.is_checked ? "checked" : "" } />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </IdleTimer>
        )
    }

    _feachList(guid) {
        if (typeof guid !== 'undefined') {
            Client.get(`lists/${guid}`).then(res =>{
                this.setState({...res.data }, this.addItem);
            });
        }
    }

    _onIdle(e) {
        let { guid } = this.props.match.params;
        this.saveState(guid).then(res => {
            console.log("Timed Saving");
        });
    }

    _addItem() {
        let itemsCopy = this.state.items.slice(0);

        if (itemsCopy.length === 0 || (itemsCopy.length > 0 && itemsCopy[itemsCopy.length - 1].description !== '')) {
            itemsCopy.push({ is_checked: false, description: '' });
            this.setState({ items: itemsCopy });
        }
    }

    _removeItem(index) {
        let itemsCopy = this.state.items.slice(0);
        
        if (index !== itemsCopy.length - 1 && itemsCopy[index].description === '') {
            itemsCopy.splice(index, 1);
            this.setState({ items: itemsCopy });
        }
    }

    _saveState(guid) {
        return Client.put(`lists/${guid}`, this.state);
    }

    handleBlur(index, event) {
        this.removeItem(index);
    } 

    handleChange(index, event) {
        let { name, value, type, checked } = event.target;
        value = type === 'checkbox' ? checked : value;

        this.setState({ 
            items: this.state.items.map((item, itemIndex) => {
                if (itemIndex === index) {
                    return {
                        ...item,
                        [name]: value
                    };
                }
                return { ...item };
            }) 
        }, this.addItem);
    }
}

export default withRouter(Main)
