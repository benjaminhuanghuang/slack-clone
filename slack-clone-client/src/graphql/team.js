import gql from 'graphql-tag';

export const allTeamQuery = gql`
{
  allTeams {
    id
    owner
    name
    admin
    directMessageMembers{
      id
      username
    }
    channels {
      id
      name
    }
  }
  inviteTeams {
    id
    owner
    name
    channels {
      id
      name
    }
  }
}
`;