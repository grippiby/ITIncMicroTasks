import { Dispatch } from 'redux'
import { authAPI } from '../api/todolists-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authActions } from 'features/Login/auth-reducer'

const slice = createSlice({
	name: 'auth',
	initialState: {
		status: 'idle' as RequestStatusType,
		error: null as null | string,
		isInitialized: false,
	},
	reducers: {
		setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
			state.status = action.payload.status
		},
		setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
			state.error = action.payload.error
		},
		setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
			state.isInitialized = action.payload.isInitialized
		},
	},
})

export const appActions = slice.actions
export const appReducer = slice.reducer
export type AppInitialState = ReturnType<typeof slice.getInitialState>
// actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = () => (dispatch: Dispatch) => {
	authAPI.me().then((res) => {
		if (res.data.resultCode === 0) {
			dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
		} else {
		}

		dispatch(appActions.setAppInitialized({ isInitialized: true }))
	})
}
