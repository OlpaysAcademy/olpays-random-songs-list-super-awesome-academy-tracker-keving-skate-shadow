import React from 'react';

var ListFilter = React.createClass({
    handleNameChange(e) {
        this.props.handleFilterChange({ name: e.target.value});
    },
    handleMinChange(e) {
        this.props.handleFilterChange({ min: e.target.value});
    },
    handleMaxChange(e) {
        this.props.handleFilterChange({ max: e.target.value});
    },
    toggleBlacklisted(e) {
        this.props.handleFilterChange({ hideBlacklisted: e.target.checked});
    },
    render() {
        return (
            <form>
                <input
                    label="Name"
                    type="text"
                    placeholder="Name"
                    value={this.props.name}
                    onChange={this.handleNameChange}
                />
                <br />
                <input
                    label="Minimum"
                    type="number"
                    placeholder="Minimum"
                    value={this.props.min}
                    onChange={this.handleMinChange}
                />
                <input
                    label="Maximum"
                    type="number"
                    placeholder="Maximum"
                    value={this.props.max}
                    onChange={this.handleMaxChange}
                />
                <br />
                <input
                    label="Hide Blacklisted"
                    type="checkbox"
                    onChange={this.toggleBlacklisted}
                />
            </form>
        );
    }
});

export default ListFilter;
