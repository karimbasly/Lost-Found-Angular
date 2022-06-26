import pkg from '../../package.json';

export const environment = {
  production: false,
 NAME: pkg.name,
  VERSION: pkg.version,
  REST_CORE: 'http://localhost:8082',
  MAPPK:pkg.mapkey
};


