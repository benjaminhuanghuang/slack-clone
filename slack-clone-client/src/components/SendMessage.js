import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'reach-apollo';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;
const ENTER_KEY = 13;

// Send message component
const SendMessage = ({
    channelName,
    values, handleChange, handleBlur, handleSubmit, isSubmitting
}) => (
        <SendMessageWrapper>
            <Input name='message' value={value.message} fluid placeholder={`Message #${channelName}`}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                    if (e.keyCode === ENTER_KEY && !isSubmitting) {
                        handleSubmit();
                    }
                }} />
        </SendMessageWrapper>
    );

const createMessageMutation = gql`
   mutation($channelId: Int!, $text: String!){
       createMessage(channelId: $channelId, text: $text)
   } 
`;

export default compose(
    graphql(createMessageMutation),
    withFormik({
        mapPropsToValues: () => ({ message: '' }),
        handleSubmit: async (values, { props: { channelId, mutate }, setSubmitting, resetForm }) => {
            if (!values.message || !values.message.trim()) {
                setSubmitting(false);
                return;
            }

            const response = await mutate({
                variables: { channelId, text: values.message },
            });
            console.log(response);
            resetForm(false);
        },
    }))(SendMessage);