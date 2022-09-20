import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectInviteGroupAtom } from "../../atom";
import { Button } from "../button";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import { inviteGroupMemberMutation, inviteGroupMemberMutationVariables } from "../../__generated__/inviteGroupMemberMutation";
import { UseType } from "../../__generated__/globalTypes";
// @ts-ignore
import viewerImg from "../../images/permission-viewer.png";
// @ts-ignore
import editorImg from "../../images/permission-editor.png";

interface IForm {
    email: string;
    useType: UseType;
}
interface IPermissionProps {
    src: any;
}

const INVITEGROUPMEMBER_MUTATION = gql`
    mutation inviteGroupMemberMutation ($inviteGroupMemberInput: InviteGroupMemberInput!) {
        inviteGroupMember(input: $inviteGroupMemberInput) {
            ok
            error
        }
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    transform: translate(-50%, -50%);
    border-radius: 7px;
    padding: 30px 40px;
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0,0,0,0.1);
    z-index: 9;

    h3 {
        font-size: 16px;
        font-weight: 400;
    }

    p {
        line-height: 20px;
        margin-top: 10px;
        color: #777;
    }
`;

const Form = styled.dl`
    margin-top: 30px; 
    dt {
        color: #4c5158;
    }

    dd {
        margin: 5px 0 15px;
        input {
            height: 40px;
            border-radius: 3px;
            padding: 0 10px;
        }

        input[type='radio'] {
            display: none;
        }

        input[type='radio']:checked+label {
            border: 1px solid #FF8FB1;
            color: #4c5158
        }
    }
`;

const Buttons = styled.div`
    margin-top: 30px;

    button {
        width: calc(50% - 3px);
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        border-radius: 2px;
        vertical-align: middle;
        
        &:nth-child(1) {
            background-color:#fff;
            color:#777;
            border: 1px solid #ddd;
        }
        &:nth-child(2) {
            margin-left: 5px;
        }
    }
`;

const Permission = styled.label<IPermissionProps>`
    display: inline-block;
    width: calc(50% - 2.5px);
    height: 130px;
    line-height: 200px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 3px;
    margin: 4px 0 0;
    color: #999;
    transition: all 0.2s ease;
    background-image: url(${props=>props.src});
    background-size: 50px;
    background-position: center 20px;
    background-repeat: no-repeat;

    &:nth-child(4) {
        margin-left: 5px;
    }
`;

export const InvitedMemo: React.FC = () => {
    
    const selectInviteGroup = useRecoilValue(selectInviteGroupAtom);
    const setSelectInviteGroup = useSetRecoilState(selectInviteGroupAtom);
    const onCompleted = (data: inviteGroupMemberMutation) => {
        const {
            inviteGroupMember: { ok, error }
        } = data;

        if (ok) {
            alert("Invite success.");
            setSelectInviteGroup({
                id: null
            });
        } else {
            alert(error);
        }
    };
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<IForm>({ mode: 'onChange' });
    const [inviteGroupMemberMutation, { loading }] = useMutation<inviteGroupMemberMutation, inviteGroupMemberMutationVariables>(INVITEGROUPMEMBER_MUTATION, {
        onCompleted
    });

    const onSubmit = () => {
        if (!selectInviteGroup.id) { return; }
        const { email, useType } = getValues();
    
        inviteGroupMemberMutation({
            variables: {
                inviteGroupMemberInput: {
                    groupId: selectInviteGroup.id,
                    inviteEmail: email,
                    useType
                }
            }
        })
    };

    const closeModal = () => {
        setSelectInviteGroup({
            id: null
        });
    };

    return (
        <>
            { selectInviteGroup.id &&
                <Modal>
                    <h3>Invite group member</h3>
                    <p>
                        You haved a great memo note! <br />
                        Invite your memo's group to share.
                    </p>
                
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form>
                            <dt>Permission</dt>
                            <dd>
                                <input
                                    {...register("useType", { required: true })}
                                    type="radio"
                                    value={UseType.Viewer}
                                    id={`useType_${UseType.Viewer}`}
                                />
                                <Permission
                                    src={viewerImg}
                                    htmlFor={`useType_${UseType.Viewer}`}>{UseType.Viewer}</Permission>

                                <input
                                    {...register("useType", { required: true })}
                                    type="radio"
                                    value={UseType.Editor}
                                    id={`useType_${UseType.Editor}`}
                                />
                                <Permission
                                    src={editorImg}
                                    htmlFor={`useType_${UseType.Editor}`}>{UseType.Editor}</Permission>

                                {errors.useType?.type === "required" && <FormError errorMessage="Permission is required." />}
                            </dd>

                            <dt>Email</dt>
                            <dd>
                                <input
                                    type="email" 
                                    placeholder="email@gmail.com"
                                    {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                                />

                                {errors.email?.type === "required" && <FormError errorMessage="Email is required." />}
                                {errors.email?.type === "pattern" && <FormError errorMessage="Please enter a valid email." />}
                            </dd>
                        </Form>

                        <Buttons>
                            <button type="button" onClick={closeModal}>Cancel</button>
                            <Button
                                actionText="Send invites"
                                loading={loading}
                            />
                        </Buttons>
                    </form>
                </Modal>
            }
        </>
    )
    
}
