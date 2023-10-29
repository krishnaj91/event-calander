import React, { useEffect } from "react";
import CustomInputText from "../../components/controls/CustomInputText";
import CustomCalander from "../../components/controls/CustomCalender";
import CustomDropdown from "../../components/controls/CustomDropdown";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import CustomInputMask from "../../components/controls/CustomInputMask";

const AddMeeting = ({
  control,
  errors,
  handleSubmit,
  setEventDescription,
  eventDescription,
  handleAddEventClose,
  setValue,
  data,
  setAddEventSidebar,
  events,
  eventEditMode,
  setSelectedDate,
  setEvents,
  moment,
  eventsData,
  selectedDate,
  handleCreateEvent,
  setViewEvent,
  setEventEditMode,
  setEndTimeErr,
  endTimeErr,
  watch,
}) => {
  const handleTextChange = (e) => {
    setEventDescription(e.htmlValue);
  };
  useEffect(() => {
    if (data.timezone) {
      const currentTimezoneOffset = new Date().getTimezoneOffset();
      const selectedTimezoneOffset =
        parseInt(data.timezone.split(":")[0]) * 60 +
        parseInt(data.timezone.split(":")[1]);
      const timezoneOffsetDifference =
        (selectedTimezoneOffset + currentTimezoneOffset) * 60 * 1000;
      const currentTime = new Date(Date.now() + timezoneOffsetDifference);
      let minutes = currentTime.getMinutes();
      const roundedMinutes = Math.ceil(minutes / 15) * 15;
      const hours = currentTime.getHours().toString().padStart(2, "0");
      minutes =
        roundedMinutes >= 60
          ? "00"
          : roundedMinutes.toString().padStart(2, "0");
      setValue("startTime", `${hours}:${minutes}`);
      const endHours = (currentTime.getHours() + 1).toString().padStart(2, "0");
      setValue("endTime", `${endHours}:${minutes}`);
    }
  }, [data.timezone]); // eslint-disable-line react-hooks/exhaustive-deps

  const cities = [
    {
      name: "(GMT +5:30) Indian Standard Time (IST)",
      timezone_offset: "+05:30",
    },
    { name: "(GMT -12:00) Eniwetok, Kwajalein", timezone_offset: "-12:00" },
    { name: "(GMT -11:00) Midway Island, Samoa", timezone_offset: "-11:00" },
    { name: "(GMT -10:00) Hawaii", timezone_offset: "-10:00" },
    { name: "(GMT -9:30) Taiohae", timezone_offset: "-09:30" },
    { name: "(GMT -9:00) Alaska", timezone_offset: "-09:00" },
    {
      name: "(GMT -8:00) Pacific Time (US & Canada)",
      timezone_offset: "-08:00",
    },
    {
      name: "(GMT -7:00) Mountain Time (US & Canada)",
      timezone_offset: "-07:00",
    },
    {
      name: "(GMT -6:00) Central Time (US & Canada), Mexico City",
      timezone_offset: "-06:00",
    },
    {
      name: "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima",
      timezone_offset: "-05:00",
    },
    { name: "(GMT -4:30) Caracas", timezone_offset: "-04:30" },
    {
      name: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
      timezone_offset: "-04:00",
    },
    { name: "(GMT -3:30) Newfoundland", timezone_offset: "-03:30" },
    {
      name: "(GMT -3:00) Brazil, Buenos Aires, Georgetown",
      timezone_offset: "-03:00",
    },
    { name: "(GMT -2:00) Mid-Atlantic", timezone_offset: "-02:00" },
    {
      name: "(GMT -1:00) Azores, Cape Verde Islands",
      timezone_offset: "-01:00",
    },
    {
      name: "(GMT) Western Europe Time, London, Lisbon, Casablanca",
      timezone_offset: "+00:00",
    },
    {
      name: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris",
      timezone_offset: "+01:00",
    },
    {
      name: "(GMT +2:00) Kaliningrad, South Africa",
      timezone_offset: "+02:00",
    },
    {
      name: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
      timezone_offset: "+03:00",
    },
    { name: "(GMT +3:30) Tehran", timezone_offset: "+03:30" },
    {
      name: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",
      timezone_offset: "+04:00",
    },
    { name: "(GMT +4:30) Kabul", timezone_offset: "+04:30" },
    {
      name: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
      timezone_offset: "+05:00",
    },
    {
      name: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
      timezone_offset: "+05:30",
    },
    { name: "(GMT +5:45) Kathmandu, Pokhara", timezone_offset: "+05:45" },
    { name: "(GMT +6:00) Almaty, Dhaka, Colombo", timezone_offset: "+06:00" },
    { name: "(GMT +6:30) Yangon, Mandalay", timezone_offset: "+06:30" },
    { name: "(GMT +7:00) Bangkok, Hanoi, Jakarta", timezone_offset: "+07:00" },
    {
      name: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
      timezone_offset: "+08:00",
    },
    { name: "(GMT +8:45) Eucla", timezone_offset: "+08:45" },
    {
      name: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
      timezone_offset: "+09:00",
    },
    { name: "(GMT +9:30) Adelaide, Darwin", timezone_offset: "+09:30" },
    {
      name: "(GMT +10:00) Eastern Australia, Guam, Vladivostok",
      timezone_offset: "+10:00",
    },
    { name: "(GMT +10:30) Lord Howe Island", timezone_offset: "+10:30" },
    {
      name: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
      timezone_offset: "+11:00",
    },
    { name: "(GMT +11:30) Norfolk Island", timezone_offset: "+11:30" },
    {
      name: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
      timezone_offset: "+12:00",
    },
    { name: "(GMT +12:45) Chatham Islands", timezone_offset: "+12:45" },
    { name: "(GMT +13:00) Apia, Nukualofa", timezone_offset: "+13:00" },
    { name: "(GMT +14:00) Line Islands, Tokelau", timezone_offset: "+14:00" },
  ];

  const handleUpdateEvent = () => {
    const startMoment = moment(data.startTime, "HH:mm");
    const endMoment = moment(data.endTime, "HH:mm");

    const newState = events.map((obj) => {
      if (obj.meetingId === eventsData.meetingId) {
        return {
          ...obj,
          title: data.eventTitle,
          formattedStartTime: startMoment.format("hh:mm A"),
          formattedEndTime: endMoment.format("hh:mm A"),
          description: eventDescription,
          start: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            startMoment.hour(),
            startMoment.minute()
          ),
          end: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            endMoment.hour(),
            endMoment.minute()
          ),
          timezone: data.timezone,
        };
      }
      return obj;
    });

    if (endMoment.isBefore(startMoment)) {
      setEndTimeErr("EndTime cant't be greater than StartTime");
    } else {
      setEndTimeErr("");
      setEvents(newState);
      setAddEventSidebar(false);
      setViewEvent(false);
      setEventEditMode(false);
      setEventDescription("");
    }
  };

  const validateStartTime = (value, context) => {
    if (!value) {
      return true; // Return true if the field is empty (you can handle this case differently)
    }

    const [hours, minutes] = value.split(":").map(Number);

    // Get the current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (context.isToday) {
      if (
        hours < currentHours || // Hours are earlier than current time
        (hours === currentHours && minutes <= currentMinutes) // Same hour but minutes are earlier
      ) {
        return "Please enter a valid time";
      }
    } else {
      if (
        hours > 24 || // Hours should not exceed 24
        (hours === 24 && minutes > 0) || // Hours are 24, but minutes are greater than 0
        minutes >= 60 // Minutes should not exceed 59
      ) {
        return "Please enter a valid time";
      }
    }

    return true;
  };

  const validateEndTime = (value, context) => {
    if (!value) {
      return true;
    }

    const [hours, minutes] = value.split(":").map(Number);
    const [startHours, startMinutes] = context.startTime.split(":").map(Number);

    // Get the current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (context.isToday) {
      if (
        hours < currentHours || // Hours are earlier than current time
        (hours === currentHours && minutes <= currentMinutes) || // Same hour but minutes are earlier
        hours < startHours || // Hours are earlier than start time
        (hours === startHours && minutes <= startMinutes) // Same hour but minutes are earlier than start time
      ) {
        return "Please enter a valid time";
      }
    } else {
      if (
        hours > 24 || // Hours should not exceed 24
        (hours === 24 && minutes > 0) || // Hours are 24, but minutes are greater than 0
        minutes >= 60 // Minutes should not exceed 59
      ) {
        return "Please enter a valid time";
      }
    }

    return true;
  };
  let required = true;
  return (
    <div>
      <div className="flex justify-content-between align-items-center surface-300 p-3 mb-3">
        <div className="flex align-items-center">
          <i
            className="pi pi-arrow-left mx-2 p-2 border-circle bg-blue-500 text-50 cursor-pointer"
            onClick={handleAddEventClose}
          />
          {eventEditMode ? (
            <div className="text-lg font-bold">Update Meeting</div>
          ) : (
            <div className="text-lg font-bold">Create New Meeting</div>
          )}
        </div>
        <div>
          <i
            className="pi pi-times p-1 border-circle cursor-pointer"
            onClick={handleAddEventClose}
          />
        </div>
      </div>
      <div className="flex-wrap  p-fluid  p-3 mb-5">
        <CustomInputText
          control={control}
          errors={errors}
          name="eventTitle"
          labelId="Title"
          required={required}
          rules={{ required: "Title is required" }}
          autoFocus
          autoComplete="off"
          className="md:col-12"
        />
        <div className="md:flex">
          <CustomCalander
            control={control}
            required={required}
            rules={{ required: "Date is required" }}
            showIcon={true}
            errors={errors}
            minDate={new Date()}
            className="md:col-4 col-12"
            name="selectedDate"
            labelId="Date"
            onChange={(e) => {
              setValue("selectedDate", e.value);
              setSelectedDate(e.value);
            }}
          />
          <CustomInputMask
            control={control}
            errors={errors}
            required={required}
            rules={{
              required: "StartTime is required",
              validate: (value) =>
                validateStartTime(value, {
                  isToday: moment(selectedDate).isSame(moment(), "day"),
                }),
            }}
            placeholder="HH:MM"
            mask="99:99"
            name="startTime"
            labelId="Start Time"
            className="md:col-4 col-12"
          />
          <CustomInputMask
            control={control}
            errors={errors}
            rules={{
              required: "EndTime is required",
              validate: (value) =>
                validateEndTime(value, {
                  isToday: moment(selectedDate).isSame(moment(), "day"),
                  startTime: watch("startTime"),
                }),
            }}
            name="endTime"
            mask="99:99"
            placeholder="HH:MM"
            required={required}
            helpMsg={endTimeErr}
            labelId="End Time"
            className="md:col-4 col-12"
          />
        </div>
        <div className="md:flex">
          <CustomInputText
            control={control}
            errors={errors}
            name="meetingLocation"
            labelId="Meeting Location"
            className="md:col-6 col-12"
          />
          <CustomDropdown
            control={control}
            className="md:col-6 col-12"
            errors={errors}
            options={cities.map((city) => ({
              label: city.name,
              value: city.timezone_offset,
            }))}
            optionLabel="label"
            labelId="Time Zone"
            required={required}
            rules={{ required: "Time Zone is required" }}
            name="timezone"
          />
        </div>
        <div className="col-12">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <Editor
            value={eventDescription}
            name="description"
            onTextChange={handleTextChange}
            style={{ height: "150px" }}
          />
        </div>
        {!eventEditMode && (
          <div>
            <h3>Details</h3>
            <div className="md:flex">
              <CustomInputText
                control={control}
                errors={errors}
                name="firstName"
                labelId="First Name"
                className="md:col-6 sm:col-12"
              />
              <CustomInputText
                control={control}
                errors={errors}
                name="lastName"
                labelId="Last Name"
                className="md:col-6 sm:col-12"
              />
            </div>
            <div className="md:flex mb-5">
              <CustomInputText
                control={control}
                errors={errors}
                name="phoneNumber"
                labelId="Phone Number"
                className="md:col-6 sm:col-12"
              />
              <CustomInputText
                control={control}
                errors={errors}
                name="email"
                labelId="Email"
                className="md:col-6 sm:col-12"
              />
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-9 surface-300">
        <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
          <Button
            label="CANCEL"
            type="button"
            onClick={handleAddEventClose}
            icon="pi pi-times"
            className="p-button-text company-primary-text"
          />
          {eventEditMode ? (
            <Button
              label="UPDATE"
              onClick={handleSubmit(handleUpdateEvent)}
              icon="pi pi-check"
              className="company-primary-btn"
            />
          ) : (
            <Button
              label="ADD"
              onClick={handleSubmit(handleCreateEvent)}
              icon="pi pi-check"
              className="company-primary-btn"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMeeting;
