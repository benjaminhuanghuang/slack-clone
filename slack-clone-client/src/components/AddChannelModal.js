// https://react.semantic-ui.com/modules/modal#modal-example-modal

import React from 'react'
import { Form, Button, Header, Modal, Input } from 'semantic-ui-react'
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


const AddChannelModal = ({ open, onClose,
    values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Add Channel </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Input name='name' value={values.name} fluid placeholder="Channel Name"
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
        </Modal>
    )
const createChannelMutation = gql`
    mutation($teamId: Int!, $name: String!){
        createChannel(teamId: $teamId, name :$name)
    }
`;

export default compose(
    graphql(createChannelMutation),
    withFormik({
        mapPropsToValues: () => ({ name: '' }),
        handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
            const response = await mutate({ variables: { teamId, name: values.name } });
            console.log(response);
            setSubmitting(false);
            onClose();
        },
    }),
)(AddChannelModal);
