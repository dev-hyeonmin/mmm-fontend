import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import { Link } from "react-router-dom";

interface IForm {
    email: string;
    password: string;
}

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`;

export const Login = () => {    
    const onCompleted = async (data: loginMutation) => {
        const {
            login: { ok, token }
        } = data;
        
        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            
            isLoggedInVar(true);
            authTokenVar(token);
        }
    };
    
    const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<IForm>({ mode: 'onChange' });
    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted
    });
    
    const onSubmit = () => {
        const { email, password } = getValues();
        loginMutation({
            variables: {
                loginInput: {
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
                    <h3>Hello 😎</h3>
                    <h6>Please enter your detail.</h6>

                    <dl>
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
                    
                    {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult?.login.error}/>}
                    <Button
                        loading={loading}
                        canClick={isValid}
                        actionText="Login"
                    />
                </form>

                <div className="tag-create_account">
                    Don't have an account?
                    <Link to="/create-account">Sign up</Link>
                </div>
            </div>

            <div className="box">
                <span className="circle"></span>
                <span className="blur"></span>
            </div>
        </div>
    )
};