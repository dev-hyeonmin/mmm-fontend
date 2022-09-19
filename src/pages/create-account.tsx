import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";

interface IForm {
    name: string;
    email: string;
    password: string;
}

const CREATEACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`;

export const CreateAccount = () => {  
    const navigation = useNavigate();
    const onCompleted = async (data: createAccountMutation) => {
        const {
            createAccount: { ok }
        } = data;
        
        if (ok) {      
            alert("Create account success!");
            navigation("/list");
        }
    };
    
    const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<IForm>({ mode: 'onChange' });
    const [createAccountMutation, { data: createAccountMutationResult, loading }] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATEACCOUNT_MUTATION, {
        onCompleted
    });
    
    const onSubmit = () => {
        const { name, email, password } = getValues();
        createAccountMutation({
            variables: {
                createAccountInput: {
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
                    <h3>Create an account 🥳</h3>
                    <h6>Let's get started with you.</h6>

                    <dl>
                        <dt>name</dt>
                            <dd>
                            <input
                                type="name" 
                                placeholder="name"
                                {...register("name", { required: true })}
                            />
                            {errors.name?.type === "required" && <FormError errorMessage="Name is required." />}
                        </dd>

                        <dt>email</dt>
                        <dd>
                            <input
                                type="email" 
                                placeholder="email@gmail.com"
                                {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                            />
                            {errors.email?.type === "required" && <FormError errorMessage="Email is required." />}
                            {errors.email?.type === "pattern" && <FormError errorMessage="Please enter a valid email." />}
                        </dd>

                        <dt>password</dt>
                        <dd>
                            <input
                                type="password" 
                                placeholder="password"
                                {...register("password", { required: true, minLength: 4 })}
                            />
                            {errors.password?.type === "required" && <FormError errorMessage="Password is required." />}
                            {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 4 chars." />}
                        </dd>
                    </dl>
                    
                    {createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult?.createAccount.error}/>}
                    <Button
                        loading={loading}
                        canClick={isValid}
                        actionText="Create Account"
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