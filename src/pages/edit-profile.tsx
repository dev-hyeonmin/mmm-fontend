import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { GoBack } from "../components/goBack";
import { SERVER_URL } from "../constants";
import { useMe } from "../hooks/useMe";
import { EDITPROFILE_MUTATION } from "../mutations";
import { editProfileMutation, editProfileMutationVariables } from "../__generated__/editProfileMutation";

interface IForm {
    name?: string;
    email?: string;
    password?: string;
    checkPassword?: string;
    file?: FileList;
}

interface IUserImage {
    src: string;
}

const UserImage = styled.div<IUserImage>`
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    vertical-align: middle;
    margin-right: 10px;
    background-color: ${props => props.src ? "transparent" : "#66367F"};
    background-image: url(${props => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const EditProfile = () => {  
    const { data: userData } = useMe();
    const navigation = useNavigate();
    const [userImageName, setUserImageName] = useState('');
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
    
    const onSubmit = async () => {
        const { file, name, email, password, checkPassword } = getValues();
        let userImage = "";
        // await fetch("http://localhost:4000/uploads/delete", {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         fileName: userData?.me.userImage
        //     })
        // })
        
        if (file) {
            const actualFile = file[0];
            const formBody = new FormData();
            formBody.append("file", actualFile);
            const { url: coverImg } = await (
                await fetch(`http://${SERVER_URL}/uploads`, {
                    method: "POST",
                    body: formBody,
                })
            ).json();
            userImage = coverImg;
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
                    <GoBack />
                    <h3>Edit Profile 🌟</h3>
                    <dl>
                        <dt>profile image</dt>
                        <dd className="file">
                            <UserImage src={userData?.me.userImage} />
                            <label htmlFor="userImage">
                                <span>UPLOAD FILE</span> <br/>
                                {userImageName}
                                <input
                                    id="userImage"
                                    type="file"                                
                                    accept="image/*"
                                    {...register("file", {onChange: getFileName})}
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