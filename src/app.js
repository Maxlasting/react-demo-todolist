import React, { Component, Fragment } from 'react'
import './styles/index.scss'
import classNames from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class App extends Component {
  state = {
    inputText: '',
    listData: {
      12312: {
        id: 12312,
        text: '这是一件事儿...',
        status: false,
        edit: false,
        index: 0
      },
      45436: {
        id: 45436,
        text: '这是一件事儿...',
        status: true,
        edit: false,
        index: 1
      },
      76453: {
        id: 76453,
        text: '这是一件事儿...',
        status: false,
        edit: false,
        index: 2
      }
    },
    maxId: 2
  }

  addTodoItem = text => {
    if (!text.trim()) return

    const id = Date.now()

    this.setState(prevState => {
      return {
        listData: { ...prevState.listData, [id]: { id, text } },
        inputText: '',
        maxId: prevState.maxId + 1
      }
    })
  }

  removeTodoItem = id => {
    this.setState(prevState => {
      const listData = { ...prevState.listData }
      delete listData[id]
      return { listData }
    })
  }

  updateTodoItem = (id, key, value, cb = () => {}) => {
    this.setState(prevState => {
      const listData = { ...prevState.listData }
      listData[id][key] = value
      return { listData }
    }, cb)
  }

  getDoingTodos = () => Object.values(this.state.listData).filter(item => !item.status)

  getDoneTodos = () => Object.values(this.state.listData).filter(item => item.status)

  handleInputText = (e) => {
    this.setState({
      inputText: e.target.value
    })
  }

  handleEnterAddItem = (e) => {
    if (e.keyCode === 13) this.addTodoItem(this.state.inputText)
  }

  handleClickAddItem = () => {
    this.addTodoItem(this.state.inputText)
  }

  handleToggleTodoItemStatus = (id) => {
    this.updateTodoItem(id, 'status', !this.state.listData[id].status)
  }

  handleEditCurtTodoItem = (id) => {
    this.updateTodoItem(id, 'edit', true, () => {
      this.refs[`edit-${id}`].select()
    })
    const fn = (e) => {
      this.updateTodoItem(id, 'edit', false)
      document.removeEventListener('click', fn)
    }
    document.addEventListener('click', fn)
  }

  handleStopEditPropagation = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }

  handleEditingCurtTodo = (id, value) => {
    this.updateTodoItem(id, 'text', value)
  }

  handleFinishEdit = (id, key) => {
    if (key === 27) {
      this.updateTodoItem(id, 'edit', false)
    }
  }

  handleRemoveTodoItem = (id) => {
    this.removeTodoItem(id)
  }

  handleClearTodos = (doing) => {
    this.setState(prevState => {
      const listData = { ...prevState.listData }
      const doingTodos = this[doing ? 'getDoingTodos' : 'getDoneTodos']()
      doingTodos.forEach(item => (delete listData[item.id]))
      return { listData }
    })
  }

  render() {
    const { inputText } = this.state

    const doingList = this.getDoingTodos()
    const doingNum = doingList.length

    const doneList = this.getDoneTodos()
    const doneNum = doneList.length

    return (
      <Fragment>
        <header className="todo-header-box">
          <div className="header">
            <h1 className="title">
              <label htmlFor="todoInput">ToDoList</label>
            </h1>
            <div className="todo-input">
              <input
                id="todoInput"
                type="text"
                placeholder="添加计划事项..."
                value={inputText}
                onChange={this.handleInputText}
                onKeyDown={this.handleEnterAddItem}
              />
              <div className="enter" onClick={this.handleClickAddItem}></div>
            </div>
          </div>
        </header>

        <section className="todo-content-box">

          <h2 className="title">正在进行 ({doingNum}) <a className="delete-checked" onClick={() => this.handleClearTodos(true)}>清空</a></h2>

          <ul className="doing-list">
            <TransitionGroup>
              {
                doingList.map(item => (
                  <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames="fade"
                  >
                    <li className={classNames('list-item', item.status ? 'done' : '')}>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={item.status}
                        onChange={() => this.handleToggleTodoItemStatus(item.id)}
                      />
                      {
                          item.edit ?
                            <input
                              type="text"
                              className="editor"
                              data-todo-id={item.id}
                              value={item.text}
                              ref={`edit-${item.id}`}
                              onChange={e => this.handleEditingCurtTodo(item.id, e.target.value)}
                              onKeyDown={e => this.handleFinishEdit(item.id, e.keyCode)}
                              onClick={e => this.handleStopEditPropagation(e)}
                            /> :
                            <p className="text" onDoubleClick={() => this.handleEditCurtTodoItem(item.id)}>{item.text}</p>
                        }
                      <span className="delete" onClick={() => this.handleRemoveTodoItem(item.id)}></span>
                    </li>
                  </CSSTransition>
                ))
              }
            </TransitionGroup>
          </ul>

          <h2 className="title">已经完成 ({doneNum}) <a className="delete-checked" onClick={() => this.handleClearTodos(false)}>清空</a></h2>

          <ul className="doing-list">
            <TransitionGroup>
              {
                doneList.map(item => (
                  <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames="fade"
                  >
                    <li className={classNames('list-item', item.status ? 'done' : '')}>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={item.status}
                        onChange={() => this.handleToggleTodoItemStatus(item.id)}
                      />
                      {
                          item.edit ?
                            <input
                              type="text"
                              className="editor"
                              data-todo-id={item.id}
                              value={item.text}
                              ref={`edit-${item.id}`}
                              onChange={e => this.handleEditingCurtTodo(item.id, e.target.value)}
                              onKeyDown={e => this.handleFinishEdit(item.id, e.keyCode)}
                              onClick={e => this.handleStopEditPropagation(e)}
                            /> :
                            <p className="text" onDoubleClick={() => this.handleEditCurtTodoItem(item.id)}>{item.text}</p>
                        }
                      <span className="delete" onClick={() => this.handleRemoveTodoItem(item.id)}></span>
                    </li>
                  </CSSTransition>
                ))
              }
            </TransitionGroup>
          </ul>

        </section>
      </Fragment>
    )
  }
}

export default App
