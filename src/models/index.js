// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SearchHistory, Vehicle, User, UserVehicle } = initSchema(schema);

export {
  SearchHistory,
  Vehicle,
  User,
  UserVehicle
};