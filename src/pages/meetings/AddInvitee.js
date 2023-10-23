import React from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import CustomInputText from '../../components/controls/CustomInputText';

const AddInvitee = ({ setAddUserSidebar, setInvitedUsers, invitedUsers, selectedUser, userEdit,setUserEdit }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    const handleAddUser = (data) => {
        const newData = [...invitedUsers, data];
        setInvitedUsers(newData);
        setAddUserSidebar(false);
    };

    const handleAddInviteeClose = ()=>{
        setAddUserSidebar()
        reset();
        setUserEdit(false)
    }
    useEffect(()=>{
        if(userEdit){
            setValue('firstName',selectedUser.firstName)
            setValue('lastName',selectedUser.lastName)
            setValue('phoneNumber',selectedUser.phoneNumber)
            setValue('email',selectedUser.email)
        }
    })

    let required = false;
    return (
        <div className=''>
            <div className="w-full">
                <div className="w-full flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
                    <div className="flex align-items-center w-12">
                        <i
                            className="pi pi-arrow-left mx-2 p-2 border-circle company-primary-background text-50 cursor-pointer"
                            onClick={handleAddInviteeClose}
                        />
                        {userEdit ? (
                            <div className="fs-4 font-bold">Edit User</div>
                        ) : (
                            <div className="fs-4 font-bold">Add User</div>
                        )}
                    </div>
                    <div>
                        <i
                            className="pi pi-times p-1 rounded cursor-pointer"
                            onClick={handleAddInviteeClose}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-wrap  p-fluid  p-3 ">
                <div>
                    <div className="md:flex">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            required={required}
                            name="firstName"
                            labelId="First Name"
                            className="md:col-6 sm:col-12"
                        />
                        <CustomInputText
                            control={control}
                            errors={errors}
                            required={required}
                            name="lastName"
                            labelId="Last Name"
                            className="md:col-6 sm:col-12"
                        />
                    </div>
                    <div className="md:flex">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            required={required}
                            name="phoneNumber"
                            labelId="Phone Number"
                            className="md:col-6 sm:col-12"
                        />
                        <CustomInputText
                            control={control}
                            errors={errors}
                            required={required}
                            name="email"
                            labelId="Email"
                            className="md:col-6 sm:col-12"
                        />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 company-secondary-background w-9">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                    <Button
                        label="CANCEL"
                        onClick={handleAddInviteeClose}
                        icon="pi pi-times"
                        className="company-secondary-btn"
                    />

                  

                    <Button
                        label={userEdit ? 'UPDATE' : 'ADD'}
                        onClick={userEdit ? '' : handleSubmit(handleAddUser)}
                        icon="pi pi-check"
                        className="company-primary-btn"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddInvitee;
