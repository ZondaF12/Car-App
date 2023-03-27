/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSearchHistoryInput = {
  id?: string | null,
  numberPlate: string,
  date: string,
  vehicleDetails?: string | null,
  userID: string,
  _version?: number | null,
};

export type ModelSearchHistoryConditionInput = {
  numberPlate?: ModelStringInput | null,
  date?: ModelStringInput | null,
  vehicleDetails?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelSearchHistoryConditionInput | null > | null,
  or?: Array< ModelSearchHistoryConditionInput | null > | null,
  not?: ModelSearchHistoryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type SearchHistory = {
  __typename: "SearchHistory",
  id: string,
  numberPlate: string,
  date: string,
  vehicleDetails?: string | null,
  userID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateSearchHistoryInput = {
  id: string,
  numberPlate?: string | null,
  date?: string | null,
  vehicleDetails?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteSearchHistoryInput = {
  id: string,
  _version?: number | null,
};

export type CreateVehicleInput = {
  id?: string | null,
  numberPlate: string,
  make?: string | null,
  model?: string | null,
  motDate: string,
  taxDate: string,
  insuranceDate?: string | null,
  createdAt?: string | null,
  _version?: number | null,
};

export type ModelVehicleConditionInput = {
  numberPlate?: ModelStringInput | null,
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  motDate?: ModelStringInput | null,
  taxDate?: ModelStringInput | null,
  insuranceDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelVehicleConditionInput | null > | null,
  or?: Array< ModelVehicleConditionInput | null > | null,
  not?: ModelVehicleConditionInput | null,
};

export type Vehicle = {
  __typename: "Vehicle",
  id: string,
  numberPlate: string,
  make?: string | null,
  model?: string | null,
  motDate: string,
  taxDate: string,
  insuranceDate?: string | null,
  createdAt?: string | null,
  users?: ModelUserVehicleConnection | null,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelUserVehicleConnection = {
  __typename: "ModelUserVehicleConnection",
  items:  Array<UserVehicle | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UserVehicle = {
  __typename: "UserVehicle",
  id: string,
  vehicleId: string,
  userId: string,
  vehicle: Vehicle,
  user: User,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  email: string,
  Vehicles?: ModelUserVehicleConnection | null,
  SearchHistories?: ModelSearchHistoryConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelSearchHistoryConnection = {
  __typename: "ModelSearchHistoryConnection",
  items:  Array<SearchHistory | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateVehicleInput = {
  id: string,
  numberPlate?: string | null,
  make?: string | null,
  model?: string | null,
  motDate?: string | null,
  taxDate?: string | null,
  insuranceDate?: string | null,
  createdAt?: string | null,
  _version?: number | null,
};

export type DeleteVehicleInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  email: string,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserVehicleInput = {
  id?: string | null,
  vehicleId: string,
  userId: string,
  _version?: number | null,
};

export type ModelUserVehicleConditionInput = {
  vehicleId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserVehicleConditionInput | null > | null,
  or?: Array< ModelUserVehicleConditionInput | null > | null,
  not?: ModelUserVehicleConditionInput | null,
};

export type UpdateUserVehicleInput = {
  id: string,
  vehicleId?: string | null,
  userId?: string | null,
  _version?: number | null,
};

export type DeleteUserVehicleInput = {
  id: string,
  _version?: number | null,
};

export type ModelSearchHistoryFilterInput = {
  id?: ModelIDInput | null,
  numberPlate?: ModelStringInput | null,
  date?: ModelStringInput | null,
  vehicleDetails?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelSearchHistoryFilterInput | null > | null,
  or?: Array< ModelSearchHistoryFilterInput | null > | null,
  not?: ModelSearchHistoryFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelVehicleFilterInput = {
  id?: ModelIDInput | null,
  numberPlate?: ModelStringInput | null,
  make?: ModelStringInput | null,
  model?: ModelStringInput | null,
  motDate?: ModelStringInput | null,
  taxDate?: ModelStringInput | null,
  insuranceDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelVehicleFilterInput | null > | null,
  or?: Array< ModelVehicleFilterInput | null > | null,
  not?: ModelVehicleFilterInput | null,
};

export type ModelVehicleConnection = {
  __typename: "ModelVehicleConnection",
  items:  Array<Vehicle | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserVehicleFilterInput = {
  id?: ModelIDInput | null,
  vehicleId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserVehicleFilterInput | null > | null,
  or?: Array< ModelUserVehicleFilterInput | null > | null,
  not?: ModelUserVehicleFilterInput | null,
};

export type ModelSubscriptionSearchHistoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  numberPlate?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  vehicleDetails?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionSearchHistoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionSearchHistoryFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionVehicleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  numberPlate?: ModelSubscriptionStringInput | null,
  make?: ModelSubscriptionStringInput | null,
  model?: ModelSubscriptionStringInput | null,
  motDate?: ModelSubscriptionStringInput | null,
  taxDate?: ModelSubscriptionStringInput | null,
  insuranceDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
  or?: Array< ModelSubscriptionVehicleFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionUserVehicleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  vehicleId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserVehicleFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserVehicleFilterInput | null > | null,
};

export type CreateSearchHistoryMutationVariables = {
  input: CreateSearchHistoryInput,
  condition?: ModelSearchHistoryConditionInput | null,
};

export type CreateSearchHistoryMutation = {
  createSearchHistory?:  {
    __typename: "SearchHistory",
    id: string,
    numberPlate: string,
    date: string,
    vehicleDetails?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateSearchHistoryMutationVariables = {
  input: UpdateSearchHistoryInput,
  condition?: ModelSearchHistoryConditionInput | null,
};

export type UpdateSearchHistoryMutation = {
  updateSearchHistory?:  {
    __typename: "SearchHistory",
    id: string,
    numberPlate: string,
    date: string,
    vehicleDetails?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteSearchHistoryMutationVariables = {
  input: DeleteSearchHistoryInput,
  condition?: ModelSearchHistoryConditionInput | null,
};

export type DeleteSearchHistoryMutation = {
  deleteSearchHistory?:  {
    __typename: "SearchHistory",
    id: string,
    numberPlate: string,
    date: string,
    vehicleDetails?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateVehicleMutationVariables = {
  input: CreateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type CreateVehicleMutation = {
  createVehicle?:  {
    __typename: "Vehicle",
    id: string,
    numberPlate: string,
    make?: string | null,
    model?: string | null,
    motDate: string,
    taxDate: string,
    insuranceDate?: string | null,
    createdAt?: string | null,
    users?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateVehicleMutationVariables = {
  input: UpdateVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type UpdateVehicleMutation = {
  updateVehicle?:  {
    __typename: "Vehicle",
    id: string,
    numberPlate: string,
    make?: string | null,
    model?: string | null,
    motDate: string,
    taxDate: string,
    insuranceDate?: string | null,
    createdAt?: string | null,
    users?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteVehicleMutationVariables = {
  input: DeleteVehicleInput,
  condition?: ModelVehicleConditionInput | null,
};

export type DeleteVehicleMutation = {
  deleteVehicle?:  {
    __typename: "Vehicle",
    id: string,
    numberPlate: string,
    make?: string | null,
    model?: string | null,
    motDate: string,
    taxDate: string,
    insuranceDate?: string | null,
    createdAt?: string | null,
    users?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    Vehicles?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SearchHistories?:  {
      __typename: "ModelSearchHistoryConnection",
      items:  Array< {
        __typename: "SearchHistory",
        id: string,
        numberPlate: string,
        date: string,
        vehicleDetails?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    Vehicles?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SearchHistories?:  {
      __typename: "ModelSearchHistoryConnection",
      items:  Array< {
        __typename: "SearchHistory",
        id: string,
        numberPlate: string,
        date: string,
        vehicleDetails?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    Vehicles?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SearchHistories?:  {
      __typename: "ModelSearchHistoryConnection",
      items:  Array< {
        __typename: "SearchHistory",
        id: string,
        numberPlate: string,
        date: string,
        vehicleDetails?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserVehicleMutationVariables = {
  input: CreateUserVehicleInput,
  condition?: ModelUserVehicleConditionInput | null,
};

export type CreateUserVehicleMutation = {
  createUserVehicle?:  {
    __typename: "UserVehicle",
    id: string,
    vehicleId: string,
    userId: string,
    vehicle:  {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserVehicleMutationVariables = {
  input: UpdateUserVehicleInput,
  condition?: ModelUserVehicleConditionInput | null,
};

export type UpdateUserVehicleMutation = {
  updateUserVehicle?:  {
    __typename: "UserVehicle",
    id: string,
    vehicleId: string,
    userId: string,
    vehicle:  {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserVehicleMutationVariables = {
  input: DeleteUserVehicleInput,
  condition?: ModelUserVehicleConditionInput | null,
};

export type DeleteUserVehicleMutation = {
  deleteUserVehicle?:  {
    __typename: "UserVehicle",
    id: string,
    vehicleId: string,
    userId: string,
    vehicle:  {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetSearchHistoryQueryVariables = {
  id: string,
};

export type GetSearchHistoryQuery = {
  getSearchHistory?:  {
    __typename: "SearchHistory",
    id: string,
    numberPlate: string,
    date: string,
    vehicleDetails?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListSearchHistoriesQueryVariables = {
  filter?: ModelSearchHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSearchHistoriesQuery = {
  listSearchHistories?:  {
    __typename: "ModelSearchHistoryConnection",
    items:  Array< {
      __typename: "SearchHistory",
      id: string,
      numberPlate: string,
      date: string,
      vehicleDetails?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSearchHistoriesQueryVariables = {
  filter?: ModelSearchHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSearchHistoriesQuery = {
  syncSearchHistories?:  {
    __typename: "ModelSearchHistoryConnection",
    items:  Array< {
      __typename: "SearchHistory",
      id: string,
      numberPlate: string,
      date: string,
      vehicleDetails?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SearchHistoriesByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSearchHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchHistoriesByUserIDQuery = {
  searchHistoriesByUserID?:  {
    __typename: "ModelSearchHistoryConnection",
    items:  Array< {
      __typename: "SearchHistory",
      id: string,
      numberPlate: string,
      date: string,
      vehicleDetails?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetVehicleQueryVariables = {
  id: string,
};

export type GetVehicleQuery = {
  getVehicle?:  {
    __typename: "Vehicle",
    id: string,
    numberPlate: string,
    make?: string | null,
    model?: string | null,
    motDate: string,
    taxDate: string,
    insuranceDate?: string | null,
    createdAt?: string | null,
    users?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListVehiclesQueryVariables = {
  filter?: ModelVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVehiclesQuery = {
  listVehicles?:  {
    __typename: "ModelVehicleConnection",
    items:  Array< {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncVehiclesQueryVariables = {
  filter?: ModelVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncVehiclesQuery = {
  syncVehicles?:  {
    __typename: "ModelVehicleConnection",
    items:  Array< {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    Vehicles?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SearchHistories?:  {
      __typename: "ModelSearchHistoryConnection",
      items:  Array< {
        __typename: "SearchHistory",
        id: string,
        numberPlate: string,
        date: string,
        vehicleDetails?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserVehicleQueryVariables = {
  id: string,
};

export type GetUserVehicleQuery = {
  getUserVehicle?:  {
    __typename: "UserVehicle",
    id: string,
    vehicleId: string,
    userId: string,
    vehicle:  {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUserVehiclesQueryVariables = {
  filter?: ModelUserVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserVehiclesQuery = {
  listUserVehicles?:  {
    __typename: "ModelUserVehicleConnection",
    items:  Array< {
      __typename: "UserVehicle",
      id: string,
      vehicleId: string,
      userId: string,
      vehicle:  {
        __typename: "Vehicle",
        id: string,
        numberPlate: string,
        make?: string | null,
        model?: string | null,
        motDate: string,
        taxDate: string,
        insuranceDate?: string | null,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      user:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserVehiclesQueryVariables = {
  filter?: ModelUserVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserVehiclesQuery = {
  syncUserVehicles?:  {
    __typename: "ModelUserVehicleConnection",
    items:  Array< {
      __typename: "UserVehicle",
      id: string,
      vehicleId: string,
      userId: string,
      vehicle:  {
        __typename: "Vehicle",
        id: string,
        numberPlate: string,
        make?: string | null,
        model?: string | null,
        motDate: string,
        taxDate: string,
        insuranceDate?: string | null,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      user:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UserVehiclesByVehicleIdQueryVariables = {
  vehicleId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserVehiclesByVehicleIdQuery = {
  userVehiclesByVehicleId?:  {
    __typename: "ModelUserVehicleConnection",
    items:  Array< {
      __typename: "UserVehicle",
      id: string,
      vehicleId: string,
      userId: string,
      vehicle:  {
        __typename: "Vehicle",
        id: string,
        numberPlate: string,
        make?: string | null,
        model?: string | null,
        motDate: string,
        taxDate: string,
        insuranceDate?: string | null,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      user:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UserVehiclesByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserVehicleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserVehiclesByUserIdQuery = {
  userVehiclesByUserId?:  {
    __typename: "ModelUserVehicleConnection",
    items:  Array< {
      __typename: "UserVehicle",
      id: string,
      vehicleId: string,
      userId: string,
      vehicle:  {
        __typename: "Vehicle",
        id: string,
        numberPlate: string,
        make?: string | null,
        model?: string | null,
        motDate: string,
        taxDate: string,
        insuranceDate?: string | null,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      user:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      },
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateSearchHistorySubscriptionVariables = {
  filter?: ModelSubscriptionSearchHistoryFilterInput | null,
};

export type OnCreateSearchHistorySubscription = {
  onCreateSearchHistory?:  {
    __typename: "SearchHistory",
    id: string,
    numberPlate: string,
    date: string,
    vehicleDetails?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateSearchHistorySubscriptionVariables = {
  filter?: ModelSubscriptionSearchHistoryFilterInput | null,
};

export type OnUpdateSearchHistorySubscription = {
  onUpdateSearchHistory?:  {
    __typename: "SearchHistory",
    id: string,
    numberPlate: string,
    date: string,
    vehicleDetails?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteSearchHistorySubscriptionVariables = {
  filter?: ModelSubscriptionSearchHistoryFilterInput | null,
};

export type OnDeleteSearchHistorySubscription = {
  onDeleteSearchHistory?:  {
    __typename: "SearchHistory",
    id: string,
    numberPlate: string,
    date: string,
    vehicleDetails?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnCreateVehicleSubscription = {
  onCreateVehicle?:  {
    __typename: "Vehicle",
    id: string,
    numberPlate: string,
    make?: string | null,
    model?: string | null,
    motDate: string,
    taxDate: string,
    insuranceDate?: string | null,
    createdAt?: string | null,
    users?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnUpdateVehicleSubscription = {
  onUpdateVehicle?:  {
    __typename: "Vehicle",
    id: string,
    numberPlate: string,
    make?: string | null,
    model?: string | null,
    motDate: string,
    taxDate: string,
    insuranceDate?: string | null,
    createdAt?: string | null,
    users?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionVehicleFilterInput | null,
};

export type OnDeleteVehicleSubscription = {
  onDeleteVehicle?:  {
    __typename: "Vehicle",
    id: string,
    numberPlate: string,
    make?: string | null,
    model?: string | null,
    motDate: string,
    taxDate: string,
    insuranceDate?: string | null,
    createdAt?: string | null,
    users?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    Vehicles?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SearchHistories?:  {
      __typename: "ModelSearchHistoryConnection",
      items:  Array< {
        __typename: "SearchHistory",
        id: string,
        numberPlate: string,
        date: string,
        vehicleDetails?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    Vehicles?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SearchHistories?:  {
      __typename: "ModelSearchHistoryConnection",
      items:  Array< {
        __typename: "SearchHistory",
        id: string,
        numberPlate: string,
        date: string,
        vehicleDetails?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    Vehicles?:  {
      __typename: "ModelUserVehicleConnection",
      items:  Array< {
        __typename: "UserVehicle",
        id: string,
        vehicleId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    SearchHistories?:  {
      __typename: "ModelSearchHistoryConnection",
      items:  Array< {
        __typename: "SearchHistory",
        id: string,
        numberPlate: string,
        date: string,
        vehicleDetails?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionUserVehicleFilterInput | null,
};

export type OnCreateUserVehicleSubscription = {
  onCreateUserVehicle?:  {
    __typename: "UserVehicle",
    id: string,
    vehicleId: string,
    userId: string,
    vehicle:  {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionUserVehicleFilterInput | null,
};

export type OnUpdateUserVehicleSubscription = {
  onUpdateUserVehicle?:  {
    __typename: "UserVehicle",
    id: string,
    vehicleId: string,
    userId: string,
    vehicle:  {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserVehicleSubscriptionVariables = {
  filter?: ModelSubscriptionUserVehicleFilterInput | null,
};

export type OnDeleteUserVehicleSubscription = {
  onDeleteUserVehicle?:  {
    __typename: "UserVehicle",
    id: string,
    vehicleId: string,
    userId: string,
    vehicle:  {
      __typename: "Vehicle",
      id: string,
      numberPlate: string,
      make?: string | null,
      model?: string | null,
      motDate: string,
      taxDate: string,
      insuranceDate?: string | null,
      createdAt?: string | null,
      users?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      Vehicles?:  {
        __typename: "ModelUserVehicleConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      SearchHistories?:  {
        __typename: "ModelSearchHistoryConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
