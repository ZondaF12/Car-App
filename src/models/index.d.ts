import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerSearchHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SearchHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly numberPlate: string;
  readonly date: string;
  readonly vehicleDetails?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySearchHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SearchHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly numberPlate: string;
  readonly date: string;
  readonly vehicleDetails?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SearchHistory = LazyLoading extends LazyLoadingDisabled ? EagerSearchHistory : LazySearchHistory

export declare const SearchHistory: (new (init: ModelInit<SearchHistory>) => SearchHistory) & {
  copyOf(source: SearchHistory, mutator: (draft: MutableModel<SearchHistory>) => MutableModel<SearchHistory> | void): SearchHistory;
}

type EagerVehicle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Vehicle, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly numberPlate: string;
  readonly make?: string | null;
  readonly model?: string | null;
  readonly motDate: string;
  readonly taxDate: string;
  readonly insuranceDate?: string | null;
  readonly createdAt?: string | null;
  readonly users?: (UserVehicle | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyVehicle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Vehicle, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly numberPlate: string;
  readonly make?: string | null;
  readonly model?: string | null;
  readonly motDate: string;
  readonly taxDate: string;
  readonly insuranceDate?: string | null;
  readonly createdAt?: string | null;
  readonly users: AsyncCollection<UserVehicle>;
  readonly updatedAt?: string | null;
}

export declare type Vehicle = LazyLoading extends LazyLoadingDisabled ? EagerVehicle : LazyVehicle

export declare const Vehicle: (new (init: ModelInit<Vehicle>) => Vehicle) & {
  copyOf(source: Vehicle, mutator: (draft: MutableModel<Vehicle>) => MutableModel<Vehicle> | void): Vehicle;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email: string;
  readonly Vehicles?: (UserVehicle | null)[] | null;
  readonly SearchHistories?: (SearchHistory | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email: string;
  readonly Vehicles: AsyncCollection<UserVehicle>;
  readonly SearchHistories: AsyncCollection<SearchHistory>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerUserVehicle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserVehicle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly vehicleId?: string | null;
  readonly userId?: string | null;
  readonly vehicle: Vehicle;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserVehicle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserVehicle, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly vehicleId?: string | null;
  readonly userId?: string | null;
  readonly vehicle: AsyncItem<Vehicle>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserVehicle = LazyLoading extends LazyLoadingDisabled ? EagerUserVehicle : LazyUserVehicle

export declare const UserVehicle: (new (init: ModelInit<UserVehicle>) => UserVehicle) & {
  copyOf(source: UserVehicle, mutator: (draft: MutableModel<UserVehicle>) => MutableModel<UserVehicle> | void): UserVehicle;
}