import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const MenuItem = Menu.Item;

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MenuStyled mode="horizontal" selectable={false} selectedKeys={[]}>
                <MenuItem key="export-pdf">
                    <a
                        href={process.env.DOCUMENTATION}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Documentation
          </a>
                </MenuItem>
                <MenuItem key="customer-service">
                    <a href="mailto:rhys@agiledocs.io" target="_blank" rel="noopener noreferrer">
                        Support
          </a>
                </MenuItem>
                <MenuItem key="request-feature">
                    <a href="mailto:rhys@agiledocs.io" target="_blank" rel="noopener noreferrer">
                        Request Feature
          </a>
                </MenuItem>
            </MenuStyled>
        );
    }
}

export default MainMenu;

const MenuStyled = styled(Menu)`
  margin-bottom: 20px !important;
`;

const MenuItemRightStyled = styled(MenuItem)`
  float: right;
`;
