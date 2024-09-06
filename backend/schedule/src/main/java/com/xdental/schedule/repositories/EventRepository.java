package com.xdental.schedule.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.xdental.schedule.bean.Event;

public interface EventRepository extends MongoRepository<Event, String> {
}
