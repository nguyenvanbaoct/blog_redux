import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { initalPostlist } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}
const initalState: BlogState = {
  postList: initalPostlist,
  editingPost: null
}

export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
  return {
    payload: {
      ...post,
      id: nanoid()
    }
  }
})
export const deletePost = createAction<string>('blog/delete')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancleEditingPost = createAction('blog/cancleEditingPost')
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')

const blogReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      // immerjs
      // immerjs giúp chúng ta mutate 1 state an toàn
      // nó đã tạo ra giá trị nháp và chúng ta mutate trên giá trị nháp đó
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    })
    .addCase(cancleEditingPost, (state) => {
      state.editingPost = null
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
})

export default blogReducer
