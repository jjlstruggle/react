import './index.css';
import React, { Component } from 'react'
import { $ } from '../../share/share'

export default class List extends Component {
    render() {
        const {index,item,send} = this.props
        return (
            <div className="music-row" onDoubleClick={send(index)}>
                <div className='col1'>
                    {index < 9 ? "0" + (index + 1) : index + 1}
                    <i className='fa fa-heart-o'></i>
                    <i className='fa fa-download' onClick={
                        () => {
                            if (window.confirm(`确定要下载${item.name}吗？`))
                                $(item.url, item.name)
                        }
                    }></i>
                </div>
                <div className='col2'>
                    {item.name}
                </div>
                <div className='col3'>
                    {item.author}
                </div>
                <div className='col4'>
                    {item.album}
                </div>
                <div className='col5'>
                    {item.timer}
                </div>
            </div>
        )
    }
}
