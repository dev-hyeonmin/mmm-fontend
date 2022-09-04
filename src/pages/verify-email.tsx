import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { verifyEmailMutaion, verifyEmailMutaionVariables } from "../__generated__/verifyEmailMutaion";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";

const VERIFYEMAIL_MUTATION = gql`
    mutation verifyEmailMutaion($verifyEmailInput: VerifyEmailInput!) {
        verifyEmail (input: $verifyEmailInput) {
            ok
            error
        }
    }
`;

export const VerifyEmail = () => {
    const { data: userData } = useMe();
    const client = useApolloClient();
    const onCompleted = (data: verifyEmailMutaion) => {
        const {
            verifyEmail: { ok },
        } = data;
        
        if (ok && userData?.me.id) {
            client.writeFragment({
                id: `User:${userData.me.id}`,
                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,
                data: {
                    verified: true,
                },
            });
        }
    };
    const [verfiyEmail, { loading }] = useMutation<verifyEmailMutaion, verifyEmailMutaionVariables>(VERIFYEMAIL_MUTATION, {
        onCompleted
    });

    useEffect(() => {
        const [, code] = window.location.href.split("code=");
        verfiyEmail({
            variables: {
                verifyEmailInput: {
                    code
                }
            }
        });
    }, []);
    return (
        <div className="wrapper-email">
            {loading ? "Verifing your email." :
                <div className="box-confirm">
                    <img src={require('../images/verified-email.png')} />
                    <h3>Verified!</h3>
                    <p>You have successfully verified account.</p>

                    <Link to="/">OK</Link>
                </div>
            }
        </div>
    )
};