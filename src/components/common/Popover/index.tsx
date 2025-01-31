import { ReactNode, useState } from 'react'
import './Popover.scss'

interface PopverProps {
  refElement: ReactNode
  content: ReactNode
  top?: number
  left?: number
  right?: number
  bottom?: number
}

const Popover: React.FC<PopverProps> = ({ refElement, content, top, left, right, bottom }) => {
  const [isVisiable, setVisible] = useState(false)
  return (
    <div className='popover-wrapper' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {refElement}
      {isVisiable && (
        <div
          className='popover'
          style={{
            ...(top !== undefined && { top: `${top}px` }),
            ...(left !== undefined && { left: `${left}px` }),
            ...(right !== undefined && { right: `${right}px` }),
            ...(bottom !== undefined && { bottom: `${bottom}px` })
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Popover
