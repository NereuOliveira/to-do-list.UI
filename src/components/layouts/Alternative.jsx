import React from 'react'

class Alternative extends React.Component {
    render() {
        return (
            <div id="alternative--layout" className="container">
                { this.props.children }
            </div>
        )
    }
}

export default Alternative
