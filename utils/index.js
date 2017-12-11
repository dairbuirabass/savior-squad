import { Dimensions } from 'react-native';
import _ from 'lodash';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const wp = percentage => Math.round(percentage * viewportWidth / 100);

const hp = percentage => Math.round(percentage * viewportHeight / 100);

const objToArrIncludingKey = obj =>
  _.map(obj, (val, key) => ({ id: key, ...val }));

export { viewportWidth, viewportHeight, wp, hp, objToArrIncludingKey };
