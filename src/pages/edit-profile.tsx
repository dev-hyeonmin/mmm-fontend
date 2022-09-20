import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { EDITPROFILE_MUTATION } from "../mutations";
import { createAccountMutation } from "../__generated__/createAccountMutation";
import { editProfileMutation, editProfileMutationVariables } from "../__generated__/editProfileMutation";

interface IForm {
    name?: string;
    email?: string;
    password?: string;
}

export const EditProfile = () => {  
    const navigation = useNavigate();
    const onCompleted = async (data: editProfileMutation) => {
        const {
            editProfile: { ok }
        } = data;
        
        if (ok) {      
            alert("Edit profile success!");
            isLoggedInVar(false);
            authTokenVar('');
            navigation("/");
        }
    };
    
    const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<IForm>({ mode: 'onChange' });
    const [editProfileMutation, { loading }] = useMutation<editProfileMutation, editProfileMutationVariables>(EDITPROFILE_MUTATION, {
        onCompleted
    });
    
    const onSubmit = () => {
        const { name, email, password } = getValues();
        editProfileMutation({
            variables: {
                editProfileInput: {
                    name,
                    email,
                    password
                }
            },
        });
    };

    return (
        <div className="wrapper-login">
            <div className="box">                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Edit Profile 🌟</h3>
                    <dl>
                        <dt>name</dt>
                            <dd>
                            <input
                                type="name" 
                                placeholder="name"
                                {...register("name")}
                            />
                        </dd>

                        <dt>password</dt>
                        <dd>
                            <input
                                type="password" 
                                placeholder="password"
                                {...register("password", { minLength: 4 })}
                            />
                            {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 4 chars." />}
                        </dd>
                    </dl>
                    
                    
                    <Button
                        loading={loading}
                        canClick={isValid}
                        actionText="Edit Profile"
                    />
                </form>
            </div>

            <div className="box">
                <span className="circle"></span>
                <span className="blur"></span>
            </div>
        </div>
    )
};