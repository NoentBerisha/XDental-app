package com.xdental.schedule.DAOs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xdental.schedule.bean.Event;
import com.xdental.schedule.repositories.EventRepository;

@Service
public class EventDAO {
    @Autowired
    private EventRepository eventRepository;

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event getEvent(String id) {
        return eventRepository.findById(id).orElse(null);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    public Iterable<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
