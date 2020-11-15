import React, { Component } from "react";
import apiStyles from "./api.module.css";

export default class Api extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSubMenu: null,
      activeMenuItem: null,
    };
    this.setActiveSubMenu = this.setActiveSubMenu.bind(this);
    this.isActiveSubMenu = this.isActiveSubMenu.bind(this);
    this.getActiveMenuItem = this.getActiveMenuItem.bind(this);
    this.onVisibleEndPoint = this.onVisibleEndPoint.bind(this);
    this.onVisibleEndPointGroup = this.onVisibleEndPointGroup.bind(this);

    this.subMenus = [];
  }

  setActiveSubMenu(id) {
    this.setState({
      activeSubMenu: id,
    });
  }

  setActiveMenuItem(id) {
    this.setState({
      activeMenuItem: id,
    });
  }

  getActiveMenuItem() {
    return this.state.activeMenuItem;
  }

  isActiveSubMenu(id) {
    return this.state.activeSubMenu === id;
  }

  hasActiveApiMenu() {
    return this.state.activeMenuItem || this.state.activeSubMenu;
  }

  onVisibleEndPointGroup(id) {
    this.setActiveSubMenu(id);
    this.setActiveMenuItem(id);
  }

  onVisibleEndPoint(id) {
    this.setActiveMenuItem(id);
  }

  render() {
    return (
      <React.Fragment>
        <nav className={apiStyles.nav}>
          <ol className={this.props.isMenuActive() ? "" : apiStyles.hidden}>
            {this.props.data.staticMethods.edges.map(({ node }) => {
              return (
                <li key={node.id}>
                  <a
                    href={`#${node.fields.idName}`}
                    onClick={this.props.onToggleMenu}
                  >
                    {node.frontmatter.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
        <main className={apiStyles.container}>
          <h1>DiscordPHP</h1>
          {this.props.data.staticMethods.edges.map(({ node }) => {
            return (
              <React.Fragment key={node.id}>
                <h2 id={node.fields.idName}>{node.frontmatter.title}</h2>
                <div
                  className={apiStyles.section}
                  dangerouslySetInnerHTML={{ __html: node.html }}
                />
              </React.Fragment>
            );
          })}
        </main>
      </React.Fragment>
    );
  }
}
