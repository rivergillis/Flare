import React, { Component } from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';

export default class HeaderTitleExample extends Component {
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
