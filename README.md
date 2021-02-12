![test suites](https://github.com/johan-st/ti-do/workflows/test%20suites/badge.svg?branch=main)
# tido

my experiences so far:
  - Drag n Drop has proven to take a lot of time setting up
  - first time using material ui
  - learned to plan more time when deeling with new tech
  - improved knowledge in typescript
  - improved knowledge in graphql, schemas, queries and mutations
  - explored patterns in regards to security
  - explored CI-patterns
  - improved holistic view on Dev(Sec)Ops
  - explored testable dev-patterns
  - explorerd decision space in regards to functional vs OO. (where to use which)

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
# resources:
- gql security https://www.howtographql.com/advanced/4-security/
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
  - Client regarded as untrusted (always do auth)
  - cookie jwt (signed, exp, same origin, http only)

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

### doing
  - basic FE

### next up
  - JWT cookie auth
  - Wireframe frontend
  - get auth info to resolver
  - Mutators

### done
- create postman tests of GraphQL endpoint
- peristence (db)
- typescript
- jest testrunner
- GitHub CI
- Container build procedure
- heroku deploy procedure
- decided on features
- initial plan
- check out remarkable

## implementation details
**list priveleges** (such as *readers, writers, admins*) is inherited from root node.

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
