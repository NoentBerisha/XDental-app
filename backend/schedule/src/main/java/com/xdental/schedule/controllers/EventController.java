package com.xdental.schedule.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.xdental.schedule.DAOs.EventDAO;
import com.xdental.schedule.bean.Event;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EventController {
    @Autowired
    private EventDAO eventDAO;

    @PostMapping("/create")
    public Event createEvent(@RequestBody Event event) {
        return eventDAO.saveEvent(event);
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable String id) {
        return eventDAO.getEvent(id);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventDAO.deleteEvent(id);
    }

    @PutMapping("/update")
    public Event updateEvent(@RequestBody Event event) {
        return eventDAO.updateEvent(event);
    }

    @GetMapping("/all")
    public Iterable<Event> getAllEvents() {
        return eventDAO.getAllEvents();
    }
}
