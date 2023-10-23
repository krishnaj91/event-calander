import React from 'react';
import { Dialog } from 'primereact/dialog';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';

const ViewEvents = ({
    viewEvent,
    setViewEvent,
    eventsData,
    setEventsData,
    invitedUsers,
    setEventEditMode,
    setEvents,
    reset,
    setValue,
    moment,
    setAddEventSidebar,
    setAddUserSidebar,
    setInvitedUsers,
    setSelectedUser,
    setUserEdit,
}) => {
    const handleDeleteEvent = () => {
        setEvents((current) =>
            current.filter((meeting) => {
                return meeting.meetingId !== eventsData.meetingId;
            })
        );
        setViewEvent(false);
    };

    const handleEditEvent = () => {
        const startTimeMoment = moment(eventsData.formattedStartTime, 'hh:mm A');
        const endTimeMoment = moment(eventsData.formattedEndTime, 'hh:mm A');
        setValue('eventTitle', eventsData.title);
        setValue('startTime', startTimeMoment.format('HH:mm'));
        setValue('endTime', endTimeMoment.format('HH:mm'));
        setValue('selectedDate', eventsData.start);
        setValue('timezone', eventsData.timezone);
        setAddEventSidebar(true);
        setEventEditMode(true);
    };

    const viewEventsHeader = (
        <div className="flex justify-content-end align-items-center">
            <div className="flex align-items-center">
                <div className=" p-1 me-2 flex align-item-center border-circle cursor-pointer">
                    <FiEdit2 className="m-1" size="1.2rem" onClick={handleEditEvent} />
                </div>

                <div className=" p-1 me-2 flex align-item-center border-circle cursor-pointer">
                    <AiOutlineDelete className="m-1" size="1.2rem" onClick={handleDeleteEvent} />
                </div>
            </div>
        </div>
    );

    const handleDeleteUser = (index) => {
        setInvitedUsers(invitedUsers.filter((_o, i) => index !== i));
    };

    return (
        <div>
            <Dialog
                closeIcon={false}
                header={viewEventsHeader}
                visible={viewEvent}
                style={{ width: '40vw' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' ,'400px': '90vw' }}
                onHide={() => {
                    setViewEvent(false);
                    reset();
                    setEventsData([]);
                }}
            >
                <div className="calander-dialog ">
                    <div className="flex align-items-baseline mb-3 pl-3">
                        <div className="calander-box "></div>
                        <div className="text-2xl font-bold pb-2 pl-4">{eventsData.title}</div>
                    </div>
                    <div className="flex align-items-center mb-3 pl-3">
                        <div>
                            <AiOutlineCalendar size="17px" className="mr-4" />
                        </div>
                        <div>{eventsData.start && <span>{eventsData.start.toDateString()}</span>}</div>
                    </div>
                    <div className="flex align-items-center mb-3 pl-3">
                        <div>
                            <i className="pi pi-clock mr-4 l-fs-16" />
                        </div>
                        <div>
                            {eventsData.formattedStartTime} - {eventsData.formattedEndTime}
                        </div>
                    </div>

                    <div className="flex align-items-baseline mb-3 pl-3">
                        <i className="pi pi-sliders-h mr-4 l-fs-16" />
                        <div dangerouslySetInnerHTML={{ __html: eventsData.description }} />
                    </div>
                    <hr />
                    <div className="pl-3">
                        <div className="flex justify-content-between align-items-center">
                            <p className="font-bold fs-6">Invited users</p>
                            <p
                                className="cursor-pointer bg-blue-800 border-round text-sm p-1 px-2 text-100"
                                onClick={() => setAddUserSidebar(true)}
                            >
                                + Add new
                            </p>
                        </div>
                        <div className="mx-1 h-9rem overflow-y-auto scrollOff">
                            {invitedUsers.map((users, id) => {
                                return (
                                    <div className="flex justify-content-between align-items-center">
                                        <p className='hover:text-orange-500 hover:font-bold'>
                                            {users.firstName} {users.lastName}
                                        </p>
                                        <div className="flex align-items-center gap-3">
                                            <span
                                                className="text-blue-800 font-bold cursor-pointer hover:underline"
                                                onClick={() => handleDeleteUser(id)}
                                            >
                                                Remove
                                            </span>
                                            <span>
                                                <i
                                                    className="pi pi-pencil cursor-pointer text-lg mr-2"
                                                    onClick={() => {
                                                        setSelectedUser(users);
                                                        setAddUserSidebar(true);
                                                        setUserEdit(true)
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            {invitedUsers.length === 0 && <p>No users</p>}
                        </div>
                    </div>
                    <hr />
                    <div className="pl-3 font-bold mt-3">
                        Created By : <span className="fw-bold">{eventsData.name}</span>
                    </div>
                    <br />
                </div>
            </Dialog>
        </div>
    );
};

export default ViewEvents;
