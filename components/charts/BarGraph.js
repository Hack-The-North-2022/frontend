import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class BarGraph2D extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeIndex: 0,
          data: props.data,
          title: props.title,
          name: props.name
        }
      }
      onBarEnter = (_, index) => {
        this.setState({
          activeIndex: index,
        });
      };

    render() {
      return (
        <div style={{backgroundColor: "white",  width:"27rem", height: "300px", padding: "1em 2.5em 2.5em 0", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)", borderRadius:"0.5em", margin:"1em"}}>
        <h1 style={{paddingLeft: "2.5em"}} className="date">{this.props.title}</h1>
        <ResponsiveContainer width="100%" height="100%" minHeight="200px">
        <BarChart
          width={600}
          height={300}
          data={this.props.data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={this.props.name} />
          <YAxis />
          <Tooltip />
          
          <Bar dataKey="value" fill="#739FCD" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      );
    }
}