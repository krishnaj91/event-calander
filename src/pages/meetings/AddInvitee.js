import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import CustomInputText from '../../components/controls/CustomInputText';
import { useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import CustomDropdown from '../../components/controls/CustomDropdown';

const AddInvitee = ({
    setAddUserSidebar,
    handleId,
    id,
    setInvitedUsers,
    invitedUsers,
    selectedUser,
    userEdit,
    setUserEdit,
}) => {
    const [type, setType] = useState('single');


    const options = [
        {
            value: [
                { id: 61, firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', email: 'john.doe@gmail.com' },
                {
                    id: 62,
                    firstName: 'Jane',
                    lastName: 'Smith',
                    phoneNumber: '9876543210',
                    email: 'jane.smith@gmail.com',
                },
                {
                    id: 63,
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    phoneNumber: '5551234567',
                    email: 'alice.johnson@gmail.com',
                },
                {
                    id: 64,
                    firstName: 'Bob',
                    lastName: 'Williams',
                    phoneNumber: '5559876543',
                    email: 'bob.williams@gmail.com',
                },
                {
                    id: 65,
                    firstName: 'Charlie',
                    lastName: 'Brown',
                    phoneNumber: '6665554321',
                    email: 'charlie.brown@gmail.com',
                },
                {
                    id: 66,
                    firstName: 'David',
                    lastName: 'Jones',
                    phoneNumber: '6669876543',
                    email: 'david.jones@gmail.com',
                },
            ],
            label: 'ALL',
        },
        {
            value: [
                { id: 61, firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', email: 'john.doe@gmail.com' },
                {
                    id: 62,
                    firstName: 'Jane',
                    lastName: 'Smith',
                    phoneNumber: '9876543210',
                    email: 'jane.smith@gmail.com',
                },
            ],
            label: 'ADMINS',
        },
        {
            value: [
                {
                    id: 63,
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    phoneNumber: '5551234567',
                    email: 'alice.johnson@gmail.com',
                },
                {
                    id: 64,
                    firstName: 'Bob',
                    lastName: 'Williams',
                    phoneNumber: '5559876543',
                    email: 'bob.williams@gmail.com',
                },
            ],
            label: 'UI TEAM',
        },
        {
            value: [
                {
                    id: 65,
                    firstName: 'Charlie',
                    lastName: 'Brown',
                    phoneNumber: '6665554321',
                    email: 'charlie.brown@gmail.com',
                },
                {
                    id: 66,
                    firstName: 'David',
                    lastName: 'Jones',
                    phoneNumber: '6669876543',
                    email: 'david.jones@gmail.com',
                },
            ],
            label: 'DEV TEAM',
        },
    ];

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    const handleAddUser = (data) => {
        handleId();
        const userData = {
            id: id,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
        };
        const newData = [...invitedUsers, userData];
        setInvitedUsers(newData);
        setAddUserSidebar(false);
    };

    const handleGroupUser = (data) => {
        const newData = [...invitedUsers, ...data.group];
        setInvitedUsers(newData);
        setAddUserSidebar(false);
    };

    const handleAddInviteeClose = () => {
        setAddUserSidebar();
        reset();
        setUserEdit(false);
    };
    useEffect(() => {
        if (userEdit) {
            setValue('firstName', selectedUser.firstName);
            setValue('lastName', selectedUser.lastName);
            setValue('phoneNumber', selectedUser.phoneNumber);
            setValue('email', selectedUser.email);
        }
    }, [userEdit]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUdateUser = (data) => {
        const updatedUsers = invitedUsers.map((user) => {
            if (user.id === selectedUser.id) {
                return { ...user, ...data };
            } else {
                return user;
            }
        });
        setInvitedUsers(updatedUsers);
        setAddUserSidebar(false);
        reset();
        setUserEdit(false);
    };
    

    return (
        <div className="h-screen">
            <div className="w-full">
                <div className="flex justify-content-between align-items-center surface-300 p-3 mb-3">
                    <div className="flex align-items-center">
                        <i
                            className="pi pi-arrow-left mx-2 p-2 border-circle bg-blue-500 text-50 cursor-pointer"
                            onClick={handleAddInviteeClose}
                        />
                        {userEdit ? (
                            <div className="fs-4 font-bold">Edit User</div>
                        ) : (
                            <div className="fs-4 font-bold">Add User</div>
                        )}
                    </div>
                    <div>
                        <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={handleAddInviteeClose} />
                    </div>
                </div>
            </div>

            <div className="flex-wrap p-fluid w-full p-3">
                {!userEdit && (
                    <div className="flex justify-content-start flex-wrap gap-3 my-3">
                        <div className="flex align-items-center mr-3">
                            <RadioButton
                                inputId="type1"
                                name="single"
                                value="single"
                                onChange={(e) => setType(e.value)}
                                checked={type === 'single'}
                            />
                            <label htmlFor="type1" className="ml-2 font-bold text-xl">
                                Single
                            </label>
                        </div>

                        <div className="flex align-items-center">
                            <RadioButton
                                inputId="type2"
                                name="group"
                                value="group"
                                onChange={(e) => setType(e.value)}
                                checked={type === 'group'}
                            />
                            <label htmlFor="type2" className="ml-2 font-bold text-xl">
                                Group
                            </label>
                        </div>
                    </div>
                )}

                {type === 'single' && (
                    <div>
                        <div className="md:flex">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                required={true}
                                name="firstName"
                                rules={{ required: "First Name is required" }}
                                labelId="First Name"
                                className="md:col-6 sm:col-12"
                            />
                            <CustomInputText
                                control={control}
                                errors={errors}
                                required={true}
                                rules={{ required: "Last Name is required" }}
                                name="lastName"
                                labelId="Last Name"
                                className="md:col-6 sm:col-12"
                            />
                        </div>
                        <div className="md:flex">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                required={true}
                                rules={{ required: "Phone Number is required" }}
                                name="phoneNumber"
                                labelId="Phone Number"
                                className="md:col-6 sm:col-12"
                            />
                            <CustomInputText
                                control={control}
                                errors={errors}
                                required={true}
                                rules={{ required: "Email is required" }}
                                name="email"
                                labelId="Email"
                                className="md:col-6 sm:col-12"
                            />
                        </div>
                    </div>
                )}
                {type === 'group' && (
                    <div>
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="group"
                            labelId="Group"
                            options={options}
                            required={true}
                            rules={{ required: "Please Select a option" }}
                            placeholder="Select a group to add"
                        />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 surface-300 w-9">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                    <Button
                        label="CANCEL"
                        onClick={handleAddInviteeClose}
                        icon="pi pi-times"
                    />
                    {type === 'single' ? (
                        <Button
                            label={userEdit ? 'UPDATE' : 'ADD'}
                            onClick={userEdit ? handleSubmit(handleUdateUser) : handleSubmit(handleAddUser)}
                            icon="pi pi-check"
                        />
                    ) : (
                        <Button
                            label={userEdit ? 'UPDATE' : 'ADD'}
                            onClick={handleSubmit(handleGroupUser)}
                            icon="pi pi-check"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddInvitee;
