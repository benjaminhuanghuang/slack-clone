// https://react.semantic-ui.com/modules/modal#modal-example-modal

import React from 'react';
import { Form, Button, Modal, Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';

import { allTeamQuery } from '../graphql/team';

const AddChannelModal = ({
  open, onClose,
  values, handleChange, handleBlur, handleSubmit, isSubmitting,
}) => (
  <Modal
    open={open}
    onClose={onClose}
  >
    <Modal.Header>Add Channel </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            name="name"
            value={values.name}
            fluid
            placeholder="Channel Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Group width="equal">
          <Button fluid onClick={onClose} disabled={isSubmitting}> Cancel </Button>
          <Button fluid disabled={isSubmitting} onClick={handleSubmit}> Create Channel </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal >);

const createChannelMutation = gql`
    mutation($teamId: Int!, $name: String!){
        createChannel(teamId: $teamId, name :$name){
            ok
            channel{
                id,
                name
            }
        }
    }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      const response = await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name,
            },
          },
        },
        // Update appollo cache
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          // Read the data from our cache for this query
          const data = store.readQuery({ query: allTeamQuery });
          // console.log(data);
          const teamIdx = findIndex(data.allTeams, ['id', teamId]);
          // Add data from the mutation to the end
          data.allTeams[teamIdx].channels.push(channel);

          // Write data back to the cache
          store.writeQuery({ query: allTeamQuery, data });
        },
      });
      console.log(response);
      setSubmitting(false);
      onClose();
    },
  }),
)(AddChannelModal);
