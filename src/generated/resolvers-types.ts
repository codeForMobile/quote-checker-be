import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type DataPoint = {
  __typename?: 'DataPoint';
  date: Scalars['Date']['output'];
  value: Scalars['Int']['output'];
};

export type Lookup = {
  __typename?: 'Lookup';
  revenue: Array<DataPoint>;
  symbol: Scalars['String']['output'];
};


export type LookupRevenueArgs = {
  resolutions: Resolution;
};

export type Mutation = {
  __typename?: 'Mutation';
  quote: QuoteResult;
};


export type MutationQuoteArgs = {
  symbol: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  lookup: Lookup;
};


export type QueryLookupArgs = {
  symbol: Scalars['String']['input'];
};

export type QuoteResult = {
  __typename?: 'QuoteResult';
  change: Scalars['Float']['output'];
  changePercent: Scalars['Float']['output'];
  companyName: Scalars['String']['output'];
  delayedPrice: Scalars['Float']['output'];
  peRatio?: Maybe<Scalars['Float']['output']>;
  previousClose: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
};

export enum Resolution {
  Annual = 'annual',
  Quarterly = 'quarterly'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DataPoint: ResolverTypeWrapper<DataPoint>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Lookup: ResolverTypeWrapper<Lookup>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  QuoteResult: ResolverTypeWrapper<QuoteResult>;
  Resolution: Resolution;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  DataPoint: DataPoint;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Lookup: Lookup;
  Mutation: {};
  Query: {};
  QuoteResult: QuoteResult;
  String: Scalars['String']['output'];
}>;

export type DataPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataPoint'] = ResolversParentTypes['DataPoint']> = ResolversObject<{
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LookupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lookup'] = ResolversParentTypes['Lookup']> = ResolversObject<{
  revenue?: Resolver<Array<ResolversTypes['DataPoint']>, ParentType, ContextType, RequireFields<LookupRevenueArgs, 'resolutions'>>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  quote?: Resolver<ResolversTypes['QuoteResult'], ParentType, ContextType, RequireFields<MutationQuoteArgs, 'symbol'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  lookup?: Resolver<ResolversTypes['Lookup'], ParentType, ContextType, RequireFields<QueryLookupArgs, 'symbol'>>;
}>;

export type QuoteResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuoteResult'] = ResolversParentTypes['QuoteResult']> = ResolversObject<{
  change?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  changePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  delayedPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  peRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  previousClose?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DataPoint?: DataPointResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Lookup?: LookupResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuoteResult?: QuoteResultResolvers<ContextType>;
}>;

