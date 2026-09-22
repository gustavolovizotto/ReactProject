function ErrorMessage({ message }) {
  return (
    <div className="border-2 border-vermilion text-vermilion p-4 rounded-md" role="alert">
      {message}
    </div>
  )
}

export default ErrorMessage
