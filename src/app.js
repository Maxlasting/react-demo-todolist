import React, { Component, Fragment } from 'react'
import './styles/index.scss'

class App extends Component {
  render () {
    return (
      <Fragment>
        <header className="todo-header-box">
          <header className="header">
            <h1 className="title">
              <label htmlFor="todoInput">ToDoList</label>
            </h1>
            <div className="todo-input">
              <input id="todoInput" type="text" placeholder="添加计划事项..."/>
              <div className="enter"></div>
            </div>
          </header>
          <section className="todo-content-box">
            <h2 className="title">正在进行 (10000) <a className="delete-checked">清空</a></h2>
            <ol className="doing-list">
              <li className="list-item">
                <input type="checkbox" className="toggle"/>
                <p className="text">这是一件正在进行的事情这是一件正在进行的事情这是一件正在进行的事情这是一件正在进行的事情这是一件正在进行的事情这是一件正在进行的事情这是一件正在进行的事情</p>
                <a className="delete"></a>
              </li>
            </ol>
            <h2 className="title">已经完成 (0) <a className="delete-checked">清空</a></h2>
            <ul className="doing-list">
              <li className="list-item done">
                <input type="checkbox" className="toggle"/>
                <p className="text">这是一件正在进行的事情</p>
                <a className="delete"></a>
              </li>
              <li className="list-item done">
                <input type="checkbox" className="toggle"/>
                <input type="text" className="editor" defaultValue="这是一件正在进行的事情"/>
                <span className="delete"></span>
              </li>
            </ul>
          </section>
        </header>
      </Fragment>
    )
  }
}

export default App
