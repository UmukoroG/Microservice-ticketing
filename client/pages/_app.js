import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import './index.css';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <NavBar currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
      <Footer />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
