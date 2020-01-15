import * as d3 from 'd3';

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 55, RIGHT: 10 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
    constructor(element, dataFromProps, handleClick) {
        let vis = this;

        // SVG & G
        vis.g = d3
            .select(element)
            .append('svg')
            .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append('g')
            .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

        // SCALES
        vis.x = d3.scaleLinear().range([0, WIDTH]);
        vis.y = d3.scaleLinear().range([HEIGHT, 0]);

        // X LABEL
        vis.g
            .append('text')
            .attr('x', WIDTH / 2)
            .attr('y', HEIGHT + 40)
            .attr('text-anchor', 'middle')
            .text('Age');

        // Y LABEL
        vis.g
            .append('text')
            .attr('x', -HEIGHT / 2)
            .attr('y', -40)
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')
            .text('Height');

        // Axis
        vis.xAxisGroup = vis.g.append('g').attr('transform', `translate(0, ${HEIGHT})`);
        vis.yAxisGroup = vis.g.append('g');

        vis.update(dataFromProps, handleClick);
    }

    update(dataFromProps, handleClick) {
        let vis = this;
        vis.data = dataFromProps;

        // ADJUST SCALES
        vis.x.domain([0, d3.max(vis.data, d => Number(d.age)) + 2]);
        vis.y.domain([0, d3.max(vis.data, d => Number(d.height)) + 10]);

        // AXIS CALL
        vis.xAxisCall = d3.axisBottom(vis.x);
        vis.yAxisCall = d3.axisLeft(vis.y);
        // Generate axes once scales have been set
        vis.xAxisGroup
            .transition()
            .duration(500)
            .call(this.xAxisCall);
        vis.yAxisGroup
            .transition()
            .duration(500)
            .call(this.yAxisCall);

        // JOIN
        const circles = vis.g.selectAll('circle').data(vis.data);

        // EXIT
        circles
            .exit()
            .transition()
            .duration(1000)
            .attr('r', '0')
            .attr('cy', d => vis.y(d.height * 0.95))
            .attr('opacity', 0)
            .remove();

        // UPDATE THE STUFF STAYING ON THE SCREEN
        circles
            .attr('r', 8)
            .attr('fill', 'rgba(0, 111, 111, .8)')
            .attr('stroke', 'rgba(222,222,222,.3)')
            .attr('stroke-width', 2)
            .transition()
            .duration(1000)
            .attr('cx', d => vis.x(d.age))
            .attr('cy', d => vis.y(d.height));

        // ENTER
        circles
            .enter()
            .append('circle')
            .attr('opacity', 1)
            .attr('cx', d => vis.x(d.age))
            .attr('cy', d => vis.y(d.height))
            .attr('fill', 'rgba(0, 111, 111, .8)')
            .attr('stroke', 'rgba(222,222,222,.3)')
            .attr('stroke-width', 2)
            .on('click', d => handleClick(d.id))
            .transition()
            .duration(1000)
            .attr('r', 8);
    }
}

export default D3Chart;
