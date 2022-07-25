import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import './App.css'

const initialState = [
  { id: 1, name: 'John', lastname: 'Doe', gender: 'Male' },
  { id: 2, name: 'Jane', lastname: 'Doe', gender: 'Female' }
]

const App = () => {
  const [students, setStudents] = useState(initialState)
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [gender, setGender] = useState('Female')

  const saludo = () => {
    console.log('hola estudiantes', students)
  }
  const noRedirigir = e => {
    e.preventDefault()
  }
  const deleteStudentById = id => {
    const result = students.filter(student => student.id !== id) //filtra el id que estamos seleccionando y verifica que no sea igual a ningun otro del array
    console.log(
      'result de deleteStudentById, filtra y deja los estudiantes restantes',
      result
    )
    setStudents(result)
    console.log('borrado id', id)
    toast.error('Estudiante eliminado!')
  }
  // const deleteStudentByPosition = position => {
  //   console.log('esta es la posicion para deleteByPosition', position)
  //   students.splice(position, 1) //eliminando 1 student en la posicion que ocupa dentro del array
  //   console.log(
  //     'estos son los estudiantes que quedan despues de eliminar con deleteByPosition',
  //     students
  //   ) //lo que quedó despues de eliminar el elemento con el index
  //   const newStudents = [...students] //los estudiantes que quedaron son ahora el array students
  //   setStudents(newStudents) //actualizandolos en el estado
  // }
  const handleSubmit = e => {
    e.preventDefault()
    const newStudents = students.concat([
      { id: getId(), name: name, lastname: lastname, gender: gender}
    ])
    setStudents(newStudents)
    setName('')
    setLastname('')
    setGender('Female')
    toast.default('Estudiante creado con éxito', { theme: 'colored' })
  }

  const getId = () => {
    return students.length + 1
  }
  // const getIds = () => {
  // let ids = students. map((s) => s.id);// por cada estudiante solo retorna el id, ids es un array de nros
  // let max = Math.max(...ids); //extraer todos los ids separados por ',' ej: 1, 2, 3, 4 = 4 ('...'normalmente pondria una coma mas para agregar algo, al no agregar nada igual deja el array separado por comas )
  // return max +1;
  // }
  return (
    <>
      <div className='App'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='text-center'>App</h1>
              <table className='table table-hover fw-bol'>
                <thead className='bg-secondary text-light'>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th className='text-center' colSpan={2} style={{width:'20%'}}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => {
                    // console.log('item es', item.name)
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          {item.lastname}
                          {item.gender === 'Female' ? (
                            <span class='badge bg-danger m-1'>{item.gender}</span>
                          ) : (
                            <span class='badge bg-primary m-1'>{item.gender}</span>
                          )}
                        </td>
                        <td>
                          <button
                            className='btn px-4 outline-none'
                            style={{ width: '10%' }}
                          >
                            <FaEdit />
                          </button>
                        </td>

                        <td>
                          <button
                            className='btn px-4'
                            style={{ width: '10%' }}
                            onClick={e => deleteStudentById(item.id)}
                          >
                            <FaTrash />
                          </button>
                          {/* <button
                            className='btn px-4'
                            style={{ width: '10%' }}
                            onClick={e => deleteStudentByPosition(index)}
                          > 
                            <FaTrash />
                          </button> */}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {/* boton offcanvas */}
              <button
                className='btn btn-light botonoffcanvas'
                type='button'
                data-bs-toggle='offcanvas'
                data-bs-target='#offcanvasExample'
                aria-controls='offcanvasExample'
              >
                Add student
              </button>
            </div>
            <div className='col-md-12'>
              {/*  <button className='btn btn-danger' onClick={e => {}}>
              Saludar
            </button>
            <button
              className='btn btn-danger'
              onClick={e => {
                saludo()
              }}>
              Saludar
            </button>
            <button className='btn btn-danger' onClick={e => saludo()}>
              Saludar
            </button>
            <a
              href='www.google.com'
              className='btn btn-danger'
              onClick={e => noRedirigir(e, students)}>
              Saludar
            </a>
            <a
              href='www.google.com'
              className='btn btn-danger'
              onClick={noRedirigir}>
              Saludar
            </a>*/}
            </div>
          </div>
        </div>
      </div>
      {/* offcanvas */}
      <div id='glassmorphism' className='container-offcanvas'>
        <div
          className='offcanvas offcanvas-start '
          tabIndex='-1'
          id='offcanvasExample'
          aria-labelledby='offcanvasExampleLabel'
        >
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasExampleLabel'>
              Add student
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>
          <div className='offcanvas-body'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label for='exampleInputEmail1' className='form-label'>
                  Name
                </label>

                <input
                  type='text'
                  className='form-control'
                  aria-describedby='emailHelp'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <div id='emailHelp' className='form-text'>
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className='mb-3'>
                <label for='exampleInputPassword1' className='form-label'>
                  Lastname
                </label>

                <input
                  type='text'
                  className='form-control'
                  id='exampleInputPassword1'
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <div className='form-check m-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='exampleRadios'
                    id='exampleRadios1'
                    value='option1'
                    checked={gender === 'Male' ? true : false}
                    onChange={() => setGender('Male')}
                  />
                  <label className='form-check-label' htmlFor='exampleRadios1'>
                    Male
                  </label>
                </div>
                <div className='form-check m-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='exampleRadios'
                    id='exampleRadios2'
                    value='option2'
                    checked={gender === 'Female' ? true : false}
                    onChange={() => setGender('Female')}
                  />
                  <label className='form-check-label' htmlFor='exampleRadios2'>
                    Female
                  </label>
                </div>
              </div>
              <div className='d-grid'>
                <button className='btn btn-primary gap-2'>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer /> //ponerlo abajo del codigo
    </>
  )
}

export default App
