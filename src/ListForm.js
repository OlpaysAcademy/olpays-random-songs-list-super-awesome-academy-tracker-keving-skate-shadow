import React from 'react';

var ListForm = React.createClass({
    getInitialState() {
        return { name: '' };
    },
    handleNameChange(e) {
        this.setState({ name: e.target.value})
    },
    handleSubmit() {
        var name = this.state.name.trim();
        if (!name) {
            return;
        }
        this.props.handleSubmit({ name });
        this.setState({name: ''});
    },
    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <input type="button" value="Add" onClick={this.handleSubmit}/>
            </form>
        );
    }
});

export default ListForm;
