import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//Здесь мы создаем хук, для диспатча санки в АПП (типизация)
export type AppDispatchType = ThunkDispatch<
	AppRootStateType,
	unknown,
	AnyAction
>
export const useAppDispatch = useDispatch<AppDispatchType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
