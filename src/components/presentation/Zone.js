import React, { Component } from 'react';
import styles from './styles';

class Zone extends Component {

  onSelectTitle(event) {
    event.preventDefault();
    //console.log("onSelectTitle:" , this.props.index)
    this.props.select(this.props.index);
  }

  render() {

    const style = styles.zone;
    const title = (this.props.isSelected) ? <a style={style.title} href='#'>{this.props.currentZone.name}</a> : <a href='#'>{this.props.currentZone.name}</a> ;


    return(
      <div style={style.container}>
        <h2 onClick={this.onSelectTitle.bind(this)} style={style.header}>
          {title}
        </h2>
        <span>{this.props.currentZone.zipCodes}</span><br />
        <span>{this.props.currentZone.comment} comments</span>
      </div>

    )
  }
}


export default Zone;
