import { gql } from '@apollo/client'

export const QUERY_TOP_LEADERBOARD = gql`
  query AccountsTopLeaderboard($first: Int!) {
    farmers: consensus_rewards(
      order_by: { amount: desc }
      limit: $first
      where: {
        _or: [
          { reward_type: { _eq: "Rewards.VoteReward" } }
          { reward_type: { _eq: "Rewards.BlockReward" } }
        ]
      }
    ) {
      id
    }
    # TODO: change this for operators
    operators: consensus_rewards(
      order_by: { amount: desc }
      limit: $first
      where: {
        _or: [
          { reward_type: { _eq: "Rewards.VoteReward" } }
          { reward_type: { _eq: "Rewards.BlockReward" } }
        ]
      }
    ) {
      id
    }
    # TODO: change this for nominators
    nominators: consensus_rewards(
      order_by: { amount: desc }
      limit: $first
      where: {
        _or: [
          { reward_type: { _eq: "Rewards.VoteReward" } }
          { reward_type: { _eq: "Rewards.BlockReward" } }
        ]
      }
    ) {
      id
    }
  }
`

export const QUERY_PENDING_TX = gql`
  query PendingTransaction($subspaceAccount: String, $extrinsics: [String!]) {
    consensus_accounts(where: { id: { _eq: $subspaceAccount } }) {
      id
      extrinsics(where: { hash: { _in: $extrinsics } }) {
        hash
        success
        timestamp
        name
        events(limit: 1, order_by: { id: desc }) {
          name
        }
        block {
          hash
          height
          id
        }
      }
    }
  }
`

export const QUERY_EXTRINSIC_SUMMARY = gql`
  query ExtrinsicsSummary($first: Int!, $subspaceAccount: String) {
    consensus_extrinsics_aggregate(where: { signer: { _eq: $subspaceAccount } }) {
      aggregate {
        count
      }
    }
    extrinsics: consensus_extrinsics(
      order_by: { id: desc }
      limit: $first
      where: { signer: { _eq: $subspaceAccount } }
    ) {
      id
      hash
      success
      timestamp
      block_height
      name
    }
  }
`

export const QUERY_CHECK_ROLES = gql`
  query CheckRole($subspaceAccount: String!) {
    isFarmer: consensus_rewards(
      where: {
        _or: [
          { reward_type: { _eq: "Rewards.VoteReward" } }
          { reward_type: { _eq: "Rewards.BlockReward" } }
        ]
        account_id: { _eq: $subspaceAccount }
      }
      limit: 1
    ) {
      account {
        id
      }
    }
    # TODO: fix this
    #  operator: consensus_rewards(
    #    first: 1
    #    where: { operatorOwner_eq: $subspaceAccount }
    #    orderBy: id_ASC
    #  ) {
    #    totalCount
    #  }
    #  nominator: consensus_rewards(
    #    first: 1
    #    where: { account: { id_eq: $subspaceAccount } }
    #    orderBy: id_ASC
    #  ) {
    #    totalCount
    #  }
  }
`

export const QUERY_STAKING_SUMMARY = gql`
  query StakingSummary($first: Int!, $subspaceAccount: String) {
    staking_operators(
      order_by: { id: asc }
      limit: $first
      where: { account_id: { _eq: $subspaceAccount } }
    ) {
      id
      account_id
      domain_id
      current_total_stake
      current_total_shares
    }
    staking_operators_aggregate(
      order_by: { id: asc }
      where: { account_id: { _eq: $subspaceAccount } }
    ) {
      aggregate {
        count
      }
    }
    staking_nominators(
      order_by: { id: asc }
      limit: $first
      where: { account_id: { _eq: $subspaceAccount } }
    ) {
      id
      known_shares
      known_storage_fee_deposit
      account {
        id
      }
      operator {
        id
        account_id
        domain_id
        current_total_stake
        current_total_shares
      }
    }
    staking_nominators_aggregate(
      order_by: { id: asc }
      where: { account_id: { _eq: $subspaceAccount } }
    ) {
      aggregate {
        count
      }
    }
  }
`
