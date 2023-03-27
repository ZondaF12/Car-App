/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSearchHistory = /* GraphQL */ `
  subscription OnCreateSearchHistory(
    $filter: ModelSubscriptionSearchHistoryFilterInput
  ) {
    onCreateSearchHistory(filter: $filter) {
      id
      numberPlate
      date
      vehicleDetails
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSearchHistory = /* GraphQL */ `
  subscription OnUpdateSearchHistory(
    $filter: ModelSubscriptionSearchHistoryFilterInput
  ) {
    onUpdateSearchHistory(filter: $filter) {
      id
      numberPlate
      date
      vehicleDetails
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSearchHistory = /* GraphQL */ `
  subscription OnDeleteSearchHistory(
    $filter: ModelSubscriptionSearchHistoryFilterInput
  ) {
    onDeleteSearchHistory(filter: $filter) {
      id
      numberPlate
      date
      vehicleDetails
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onCreateVehicle(filter: $filter) {
      id
      numberPlate
      make
      model
      motDate
      taxDate
      insuranceDate
      createdAt
      users {
        items {
          id
          vehicleId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onUpdateVehicle(filter: $filter) {
      id
      numberPlate
      make
      model
      motDate
      taxDate
      insuranceDate
      createdAt
      users {
        items {
          id
          vehicleId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onDeleteVehicle(filter: $filter) {
      id
      numberPlate
      make
      model
      motDate
      taxDate
      insuranceDate
      createdAt
      users {
        items {
          id
          vehicleId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      email
      Vehicles {
        items {
          id
          vehicleId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SearchHistories {
        items {
          id
          numberPlate
          date
          vehicleDetails
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      email
      Vehicles {
        items {
          id
          vehicleId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SearchHistories {
        items {
          id
          numberPlate
          date
          vehicleDetails
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      email
      Vehicles {
        items {
          id
          vehicleId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      SearchHistories {
        items {
          id
          numberPlate
          date
          vehicleDetails
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUserVehicle = /* GraphQL */ `
  subscription OnCreateUserVehicle(
    $filter: ModelSubscriptionUserVehicleFilterInput
  ) {
    onCreateUserVehicle(filter: $filter) {
      id
      vehicleId
      userId
      vehicle {
        id
        numberPlate
        make
        model
        motDate
        taxDate
        insuranceDate
        createdAt
        users {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        email
        Vehicles {
          nextToken
          startedAt
        }
        SearchHistories {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUserVehicle = /* GraphQL */ `
  subscription OnUpdateUserVehicle(
    $filter: ModelSubscriptionUserVehicleFilterInput
  ) {
    onUpdateUserVehicle(filter: $filter) {
      id
      vehicleId
      userId
      vehicle {
        id
        numberPlate
        make
        model
        motDate
        taxDate
        insuranceDate
        createdAt
        users {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        email
        Vehicles {
          nextToken
          startedAt
        }
        SearchHistories {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUserVehicle = /* GraphQL */ `
  subscription OnDeleteUserVehicle(
    $filter: ModelSubscriptionUserVehicleFilterInput
  ) {
    onDeleteUserVehicle(filter: $filter) {
      id
      vehicleId
      userId
      vehicle {
        id
        numberPlate
        make
        model
        motDate
        taxDate
        insuranceDate
        createdAt
        users {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        email
        Vehicles {
          nextToken
          startedAt
        }
        SearchHistories {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
