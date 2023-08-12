import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, is compliant with the date-time format outlined in section 5.6 of the RFC 3339
   * profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
   *
   * This scalar is a description of an exact instant on the timeline such as the instant that a user account was created.
   *
   * # Input Coercion
   *
   * When expected as an input type, only RFC 3339 compliant date-time strings are accepted. All other input values raise a query error indicating an incorrect type.
   *
   * # Result Coercion
   *
   * Where an RFC 3339 compliant date-time string has a time-zone other than UTC, it is shifted to UTC.
   * For example, the date-time string 2016-01-01T14:10:20+01:00 is shifted to 2016-01-01T13:10:20Z.
   */
  DateTime: { input: any; output: any; }
};

export type Contest = {
  __typename?: 'Contest';
  name: Scalars['String']['output'];
  description: Scalars['String']['output'];
  status: Scalars['String']['output'];
  maxParticipants: Scalars['Int']['output'];
  participants?: Maybe<ParticipantConnection>;
  leaderboard?: Maybe<LeaderboardConnection>;
  contestDate?: Maybe<Scalars['DateTime']['output']>;
  contestStock?: Maybe<ContestStockConnection>;
  contestStockFeed?: Maybe<ContestStockFeedConnection>;
  message?: Maybe<MessageConnection>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
};


export type ContestParticipantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestOrderByInput>;
};


export type ContestLeaderboardArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestOrderByInput>;
};


export type ContestContestStockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestOrderByInput>;
};


export type ContestContestStockFeedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestOrderByInput>;
};


export type ContestMessageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestOrderByInput>;
};

export type ContestByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ContestCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type ContestConnection = {
  __typename?: 'ContestConnection';
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ContestEdge>>>;
};

/** Input to create a Contest */
export type ContestCreateInput = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  maxParticipants: Scalars['Int']['input'];
  participants?: InputMaybe<Array<InputMaybe<ContestToParticipantCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<ContestToLeaderboardCreateLeaderboardRelation>>>;
  contestDate?: InputMaybe<Scalars['DateTime']['input']>;
  contestStock?: InputMaybe<Array<InputMaybe<ContestToContestStockCreateContestStockRelation>>>;
  contestStockFeed?: InputMaybe<Array<InputMaybe<ContestToContestStockFeedCreateContestStockFeedRelation>>>;
  message?: InputMaybe<Array<InputMaybe<ContestToMessageCreateMessageRelation>>>;
};

export type ContestCreateManyInput = {
  input: ContestCreateInput;
};

export type ContestCreateManyPayload = {
  __typename?: 'ContestCreateManyPayload';
  contestCollection: Array<Contest>;
};

export type ContestCreatePayload = {
  __typename?: 'ContestCreatePayload';
  contest?: Maybe<Contest>;
};

export type ContestDeleteManyInput = {
  by: ContestByInput;
};

export type ContestDeleteManyPayload = {
  __typename?: 'ContestDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type ContestDeletePayload = {
  __typename?: 'ContestDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type ContestEdge = {
  __typename?: 'ContestEdge';
  node: Contest;
  cursor: Scalars['String']['output'];
};

export type ContestOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type ContestSearchConnection = {
  __typename?: 'ContestSearchConnection';
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
  edges: Array<ContestSearchEdge>;
};

export type ContestSearchEdge = {
  __typename?: 'ContestSearchEdge';
  node: Contest;
  cursor: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type ContestSearchFilterInput = {
  ALL?: InputMaybe<Array<ContestSearchFilterInput>>;
  ANY?: InputMaybe<Array<ContestSearchFilterInput>>;
  NONE?: InputMaybe<Array<ContestSearchFilterInput>>;
  NOT?: InputMaybe<ContestSearchFilterInput>;
  contestDate?: InputMaybe<DateTimeOrNullSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  description?: InputMaybe<StringSearchFilterInput>;
  maxParticipants?: InputMaybe<IntSearchFilterInput>;
  name?: InputMaybe<StringSearchFilterInput>;
  status?: InputMaybe<StringSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
};

export type ContestStock = {
  __typename?: 'ContestStock';
  stockCode: Scalars['String']['output'];
  stockDescription: Scalars['String']['output'];
  stockImage: Scalars['String']['output'];
  stockPrice: Scalars['Float']['output'];
  contest: Contest;
  contestId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
};

export type ContestStockByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ContestStockCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type ContestStockConnection = {
  __typename?: 'ContestStockConnection';
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ContestStockEdge>>>;
};

/** Input to create a ContestStock */
export type ContestStockCreateInput = {
  stockCode: Scalars['String']['input'];
  stockDescription: Scalars['String']['input'];
  stockImage: Scalars['String']['input'];
  stockPrice: Scalars['Float']['input'];
  contest: ContestToContestStockCreateContestRelation;
  contestId: Scalars['String']['input'];
};

export type ContestStockCreateManyInput = {
  input: ContestStockCreateInput;
};

export type ContestStockCreateManyPayload = {
  __typename?: 'ContestStockCreateManyPayload';
  contestStockCollection: Array<ContestStock>;
};

export type ContestStockCreatePayload = {
  __typename?: 'ContestStockCreatePayload';
  contestStock?: Maybe<ContestStock>;
};

export type ContestStockDeleteManyInput = {
  by: ContestStockByInput;
};

export type ContestStockDeleteManyPayload = {
  __typename?: 'ContestStockDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type ContestStockDeletePayload = {
  __typename?: 'ContestStockDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type ContestStockEdge = {
  __typename?: 'ContestStockEdge';
  node: ContestStock;
  cursor: Scalars['String']['output'];
};

export type ContestStockFeed = {
  __typename?: 'ContestStockFeed';
  stockFeed: Scalars['String']['output'];
  contest: Contest;
  contestId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
};

export type ContestStockFeedByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ContestStockFeedCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type ContestStockFeedConnection = {
  __typename?: 'ContestStockFeedConnection';
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ContestStockFeedEdge>>>;
};

/** Input to create a ContestStockFeed */
export type ContestStockFeedCreateInput = {
  stockFeed: Scalars['String']['input'];
  contest: ContestToContestStockFeedCreateContestRelation;
  contestId: Scalars['String']['input'];
};

export type ContestStockFeedCreateManyInput = {
  input: ContestStockFeedCreateInput;
};

export type ContestStockFeedCreateManyPayload = {
  __typename?: 'ContestStockFeedCreateManyPayload';
  contestStockFeedCollection: Array<ContestStockFeed>;
};

export type ContestStockFeedCreatePayload = {
  __typename?: 'ContestStockFeedCreatePayload';
  contestStockFeed?: Maybe<ContestStockFeed>;
};

export type ContestStockFeedDeleteManyInput = {
  by: ContestStockFeedByInput;
};

export type ContestStockFeedDeleteManyPayload = {
  __typename?: 'ContestStockFeedDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type ContestStockFeedDeletePayload = {
  __typename?: 'ContestStockFeedDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type ContestStockFeedEdge = {
  __typename?: 'ContestStockFeedEdge';
  node: ContestStockFeed;
  cursor: Scalars['String']['output'];
};

export type ContestStockFeedOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type ContestStockFeedSearchConnection = {
  __typename?: 'ContestStockFeedSearchConnection';
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
  edges: Array<ContestStockFeedSearchEdge>;
};

export type ContestStockFeedSearchEdge = {
  __typename?: 'ContestStockFeedSearchEdge';
  node: ContestStockFeed;
  cursor: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type ContestStockFeedSearchFilterInput = {
  ALL?: InputMaybe<Array<ContestStockFeedSearchFilterInput>>;
  ANY?: InputMaybe<Array<ContestStockFeedSearchFilterInput>>;
  NONE?: InputMaybe<Array<ContestStockFeedSearchFilterInput>>;
  NOT?: InputMaybe<ContestStockFeedSearchFilterInput>;
  contestId?: InputMaybe<StringSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  stockFeed?: InputMaybe<StringSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
};

/** Input to update a ContestStockFeed */
export type ContestStockFeedUpdateInput = {
  stockFeed?: InputMaybe<Scalars['String']['input']>;
  contest?: InputMaybe<ContestToContestStockFeedUpdateContestRelation>;
  contestId?: InputMaybe<Scalars['String']['input']>;
};

export type ContestStockFeedUpdateManyInput = {
  by: ContestStockFeedByInput;
  input: ContestStockFeedUpdateInput;
};

export type ContestStockFeedUpdateManyPayload = {
  __typename?: 'ContestStockFeedUpdateManyPayload';
  contestStockFeedCollection: Array<ContestStockFeed>;
};

export type ContestStockFeedUpdatePayload = {
  __typename?: 'ContestStockFeedUpdatePayload';
  contestStockFeed?: Maybe<ContestStockFeed>;
};

export type ContestStockOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type ContestStockSearchConnection = {
  __typename?: 'ContestStockSearchConnection';
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
  edges: Array<ContestStockSearchEdge>;
};

export type ContestStockSearchEdge = {
  __typename?: 'ContestStockSearchEdge';
  node: ContestStock;
  cursor: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type ContestStockSearchFilterInput = {
  ALL?: InputMaybe<Array<ContestStockSearchFilterInput>>;
  ANY?: InputMaybe<Array<ContestStockSearchFilterInput>>;
  NONE?: InputMaybe<Array<ContestStockSearchFilterInput>>;
  NOT?: InputMaybe<ContestStockSearchFilterInput>;
  contestId?: InputMaybe<StringSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  stockCode?: InputMaybe<StringSearchFilterInput>;
  stockDescription?: InputMaybe<StringSearchFilterInput>;
  stockImage?: InputMaybe<StringSearchFilterInput>;
  stockPrice?: InputMaybe<FloatSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
};

/** Input to update a ContestStock */
export type ContestStockUpdateInput = {
  stockCode?: InputMaybe<Scalars['String']['input']>;
  stockDescription?: InputMaybe<Scalars['String']['input']>;
  stockImage?: InputMaybe<Scalars['String']['input']>;
  stockPrice?: InputMaybe<FloatOperationsInput>;
  contest?: InputMaybe<ContestToContestStockUpdateContestRelation>;
  contestId?: InputMaybe<Scalars['String']['input']>;
};

export type ContestStockUpdateManyInput = {
  by: ContestStockByInput;
  input: ContestStockUpdateInput;
};

export type ContestStockUpdateManyPayload = {
  __typename?: 'ContestStockUpdateManyPayload';
  contestStockCollection: Array<ContestStock>;
};

export type ContestStockUpdatePayload = {
  __typename?: 'ContestStockUpdatePayload';
  contestStock?: Maybe<ContestStock>;
};

/** Input to create a Contest for the ContestToContestStock relation of ContestStock */
export type ContestToContestStockCreateContest = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  maxParticipants: Scalars['Int']['input'];
  participants?: InputMaybe<Array<InputMaybe<ContestToParticipantCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<ContestToLeaderboardCreateLeaderboardRelation>>>;
  contestDate?: InputMaybe<Scalars['DateTime']['input']>;
  contestStock?: InputMaybe<Array<InputMaybe<ContestToContestStockCreateContestStockRelation>>>;
  contestStockFeed?: InputMaybe<Array<InputMaybe<ContestToContestStockFeedCreateContestStockFeedRelation>>>;
  message?: InputMaybe<Array<InputMaybe<ContestToMessageCreateMessageRelation>>>;
};

/** Input to link to or create a Contest for the ContestToContestStock relation of ContestStock */
export type ContestToContestStockCreateContestRelation = {
  create?: InputMaybe<ContestToContestStockCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a ContestStock for the ContestToContestStock relation of Contest */
export type ContestToContestStockCreateContestStock = {
  stockCode: Scalars['String']['input'];
  stockDescription: Scalars['String']['input'];
  stockImage: Scalars['String']['input'];
  stockPrice: Scalars['Float']['input'];
  contestId: Scalars['String']['input'];
};

/** Input to link to or create a ContestStock for the ContestToContestStock relation of Contest */
export type ContestToContestStockCreateContestStockRelation = {
  create?: InputMaybe<ContestToContestStockCreateContestStock>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Contest for the ContestToContestStockFeed relation of ContestStockFeed */
export type ContestToContestStockFeedCreateContest = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  maxParticipants: Scalars['Int']['input'];
  participants?: InputMaybe<Array<InputMaybe<ContestToParticipantCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<ContestToLeaderboardCreateLeaderboardRelation>>>;
  contestDate?: InputMaybe<Scalars['DateTime']['input']>;
  contestStock?: InputMaybe<Array<InputMaybe<ContestToContestStockCreateContestStockRelation>>>;
  contestStockFeed?: InputMaybe<Array<InputMaybe<ContestToContestStockFeedCreateContestStockFeedRelation>>>;
  message?: InputMaybe<Array<InputMaybe<ContestToMessageCreateMessageRelation>>>;
};

/** Input to link to or create a Contest for the ContestToContestStockFeed relation of ContestStockFeed */
export type ContestToContestStockFeedCreateContestRelation = {
  create?: InputMaybe<ContestToContestStockFeedCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a ContestStockFeed for the ContestToContestStockFeed relation of Contest */
export type ContestToContestStockFeedCreateContestStockFeed = {
  stockFeed: Scalars['String']['input'];
  contestId: Scalars['String']['input'];
};

/** Input to link to or create a ContestStockFeed for the ContestToContestStockFeed relation of Contest */
export type ContestToContestStockFeedCreateContestStockFeedRelation = {
  create?: InputMaybe<ContestToContestStockFeedCreateContestStockFeed>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Contest for the ContestToContestStockFeed relation of ContestStockFeed */
export type ContestToContestStockFeedUpdateContestRelation = {
  create?: InputMaybe<ContestToContestStockFeedCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a ContestStockFeed for the ContestToContestStockFeed relation of Contest */
export type ContestToContestStockFeedUpdateContestStockFeedRelation = {
  create?: InputMaybe<ContestToContestStockFeedCreateContestStockFeed>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Contest for the ContestToContestStock relation of ContestStock */
export type ContestToContestStockUpdateContestRelation = {
  create?: InputMaybe<ContestToContestStockCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a ContestStock for the ContestToContestStock relation of Contest */
export type ContestToContestStockUpdateContestStockRelation = {
  create?: InputMaybe<ContestToContestStockCreateContestStock>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Contest for the ContestToLeaderboard relation of Leaderboard */
export type ContestToLeaderboardCreateContest = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  maxParticipants: Scalars['Int']['input'];
  participants?: InputMaybe<Array<InputMaybe<ContestToParticipantCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<ContestToLeaderboardCreateLeaderboardRelation>>>;
  contestDate?: InputMaybe<Scalars['DateTime']['input']>;
  contestStock?: InputMaybe<Array<InputMaybe<ContestToContestStockCreateContestStockRelation>>>;
  contestStockFeed?: InputMaybe<Array<InputMaybe<ContestToContestStockFeedCreateContestStockFeedRelation>>>;
  message?: InputMaybe<Array<InputMaybe<ContestToMessageCreateMessageRelation>>>;
};

/** Input to link to or create a Contest for the ContestToLeaderboard relation of Leaderboard */
export type ContestToLeaderboardCreateContestRelation = {
  create?: InputMaybe<ContestToLeaderboardCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Leaderboard for the ContestToLeaderboard relation of Contest */
export type ContestToLeaderboardCreateLeaderboard = {
  rank: Scalars['Int']['input'];
  amount: Scalars['Float']['input'];
  user: LeaderboardToUserCreateUserRelation;
  userId: Scalars['String']['input'];
  contestId: Scalars['String']['input'];
};

/** Input to link to or create a Leaderboard for the ContestToLeaderboard relation of Contest */
export type ContestToLeaderboardCreateLeaderboardRelation = {
  create?: InputMaybe<ContestToLeaderboardCreateLeaderboard>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Contest for the ContestToLeaderboard relation of Leaderboard */
export type ContestToLeaderboardUpdateContestRelation = {
  create?: InputMaybe<ContestToLeaderboardCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Leaderboard for the ContestToLeaderboard relation of Contest */
export type ContestToLeaderboardUpdateLeaderboardRelation = {
  create?: InputMaybe<ContestToLeaderboardCreateLeaderboard>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Contest for the ContestToMessage relation of Message */
export type ContestToMessageCreateContest = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  maxParticipants: Scalars['Int']['input'];
  participants?: InputMaybe<Array<InputMaybe<ContestToParticipantCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<ContestToLeaderboardCreateLeaderboardRelation>>>;
  contestDate?: InputMaybe<Scalars['DateTime']['input']>;
  contestStock?: InputMaybe<Array<InputMaybe<ContestToContestStockCreateContestStockRelation>>>;
  contestStockFeed?: InputMaybe<Array<InputMaybe<ContestToContestStockFeedCreateContestStockFeedRelation>>>;
  message?: InputMaybe<Array<InputMaybe<ContestToMessageCreateMessageRelation>>>;
};

/** Input to link to or create a Contest for the ContestToMessage relation of Message */
export type ContestToMessageCreateContestRelation = {
  create?: InputMaybe<ContestToMessageCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Message for the ContestToMessage relation of Contest */
export type ContestToMessageCreateMessage = {
  body: Scalars['String']['input'];
  user: MessageToUserCreateUserRelation;
  userId: Scalars['String']['input'];
  contestId: Scalars['String']['input'];
  msgDateTime: Scalars['DateTime']['input'];
};

/** Input to link to or create a Message for the ContestToMessage relation of Contest */
export type ContestToMessageCreateMessageRelation = {
  create?: InputMaybe<ContestToMessageCreateMessage>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Contest for the ContestToMessage relation of Message */
export type ContestToMessageUpdateContestRelation = {
  create?: InputMaybe<ContestToMessageCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Message for the ContestToMessage relation of Contest */
export type ContestToMessageUpdateMessageRelation = {
  create?: InputMaybe<ContestToMessageCreateMessage>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Contest for the ContestToParticipant relation of Participant */
export type ContestToParticipantCreateContest = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  maxParticipants: Scalars['Int']['input'];
  participants?: InputMaybe<Array<InputMaybe<ContestToParticipantCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<ContestToLeaderboardCreateLeaderboardRelation>>>;
  contestDate?: InputMaybe<Scalars['DateTime']['input']>;
  contestStock?: InputMaybe<Array<InputMaybe<ContestToContestStockCreateContestStockRelation>>>;
  contestStockFeed?: InputMaybe<Array<InputMaybe<ContestToContestStockFeedCreateContestStockFeedRelation>>>;
  message?: InputMaybe<Array<InputMaybe<ContestToMessageCreateMessageRelation>>>;
};

/** Input to link to or create a Contest for the ContestToParticipant relation of Participant */
export type ContestToParticipantCreateContestRelation = {
  create?: InputMaybe<ContestToParticipantCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a Participant for the ContestToParticipant relation of Contest */
export type ContestToParticipantCreateParticipant = {
  user: ParticipantToUserCreateUserRelation;
  userId: Scalars['String']['input'];
  contestId: Scalars['String']['input'];
  balanceAmount: Scalars['Float']['input'];
  stockCode: Scalars['String']['input'];
  stockUnitBuyPrice: Scalars['Float']['input'];
  betType: Scalars['String']['input'];
  stockUnits: Scalars['Float']['input'];
};

/** Input to link to or create a Participant for the ContestToParticipant relation of Contest */
export type ContestToParticipantCreateParticipantRelation = {
  create?: InputMaybe<ContestToParticipantCreateParticipant>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Contest for the ContestToParticipant relation of Participant */
export type ContestToParticipantUpdateContestRelation = {
  create?: InputMaybe<ContestToParticipantCreateContest>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Participant for the ContestToParticipant relation of Contest */
export type ContestToParticipantUpdateParticipantRelation = {
  create?: InputMaybe<ContestToParticipantCreateParticipant>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to update a Contest */
export type ContestUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  maxParticipants?: InputMaybe<IntOperationsInput>;
  participants?: InputMaybe<Array<InputMaybe<ContestToParticipantUpdateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<ContestToLeaderboardUpdateLeaderboardRelation>>>;
  contestDate?: InputMaybe<Scalars['DateTime']['input']>;
  contestStock?: InputMaybe<Array<InputMaybe<ContestToContestStockUpdateContestStockRelation>>>;
  contestStockFeed?: InputMaybe<Array<InputMaybe<ContestToContestStockFeedUpdateContestStockFeedRelation>>>;
  message?: InputMaybe<Array<InputMaybe<ContestToMessageUpdateMessageRelation>>>;
};

export type ContestUpdateManyInput = {
  by: ContestByInput;
  input: ContestUpdateInput;
};

export type ContestUpdateManyPayload = {
  __typename?: 'ContestUpdateManyPayload';
  contestCollection: Array<Contest>;
};

export type ContestUpdatePayload = {
  __typename?: 'ContestUpdatePayload';
  contest?: Maybe<Contest>;
};

export type DateTimeOrNullSearchFilterInput = {
  ALL?: InputMaybe<Array<DateTimeOrNullSearchFilterInput>>;
  ANY?: InputMaybe<Array<DateTimeOrNullSearchFilterInput>>;
  NONE?: InputMaybe<Array<DateTimeOrNullSearchFilterInput>>;
  NOT?: InputMaybe<DateTimeOrNullSearchFilterInput>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateTimeSearchFilterInput = {
  ALL?: InputMaybe<Array<DateTimeSearchFilterInput>>;
  ANY?: InputMaybe<Array<DateTimeSearchFilterInput>>;
  NONE?: InputMaybe<Array<DateTimeSearchFilterInput>>;
  NOT?: InputMaybe<DateTimeSearchFilterInput>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

/** Possible operations for a Float field */
export type FloatOperationsInput = {
  set?: InputMaybe<Scalars['Float']['input']>;
  increment?: InputMaybe<Scalars['Float']['input']>;
  decrement?: InputMaybe<Scalars['Float']['input']>;
};

export type FloatSearchFilterInput = {
  ALL?: InputMaybe<Array<FloatSearchFilterInput>>;
  ANY?: InputMaybe<Array<FloatSearchFilterInput>>;
  NONE?: InputMaybe<Array<FloatSearchFilterInput>>;
  NOT?: InputMaybe<FloatSearchFilterInput>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IdCollectionFilterInput = {
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Possible operations for an Int field */
export type IntOperationsInput = {
  set?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  decrement?: InputMaybe<Scalars['Int']['input']>;
};

export type IntSearchFilterInput = {
  ALL?: InputMaybe<Array<IntSearchFilterInput>>;
  ANY?: InputMaybe<Array<IntSearchFilterInput>>;
  NONE?: InputMaybe<Array<IntSearchFilterInput>>;
  NOT?: InputMaybe<IntSearchFilterInput>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Leaderboard = {
  __typename?: 'Leaderboard';
  rank: Scalars['Int']['output'];
  amount: Scalars['Float']['output'];
  user: User;
  userId: Scalars['String']['output'];
  contest: Contest;
  contestId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
};

export type LeaderboardByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type LeaderboardCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type LeaderboardConnection = {
  __typename?: 'LeaderboardConnection';
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<LeaderboardEdge>>>;
};

/** Input to create a Leaderboard */
export type LeaderboardCreateInput = {
  rank: Scalars['Int']['input'];
  amount: Scalars['Float']['input'];
  user: LeaderboardToUserCreateUserRelation;
  userId: Scalars['String']['input'];
  contest: ContestToLeaderboardCreateContestRelation;
  contestId: Scalars['String']['input'];
};

export type LeaderboardCreateManyInput = {
  input: LeaderboardCreateInput;
};

export type LeaderboardCreateManyPayload = {
  __typename?: 'LeaderboardCreateManyPayload';
  leaderboardCollection: Array<Leaderboard>;
};

export type LeaderboardCreatePayload = {
  __typename?: 'LeaderboardCreatePayload';
  leaderboard?: Maybe<Leaderboard>;
};

export type LeaderboardDeleteManyInput = {
  by: LeaderboardByInput;
};

export type LeaderboardDeleteManyPayload = {
  __typename?: 'LeaderboardDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type LeaderboardDeletePayload = {
  __typename?: 'LeaderboardDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type LeaderboardEdge = {
  __typename?: 'LeaderboardEdge';
  node: Leaderboard;
  cursor: Scalars['String']['output'];
};

export type LeaderboardOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type LeaderboardSearchConnection = {
  __typename?: 'LeaderboardSearchConnection';
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
  edges: Array<LeaderboardSearchEdge>;
};

export type LeaderboardSearchEdge = {
  __typename?: 'LeaderboardSearchEdge';
  node: Leaderboard;
  cursor: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type LeaderboardSearchFilterInput = {
  ALL?: InputMaybe<Array<LeaderboardSearchFilterInput>>;
  ANY?: InputMaybe<Array<LeaderboardSearchFilterInput>>;
  NONE?: InputMaybe<Array<LeaderboardSearchFilterInput>>;
  NOT?: InputMaybe<LeaderboardSearchFilterInput>;
  amount?: InputMaybe<FloatSearchFilterInput>;
  contestId?: InputMaybe<StringSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  rank?: InputMaybe<IntSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
  userId?: InputMaybe<StringSearchFilterInput>;
};

/** Input to create a Leaderboard for the LeaderboardToUser relation of User */
export type LeaderboardToUserCreateLeaderboard = {
  rank: Scalars['Int']['input'];
  amount: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
  contest: ContestToLeaderboardCreateContestRelation;
  contestId: Scalars['String']['input'];
};

/** Input to link to or create a Leaderboard for the LeaderboardToUser relation of User */
export type LeaderboardToUserCreateLeaderboardRelation = {
  create?: InputMaybe<LeaderboardToUserCreateLeaderboard>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a User for the LeaderboardToUser relation of Leaderboard */
export type LeaderboardToUserCreateUser = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
  participants?: InputMaybe<Array<InputMaybe<ParticipantToUserCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<LeaderboardToUserCreateLeaderboardRelation>>>;
  message?: InputMaybe<Array<InputMaybe<MessageToUserCreateMessageRelation>>>;
};

/** Input to link to or create a User for the LeaderboardToUser relation of Leaderboard */
export type LeaderboardToUserCreateUserRelation = {
  create?: InputMaybe<LeaderboardToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Leaderboard for the LeaderboardToUser relation of User */
export type LeaderboardToUserUpdateLeaderboardRelation = {
  create?: InputMaybe<LeaderboardToUserCreateLeaderboard>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a User for the LeaderboardToUser relation of Leaderboard */
export type LeaderboardToUserUpdateUserRelation = {
  create?: InputMaybe<LeaderboardToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to update a Leaderboard */
export type LeaderboardUpdateInput = {
  rank?: InputMaybe<IntOperationsInput>;
  amount?: InputMaybe<FloatOperationsInput>;
  user?: InputMaybe<LeaderboardToUserUpdateUserRelation>;
  userId?: InputMaybe<Scalars['String']['input']>;
  contest?: InputMaybe<ContestToLeaderboardUpdateContestRelation>;
  contestId?: InputMaybe<Scalars['String']['input']>;
};

export type LeaderboardUpdateManyInput = {
  by: LeaderboardByInput;
  input: LeaderboardUpdateInput;
};

export type LeaderboardUpdateManyPayload = {
  __typename?: 'LeaderboardUpdateManyPayload';
  leaderboardCollection: Array<Leaderboard>;
};

export type LeaderboardUpdatePayload = {
  __typename?: 'LeaderboardUpdatePayload';
  leaderboard?: Maybe<Leaderboard>;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
  contest: Contest;
  contestId: Scalars['String']['output'];
  msgDateTime: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
};

export type MessageByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type MessageCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
};

/** Input to create a Message */
export type MessageCreateInput = {
  body: Scalars['String']['input'];
  user: MessageToUserCreateUserRelation;
  userId: Scalars['String']['input'];
  contest: ContestToMessageCreateContestRelation;
  contestId: Scalars['String']['input'];
  msgDateTime: Scalars['DateTime']['input'];
};

export type MessageCreateManyInput = {
  input: MessageCreateInput;
};

export type MessageCreateManyPayload = {
  __typename?: 'MessageCreateManyPayload';
  messageCollection: Array<Message>;
};

export type MessageCreatePayload = {
  __typename?: 'MessageCreatePayload';
  message?: Maybe<Message>;
};

export type MessageDeleteManyInput = {
  by: MessageByInput;
};

export type MessageDeleteManyPayload = {
  __typename?: 'MessageDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type MessageDeletePayload = {
  __typename?: 'MessageDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  node: Message;
  cursor: Scalars['String']['output'];
};

export type MessageOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type MessageSearchConnection = {
  __typename?: 'MessageSearchConnection';
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
  edges: Array<MessageSearchEdge>;
};

export type MessageSearchEdge = {
  __typename?: 'MessageSearchEdge';
  node: Message;
  cursor: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type MessageSearchFilterInput = {
  ALL?: InputMaybe<Array<MessageSearchFilterInput>>;
  ANY?: InputMaybe<Array<MessageSearchFilterInput>>;
  NONE?: InputMaybe<Array<MessageSearchFilterInput>>;
  NOT?: InputMaybe<MessageSearchFilterInput>;
  body?: InputMaybe<StringSearchFilterInput>;
  contestId?: InputMaybe<StringSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  msgDateTime?: InputMaybe<DateTimeSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
  userId?: InputMaybe<StringSearchFilterInput>;
};

/** Input to create a Message for the MessageToUser relation of User */
export type MessageToUserCreateMessage = {
  body: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  contest: ContestToMessageCreateContestRelation;
  contestId: Scalars['String']['input'];
  msgDateTime: Scalars['DateTime']['input'];
};

/** Input to link to or create a Message for the MessageToUser relation of User */
export type MessageToUserCreateMessageRelation = {
  create?: InputMaybe<MessageToUserCreateMessage>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a User for the MessageToUser relation of Message */
export type MessageToUserCreateUser = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
  participants?: InputMaybe<Array<InputMaybe<ParticipantToUserCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<LeaderboardToUserCreateLeaderboardRelation>>>;
  message?: InputMaybe<Array<InputMaybe<MessageToUserCreateMessageRelation>>>;
};

/** Input to link to or create a User for the MessageToUser relation of Message */
export type MessageToUserCreateUserRelation = {
  create?: InputMaybe<MessageToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Message for the MessageToUser relation of User */
export type MessageToUserUpdateMessageRelation = {
  create?: InputMaybe<MessageToUserCreateMessage>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a User for the MessageToUser relation of Message */
export type MessageToUserUpdateUserRelation = {
  create?: InputMaybe<MessageToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to update a Message */
export type MessageUpdateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<MessageToUserUpdateUserRelation>;
  userId?: InputMaybe<Scalars['String']['input']>;
  contest?: InputMaybe<ContestToMessageUpdateContestRelation>;
  contestId?: InputMaybe<Scalars['String']['input']>;
  msgDateTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MessageUpdateManyInput = {
  by: MessageByInput;
  input: MessageUpdateInput;
};

export type MessageUpdateManyPayload = {
  __typename?: 'MessageUpdateManyPayload';
  messageCollection: Array<Message>;
};

export type MessageUpdatePayload = {
  __typename?: 'MessageUpdatePayload';
  message?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a User */
  userCreate?: Maybe<UserCreatePayload>;
  /** Create multiple User */
  userCreateMany?: Maybe<UserCreateManyPayload>;
  /** Update a User */
  userUpdate?: Maybe<UserUpdatePayload>;
  /** Update multiple User */
  userUpdateMany?: Maybe<UserUpdateManyPayload>;
  /** Delete a User by ID or unique field */
  userDelete?: Maybe<UserDeletePayload>;
  /** Delete multiple User */
  userDeleteMany?: Maybe<UserDeleteManyPayload>;
  /** Create a Contest */
  contestCreate?: Maybe<ContestCreatePayload>;
  /** Create multiple Contest */
  contestCreateMany?: Maybe<ContestCreateManyPayload>;
  /** Update a Contest */
  contestUpdate?: Maybe<ContestUpdatePayload>;
  /** Update multiple Contest */
  contestUpdateMany?: Maybe<ContestUpdateManyPayload>;
  /** Delete a Contest by ID or unique field */
  contestDelete?: Maybe<ContestDeletePayload>;
  /** Delete multiple Contest */
  contestDeleteMany?: Maybe<ContestDeleteManyPayload>;
  /** Create a Participant */
  participantCreate?: Maybe<ParticipantCreatePayload>;
  /** Create multiple Participant */
  participantCreateMany?: Maybe<ParticipantCreateManyPayload>;
  /** Update a Participant */
  participantUpdate?: Maybe<ParticipantUpdatePayload>;
  /** Update multiple Participant */
  participantUpdateMany?: Maybe<ParticipantUpdateManyPayload>;
  /** Delete a Participant by ID or unique field */
  participantDelete?: Maybe<ParticipantDeletePayload>;
  /** Delete multiple Participant */
  participantDeleteMany?: Maybe<ParticipantDeleteManyPayload>;
  /** Create a ContestStock */
  contestStockCreate?: Maybe<ContestStockCreatePayload>;
  /** Create multiple ContestStock */
  contestStockCreateMany?: Maybe<ContestStockCreateManyPayload>;
  /** Update a ContestStock */
  contestStockUpdate?: Maybe<ContestStockUpdatePayload>;
  /** Update multiple ContestStock */
  contestStockUpdateMany?: Maybe<ContestStockUpdateManyPayload>;
  /** Delete a ContestStock by ID or unique field */
  contestStockDelete?: Maybe<ContestStockDeletePayload>;
  /** Delete multiple ContestStock */
  contestStockDeleteMany?: Maybe<ContestStockDeleteManyPayload>;
  /** Create a Leaderboard */
  leaderboardCreate?: Maybe<LeaderboardCreatePayload>;
  /** Create multiple Leaderboard */
  leaderboardCreateMany?: Maybe<LeaderboardCreateManyPayload>;
  /** Update a Leaderboard */
  leaderboardUpdate?: Maybe<LeaderboardUpdatePayload>;
  /** Update multiple Leaderboard */
  leaderboardUpdateMany?: Maybe<LeaderboardUpdateManyPayload>;
  /** Delete a Leaderboard by ID or unique field */
  leaderboardDelete?: Maybe<LeaderboardDeletePayload>;
  /** Delete multiple Leaderboard */
  leaderboardDeleteMany?: Maybe<LeaderboardDeleteManyPayload>;
  /** Create a Message */
  messageCreate?: Maybe<MessageCreatePayload>;
  /** Create multiple Message */
  messageCreateMany?: Maybe<MessageCreateManyPayload>;
  /** Update a Message */
  messageUpdate?: Maybe<MessageUpdatePayload>;
  /** Update multiple Message */
  messageUpdateMany?: Maybe<MessageUpdateManyPayload>;
  /** Delete a Message by ID or unique field */
  messageDelete?: Maybe<MessageDeletePayload>;
  /** Delete multiple Message */
  messageDeleteMany?: Maybe<MessageDeleteManyPayload>;
  /** Create a ContestStockFeed */
  contestStockFeedCreate?: Maybe<ContestStockFeedCreatePayload>;
  /** Create multiple ContestStockFeed */
  contestStockFeedCreateMany?: Maybe<ContestStockFeedCreateManyPayload>;
  /** Update a ContestStockFeed */
  contestStockFeedUpdate?: Maybe<ContestStockFeedUpdatePayload>;
  /** Update multiple ContestStockFeed */
  contestStockFeedUpdateMany?: Maybe<ContestStockFeedUpdateManyPayload>;
  /** Delete a ContestStockFeed by ID or unique field */
  contestStockFeedDelete?: Maybe<ContestStockFeedDeletePayload>;
  /** Delete multiple ContestStockFeed */
  contestStockFeedDeleteMany?: Maybe<ContestStockFeedDeleteManyPayload>;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserCreateManyArgs = {
  input: Array<UserCreateManyInput>;
};


export type MutationUserUpdateArgs = {
  by: UserByInput;
  input: UserUpdateInput;
};


export type MutationUserUpdateManyArgs = {
  input: Array<UserUpdateManyInput>;
};


export type MutationUserDeleteArgs = {
  by: UserByInput;
};


export type MutationUserDeleteManyArgs = {
  input: Array<UserDeleteManyInput>;
};


export type MutationContestCreateArgs = {
  input: ContestCreateInput;
};


export type MutationContestCreateManyArgs = {
  input: Array<ContestCreateManyInput>;
};


export type MutationContestUpdateArgs = {
  by: ContestByInput;
  input: ContestUpdateInput;
};


export type MutationContestUpdateManyArgs = {
  input: Array<ContestUpdateManyInput>;
};


export type MutationContestDeleteArgs = {
  by: ContestByInput;
};


export type MutationContestDeleteManyArgs = {
  input: Array<ContestDeleteManyInput>;
};


export type MutationParticipantCreateArgs = {
  input: ParticipantCreateInput;
};


export type MutationParticipantCreateManyArgs = {
  input: Array<ParticipantCreateManyInput>;
};


export type MutationParticipantUpdateArgs = {
  by: ParticipantByInput;
  input: ParticipantUpdateInput;
};


export type MutationParticipantUpdateManyArgs = {
  input: Array<ParticipantUpdateManyInput>;
};


export type MutationParticipantDeleteArgs = {
  by: ParticipantByInput;
};


export type MutationParticipantDeleteManyArgs = {
  input: Array<ParticipantDeleteManyInput>;
};


export type MutationContestStockCreateArgs = {
  input: ContestStockCreateInput;
};


export type MutationContestStockCreateManyArgs = {
  input: Array<ContestStockCreateManyInput>;
};


export type MutationContestStockUpdateArgs = {
  by: ContestStockByInput;
  input: ContestStockUpdateInput;
};


export type MutationContestStockUpdateManyArgs = {
  input: Array<ContestStockUpdateManyInput>;
};


export type MutationContestStockDeleteArgs = {
  by: ContestStockByInput;
};


export type MutationContestStockDeleteManyArgs = {
  input: Array<ContestStockDeleteManyInput>;
};


export type MutationLeaderboardCreateArgs = {
  input: LeaderboardCreateInput;
};


export type MutationLeaderboardCreateManyArgs = {
  input: Array<LeaderboardCreateManyInput>;
};


export type MutationLeaderboardUpdateArgs = {
  by: LeaderboardByInput;
  input: LeaderboardUpdateInput;
};


export type MutationLeaderboardUpdateManyArgs = {
  input: Array<LeaderboardUpdateManyInput>;
};


export type MutationLeaderboardDeleteArgs = {
  by: LeaderboardByInput;
};


export type MutationLeaderboardDeleteManyArgs = {
  input: Array<LeaderboardDeleteManyInput>;
};


export type MutationMessageCreateArgs = {
  input: MessageCreateInput;
};


export type MutationMessageCreateManyArgs = {
  input: Array<MessageCreateManyInput>;
};


export type MutationMessageUpdateArgs = {
  by: MessageByInput;
  input: MessageUpdateInput;
};


export type MutationMessageUpdateManyArgs = {
  input: Array<MessageUpdateManyInput>;
};


export type MutationMessageDeleteArgs = {
  by: MessageByInput;
};


export type MutationMessageDeleteManyArgs = {
  input: Array<MessageDeleteManyInput>;
};


export type MutationContestStockFeedCreateArgs = {
  input: ContestStockFeedCreateInput;
};


export type MutationContestStockFeedCreateManyArgs = {
  input: Array<ContestStockFeedCreateManyInput>;
};


export type MutationContestStockFeedUpdateArgs = {
  by: ContestStockFeedByInput;
  input: ContestStockFeedUpdateInput;
};


export type MutationContestStockFeedUpdateManyArgs = {
  input: Array<ContestStockFeedUpdateManyInput>;
};


export type MutationContestStockFeedDeleteArgs = {
  by: ContestStockFeedByInput;
};


export type MutationContestStockFeedDeleteManyArgs = {
  input: Array<ContestStockFeedDeleteManyInput>;
};

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
  endCursor?: Maybe<Scalars['String']['output']>;
};

export type Participant = {
  __typename?: 'Participant';
  user: User;
  userId: Scalars['String']['output'];
  contest: Contest;
  contestId: Scalars['String']['output'];
  balanceAmount: Scalars['Float']['output'];
  stockCode: Scalars['String']['output'];
  stockUnitBuyPrice: Scalars['Float']['output'];
  betType: Scalars['String']['output'];
  stockUnits: Scalars['Float']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
};

export type ParticipantByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ParticipantCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type ParticipantConnection = {
  __typename?: 'ParticipantConnection';
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ParticipantEdge>>>;
};

/** Input to create a Participant */
export type ParticipantCreateInput = {
  user: ParticipantToUserCreateUserRelation;
  userId: Scalars['String']['input'];
  contest: ContestToParticipantCreateContestRelation;
  contestId: Scalars['String']['input'];
  balanceAmount: Scalars['Float']['input'];
  stockCode: Scalars['String']['input'];
  stockUnitBuyPrice: Scalars['Float']['input'];
  betType: Scalars['String']['input'];
  stockUnits: Scalars['Float']['input'];
};

export type ParticipantCreateManyInput = {
  input: ParticipantCreateInput;
};

export type ParticipantCreateManyPayload = {
  __typename?: 'ParticipantCreateManyPayload';
  participantCollection: Array<Participant>;
};

export type ParticipantCreatePayload = {
  __typename?: 'ParticipantCreatePayload';
  participant?: Maybe<Participant>;
};

export type ParticipantDeleteManyInput = {
  by: ParticipantByInput;
};

export type ParticipantDeleteManyPayload = {
  __typename?: 'ParticipantDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type ParticipantDeletePayload = {
  __typename?: 'ParticipantDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type ParticipantEdge = {
  __typename?: 'ParticipantEdge';
  node: Participant;
  cursor: Scalars['String']['output'];
};

export type ParticipantOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type ParticipantSearchConnection = {
  __typename?: 'ParticipantSearchConnection';
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
  edges: Array<ParticipantSearchEdge>;
};

export type ParticipantSearchEdge = {
  __typename?: 'ParticipantSearchEdge';
  node: Participant;
  cursor: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type ParticipantSearchFilterInput = {
  ALL?: InputMaybe<Array<ParticipantSearchFilterInput>>;
  ANY?: InputMaybe<Array<ParticipantSearchFilterInput>>;
  NONE?: InputMaybe<Array<ParticipantSearchFilterInput>>;
  NOT?: InputMaybe<ParticipantSearchFilterInput>;
  balanceAmount?: InputMaybe<FloatSearchFilterInput>;
  betType?: InputMaybe<StringSearchFilterInput>;
  contestId?: InputMaybe<StringSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  stockCode?: InputMaybe<StringSearchFilterInput>;
  stockUnitBuyPrice?: InputMaybe<FloatSearchFilterInput>;
  stockUnits?: InputMaybe<FloatSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
  userId?: InputMaybe<StringSearchFilterInput>;
};

/** Input to create a Participant for the ParticipantToUser relation of User */
export type ParticipantToUserCreateParticipant = {
  userId: Scalars['String']['input'];
  contest: ContestToParticipantCreateContestRelation;
  contestId: Scalars['String']['input'];
  balanceAmount: Scalars['Float']['input'];
  stockCode: Scalars['String']['input'];
  stockUnitBuyPrice: Scalars['Float']['input'];
  betType: Scalars['String']['input'];
  stockUnits: Scalars['Float']['input'];
};

/** Input to link to or create a Participant for the ParticipantToUser relation of User */
export type ParticipantToUserCreateParticipantRelation = {
  create?: InputMaybe<ParticipantToUserCreateParticipant>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to create a User for the ParticipantToUser relation of Participant */
export type ParticipantToUserCreateUser = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
  participants?: InputMaybe<Array<InputMaybe<ParticipantToUserCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<LeaderboardToUserCreateLeaderboardRelation>>>;
  message?: InputMaybe<Array<InputMaybe<MessageToUserCreateMessageRelation>>>;
};

/** Input to link to or create a User for the ParticipantToUser relation of Participant */
export type ParticipantToUserCreateUserRelation = {
  create?: InputMaybe<ParticipantToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a Participant for the ParticipantToUser relation of User */
export type ParticipantToUserUpdateParticipantRelation = {
  create?: InputMaybe<ParticipantToUserCreateParticipant>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to link/unlink to or create a User for the ParticipantToUser relation of Participant */
export type ParticipantToUserUpdateUserRelation = {
  create?: InputMaybe<ParticipantToUserCreateUser>;
  link?: InputMaybe<Scalars['ID']['input']>;
  unlink?: InputMaybe<Scalars['ID']['input']>;
};

/** Input to update a Participant */
export type ParticipantUpdateInput = {
  user?: InputMaybe<ParticipantToUserUpdateUserRelation>;
  userId?: InputMaybe<Scalars['String']['input']>;
  contest?: InputMaybe<ContestToParticipantUpdateContestRelation>;
  contestId?: InputMaybe<Scalars['String']['input']>;
  balanceAmount?: InputMaybe<FloatOperationsInput>;
  stockCode?: InputMaybe<Scalars['String']['input']>;
  stockUnitBuyPrice?: InputMaybe<FloatOperationsInput>;
  betType?: InputMaybe<Scalars['String']['input']>;
  stockUnits?: InputMaybe<FloatOperationsInput>;
};

export type ParticipantUpdateManyInput = {
  by: ParticipantByInput;
  input: ParticipantUpdateInput;
};

export type ParticipantUpdateManyPayload = {
  __typename?: 'ParticipantUpdateManyPayload';
  participantCollection: Array<Participant>;
};

export type ParticipantUpdatePayload = {
  __typename?: 'ParticipantUpdatePayload';
  participant?: Maybe<Participant>;
};

export type Query = {
  __typename?: 'Query';
  /** Query a single User by an ID or a unique field */
  user?: Maybe<User>;
  /** Paginated query to fetch the whole list of `User`. */
  userCollection?: Maybe<UserConnection>;
  /** Query a single Contest by an ID or a unique field */
  contest?: Maybe<Contest>;
  /** Paginated query to fetch the whole list of `Contest`. */
  contestCollection?: Maybe<ContestConnection>;
  /** Query a single Participant by an ID or a unique field */
  participant?: Maybe<Participant>;
  /** Paginated query to fetch the whole list of `Participant`. */
  participantCollection?: Maybe<ParticipantConnection>;
  /** Query a single ContestStock by an ID or a unique field */
  contestStock?: Maybe<ContestStock>;
  /** Paginated query to fetch the whole list of `ContestStock`. */
  contestStockCollection?: Maybe<ContestStockConnection>;
  /** Query a single Leaderboard by an ID or a unique field */
  leaderboard?: Maybe<Leaderboard>;
  /** Paginated query to fetch the whole list of `Leaderboard`. */
  leaderboardCollection?: Maybe<LeaderboardConnection>;
  /** Query a single Message by an ID or a unique field */
  message?: Maybe<Message>;
  /** Paginated query to fetch the whole list of `Message`. */
  messageCollection?: Maybe<MessageConnection>;
  /** Query a single ContestStockFeed by an ID or a unique field */
  contestStockFeed?: Maybe<ContestStockFeed>;
  /** Paginated query to fetch the whole list of `ContestStockFeed`. */
  contestStockFeedCollection?: Maybe<ContestStockFeedConnection>;
  /** Search `User` */
  userSearch?: Maybe<UserSearchConnection>;
  /** Search `Contest` */
  contestSearch?: Maybe<ContestSearchConnection>;
  /** Search `Participant` */
  participantSearch?: Maybe<ParticipantSearchConnection>;
  /** Search `ContestStock` */
  contestStockSearch?: Maybe<ContestStockSearchConnection>;
  /** Search `Leaderboard` */
  leaderboardSearch?: Maybe<LeaderboardSearchConnection>;
  /** Search `Message` */
  messageSearch?: Maybe<MessageSearchConnection>;
  /** Search `ContestStockFeed` */
  contestStockFeedSearch?: Maybe<ContestStockFeedSearchConnection>;
};


export type QueryUserArgs = {
  by: UserByInput;
};


export type QueryUserCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderByInput>;
  filter?: InputMaybe<UserCollectionFilterInput>;
};


export type QueryContestArgs = {
  by: ContestByInput;
};


export type QueryContestCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestOrderByInput>;
  filter?: InputMaybe<ContestCollectionFilterInput>;
};


export type QueryParticipantArgs = {
  by: ParticipantByInput;
};


export type QueryParticipantCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ParticipantOrderByInput>;
  filter?: InputMaybe<ParticipantCollectionFilterInput>;
};


export type QueryContestStockArgs = {
  by: ContestStockByInput;
};


export type QueryContestStockCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestStockOrderByInput>;
  filter?: InputMaybe<ContestStockCollectionFilterInput>;
};


export type QueryLeaderboardArgs = {
  by: LeaderboardByInput;
};


export type QueryLeaderboardCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeaderboardOrderByInput>;
  filter?: InputMaybe<LeaderboardCollectionFilterInput>;
};


export type QueryMessageArgs = {
  by: MessageByInput;
};


export type QueryMessageCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MessageOrderByInput>;
  filter?: InputMaybe<MessageCollectionFilterInput>;
};


export type QueryContestStockFeedArgs = {
  by: ContestStockFeedByInput;
};


export type QueryContestStockFeedCollectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContestStockFeedOrderByInput>;
  filter?: InputMaybe<ContestStockFeedCollectionFilterInput>;
};


export type QueryUserSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<UserSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContestSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<ContestSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};


export type QueryParticipantSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<ParticipantSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContestStockSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<ContestStockSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLeaderboardSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<LeaderboardSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMessageSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<MessageSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContestStockFeedSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<ContestStockFeedSearchFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};

export type SearchInfo = {
  __typename?: 'SearchInfo';
  totalHits: Scalars['Int']['output'];
};

export type StringSearchFilterInput = {
  ALL?: InputMaybe<Array<StringSearchFilterInput>>;
  ANY?: InputMaybe<Array<StringSearchFilterInput>>;
  NONE?: InputMaybe<Array<StringSearchFilterInput>>;
  NOT?: InputMaybe<StringSearchFilterInput>;
  eq?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String']['output'];
  email: Scalars['String']['output'];
  profileImage: Scalars['String']['output'];
  participants?: Maybe<ParticipantConnection>;
  leaderboard?: Maybe<LeaderboardConnection>;
  message?: Maybe<MessageConnection>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** when the model was created */
  createdAt: Scalars['DateTime']['output'];
};


export type UserParticipantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderByInput>;
};


export type UserLeaderboardArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderByInput>;
};


export type UserMessageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderByInput>;
};

export type UserByInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};

export type UserCollectionFilterInput = {
  id?: InputMaybe<IdCollectionFilterInput>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
};

/** Input to create a User */
export type UserCreateInput = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
  participants?: InputMaybe<Array<InputMaybe<ParticipantToUserCreateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<LeaderboardToUserCreateLeaderboardRelation>>>;
  message?: InputMaybe<Array<InputMaybe<MessageToUserCreateMessageRelation>>>;
};

export type UserCreateManyInput = {
  input: UserCreateInput;
};

export type UserCreateManyPayload = {
  __typename?: 'UserCreateManyPayload';
  userCollection: Array<User>;
};

export type UserCreatePayload = {
  __typename?: 'UserCreatePayload';
  user?: Maybe<User>;
};

export type UserDeleteManyInput = {
  by: UserByInput;
};

export type UserDeleteManyPayload = {
  __typename?: 'UserDeleteManyPayload';
  deletedIds: Array<Scalars['ID']['output']>;
};

export type UserDeletePayload = {
  __typename?: 'UserDeletePayload';
  deletedId: Scalars['ID']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  node: User;
  cursor: Scalars['String']['output'];
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

export type UserSearchConnection = {
  __typename?: 'UserSearchConnection';
  pageInfo: PageInfo;
  searchInfo?: Maybe<SearchInfo>;
  edges: Array<UserSearchEdge>;
};

export type UserSearchEdge = {
  __typename?: 'UserSearchEdge';
  node: User;
  cursor: Scalars['String']['output'];
  score: Scalars['Float']['output'];
};

export type UserSearchFilterInput = {
  ALL?: InputMaybe<Array<UserSearchFilterInput>>;
  ANY?: InputMaybe<Array<UserSearchFilterInput>>;
  NONE?: InputMaybe<Array<UserSearchFilterInput>>;
  NOT?: InputMaybe<UserSearchFilterInput>;
  createdAt?: InputMaybe<DateTimeSearchFilterInput>;
  email?: InputMaybe<StringSearchFilterInput>;
  profileImage?: InputMaybe<StringSearchFilterInput>;
  updatedAt?: InputMaybe<DateTimeSearchFilterInput>;
  username?: InputMaybe<StringSearchFilterInput>;
};

/** Input to update a User */
export type UserUpdateInput = {
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<Array<InputMaybe<ParticipantToUserUpdateParticipantRelation>>>;
  leaderboard?: InputMaybe<Array<InputMaybe<LeaderboardToUserUpdateLeaderboardRelation>>>;
  message?: InputMaybe<Array<InputMaybe<MessageToUserUpdateMessageRelation>>>;
};

export type UserUpdateManyInput = {
  by: UserByInput;
  input: UserUpdateInput;
};

export type UserUpdateManyPayload = {
  __typename?: 'UserUpdateManyPayload';
  userCollection: Array<User>;
};

export type UserUpdatePayload = {
  __typename?: 'UserUpdatePayload';
  user?: Maybe<User>;
};
