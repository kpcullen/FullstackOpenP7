const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>{anecdote.votes}</p>
    </div>
  )
}

export default Anecdote
