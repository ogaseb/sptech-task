import { configureStore } from '@reduxjs/toolkit';
import calculatorStore from '@stores/calculator_store/calculator_store';

export const appStore = configureStore({
	reducer: {
		calculatorStore: calculatorStore,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
