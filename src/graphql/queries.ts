import gql from 'graphql-tag'

export const userExistsQuery = gql`
query userSearch($filter: UserSearchFilterInput){
    userSearch(filter: $filter, first: 1){
        edges{
            node{
                username
                email
                profileImage
                id
                updatedAt
                createdAt
            }
        }
    }
}
`;

export const activeContestQuery = gql`
query contestSearch($filter: ContestSearchFilterInput){
    contestSearch(filter:$filter,first:1){
      edges{
        node{
          id
          name
          description
          status
          maxParticipants
          contestDate
        }
      }
  }
}
`;

export const getContestStockFeedByContestIdQuery = gql`
query contestStockFeedSearch($filter: ContestStockFeedSearchFilterInput){
    contestStockFeedSearch(filter:$filter,first:1){
      edges{
        node{
          id
          stockFeed
        }
      }
  }
}
`;

export const getContestStockByContestIdQuery = gql`
query contestStockSearch($filter: ContestStockSearchFilterInput){
    contestStockSearch(filter:$filter,first:10){
      edges{
        node{
            stockCode
            stockDescription
            stockImage
            stockPrice
            contestId
            id
        }
      }
  }
}
`;

export const getLeaderboardByContestIdQuery = gql`
query participantSearch($filter: ParticipantSearchFilterInput){
    participantSearch(filter:$filter,first:100){
      edges{
        node{
            user {
                id
                profileImage
                username
            }
            balanceAmount
            stockCode
            stockUnitBuyPrice
            betType
            stockUnits
            id
        }
      }
  }
}
`;

export const getMessagesByContestIdQuery = gql`
query messageSearch($filter: MessageSearchFilterInput){
    messageSearch(filter:$filter,first:100){
      edges{
        node{
            body
            user {
                username
                id
            }
            msgDateTime
            id
        }
      }
  }
}
`;

export const getNewMessageQuery = gql`
query messageCollection($filter: MessageCollectionFilterInput) @live {
    messageCollection(filter:$filter,first:1){
      edges{
        node{
            body
            user {
                username
                id
            }
            msgDateTime
            id
        }
      }
  }
}
`;
