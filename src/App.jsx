
import './App.css'
import { Interface } from './components/Interface'
import { useSelector, useDispatch } from 'react-redux'
import { Record } from './components/Record'
import { DELETE_RECORD } from './redux/actions'
function App() {
  const dispatch = useDispatch();
  const { filtredList } = useSelector((state) => state.service);
  const handleDelete = (id) => {
    dispatch({type: DELETE_RECORD, payload: id})
    
  }
  return (
    <>
      <Interface/>
    <div className='record-list'>
      {filtredList.map((item) => (
        <Record key={item.id} userValue={item} handleDelete = {handleDelete}/>
      ))}
    </div>
    </>
  )
}

export default App
