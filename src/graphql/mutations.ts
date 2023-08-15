import gql from 'graphql-tag'

export const createNewUser = gql`
mutation userCreate($input: UserCreateInput!){
    userCreate(input: $input){
        user{
            username
            email
            profileImage
            id
            updatedAt
            createdAt
        }
    }
}
`;

export const createParticipantMutation = gql`
mutation participantCreate($input: ParticipantCreateInput!){
    participantCreate(input: $input){
        participant{
            userId
            contestId
            balanceAmount
            stockUnits
            betType
            stockUnitBuyPrice
            stockCode
            id
            user {
                profileImage
                username
                id
            }

        }
    }
}
`;

export const updateParticipantMutation = gql`
mutation participantUpdate($input: ParticipantUpdateInput!,$by: ParticipantByInput!){
    participantUpdate(input: $input, by: $by){
        participant{
            userId
            contestId
            balanceAmount
            stockUnits
            betType
            stockUnitBuyPrice
            stockCode
            id
            user {
                profileImage
                username
                id
            }

        }
    }
}
`;

export const createContestStockMutation = gql`
mutation contestStockCreate($input: ContestStockCreateInput!){
    contestStockCreate(input: $input){
        contestStock{
            id
        }
    }
}
`;

export const createContestStockFeedMutation = gql`
mutation contestStockFeedCreate($input: ContestStockFeedCreateInput!){
    contestStockFeedCreate(input: $input){
        contestStockFeed{
            id
        }
    }
}
`;

export const updateContestStockFeedMutation = gql`
mutation contestStockFeedUpdate($input: ContestStockFeedUpdateInput!,$by: ContestStockFeedByInput!){
    contestStockFeedUpdate(input: $input, by: $by){
        contestStockFeed{
            id
            stockFeed
        }
    }
}

`;

export const createContestMutation = gql`
mutation contestCreate($input: ContestCreateInput!){
    contestCreate(input: $input){
        contest{
            name
            description
            status
            maxParticipants
            contestDate
            id
        }
    }
}
`;

export const updateContestMutation = gql`
mutation contestUpdate($input: ContestUpdateInput!,$by: ContestByInput!){
    contestUpdate(input: $input, by: $by){
        contest{
            id
        }
    }
}
`;

export const createMessageMutation = gql`
mutation messageCreate($input: MessageCreateInput!){
    messageCreate(input: $input){
        message{
            body
            user {
                username
                id
            }
            msgDateTime
            userId
            createdAt
            
        }
    }
}
`;
