import React, { Component } from 'react';
import { Header, Left, Body, Right, Title, Icon, Button } from 'native-base';

export default class SimpleHeader extends Component {
  render() {
    const { title, isBack, navigation, icon, onPress } = this.props;
    if (icon && onPress) {
      return (
        <Header>
          <Left>
            <Button transparent onPress={onPress}>
              <Icon name={icon} />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right />
        </Header>
      );
    }

    if (isBack && navigation) {
      return (
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right />
        </Header>
      );
    }

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
