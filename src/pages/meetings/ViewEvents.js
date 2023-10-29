import React from "react";
import { Dialog } from "primereact/dialog";
import { AiOutlineCalendar } from "react-icons/ai";

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
  setViewUsersSidebar,
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
    const startTimeMoment = moment(eventsData.formattedStartTime, "hh:mm A");
    const endTimeMoment = moment(eventsData.formattedEndTime, "hh:mm A");
    setValue("eventTitle", eventsData.title);
    setValue("startTime", startTimeMoment.format("HH:mm"));
    setValue("endTime", endTimeMoment.format("HH:mm"));
    setValue("selectedDate", eventsData.start);
    setValue("timezone", eventsData.timezone);
    setAddEventSidebar(true);
    setEventEditMode(true);
  };

  const viewEventsHeader = (
    <div className="flex justify-content-end align-items-center">
        <div className="flex align-items-center">
                <i className="pi pi-user px-2 m-1 cursor-pointer" size="1.2rem" onClick={() => setViewUsersSidebar(true)} />

                <i className="pi pi-user-plus px-2 m-1 cursor-pointer" size="1.2rem" onClick={() => setAddUserSidebar(true)} />

                <i className="pi pi-pencil px-2 m-1 cursor-pointer" size="1.2rem" onClick={handleEditEvent} />

                <i className="pi pi-trash px-2 m-1 cursor-pointer" size="1.2rem" onClick={handleDeleteEvent} />

                <i
                    className="pi pi-times px-2 m-1 cursor-pointer"
                    size="1.2rem"
                    onClick={() => {
                        setViewEvent(false);
                        reset();
                        setEventsData([]);
                    }}
                />
        </div>
    </div>
);

  return (
    <div>
      <Dialog
        closable={false}
        header={viewEventsHeader}
        dismissableMask={true}
        visible={viewEvent}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw", "400px": "90vw" }}
        onHide={() => {
          setViewEvent(false);
          reset();
          setEventsData([]);
        }}
      >
        <div className="calander-dialog ">
          <div className="flex align-items-baseline mb-3 pl-3">
            <div className="calander-box "></div>
            <div className="text-2xl font-bold pb-2 pl-4">
              {eventsData.title}
            </div>
          </div>
          <div className="flex align-items-center mb-3 pl-3">
            <div>
              <AiOutlineCalendar size="17px" className="mr-4" />
            </div>
            <div>
              {eventsData.start && (
                <span>{eventsData.start.toDateString()}</span>
              )}
            </div>
          </div>
          <div className="flex align-items-center mb-3 pl-3">
            <div>
              <i className="pi pi-clock mr-4 " />
            </div>
            <div>
              {eventsData.formattedStartTime} - {eventsData.formattedEndTime}
            </div>
          </div>
          <div className="flex align-items-center mb-2 pl-3">
            <div>
              <i className="pi pi-user mr-4" />
            </div>
            <div>
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => setViewUsersSidebar(true)}
              >
                {invitedUsers.length} Invitees
              </span>{" "}
              <i
                className="pi pi-user-plus ml-3 cursor-pointer"
                onClick={() => setAddUserSidebar(true)}
              />
            </div>
          </div>

          <div className="flex align-items-baseline mb-2 pl-3">
            <i className="pi pi-sliders-h mr-4 " />
            <div dangerouslySetInnerHTML={{ __html: eventsData.description }} />
          </div>
          <div className="flex align-items-baseline mb-3 pl-3 mt-1">
            <i className="pi pi-user-edit mr-4  text-xl" />
            <div>
              Created By : <span className="font-bold">{eventsData.name}</span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewEvents;
