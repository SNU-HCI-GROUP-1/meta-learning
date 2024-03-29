import icon from '../cloud.png';
import { useNavigate } from 'react-router-dom';

type Props = {
  innerText: string,
  page: number,
}

const Header = ({ innerText, page }: Props) => {
  var header_width;
  if (window.innerWidth > 1920) header_width = 1920;
  const navigate = useNavigate();

  return (
    <div>
    <div
      style={{
        height: window.innerWidth < 500 ? 80 : 80,
        maxWidth: header_width,
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
          fontSize: window.innerWidth < 500 ? 28 : 28,
          color: 'black',
          fontFamily: 'Noto Sans ExtraBold',
          display: 'flex',
          justifyContent: 'left',
          cursor: 'pointer',
        }}
        onClick={()=>navigate('/')}
      >
        <img src={icon} alt="icon" style={{width: 36, height: 36, marginTop: 5}} />
        <b>META REVIEW</b>
      </div>
      <div
        className="process-indicator-box"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: 14*4 + 18*3,
        }}
      >
        <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: page == 1 ? '#63B899' : '#D3D3D3'}}></div>
        <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: page == 2 ? '#63B899' : '#D3D3D3'}}></div>
        <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: page == 3 ? '#63B899' : '#D3D3D3'}}></div>
        <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: page == 4 ? '#63B899' : '#D3D3D3'}}></div>
      </div>
    </div>
    <div
        style={{
          fontSize: window.innerWidth < 500 ? 24 : 24,
          color: 'black',
          textAlignLast: "center",
          marginTop: 20,
          fontFamily: "Noto Sans SemiBold",
          marginBottom: 16,
        }}
      >
        <b>{innerText}</b>
      </div>
    </div>
  )
}

export default Header;
