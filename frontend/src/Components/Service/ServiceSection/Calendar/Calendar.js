import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { LanguageContext } from '../../../../Context/LanguageContext';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "../../../../Api";

const localizer = momentLocalizer(moment);

const DentistCalendar = () => {
  const { translations } = useContext(LanguageContext);
  const [events, setEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState(Views.DAY);
  const [selectedDentist, setSelectedDentist] = useState("Leonard");  
  const [currentUser, setCurrentUser] = useState({ name: "Leonard", role: "dentist" }); // Example user
  const [slideDirection, setSlideDirection] = useState("slide-active");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        console.log(response);
        const fetchedEvents = response.body.map(event => {
          const baseEvent = {
            id: event.id,
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            resource: event.resource,
            dentist: event.dentist,
          };

          if (currentUser.role === "dentist") {
            baseEvent.title = event.title;
            baseEvent.patient = event.patient;
          }

          return baseEvent;
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [currentUser.role]);

  const handleSelectSlot = ({ start, end, action }) => {
    const now = new Date();
    if (start < now) {
      toast.error(translations.toastMessages.dateInPast);
      return;
    }

    if (action === "click") {
      setSelectedDate(start);
      setView(Views.DAY);
    } else if (action === "select" && currentUser.role === "dentist") {
      if (view === Views.DAY) {
        setNewEvent({
          start,
          end,
          title: translations.availability.newEvent,
          id: Date.now(),
          resource: "available",
          dentist: selectedDentist, // Assign the selected dentist to the new event
          patient: "", // Initialize patient field
        });

        setShowEditModal(true);
      }
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleEventEdit = async () => {
    try {
      if (newEvent) {
        const createdEvent = await createEvent({
          ...newEvent,
          start: newEvent.start.toISOString(),
          end: newEvent.end.toISOString(),
          resource: "booked",
        });

        const newCreatedEvent = {
          ...createdEvent.body,
          start: moment(createdEvent.body.start).toDate(),
          end: moment(createdEvent.body.end).toDate(),
          resource: "booked",
        };

        setEvents([...events, newCreatedEvent]);
        setNewEvent(null);
      } else if (selectedEvent) {
        const updatedEvent = await updateEvent({
          ...selectedEvent,
          start: selectedEvent.start.toISOString(),
          end: selectedEvent.end.toISOString(),
          resource: "booked",
        });

        const updatedEvents = events.map((event) =>
          event.id === updatedEvent.body.id
            ? {
                ...updatedEvent.body,
                start: moment(updatedEvent.body.start).toDate(),
                end: moment(updatedEvent.body.end).toDate(),
                resource: "booked",
              }
            : event
        );

        setEvents(updatedEvents);
      }

      setSelectedEvent(null);
      setShowEditModal(false);
      toast.success(translations.toastMessages.eventSaved);
    } catch (error) {
      toast.error(translations.toastMessages.eventSaveError);
      console.error("Error saving event:", error);
    }
  };

  const handleEventDelete = async () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
      await deleteEvent(selectedEvent.id);
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setNewEvent(null);
      setShowEditModal(false);
      toast.success(translations.toastMessages.eventDeleted);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
    setNewEvent(null);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor =
      event.resource === "available" ? "#7fff7f" : "#ff7f7f";
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        padding: "5px",
        border: "solid 1px black",
      },
    };
  };

  const messages = {
    allDay: translations.calendar.allDay,
    previous: translations.calendar.previous,
    next: translations.calendar.next,
    today: translations.calendar.today,
    month: translations.calendar.month,
    week: translations.calendar.week,
    day: translations.calendar.day,
    agenda: translations.calendar.agenda,
    date: translations.calendar.date,
    time: translations.calendar.time,
    event: translations.calendar.event,
    noEventsInRange: translations.calendar.noEventsInRange,
    showMore: (total) => `+ ${total} ${translations.calendar.more}`,
  };

  const filteredEvents = events.filter(event => event.dentist === selectedDentist);

  const handleDentistChange = (dentist) => {
    setSlideDirection(dentist === "Leonard" ? "slide-left" : "slide-right");
    setTimeout(() => {
      setSelectedDentist(dentist);
      setSlideDirection("slide-active");
    }, 300); // Match the duration of the CSS transition
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
      <h1>{translations.availability.calendarTitle}</h1>
      <div className="dentist-buttons">
        <button onClick={() => handleDentistChange("Leonard")}>
          Dr. Leonard Frrokaj
        </button>
        <button onClick={() => handleDentistChange("Benhard")}>
          Dr. Benhard Frrokaj
        </button>
        <div className={`underline ${selectedDentist === "Leonard" ? "dentist1" : "dentist2"}`}></div>
      </div>
      </div>

      <div className="slide-container">
        <div className={`slide-content ${slideDirection}`}>
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEventClick}
            eventPropGetter={eventStyleGetter}
            style={{ height: 600, margin: "50px" }}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={Views.DAY}
            date={selectedDate}
            onNavigate={handleDateChange}
            step={30}
            timeslots={2}
            popup={true}
            min={new Date(2023, 0, 1, 7)}
            max={new Date(2023, 0, 1, 19)}
            view={view}
            onView={(newView) => setView(newView)}
            messages={messages}
          />
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleModalClose}>
        <div className="modal-header">
          <button type="button" className="close" onClick={handleModalClose}>
            &times;
          </button>
          <h4 className="modal-title">
            {selectedEvent ? translations.availability.editEvent : translations.availability.createEvent}
          </h4>
        </div>
        <div className="modal-body">
          <form>
            {currentUser.role === "dentist" && (
              <>
                <div className="form-group" controlid="editEventTitle">
                  <label>{translations.availability.eventTitle}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedEvent?.title || newEvent?.title || ""}
                    onChange={(e) => {
                      if (selectedEvent) {
                        setSelectedEvent({
                          ...selectedEvent,
                          title: e.target.value,
                        });
                      } else if (newEvent) {
                        setNewEvent({ ...newEvent, title: e.target.value });
                      }
                    }}
                  />
                </div>
                <div className="form-group" controlid="editEventPatient">
                  <label>{translations.availability.patient}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedEvent?.patient || newEvent?.patient || ""}
                    onChange={(e) => {
                      if (selectedEvent) {
                        setSelectedEvent({
                          ...selectedEvent,
                          patient: e.target.value,
                        });
                      } else if (newEvent) {
                        setNewEvent({ ...newEvent, patient: e.target.value });
                      }
                    }}
                  />
                </div>
              </>
            )}
            <div className="form-group" controlid="editEventStart">
              <label>{translations.availability.startTime}</label>
              <input
                type="text"
                className="form-control"
                value={
                  (selectedEvent?.start || newEvent?.start)?.toLocaleString() ||
                  ""
                }
                readOnly
              />
            </div>
            <div className="form-group" controlid="editEventEnd">
              <label>{translations.availability.endTime}</label>
              <input
                type="text"
                className="form-control"
                value={
                  (selectedEvent?.end || newEvent?.end)?.toLocaleString() || ""
                }
                readOnly
              />
            </div>
            <div className="form-group" controlid="editEventDentist">
              <label>{translations.availability.dentist}</label>
              <input
                type="text"
                className="form-control"
                value={selectedEvent?.dentist || newEvent?.dentist || ""}
                readOnly
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleModalClose}
          >
            {translations.availability.close}
          </button>
          {selectedEvent && currentUser.role === "dentist" && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleEventDelete}
            >
              {translations.availability.deleteEvent}
            </button>
          )}
          {(selectedEvent || newEvent) && currentUser.role === "dentist" && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEventEdit}
            >
              {translations.availability.saveChanges}
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DentistCalendar;