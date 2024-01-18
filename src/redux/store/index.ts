/**
 * Redux store configuration.
 * Require and export different files for production and development.
 */
import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../reducers'

const store = configureStore(
  { reducer: appReducer },
  // composeEnhancers(applyMiddleware(thunk, logger, middleware)),
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
