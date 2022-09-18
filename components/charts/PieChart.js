import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Text } from 'recharts';


const COLORS = ['#27324c', '#d2d8dc', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const keys = Object.keys(payload.payload)
  const valueIndex = keys.indexOf('value');
  let nameIndex = keys[0];
  if (valueIndex === 0) {
    nameIndex = keys[1];
  }

  return (
    <g>
      <text x={cx} y={cy} dy={0} className="workshop-title" textAnchor="middle" fill="#27324c">
          {(percent * 100).toFixed()}%
      </text>
      <Text x={cx} y={cy} dy={30} style={{fontSize:"10", fontWeight:"700"}} textAnchor="middle" fill="#27324c" width="150">
          {payload[nameIndex]}
      </Text>
 
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default class PieChart2D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: props.data,
      title: props.title,
    }
  }

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div style={{backgroundColor: "white", width:"14em", height: "16em", padding: "1em", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)", borderRadius:"0.5em", marginLeft: "1em", marginBottom: "1em"}}>
        <h1 className="date">{this.props.title}</h1>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart margin={{top: 10, right: 0, bottom: 0, left: 0}}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.data || []}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={75}
              startAngle={90}
              endAngle={450}
              fill="#27324c"
              blendStroke
              dataKey="value"
              onMouseEnter={this.onPieEnter}>
              {this.props.data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}