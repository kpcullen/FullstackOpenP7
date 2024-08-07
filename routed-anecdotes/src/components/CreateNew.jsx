import { useField } from '../hooks'

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const { reset: contentReset, ...contentFields } = content
  const { reset: authorReset, ...authorFields } = author
  const { reset: infoReset, ...infoFields } = info

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    setNotification(`New anecdote: '${content.value}' created`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentFields} />
        </div>
        <div>
          author
          <input {...authorFields} />
        </div>
        <div>
          url for more info
          <input {...infoFields} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
