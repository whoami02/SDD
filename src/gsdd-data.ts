import { GsddIntro, GsddSection } from './types';

// ─── GSDD Intro (from README.md) ─────────────────────────────────────────────

export const gsddIntro: GsddIntro = {
  id: 'gsdd-intro',
  title: 'Interview Preparation Guide',
  category: 'intro',
  content: `# Grokking System Design — Interview Guide

*Source: Grokking the System Design Interview (Educative)*

## Interview Process

### 1. Scope the Problem
Don't make assumptions. Ask clarifying questions to understand the constraints and use cases.

**Steps:**
- Requirements clarifications
- System interface definition

### 2. Sketch an Abstract Design
- Building blocks of the system
- Relationships between them

**Steps:**
- Back-of-the-envelope estimation
- Defining data model
- High-level design

### 3. Identify and Address Bottlenecks
- Use the fundamental principles of scalable system design

**Steps:**
- Detailed design
- Identifying and resolving bottlenecks

---

## How to Answer in Interviews

The best approach is to follow a clear process from the start:

- **Hiredintech** videos are an excellent starting point. They show how to approach a design question: start by clarifying use-cases, think abstractly about components and their interactions, then address bottlenecks and tradeoffs.
- **Crack the Coding Interview** has a good approach: solve for a small use case first, then expand.
- **Mock interviews are essential** — pick a topic, design it, then compare to real-world implementations.

---

## My Step-by-Step Approach

**a)** Be absolutely sure you understand the problem — clarify on the onset rather than assuming anything.

**b)** **Use-cases** — Know what the system will be used for and at what scale. Establish: requests per second, data written per second, data read per second.

**c)** Solve the problem for a **very small set** (say 100 users). This helps figure out data structures, components, and abstract design.

**d)** Write down the various components and how they interact.

**e)** Always remember at minimum:
1. Processing and servers
2. Storage
3. Caching
4. Concurrency and communication
5. Security
6. Load balancing and proxy
7. CDN
8. Monetization (if relevant)

**f)** Address **special cases** — e.g., storing thumbnails at Facebook vs a small startup requires very different approaches.

**g)** Look for minor optimizations and tradeoffs after components are in place.

**h)** Check with the interviewer if there are additional special cases they want solved.

---

## Common Design Questions

- Design Amazon's frequently viewed product page (last 5 items seen)
- Design an online poker game for multiplayer (persistence, concurrency, scale)
- Design a URL compression system
- Design a search engine (crawling, collection, hashing)
- Design Dropbox's architecture
- Design a picture sharing website (thumbnails, CDN, caching)
- Design a news feed (Facebook, Twitter)
- Design a product based on maps (hotel/ATM finder by location)
- Design a web application for instant messaging (WhatsApp, Facebook Chat)
- Design a system for collaborating over a document simultaneously (Google Docs)
- Top N or most frequent items of a running stream of data
- Design a logging system for distributed web servers
- Design election commission architecture for real-time vote collation

---

## Architecture References

- [Gaurav Sen's System Design Series](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX) — load balancing, message queues, then full systems like WhatsApp and Tinder
- [David Malan's CS75 Scalability Talk](https://www.youtube.com/watch?v=-W9F__D3oY4)
- [Scalability for Dummies](http://www.lecloud.net/tagged/scalability)
- *Designing Data-Intensive Applications* (Martin Kleppmann) — by far one of the best books on large-scale systems
- [Google File System paper](http://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf)
- [Memcache Scaling by Facebook](https://cs.uwaterloo.ca/~brecht/courses/854-Emerging-2014/readings/key-value/fb-memcached-nsdi-2013.pdf)
- [Facebook Haystack/Needle architecture](https://www.usenix.org/legacy/event/osdi10/tech/full_papers/Beaver.pdf)

---

## Company Engineering Blogs

| Company | Blog |
|---------|------|
| Airbnb | [nerds.airbnb.com](http://nerds.airbnb.com/) |
| Amazon AWS | [aws.amazon.com/blogs](https://aws.amazon.com/blogs/) |
| Dropbox | [tech.dropbox.com](https://tech.dropbox.com/) |
| Facebook | [engineering.fb.com](https://www.facebook.com/Engineering) |
| GitHub | [github.blog/engineering](https://github.com/blog/category/engineering) |
| Google Research | [research.googleblog.com](http://googleresearch.blogspot.com/) |
| High Scalability | [highscalability.com](http://highscalability.com/) |
| Instagram | [instagram-engineering.com](http://instagram-engineering.tumblr.com/) |
| LinkedIn | [engineering.linkedin.com](http://engineering.linkedin.com/blog) |
| Netflix | [techblog.netflix.com](http://techblog.netflix.com/) |
| Pinterest | [engineering.pinterest.com](http://engineering.pinterest.com/) |
| Quora | [engineering.quora.com](http://engineering.quora.com/) |
| Reddit | [redditblog.com](http://www.redditblog.com/) |
| SoundCloud | [developers.soundcloud.com/blog](https://developers.soundcloud.com/blog/) |
| Twitter | [engineering.twitter.com](https://engineering.twitter.com/) |
| Uber | [eng.uber.com](https://eng.uber.com/) |
| Yelp | [engineeringblog.yelp.com](http://engineeringblog.yelp.com/) |

---

## Low on Time?

**Highly recommended:** Do not take shortcuts unless you have a week before an interview. System design is best learned by practice.

If you must prioritize:
1. Watch CS75 and Udacity scaling talks
2. Read the engineering blog of the company you're interviewing at
3. Watch [hiredintech.com/system-design](http://www.hiredintech.com/system-design/the-system-design-process/) and develop your process
4. Keep these terms in mind: processing/servers, storage, caching, concurrency/communication, security, load balancing/proxy, CDN, monetization
`,
};

// ─── GSDD Sections ────────────────────────────────────────────────────────────

export const gsddSections: GsddSection[] = [
  {
    id: 'basics',
    title: 'Basics',
    items: [
      {
        id: 'gsdd-key-characteristics',
        title: 'Key Characteristics',
        slug: 'key-characteristics',
        category: 'basics',
        content: `# Key Characteristics of Distributed Systems

## Scalability

The capability of a system to grow and manage increased demand. A system that can continuously evolve to support a growing amount of work is scalable.

- **Horizontal scaling:** Adding more servers into the pool of resources.
- **Vertical scaling:** Adding more resources (CPU, RAM, storage) to an existing server. This approach comes with downtime and an upper limit.

## Reliability

Reliability is the probability that a system will fail in a given period.

A distributed system is reliable if it keeps delivering its service even when one or multiple components fail. Reliability is achieved through **redundancy** of components and data (removing every single point of failure).

## Availability

Availability is the time a system remains operational to perform its required function in a specific period. Measured by the percentage of time that a system remains operational under normal conditions.

- A reliable system is available.
- An available system is **not necessarily** reliable.
  - Example: A system with a security hole is available when there is no security attack — but it is not reliable.

## Efficiency

- **Latency:** Response time — the delay to obtain the first piece of data.
- **Bandwidth:** Throughput — the amount of data delivered in a given time.

## Serviceability / Manageability

Ease of operating and maintaining the system. Simplicity and speed with which a system can be repaired or maintained.
`,
      },
      {
        id: 'gsdd-load-balancing',
        title: 'Load Balancing',
        slug: 'load-balancing',
        category: 'basics',
        content: `# Load Balancing (LB)

Load balancers help scale horizontally across an ever-increasing number of servers.

## LB Locations

- Between user and web server
- Between web servers and an internal platform layer (application servers, cache servers)
- Between internal platform layer and database

## Algorithms

- Least Connection
- Least Response Time
- Least Bandwidth
- Round Robin
- Weighted Round Robin
- IP Hash

## Implementation

- **Smart clients** — client-side load balancing logic
- **Hardware load balancers** — dedicated hardware appliances (expensive, high performance)
- **Software load balancers** — e.g., Nginx, HAProxy (flexible, cost-effective)
`,
      },
      {
        id: 'gsdd-caching',
        title: 'Caching',
        slug: 'caching',
        category: 'basics',
        content: `# Caching

Take advantage of the **locality of reference** principle: recently requested data is likely to be requested again. Caches exist at all levels in architecture, but are often found nearest to the front end.

## Application Server Cache

Cache placed on a request layer node. When the request layer is expanded to many nodes:
- Load balancer randomly distributes requests across nodes
- The same request can go to different nodes
- This **increases cache misses**

**Solutions:**
- Global caches
- Distributed caches

## Distributed Cache

- Each request layer node owns part of the cached data
- The entire cache is divided up using a **consistent hashing function**
- **Pro:** Cache space can be increased easily by adding more nodes
- **Con:** A missing node leads to cache loss

## Global Cache

A server or file store that is faster than the original store, accessible by all request layer nodes.

Two common forms:
1. **Cache server handles cache miss** — used by most applications
2. **Request nodes handle cache miss** — used when:
   - A large percentage of the hot data set is in the cache
   - Files stored in the cache are static and shouldn't be evicted
   - Application logic understands eviction strategy better than the cache

## Content Delivery Network (CDN)

For sites serving large amounts of static media.

**Process:**
1. Request first asks the CDN for a piece of static media
2. CDN serves that content if available locally
3. If not available, CDN queries back-end servers, caches it locally, and serves it

**For smaller systems:** Serve static media off a separate subdomain using a lightweight HTTP server (e.g., Nginx). Cutover the DNS to a CDN later.

## Cache Invalidation

Keeping cache coherent with the source of truth — invalidate cache when source of truth changes.

| Strategy | Description | Pro | Con |
|----------|-------------|-----|-----|
| **Write-through** | Written to cache AND permanent storage simultaneously | Fast retrieval, full consistency, robust to disruptions | Higher write latency |
| **Write-around** | Written to permanent storage only, not cache | Reduces unused cache entries | Recently written data creates cache miss |
| **Write-back** | Written to cache only; permanent storage write is async | Low latency, high throughput for write-heavy apps | Risk of data loss on system disruption |

## Cache Eviction Policies

- **FIFO** — First In, First Out
- **LIFO** — Last In, First Out
- **LRU** — Least Recently Used
- **MRU** — Most Recently Used
- **LFU** — Least Frequently Used
- **RR** — Random Replacement
`,
      },
      {
        id: 'gsdd-sharding',
        title: 'Sharding / Data Partitioning',
        slug: 'sharding',
        category: 'basics',
        content: `# Sharding / Data Partitioning

## Partitioning Methods

### Horizontal Partitioning (Range-based Sharding)
- Put different rows into different tables
- **Con:** If the range isn't chosen carefully, the partitioning scheme will lead to unbalanced servers

### Vertical Partitioning
- Divide data for a specific feature to their own server
- **Pro:** Straightforward to implement, low application impact
- **Con:** To support growth, a database may need further partitioning

### Directory-Based Partitioning
- A lookup service that knows the partitioning scheme and abstracts it from the DB access code
- Allows adding DB servers or changing partitioning schema without impacting application
- **Con:** Can be a single point of failure

## Partitioning Criteria

### Key or Hash-Based Partitioning
- Apply a hash function to some key attribute to get the partition number
- **Problem:** Adding new servers may require changing the hash function → redistribution of data and downtime
- **Workaround:** [Consistent Hashing](https://en.wikipedia.org/wiki/Consistent_hashing)

### List Partitioning
- Each partition is assigned a list of values

### Round-Robin Partitioning
- With \`n\` partitions, the \`i\`-th tuple is assigned to partition \`i % n\`

### Composite Partitioning
- Combine any of the above schemes to devise a new scheme
- Consistent hashing is a composite of hash and list partitioning:
  \`Key → reduced key space through hash → list → partition\`

## Common Problems of Sharding

Most constraints arise because operations across multiple tables or rows will no longer run on the same server.

### Joins and Denormalization
- Joins will not be performant since data must be compiled from multiple servers
- **Workaround:** Denormalize the database so queries can be performed from a single table (risk: data inconsistency)

### Referential Integrity
- Difficult to enforce data integrity constraints (e.g., foreign keys)
- **Workaround:** Referential integrity enforced by application code; run SQL jobs to clean up dangling references

### Rebalancing
- Caused by: non-uniform data distribution, or a lot of load on one shard
- Creating more DB shards or rebalancing existing ones requires data movement and changes to the partitioning scheme
`,
      },
      {
        id: 'gsdd-indexes',
        title: 'Indexes',
        slug: 'indexes',
        category: 'basics',
        content: `# Indexes

- **Improve the performance** of search queries by allowing the database engine to quickly locate rows.
- **Decrease write performance.** This performance degradation applies to all insert, update, and delete operations — because the index must also be updated.

> Use indexes selectively on columns that are frequently queried or filtered. Over-indexing a write-heavy table can significantly hurt throughput.
`,
      },
      {
        id: 'gsdd-proxies',
        title: 'Proxies',
        slug: 'proxies',
        category: 'basics',
        content: `# Proxies

A proxy server is an intermediary piece of hardware/software sitting between the client and the backend server.

**Proxy functions:**
- Filter requests
- Log requests
- Transform requests (encryption, compression, etc.)
- Caching — return cached responses without hitting the backend
- Batch requests

## Collapsed Forwarding

Enable multiple client requests for the **same URI** to be processed as one request to the backend server. This dramatically reduces load on the origin.

Also used to collapse requests for data that is spatially close together in storage — to minimize the number of read operations.
`,
      },
      {
        id: 'gsdd-queues',
        title: 'Queues',
        slug: 'queues',
        category: 'basics',
        content: `# Queues

Queues are used to effectively manage requests in a large-scale distributed system, where different components may need to work asynchronously.

A queue is an **abstraction between the client's request and the actual work performed** to service it.

**Key properties:**
- Queues implement the **asynchronous communication** protocol. When a client submits a task to a queue, they are no longer required to wait for the results.
- Queues can provide **protection from service outages and failures** — if a consumer goes down, messages remain in the queue until a healthy consumer picks them up.

> Common queue systems: RabbitMQ, Amazon SQS, Apache Kafka (event streaming).
`,
      },
      {
        id: 'gsdd-redundancy',
        title: 'Redundancy',
        slug: 'redundancy',
        category: 'basics',
        content: `# Redundancy

**Redundancy** is the duplication of critical data or services with the intention of increasing reliability of the system.

## Server Failover
- Remove single points of failure and provide backups (e.g., server failover)
- If the primary server fails, a secondary server automatically takes over

## Shared-Nothing Architecture
- Each node can operate independently of one another
- No central service managing state or orchestrating activities
- New servers can be added without special conditions or prior knowledge
- **No single point of failure** — the system remains operational even if individual nodes fail
`,
      },
      {
        id: 'gsdd-sql-vs-nosql',
        title: 'SQL vs. NoSQL',
        slug: 'sql-vs-nosql',
        category: 'basics',
        content: `# SQL vs. NoSQL

## Common Types of NoSQL

### Key-Value Stores
Array of key-value pairs. The "key" is an attribute name. Examples: **Redis**, **Voldemort**, **DynamoDB**.

### Document Databases
Data is stored in documents, grouped in collections. Each document can have an entirely different structure. Examples: **CouchDB**, **MongoDB**.

### Wide-Column / Columnar Databases
Column families act as containers for rows. No need to know all columns up front; each row can have a different number of columns. Examples: **Cassandra**, **HBase**.

### Graph Database
Data is stored in graph structures with Nodes (entities), Properties (info about entities), and Lines (connections). Examples: **Neo4J**, **InfiniteGraph**.

---

## Differences Between SQL and NoSQL

| | SQL | NoSQL |
|---|-----|-------|
| **Storage** | Tables with rows and columns | Various models (document, key-value, column, graph) |
| **Schema** | Fixed schema — altering requires modifying the whole DB | Dynamic schemas |
| **Querying** | Structured Query Language (SQL) | Database-specific query language (UnQL) |
| **Scalability** | Vertically scalable (expensive); horizontal is complex | Horizontally scalable (add more servers) |
| **ACID** | ACID compliant — data reliability, transaction guarantees | Most sacrifice ACID for performance and scale |

---

## When to Use SQL

- Need to ensure **ACID compliance** (e.g., financial transactions)
- Data is **structured and unchanging**
- Relationships between entities are complex (joins)

## When to Use NoSQL

- Data has **little or no structure**
- Need to make the most of **cloud computing and storage** (easy horizontal scaling)
- **Rapid development** — frequent updates to data structure
- Extreme write throughput or very large datasets
`,
      },
      {
        id: 'gsdd-cap-theorem',
        title: 'CAP Theorem',
        slug: 'cap-theorem',
        category: 'basics',
        content: `# CAP Theorem

- **Consistency:** Every read receives the most recent write or an error.
- **Availability:** Every request receives a response that is not an error.
- **Partition Tolerance:** The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

## The Core Trade-Off

The CAP theorem states that in the presence of a **network partition**, one must choose between **consistency** and **availability**.

> CAP is frequently misunderstood as requiring you to always abandon one of the three guarantees. In fact, the choice is only between consistency and availability **when a network partition or failure happens**. At all other times, no trade-off has to be made.

## ACID vs. BASE

- [**ACID**](https://en.wikipedia.org/wiki/ACID) databases choose **consistency** over availability. (e.g., PostgreSQL, MySQL)
- [**BASE**](https://en.wikipedia.org/wiki/Eventual_consistency) systems choose **availability** over consistency. (e.g., Cassandra, DynamoDB in AP mode)
`,
      },
      {
        id: 'gsdd-consistent-hashing',
        title: 'Consistent Hashing',
        slug: 'consistent-hashing',
        category: 'basics',
        content: `# Consistent Hashing

## Problems with Simple Hashing

Simple hashing \`key % n\` (where \`n\` is the number of servers) has two major problems:

1. **Not horizontally scalable** — whenever a new cache host is added, all existing mappings are broken and every key must be remapped.
2. **Unbalanced load** — with non-uniformly distributed data, some servers become hot spots.

## Consistent Hashing

Consistent hashing maps a key to an integer. Imagine the integers in the range are placed on a **ring** such that values wrap around.

**How it works:**
1. Given a list of servers, hash them to integers and place them on the ring.
2. To map a key to a server:
   - Hash the key to a single integer.
   - Move clockwise on the ring until finding the first server.

**When the hash table is resized** (server added or deleted), only \`k/n\` keys need to be remapped (\`k\` = total keys, \`n\` = total servers).

## Virtual Nodes (Replicas)

To handle **hot spots**, add virtual replicas for each cache:
- Instead of mapping each cache to a single point on the ring, map it to **multiple points** (replicas).
- Each cache is associated with multiple portions of the ring.
- As the number of replicas increases, the keys will be more balanced.
`,
      },
      {
        id: 'gsdd-client-server-communication',
        title: 'Client-Server Communication',
        slug: 'client-server-communication',
        category: 'basics',
        content: `# Client-Server Communication

## Standard HTTP Web Request

1. Client opens a connection and requests data from server.
2. Server calculates the response.
3. Server sends the response back to the client on the opened request.

---

## Ajax Polling

The client repeatedly polls (requests) a server for data and waits for a response. If no data is available, an empty response is returned.

1. Client opens a connection and requests data using regular HTTP.
2. The page sends requests to the server at regular intervals (e.g., every 0.5 seconds).
3. Server calculates the response and sends it back.
4. Client repeats the above periodically to get updates.

**Problems:**
- Client must constantly ask the server for new data.
- Many responses are empty, creating significant HTTP overhead.

---

## HTTP Long-Polling

The client requests information from the server as in normal polling, but with the expectation that the server may **not respond immediately**.

1. Client makes an initial request using regular HTTP and then waits.
2. Server **delays its response** until an update is available, or until a timeout occurs.
3. When an update is available, the server sends a full response.
4. Client typically sends a new long-poll request immediately upon receiving a response (or after a brief pause).

Each Long-Poll request has a timeout. The client must reconnect periodically after the connection is closed.

---

## WebSockets

- A **persistent, full-duplex** communication channel over a single TCP connection.
- Both server and client can send data at any time.
- Connection is established through a WebSocket handshake.
- **Low communication overhead.**
- **Real-time data transfer.**

**Use cases:** Chat apps, live dashboards, multiplayer games, collaborative editing.

---

## Server-Sent Events (SSE)

1. Client requests data from a server using regular HTTP.
2. The requested webpage opens a connection to the server.
3. Server sends data to the client whenever new information is available.

**Use cases:**
- When real-time traffic from server to client is needed (one-way only).
- When the server generates data in a loop and sends multiple events to the client.

| | WebSockets | SSE |
|---|---|---|
| Direction | Full-duplex (both ways) | Server → Client only |
| Protocol | ws:// / wss:// | HTTP |
| Use case | Chat, games, collaboration | Live feeds, notifications |
`,
      },
    ],
  },
  {
    id: 'designs',
    title: 'System Designs',
    items: [
      {
        id: 'gsdd-short-url',
        title: 'Short URL Service',
        slug: 'short-url',
        category: 'designs',
        overviewImage: '/gsdd/img/short-url-overview.png',
        detailImage: '/gsdd/img/short-url-detail.png',
        content: `# URL Shortening Service

## Requirements

### Functional Requirements
- Given a URL, generate a shorter and unique alias (short link).
- When users access a short link, redirect to the original link.
- Users should optionally be able to pick a custom short link.
- Links will expire after a standard default timespan. Users should also be able to specify the expiration time.

### Non-Functional Requirements
- **Highly available** — if the service is down, all URL redirections will fail.
- URL redirection should happen in real-time with **minimal latency**.
- Shortened links should not be guessable (not predictable).

### Extended Requirements
- Analytics (e.g., how many times a redirection happened)
- Accessible through REST APIs by other services

---

## Capacity Estimation

**Assumption:** Read-heavy. 100:1 ratio between reads and writes.

| Category | Calculation | Estimate |
|----------|-------------|----------|
| New URLs | 500M / (30 × 24 × 3600) | 200/s |
| URL redirections | 500M × 100 / (30 × 24 × 3600) | 19K/s |
| Incoming data | 500 bytes × 200/s | 100 KB/s |
| Outgoing data | 500 bytes × 19K/s | 9 MB/s |
| Storage for 5 years | 500 bytes × 500M × 60 months | 15 TB |
| Memory for cache | 19K × 3600 × 24 × 500 bytes × 20% | 170 GB |

---

## System APIs

### createUrl
\`\`\`
POST /api/shorten
Parameters: api_dev_key, original_url, custom_alias (optional), expire_date (optional)
Returns: shortened_url (string) or error code
\`\`\`

### deleteUrl
\`\`\`
DELETE /api/url/{url_key}
Parameters: api_dev_key, url_key
Returns: 'URL Removed' on success
\`\`\`

---

## Database Design

**Observations:** Need to store billions of records. Each object < 1KB. No complex relationships. Read-heavy. NoSQL easier to scale.

**Schema:**

| Table | Fields |
|-------|--------|
| URL | hash (varchar 16), original_url (varchar 512), creation_date, expiration_date, user_id |
| User | name (varchar 20), email (varchar 32), creation_date, last_login |

---

## Algorithm: Encoding the URL

- **Base64 encoding:** A–Z, a–z, 0–9, –, .
- 6 characters: 64⁶ ≈ 68.7B unique keys
- 8 characters: 64⁸ ≈ 281T unique keys
- **MD5** generates a 128-bit hash → base64 encoded = 22 chars → take first 8 characters

**Issues:**
- Same URL from multiple users generates the same hash
- URL-encoded variants of the same URL differ

**Workaround:** Append an increasing sequence number, or append the user_id to the URL before hashing.

### Key Generation Service (KGS)
- Standalone service generates random 6-letter strings and stores them in a key database
- Key DB size: 6 characters/key × 68.7B unique keys = **412 GB**
- Uses two tables: unused keys and used keys. Keeps some keys in memory. One KGS per app server shard.

---

## Data Partitioning

- **Range-Based Partitioning:** Store URLs based on first letter of hash key. Risk: unbalanced partitions.
- **Hash-Based Partitioning:** Hash the short URL and calculate partition. Use consistent hashing to minimize remapping.

---

## Caching

- **Eviction policy:** LRU (discard least recently used URL first)
- **Cache update:** On miss, hit backend and pass new entry to all cache replicas.

---

## Load Balancing

Three layers:
1. Between clients and application servers
2. Between application servers and database servers
3. Between application servers and cache servers

---

## Additional Components

**DB Cleanup Service:** Runs periodically to remove expired links from storage and cache.

**Analytics:** Track statistics — how many times a short URL has been used, referrer data, geographic info.

**Security:** Store permission level (public/private) with each URL. Return HTTP 401 for unauthorized access.
`,
      },
      {
        id: 'gsdd-pastebin',
        title: 'Pastebin',
        slug: 'pastebin',
        category: 'designs',
        overviewImage: '/gsdd/img/pastebin-overview.png',
        detailImage: '/gsdd/img/pastebin-detail.png',
      },
      {
        id: 'gsdd-instagram',
        title: 'Instagram',
        slug: 'instagram',
        category: 'designs',
        overviewImage: '/gsdd/img/instagram-overview.png',
        detailImage: '/gsdd/img/instagram-detail.png',
      },
      {
        id: 'gsdd-dropbox',
        title: 'Dropbox',
        slug: 'dropbox',
        category: 'designs',
        overviewImage: '/gsdd/img/dropbox-overview.png',
        detailImage: '/gsdd/img/dropbox-detail.png',
      },
      {
        id: 'gsdd-twitter',
        title: 'Twitter',
        slug: 'twitter',
        category: 'designs',
        overviewImage: '/gsdd/img/twitter-overview.png',
        detailImage: '/gsdd/img/twitter-detail.png',
      },
      {
        id: 'gsdd-youtube',
        title: 'YouTube',
        slug: 'youtube',
        category: 'designs',
        overviewImage: '/gsdd/img/youtube-overview.png',
        detailImage: '/gsdd/img/youtube-detail.png',
      },
      {
        id: 'gsdd-twitter-search',
        title: 'Twitter Search',
        slug: 'twitter-search',
        category: 'designs',
        overviewImage: '/gsdd/img/twitter-search-overview.png',
        detailImage: '/gsdd/img/twitter-search-detail.png',
      },
      {
        id: 'gsdd-web-crawler',
        title: 'Web Crawler',
        slug: 'web-crawler',
        category: 'designs',
        overviewImage: '/gsdd/img/web-crawler-overview.png',
        detailImage: '/gsdd/img/web-crawler-detail.png',
      },
      {
        id: 'gsdd-facebook-messenger',
        title: 'Facebook Messenger',
        slug: 'facebook-messenger',
        category: 'designs',
        overviewImage: '/gsdd/img/facebook-messenger-overview.png',
        detailImage: '/gsdd/img/facebook-messenger-detail.png',
      },
      {
        id: 'gsdd-facebook-newsfeed',
        title: 'Facebook Newsfeed',
        slug: 'facebook-newsfeed',
        category: 'designs',
        overviewImage: '/gsdd/img/facebook-newsfeed-overview.png',
      },
      {
        id: 'gsdd-yelp',
        title: 'Yelp',
        slug: 'yelp',
        category: 'designs',
        overviewImage: '/gsdd/img/yelp-overview.png',
      },
      {
        id: 'gsdd-uber-backend',
        title: 'Uber Backend',
        slug: 'uber-backend',
        category: 'designs',
        overviewImage: '/gsdd/img/uber-backend-overview.png',
      },
      {
        id: 'gsdd-ticketmaster',
        title: 'Ticketmaster',
        slug: 'ticketmaster',
        category: 'designs',
        overviewImage: '/gsdd/img/ticketmaster-overview.png',
      },
    ],
  },
];
