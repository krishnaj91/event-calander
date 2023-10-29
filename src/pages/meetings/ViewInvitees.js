import { Button } from 'primereact/button';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ViewInvitees = ({
    invitedUsers,
    setViewUsersSidebar,
    setInvitedUsers,
    setSelectedUser,
    setAddUserSidebar,
    setUserEdit,
}) => {
    const nameColumn = (users) => {
        return (
            <div>
                {users.firstName} {users.lastName}
            </div>
        );
    };

    const optionsColumn = (users) => {
        return (
            <div className="flex justify-content-between align-items-center gap-4">
                <div className="flex align-items-center">
                    <i
                        className="pi pi-pencil font-bold mr-3 cursor-pointer"
                        onClick={() => {
                            setSelectedUser(users);
                            setAddUserSidebar(true);
                            setUserEdit(true);
                        }}
                    />
                    <i
                        className="pi pi-trash font-bold ml-3 cursor-pointer"
                        onClick={() => setInvitedUsers((currentUsers) => currentUsers.filter((u) => u.id !== users.id))}
                    />
                </div>
            </div>
        );
    };

    const handleViewSidebarClose = () => {
        setViewUsersSidebar(false);
    };

    
    return (
        <div className="h-screen">
            <div className="w-full overflow-hidden">
                <div className="flex justify-content-between align-items-center surface-300 p-3 mb-3">
                    <div className="flex align-items-center">
                        <i
                            className="pi pi-arrow-left mx-2 p-2 border-circle bg-blue-500 text-50 cursor-pointer"
                            onClick={handleViewSidebarClose}
                        />

                        <div className="fs-4 font-bold">View Users</div>
                    </div>
                    <div>
                        <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={handleViewSidebarClose} />
                    </div>
                </div>
            </div>
            <div className="flex-wrap p-fluid overflow-y-auto w-full p-3">
                <div className="flex justify-content-center mt-5">
                    <DataTable
                        value={invitedUsers}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15]}
                        className="w-11"
                    >
                        <Column body={nameColumn} header="Name" className="w-2 py-2 pr-2"></Column>
                        <Column field="email" header="Email" className="w-2 py-2 pr-2"></Column>
                        <Column field="phoneNumber" header="Phone" className="w-2 py-2 pr-2"></Column>
                        <Column body={optionsColumn} header="Options" className="w-1 py-2 pr-2"></Column>
                    </DataTable>
                </div>
            </div>
            <div className="fixed bottom-0 surface-300 w-9">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                    <Button label="CLOSE" onClick={handleViewSidebarClose} className="company-secondary-btn" />
                </div>
            </div>
        </div>
    );
};

export default ViewInvitees;
