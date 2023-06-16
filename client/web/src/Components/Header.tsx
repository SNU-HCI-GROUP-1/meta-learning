type Props = {
  innerText: string,
  page: number,
}

const Header = ({ innerText, page }: Props) => {
  var header_width;
  if (window.innerWidth > 1920) header_width = 1920;

  return (
    <div
      style={{
        height: window.innerWidth < 500 ? 60 : 80,
        width: header_width,
        marginBottom: '10px',
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 30,
        display: "flex",
        justifyContent: "space-between",
        margin: "auto"
      }}
    >
      <div
        className="meta-learning-logo"
        style={{
          fontSize: window.innerWidth < 500 ? 30 : 30,
          color: 'black',
        }}
      >
        <b>{innerText}</b>
      </div>
      <div
        className="process-indicator-box"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: 94,
        }}
      >
        <div style={{width: 16, height: 16, borderRadius: '50%', backgroundColor: page == 1 ? '#63B899' : '#D3D3D3'}}></div>
        <div style={{width: 16, height: 16, borderRadius: '50%', backgroundColor: page == 2 ? '#63B899' : '#D3D3D3'}}></div>
        <div style={{width: 16, height: 16, borderRadius: '50%', backgroundColor: page == 3 ? '#63B899' : '#D3D3D3'}}></div>
        <div style={{width: 16, height: 16, borderRadius: '50%', backgroundColor: page == 4 ? '#63B899' : '#D3D3D3'}}></div>
      </div>
    </div>
  )
}

export default Header;
