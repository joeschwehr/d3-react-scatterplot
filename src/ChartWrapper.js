import React, { Component } from 'react';
import D3Chart from './D3Chart';

export default class ChartWrapper extends Component {
    state = {
        chart: null
    };

    componentDidMount() {
        this.setState({
            chart: new D3Chart(this.refs.chart, this.props.dataFromProps, this.props.circleClicked)
        });
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    static getDerivedStateFromProps(props, state) {
        if (state.chart !== null) state.chart.update(props.dataFromProps);
        return state;
    }

    // componentWillReceiveProps(nextProps) {
    //     this.state.chart.update(nextProps.dataFromProps);
    // }

    render() {
        return <div className='chart-area' ref='chart'></div>;
    }
}
