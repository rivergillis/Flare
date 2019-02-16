import React, { Component } from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';

export default class SimpleHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <Header>
        <Left />
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
