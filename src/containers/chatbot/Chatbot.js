import React from 'react';
import { connect } from 'react-redux';

class Chatbot extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: '#fff', width: '500px', height: '550px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '8px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 4px 8px 0 rgba(0, 0, 0, 0.08)' }}>
                123
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chatbot);
