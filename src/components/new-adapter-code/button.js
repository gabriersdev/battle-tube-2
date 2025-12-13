import './button.css'

const Button = ({children, classname, onclick}) => {
  return (
    <button className={`button ${classname}`} onClick={onclick}>{children}</button>
  )
}

export default Button;