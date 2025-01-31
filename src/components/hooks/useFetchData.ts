import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux'
import { setLoading } from '~/redux/features/loadingSlice'

const useFetchData = (apiFuncs: Function) => {
  const [isFetched, setFetched] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(setLoading(true))
    Promise.all(apiFuncs())
      .then(() => setFetched(true))
      .finally(() => dispatch(setLoading(false)))
  }, [])
  return isFetched
}

export default useFetchData
