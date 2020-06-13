import React , { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seeIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({
            values: values.data
        });
    }

    async fetchIndexes() {
        const seeIndexes = await axios.get('/api/values/all');
        this.setState({
            seeIndexes: seeIndexes.data
        });
    }

    renderSeeIndexes() {
        return this.state.seeIndexes.map(({ number })=> number).join(', ')  
    }

    renderValues() {
        const entires = [];
        for(let key in this.state.values) {
            entires.push(
                <div key={key}>
                For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }
        return entires;
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({
            index : ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index: </label>
                    <input 
                    values={this.state.index}
                    onChange={event=>this.setState({ index: event.target.value })}
                    />
                    <button>Submit</button>
                    </form> 
                    <h3>Indexes I have seen:</h3>
                    {this.renderSeeIndexes()}
                    <h3>Calculated Values:</h3>
                    {this.renderValues()}
            </div>
        )
    }
}

export default Fib;