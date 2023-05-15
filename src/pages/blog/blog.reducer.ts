import { createAction, createReducer } from '@reduxjs/toolkit'
import { initalPostlist } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
}
const initalState: BlogState = {
  postList: initalPostlist
}

export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/delete')

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
})

export default blogReducer
