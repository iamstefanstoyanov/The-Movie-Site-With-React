export default function Footer() {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col item social'>
            <a
              href='https://www.facebook.com/stoyanov2'
              target='_blank'
              rel='noreferrer'
            >
              <i className='icon ion-social-facebook'></i>
            </a>
            <a
              href='https://www.instagram.com/stefan.stoyanov88'
              target='_blank'
              rel='noreferrer'
            >
              <i className='icon ion-social-instagram'></i>
            </a>
            <a
              href='https://github.com/iamstefanstoyanov'
              target='_blank'
              rel='noreferrer'
            >
              <i className='icon ion-social-github'></i>
            </a>
          </div>
        </div>
        <p className='copyright'>
          This site has been developed by Stefan Stoyanov for educational
          purposes. 2023
        </p>
      </div>
    </div>
  );
}
