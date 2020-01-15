import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { json } from 'd3';
import uuid from 'uuid/v4';

import ChartWrapper from './ChartWrapper';
import Table from './Table';

class App extends Component {
    state = {
        data: [],
        clickedCircle: null
    };

    componentWillMount() {
        json('https://udemy-react-d3.firebaseio.com/children.json')
            .then(data => {
                data = data.map(record => {
                    return { ...record, id: uuid() };
                });
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    renderChart() {
        if (this.state.data.length === 0) {
            return 'loading data...';
        } else {
            return (
                <ChartWrapper dataFromProps={this.state.data} circleClicked={this.circleClicked} />
            );
        }
    }

    handleRemove = e => {
        const filteredData = this.state.data.filter(person => person.id !== e.target.id);
        this.setState({ data: filteredData });
    };

    handleAdd = newUser => {
        newUser = { ...newUser, id: uuid() };
        const newData = [...this.state.data, newUser];
        this.setState({ data: newData });
    };

    circleClicked = activeId => {
        this.setState({ clickedCircle: activeId });
    };

    render() {
        return (
            <div>
                <Navbar bg='light'>
                    <Navbar.Brand>Scatterplotly</Navbar.Brand>
                </Navbar>
                <Container>
                    <Row>
                        <Col md={6} xs={12} id='chart-div'>
                            {this.renderChart()}
                        </Col>
                        <Col md={6} xs={12} id='table-div'>
                            <Table
                                data={this.state.data}
                                handleRemove={this.handleRemove}
                                handleAdd={this.handleAdd}
                                clickedCircle={this.state.clickedCircle}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
