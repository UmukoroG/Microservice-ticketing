import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the local server.
    // return axios.create(
    //   {
    //     baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
    //     headers: req.headers,
    //   },
    // );

    // We are on the cloud server
    return axios.create({
      baseURL: 'http://www.microservice-ticketing-sale-app.shop',
      headers: req.headers,
    });

  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};
