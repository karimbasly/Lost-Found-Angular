import pkg from '../../package.json';

export const environment = {

  production: true,
  NAME: pkg.name,
  VERSION: pkg.version,
  REST_CORE: 'https://lost-found-spring.herokuapp.com',
  MAPPK:pkg.mapkey
};
