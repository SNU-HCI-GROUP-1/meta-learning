type Props = {
  innerText: string,
}

const Header = ({ innerText }: Props) => {
  return (
    <div
      style={{
        height: window.innerWidth < 500 ? 60 : 80,
        backgroundColor: 'black',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          marginLeft: '20px',
          fontSize: window.innerWidth < 500 ? 30 : 50,
          color: 'white',
        }}
      >
        <b>{innerText}</b>
      </div>
    </div>
  )
}

export default Header;
