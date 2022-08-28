
function Button({className, icon, alt, onClick}) {
  return (
    <button onClick={onClick} className={className}>
        <img src={icon} alt={alt} />
    </button>
  )
}

export default Button