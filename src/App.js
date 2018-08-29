import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Layout from './components/layouts' 
import * as Pages from './components/pages'

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
        <Route {...rest} render={
            props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )
        }/>
    )
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <LayoutRoute exact path="/" layout={ Layout.Default } component={ Pages.Main } />
                    <LayoutRoute exact path="/list/:guid" layout={ Layout.Default } component={ Pages.Main } />
                    <LayoutRoute exact path="/list/:guid" layout={ Layout.Default } component={ Pages.Main } />
                    
                    <LayoutRoute layout={ Layout.Alternative } component={ Pages.NotFound } />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
