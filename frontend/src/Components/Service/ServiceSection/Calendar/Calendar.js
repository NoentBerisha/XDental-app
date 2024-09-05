import React, { useState, useContext } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { Modal } from "react-bootstrap";
import {toast} from 'react-toastify';
import { LanguageContext } from '../../../../Context/LanguageContext';

const localizer = momentLocalizer(moment);

const DentistCalendar = () => {
  const { translations } = useContext(LanguageContext);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: translations.availability.available,
      start: new Date(2023, 10, 10, 9, 0),
      end: new Date(2023, 10, 10, 12, 0),
      resource: "available",
    },
    {
      id: 2,
      title: translations.availability.booked,
      start: new Date(2023, 10, 15, 14, 0),
      end: new Date(2023, 10, 15, 15, 0),
      resource: "booked",
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState(Views.DAY);

  const handleSelectSlot = ({ start, end, action }) => {
    const now = new Date();
    if (start < now) {
      toast.error(translations.toastMessages.dateInPast);
      return;
    }

    if (action === "click") {
      setSelectedDate(start);
      setView(Views.DAY);
    } else if (action === "select") {
      if (view === Views.DAY) {
        setNewEvent({
          start,
          end,
          title: translations.availability.newEvent,
          id: Date.now(),
          resource: "available",
        });
        setShowEditModal(true);
      }
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleEventEdit = () => {
    if (newEvent) {
      setEvents([...events, newEvent]);
      setNewEvent(null);
    } else if (selectedEvent) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? selectedEvent : event
      );
      setEvents(updatedEvents);
    }
    setSelectedEvent(null);
    setShowEditModal(false);
    toast.success(translations.toastMessages.eventSaved);
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
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
        border: "none",
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

  return (
    <div className="calendar-container">
      <h1>{translations.availability.calendarTitle}</h1>

      <Calendar
        localizer={localizer}
        events={events}
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
          {selectedEvent && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleEventDelete}
            >
              {translations.availability.deleteEvent}
            </button>
          )}
          {(selectedEvent || newEvent) && (
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