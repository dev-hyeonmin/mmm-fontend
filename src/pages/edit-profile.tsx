import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { EDITPROFILE_MUTATION } from "../mutations";
import { editProfileMutation, editProfileMutationVariables } from "../__generated__/editProfileMutation";

interface IForm {
    name?: string;
    email?: string;
    password?: string;
    checkPassword?: string;
    file?: FileList;
}

export const EditProfile = () => {  
    const navigation = useNavigate();
    const [userImage, setUserImage] = useState('');
    const [userImageName, setUserImageName] = useState('');
    const onCompleted = async (data: editProfileMutation) => {
        const {
            editProfile: { ok }
        } = data;
        
        if (ok) {      
            alert("Edit profile success!");
            // isLoggedInVar(false);
            // authTokenVar('');
            // navigation("/");
        }
    };
    
    const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<IForm>({ mode: 'onChange' });
    const [editProfileMutation, { loading }] = useMutation<editProfileMutation, editProfileMutationVariables>(EDITPROFILE_MUTATION, {
        onCompleted
    });
    
    const onSubmit = async () => {
        const { file, name, email, password, checkPassword } = getValues();

        if (file) {
            const actualFile = file[0];
            const formBody = new FormData();
            formBody.append("file", actualFile);
            const { url: coverImg } = await (
                await fetch("http://localhost:4000/uploads/", {
                    method: "POST",
                    body: formBody,
                })
            ).json();

            setUserImage(coverImg);
        }
        
        if (password) {
            if (password != checkPassword) {
                alert("Please check password!");
                return;
            }
        }

        editProfileMutation({
            variables: {
                editProfileInput: {
                    name,
                    email,
                    password,
                    userImage
                }
            },
        });
    }; 
    
    
    const getFileName = (e: any) => {
        const file = e.target.files[0];
        setUserImageName(file.name);
    }

    return (
        <div className="wrapper-login">
            <Helmet>
                <title>Edit Profile | mmm</title>
            </Helmet>
            <div className="box">                
                <form onSubmit={handleSubmit(onSubmit)}>                    
                    <h3>Edit Profile 🌟</h3>
                    <dl>
                        <dt>profile image</dt>
                        <dd>
                            <label htmlFor="userImage">
                                <span>UPLOAD FILE</span>
                                {userImageName}
                                <input
                                    id="userImage"
                                    type="file"                                
                                    accept="image/*"
                                    {...register("file")}
                                    onChange={getFileName}
                                    />
                            </label>
                        </dd>
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

                        <dt>check password</dt>
                        <dd>
                            <input
                                type="password" 
                                placeholder="check password"
                                {...register("checkPassword", { minLength: 4 })}
                            />
                            {errors.checkPassword?.type === "minLength" && <FormError errorMessage="Password must be more than 4 chars." />}
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