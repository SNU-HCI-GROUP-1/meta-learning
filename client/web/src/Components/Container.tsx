import { ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

const Container = ({ children }: Props) => {
  return (
    <div style={{
      backgroundColor: 'white',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>
      {children}
    </div>
  )
}

export default Container;
