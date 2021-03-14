import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../state/'

export const UseTypedSelector: TypedUseSelectorHook<RootState> = useSelector
