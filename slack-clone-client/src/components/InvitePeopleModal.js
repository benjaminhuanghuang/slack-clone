// https://react.semantic-ui.com/modules/modal#modal-example-modal
/*
    This componenet will save data into table "member", which is a join table between user and user
*/
import React from 'react'
import { Form, Button, Header, Modal, Input } from 'semantic-ui-react'
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';

import { allTeamQuery } from '../graphql/team';

import normalizeError from '../normaliazeErrors';
import normaliazeErrors from '../normaliazeErrors';

const InvitePeopleModal = ({ open, onClose,
    values, handleChange, handleBlur, handleSubmit,
    isSubmitting, touched, errors }) => (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Add People to Team </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Input name='email' value={values.name} fluid placeholder="User's email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Field>
                    {touched.email && errors.email ? errors.email[0] : null}
                    <Form.Group width="equal">
                        <Button fluid onClick={onClose} disabled={isSubmitting}> Cancel </Button>
                        <Button fluid disabled={isSubmitting} onClick={handleSubmit}> Add User  </Button>
                    </Form.Group>
                </Form>
            </Modal.Content>
        </Modal>
    )
const addTeamMemberMutation = gql`
    mutation($email: String!, $teamId: Int!){
        addTeamMember(email: $email, teamId: $teamId){
            ok
            error{
                path,
                message
            }
        }
    }
`;

export default compose(
    graphql(addTeamMemberMutation),
    withFormik({
        mapPropsToValues: () => ({ email: '' }),
        handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting, setErrors }) => {
            const response = await mutate({
                variables: { teamId, email: values.email },
            });
            // console.log(response);
            const { ok, errors } = response.data.addTeamMember;
            if (ok) {
                onClose();
                setSubmitting(false);
            }
            else {
                setSubmitting(false);
                setErrors(normaliazeErrors(errors));
            }
        },
    }),
)(InvitePeopleModal);
