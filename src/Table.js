import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './table.css';

export default class Table extends Component {
    state = {
        name: '',
        height: '',
        age: ''
    };

    outputData = () => {
        return this.props.data.map(person => {
            const bgColor = person.id === this.props.clickedCircle ? 'yellow' : 'white';
            return (
                <Row key={person.id} className='person-row' style={{ backgroundColor: bgColor }}>
                    <Col xs={3}>{person.name}</Col>
                    <Col xs={3}>{person.age}</Col>
                    <Col xs={3}>{person.height}</Col>
                    <Col xs={3}>
                        <Button
                            variant={'danger'}
                            type={'button'}
                            style={{ width: '100%' }}
                            id={person.id}
                            onClick={this.props.handleRemove}
                        >
                            Remove
                        </Button>
                    </Col>
                </Row>
            );
        });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClick = () => {
        if (this.state.name === '' || this.state.age === '' || this.state.height === '') return;
        this.props.handleAdd(this.state);
        this.setState({ name: '', age: '', height: '' });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col xs={3}>
                        <Form.Control
                            type='text'
                            placeholder='Name'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Control
                            type='number'
                            placeholder='Age'
                            name='age'
                            value={this.state.age}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs={3}>
                        <Form.Control
                            type='number'
                            placeholder='Height'
                            name='height'
                            value={this.state.height}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs={3}>
                        <Button
                            variant={'primary'}
                            type={'button'}
                            style={{ width: '100%' }}
                            onClick={this.handleClick}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>
                {this.outputData()}
            </div>
        );
    }
}
