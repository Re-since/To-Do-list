
import { makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id: 1,
      name: '学习react',
      isDone: true
    },
    {
      id: 2,
      name: '搞定mobx',
      isDone: true
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }

  singleCheck(id) {
    const item = this.list.find(item => item.id === id)
    item.isDone = !item.isDone
  }

  multiCheck(checked) {
    // console.log(checked);
    this.list.forEach(item => {
      item.isDone = checked;
    })
  }

  get isAll() {
    return this.list.every(item => item.isDone)
  }

  deleteTask(id) {
    this.list = this.list.filter(item => item.id !== id);
  }

  addTask(task) {
    this.list.push(task);
  }

  get finishTaskNumber() {
    return this.list.filter(item => item.isDone !== true).length;
  }
}

export default TaskStore
