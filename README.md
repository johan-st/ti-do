![test suites](https://github.com/johan-st/ti-do/workflows/test%20suites/badge.svg?branch=main)
# tido

### dev notes:  
**run from project root folder**  
build docker image
```bash 
docker build --pull --rm -f "Dockerfile" -t tido:latest .
```

run docker image

```bash
docker run --name ti-do --rm -d -p 80:80 tido:latest
```

build and deploy to heroku
```bash
heroku container:push -a ti-do web && heroku container:release -a ti-do web
```
```json
// example user
{
    "userId": "dc79214a-25f5-441c-a527-02a2ba38c4f4",
    "fullName": "Johan Strand",
    "email": "johan@styldesign.se",
    "passwordHash": "72d0585274e2780a551e154eef8217121cf3b35ef2bd65efc9695580fdc51695576ba38f5846d039fbfa97994e0f56b048466d073e52a3c169fee63844e0c00d",
    "hashType":"SHA512",
    "hashSalt":"rYFmMHFM3oCWMETL",
    "tagline": "first man on the baloon",
    "avatar": "https://avatars.dicebear.com/4.1/api/avataaars/jayMan.svg"
}
```
# scope
## features
  - persistent changes (db)
  - real time co-op (sock)
  - drag and drop rearange (beautiful DnD)
  - r/rw/admin priveleges (metadata)
  - infinite nesting (recursive structure)


## tech
  - mongoDB
  - graphQL
  - socket io
  - beautiful DnD
  - useContext + useReducer
  - JWT BEARER


## plan
  1. Build full feature backend
  2. Build react app


## tests
  - high coverage on API
  - basic coverage on Client

## security
  - security on API
  - limit data access in API
  - *possible webRTC datachannel?*

## privacy
  - minimal tracking
  - future: (encrypt at rest)

## insurances
  - future: secure data
  - future: (data in cluster)

## obstacles
  - webRTC implementation time
  - GraphQL implementation time
  - Typescript learning curve
  

 
# PROGRESS
timeline:  
16:th finnish planning & setup. Start on graphql  
17:th graphql resolvers (incl. mutations, db)  
18:th Cookie jwt w/  permissions. start client  
19:th client (single user)   
20:th client (multi user)  
21:st deployment and clean-up  
22:nd evaluate work  
future: use as my daily planner and tinker away :happy:


### doing
  - graphql

### next up
  - peristence (db)
  - API JWT BEARER auth

### done
- typescript
- jest testrunner
- GitHub CI
- Container build procedure
- heroku deploy procedure
- decided on features
- initial plan


### todo-dump

- persistance
- check out remarkable

## dump

- Front-End
  - Cmd-Msg (elm style) architecture
  - generate html from markdown w/ remarkable
  - drag and drop
  - PWA for offline capability
  - accessability
- Back-End
  - mongoose w/ graphql?
  - jwt auth (BEARER)
  - docker + NGINX + node + mongo?
  - prepped for micro-services?
- Front & Back -End
  - Sync after offline (conflict resolution?)
  - versioning data for futuree upgrades?
  - data encryption?
  - encrypt at rest?
- Strategy
  - use existing libraries when possible
  - Make a solid plan
  - sketch interactions
  - modular, pre-defined APIs
  - have tests for APIs
  - focus tests on critical components


## user-stories

- ⚠​(required):​I as a user can create to-do items, such as a grocery list

  - **decision**:
    - **required**

- ⚠​(required):​I as ​another user ​can collaborate in real-time with ​user ​- so that we can(for example) edit our family shopping-list together
  - **decision**:
    - **required**
  - notes
    - _db for lists_
    - _rest api sufficent_
    - _socket preferable_
- I as a user can mark to-do items as “done” - so that I can avoid clutter and focus onthings that are still pending
  - **decision**
    - low effort
    - high payoff
    - **include**
  - notes
    - _important_
    - _store in metadata for list item_
- I as a user can filter the to-do list and view items that were marked as done - so that Ican retrospect on my prior progress
  - **decision**
    - medium effort
    - medium payoff
  - notes
    - _filter on frontend for instant result (and reduced trafic)_
    - _fetch entire lists_
    - _what with really huge lists?_
- I as a user can add sub-tasks to my to-do items - so that I could make logical groups of tasks and see their overall progress
  - **decision**
    - medium effort
    - medium payoff
  - notes
    - _recursive structure?_
- I as a user can specify cost/price for a task or a subtask - so that I can track myexpenses / project cost
  - **decision**
    - low effort
    - medium payoff
  - notes
    - _metadata_
- I as a user can see the sum of the subtasks aggregated in the parent task - so that in myshopping list I can see what contributes to the overall sum. For example I can have a task “Salad”, where I'd add all ingredients as sub-tasks, and would see how much does salad cost on my shopping list
  - **decision**
    - **dependent on previous tasks**
    - low effort
    - medium payoff
  - notes
    - _metadata_
- I as a user can make infinite nested levels of subtasks
  - **decision**
  - notes
- I as a user can add sub-descriptions of tasks in Markdown and view them as rich textwhile I'm not editing the descriptions
  - **decision**
    - **dependent on previous tasks**
    - effort depends on implementation low too high
    - payoff low
  - notes
    - _recursive!_
- I as a user can see the cursor and/or selection of another-user as he selects/types whenhe is editing text - so that we can discuss focused words during our online call.
  - **decision**
    - high effort
    - medium payoff
  - notes
    - _socket or webrtc datachannel_
- I as a user can create multiple to-do lists where each list has it's unique URL that I canshare with my friends - so that I could have separate to do lists for my groceries and workrelated tasks
  - **decision**
    - medium effort
    - high payoff
  - notes
    - _dynamic routing_
- In addition to regular to-do tasks, I as a user can add “special” typed to-do items, that will have custom style and some required fields:
  - ”work-task”, which has a required field “deadline” - which is a date
  - “food” that has fields
    - required: “carbohydrate”, “fat”, “protein” (each specified in g/100g)
    - optional: “picture” an URL to an image used to render this item
  - **decision**
    - medium effort
    - low payoff
  - notes
    - _design work_
    - _metadata_
- I as a user can keep editing the list even when I lose internet connection, and can expectit to sync up with BE as I regain connection
  - **decision**
    - high effort
    - high payoff
  - notes
    - _handle collisions_
    - _feels safe - no loss of work_
    - _alt is "last synced"-notification_
    - _pwa_
- I as a user can use my VR goggles to edit/browse multiple to-do lists in parallel in 3Dspace so that I can feel ultra-productive
  - **decision**
    - very high effort
    - low payoff
  - notes
    - _Cool idea_
    - _I have an oculus_
    - _would stand out_
    - _probably not very usefull_
    - _few users_
- I as a user can change the order of tasks via drag & drop

  - **decision**
    - medium effort
    - high payoff
  - notes
    - _react dnd library_
    - _beautiful dnd maybe?_

- I as a user can move/convert subtasks to tasks via drag & drop
  - **decision**
    - _dependent no pevious tasks_
    - low effort if recursive structure
    - medium effort if not
    - medium payoff
  - notes
    - _recursive structure helps_
- I as a user can be sure that my todos will be persisted so that important information is not lost when server restarts
  - **decision**
    - medium effort
    - high payoff
    - **Include**
  - notes
    - _db needed_
    - _always_
- I as an owner/creator of a certain to-do list can freeze/unfreeze a to-do list I've created to avoid other users from mutating it
  - **decision**
    - __no!__ _assign r/rw user privileges instead_
    - medium effort
    - high payoff
  - notes
    - _priveleges is metadata_

