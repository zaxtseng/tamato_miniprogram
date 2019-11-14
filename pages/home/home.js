// pages/home/home.js
import http from '../../lib/http.js';

Page({
  updateId: '',
  updateIndex: '',
  data: {
    lists: [],
    visibleCreateConfirm: false,
    visibleUpdateConfirm: false,
    updateContent: ""
  },
  onShow(){
    http.http.get('/todos').then(response=>{
      // console.log(response)
      this.setData({ lists: response.data.resources })

    })
  },
  confirmCreate(event){
    console.log(event)
    let content = event.detail
   
    if (content) {
      http.http.post('/todos',{
          completed: false, description: content
      })
      .then(response => {
        console.log(response)
        let todo = [response.data.resource]
        this.data.lists = todo.concat(this.data.lists)
        this.setData({ lists: this.data.lists })
        this.hideCreateConfirm()
      })
    }
  },
  changeText(event){
    let {content,id,index} = event.currentTarget.dataset
    this.updateId = id
    this.updatIndex = index
    this.setData({ visibleUpdateConfirm: true, updateContent: content})
  },
  confirmUpdate(event){
    let content = event.detail
    http.put(`/todos/${this.updateId}`, {
      description: content
    })
    .then(response => {
      let todo = response.data.resource
      this.data.lists[this.updatIndex] = todo
      this.setData({ lists: this.data.lists })
      this.hideUpdateConfirm()
    })
  },
  destroyTodo(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`,{
      completed: true
    })
    .then(response => {
      let todo = response.data.resource
      this.data.lists[index] = todo
      this.setData({ lists: this.data.lists })
    })
  },
  hideCreateConfirm(){
    this.setData({ visibleCreateConfirm: false })
  },
  showCreateConfirm(){
    this.setData({ visibleCreateConfirm: true })
  },
  hideUpdateConfirm(){
    this.setData({ visibleUpdateConfirm: false })
  }
})