import { FC } from "../@types/types"


const AccentText:FC = ({children}) => {
  return (
    <span className="text-accent-regular dark:text-accent-light">
        {children}
    </span>
  )
}

export default AccentText