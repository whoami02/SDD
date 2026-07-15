import { Phase } from './types';

export const curriculum: Phase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: System Design Core',
    description: 'The 26 must-know topics for senior interviews.',
    days: [
      {
        dayNumber: 1,
        title: 'The Basics & Scaling',
        topics: [
          {
            id: 'estimation',
            title: 'Estimation',
            hook: 'Imagine planning a road trip. Before you leave, you estimate how much gas you need, how long it will take, and how much money to bring. In system design, estimation is the back-of-the-envelope math we do before building to ensure our architecture can handle the expected traffic and data.',
            explanation: 'Estimation involves calculating metrics like QPS (Queries Per Second), storage requirements, and bandwidth. We use standard approximations (e.g., 1 day = ~100,000 seconds, so 1M requests/day ≈ 12 QPS). Understanding these helps in choosing the right database, caching strategy, and network infrastructure.',
            practice: 'If a service receives 50 million daily active users and each user makes 10 requests per day, what is the approximate QPS? How much storage is needed if each request payload is 2KB?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKVXNlci0tPnwxME0vZGF5fExCCkxCLS0+fDEyMCBRUFN8V2ViCldlYi0tPnxSZWFkIDJLQnxEQgpzdHlsZSBXZWIgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNhCnN0eWxlIERCIGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'Estimation relies on powers of two, standard latency numbers every programmer should know (e.g., L1 cache reference is 0.5ns, reading 1MB sequentially from memory is 250us, reading 1MB sequentially from SSD is 1ms, from network is 10ms+). This helps establish realistic bounds on system throughput.',
            articleUrl: 'https://en.wikipedia.org/wiki/Back-of-the-envelope_calculation'
          },
          {
            id: 'perf-scalability-1',
            title: 'Performance & Scalability (Part 1)',
            hook: 'Think of a single coffee shop barista. If the line gets too long, they speed up (Performance). But eventually, they max out. To serve more people, you need to hire more baristas or open another shop (Scalability).',
            explanation: 'Performance is about doing the same work faster (reducing latency). Scalability is about handling more work (increasing throughput). We achieve scalability through Vertical Scaling (scaling up - buying a bigger server) and Horizontal Scaling (scaling out - adding more servers).',
            practice: 'What are the main limitations of Vertical Scaling? When would you choose Horizontal Scaling over Vertical Scaling?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKc3ViZ3JhcGggVmVydGljYWwKUzFbQmlnIFNlcnZlciBDUFUrK10KZW5kCnN1YmdyYXBoIEhvcml6b250YWwKUzJbU2VydmVyIDFdClMzW1NlcnZlciAyXQpTNFtTZXJ2ZXIgM10KZW5kCnN0eWxlIFMxIGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'Vertical scaling (Scale Up) means adding more CPU/RAM to an existing node. It has a hard ceiling. Horizontal scaling (Scale Out) means adding more nodes to a distributed system. Horizontal scaling is the standard for modern web-scale applications because it provides elasticity and fault tolerance.',
            articleUrl: 'https://en.wikipedia.org/wiki/Scalability'
          },
          {
            id: 'perf-scalability-2',
            title: 'Performance & Scalability (Part 2)',
            hook: 'If you have multiple coffee shops, how do you make sure the coffee tastes exactly the same in all of them? You need a shared recipe book. In distributed systems, this is shared state.',
            explanation: 'When scaling horizontally, keeping servers stateless is crucial. State (user sessions, profile data) should be moved out of the web tier into a shared data store (like Redis or a database). This allows any server to handle any request.',
            practice: 'How does statefulness complicate horizontal scaling? Name two strategies for managing user sessions in a distributed system.',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKTEItLT5TMVtXZWJdCkxCLS0+UzJbV2ViXQpTMS0tPkNhY2hlWyhSZWRpcyldClMyLS0+Q2FjaGUKc3R5bGUgQ2FjaGUgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'A stateless architecture separates the application logic from the state. The web servers process requests without storing local context, instead relying on a shared cache (like Redis) or database to retrieve session data. This allows any web server to handle any request.',
            articleUrl: 'https://www.redhat.com/en/topics/cloud-native-apps/stateful-vs-stateless'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Traffic Routing',
        topics: [
          { 
            id: 'dns', 
            title: 'Domain Name System (DNS)',
            hook: 'DNS is like the contacts app in your phone. Instead of memorizing your friend\'s 10-digit phone number (IP address), you just tap their name (domain name).',
            explanation: 'When a user types google.com, the browser asks a DNS resolver for the IP address. This resolution goes through a hierarchy: Root server -> TLD (Top Level Domain) server -> Authoritative Name Server. DNS can also be used for basic traffic routing (like Geo-DNS to send users to the closest data center).',
            practice: 'What is a DNS A Record vs a CNAME Record? How does DNS caching improve latency?',
            diagramUrl: 'https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCkNsaWVudC0+PlJlc29sdmVyOiBnb29nbGUuY29tPwpSZXNvbHZlci0+PlJvb3Q6IC4KUm9vdC0tPj5SZXNvbHZlcjogLmNvbSBOUwpSZXNvbHZlci0+PlRMRDogLmNvbQpUTEQtLT4+UmVzb2x2ZXI6IGdvb2dsZSBOUwpSZXNvbHZlci0+Pkdvb2dsZSBOUzogZ29vZ2xlLmNvbQpHb29nbGUgTlMtLT4+UmVzb2x2ZXI6IDE0Mi4yNTAuMTkwLjQ2ClJlc29sdmVyLS0+PkNsaWVudDogMTQyLjI1MC4xOTAuNDY=?theme=neutral',
            diagramExplanation: 'DNS resolution is a multi-step process. A client queries a recursive resolver, which sequentially checks the Root Server, the TLD Server (.com), and finally the Authoritative Name Server for the exact domain to retrieve the A Record (IP address). Results are heavily cached at every step to prevent massive latency.',
            articleUrl: 'https://en.wikipedia.org/wiki/Domain_Name_System'
          },
          { 
            id: 'lb-layer-4-7', 
            title: 'Load Balancers (Layer 4 vs Layer 7)',
            hook: 'A Layer 4 LB is a fast package sorter reading zip codes. A Layer 7 LB is a customs agent opening the box to inspect the contents and route it based on what\'s inside.',
            explanation: 'Layer 4 (Transport) routing makes decisions based on IP and port. It\'s fast but dumb. Layer 7 (Application) routing makes decisions based on HTTP headers, URLs, or cookies. It\'s slower but allows for smart routing (e.g., routing /api traffic to a different server than /images).',
            practice: 'If you want to route all mobile traffic to a specific cluster of servers, would you use a Layer 4 or Layer 7 Load Balancer?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQ2xpZW50LS0+TDdbTDcgTG9hZCBCYWxhbmNlcl0KTDctLT58L2FwaXxBUElbQVBJIFNlcnZlcnNdCkw3LS0+fC9pbWFnZXN8SU1HW0ltYWdlIFNlcnZlcnNdCnN0eWxlIEw3IGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'A Load Balancer sits between the client and the server cluster, distributing incoming network traffic. Layer 7 load balancers can read HTTP headers, allowing them to route requests to specific microservices (e.g. /video requests to a high-bandwidth cluster).',
            articleUrl: 'https://en.wikipedia.org/wiki/Load_balancing_(computing)'
          },
          { 
            id: 'lb-algorithms', 
            title: 'Load Balancers (Algorithms & Clustering)',
            hook: 'If you are handing out tasks to workers, do you just go in a circle (Round Robin)? What if one worker is already swamped (Least Connections)? Or what if a task needs a specific worker (Consistent Hashing)?',
            explanation: 'LBs need algorithms to distribute traffic. Round Robin is simple. Least Connections is better for uneven task times. IP Hash or Consistent Hashing is used when you need session stickiness (the same user always hits the same server).',
            practice: 'Explain when you would use Consistent Hashing instead of standard Round Robin.',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKQ2xpZW50LS0+TEIKTEItLT58SGFzaChJUCkgPSBOb2RlIEJ8Tm9kZUIKTEItLi0+Tm9kZUEKTEItLi0+Tm9kZUMKc3R5bGUgTm9kZUIgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'Consistent Hashing solves the rehashing problem when servers are added or removed. It maps both servers and data keys to a hash ring. A key is routed to the first server encountered moving clockwise. When a server fails, only the keys adjacent to it need to be remapped.',
            articleUrl: 'https://en.wikipedia.org/wiki/Load_balancing_(computing)#Routing_algorithms'
          }
        ]
      },
      {
        dayNumber: 3,
        title: 'Speed & Memory',
        topics: [
          { 
            id: 'cache-fundamentals', 
            title: 'Caching Fundamentals',
            hook: 'A cache is like a librarian keeping the top 10 most requested books on their desk instead of the back shelves. It trades capacity for extreme speed.',
            explanation: 'Caching stores copies of frequently accessed data in fast-access memory (RAM) like Redis or Memcached. This avoids expensive disk I/O or heavy computations. It can exist at the client, CDN, Load Balancer, or application level.',
            practice: 'What is a cache miss, and what is the typical penalty in terms of latency?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQ2xpZW50LS0+Q0ROCkNETi0tPkxCCkxCLS0+V2ViCldlYi0tPlJlZGlzCldlYi0tPkRCCnN0eWxlIFJlZGlzIGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'A multi-tier caching topology involves Browser Caches, CDNs (Content Delivery Networks) for static assets at the edge, and Distributed In-Memory Caches (like Redis) sitting in front of the primary Database.',
            articleUrl: 'https://aws.amazon.com/caching/'
          },
          { 
            id: 'cache-strategies', 
            title: 'Caching Strategies',
            hook: 'Do you write the answer down immediately, or wait until someone asks for it? That\'s the difference between write-through and cache-aside.',
            explanation: 'Cache-Aside (Lazy Loading) means the app checks the cache, and if it misses, reads from the DB and updates the cache. Write-Through updates both cache and DB simultaneously. Write-Back updates the cache and asynchronously writes to the DB.',
            practice: 'Which caching strategy would you use for a highly read-heavy application like a news feed?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKQXBwLS0+fDEuIENoZWNrfENhY2hlCkNhY2hlLS4tPnwyLiBNaXNzfEFwcApBcHAtLT58My4gRmV0Y2h8REIKQXBwLS0+fDQuIFdyaXRlfENhY2hlCnN0eWxlIENhY2hlIGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'In the Cache-Aside pattern, the application code first asks the cache for data. If it\'s a Cache Miss, the app queries the database, retrieves the data, returns it to the client, and concurrently populates the cache for future requests.',
            articleUrl: 'https://en.wikipedia.org/wiki/Cache_(computing)'
          },
          { 
            id: 'cache-eviction', 
            title: 'Eviction Policies (LRU, LFU)',
            hook: 'When your backpack is full and you need to put a new book in, which old book do you throw out? The one you haven\'t read in the longest time (LRU) or the one you read the least often (LFU)?',
            explanation: 'Caches have limited memory. LRU (Least Recently Used) evicts the item accessed furthest in the past. LFU (Least Frequently Used) evicts the item with the lowest access count. LRU is the most common general-purpose policy.',
            practice: 'Scenario: A viral video platform needs to cache thumbnails. Which eviction policy handles a sudden spike in popularity better?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKc3ViZ3JhcGggTFJVIENhY2hlCkhlYWRbTmV3ZXN0XSAtLS0gTjEgLS0tIE4yIC0tLSBUYWlsW09sZGVzdF0KZW5kClRhaWwtLi0+fEV2aWN0fFRyYXNoCnN0eWxlIFRhaWwgZmlsbDojZmVlMmUyLHN0cm9rZTojZWY0NDQ0?theme=neutral',
            diagramExplanation: 'An LRU cache is typically implemented using a HashMap (for O(1) lookups) and a Doubly Linked List (for O(1) removals and insertions). When an item is accessed, it is moved to the head of the list. When the cache is full, the tail item is evicted.',
            articleUrl: 'https://en.wikipedia.org/wiki/Cache_replacement_policies'
          }
        ]
      },
      {
        dayNumber: 4,
        title: 'Data Storage Foundations',
        topics: [
          { 
            id: 'db-fundamentals', 
            title: 'Database Fundamentals',
            hook: 'Think of databases like filing cabinets. You can have highly organized, rigid folders (Relational) or a flexible bin where you throw in documents (Document/NoSQL).',
            explanation: 'Relational databases (SQL) enforce strict schemas and ACID properties, making them great for financial transactions. Non-relational databases (NoSQL) scale horizontally easily and handle unstructured data or massive write loads well.',
            practice: 'Explain the ACID properties (Atomicity, Consistency, Isolation, Durability) in a database transaction.',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKc3ViZ3JhcGggU1FMClQxW1RhYmxlOiBVc2Vyc10gLS0tIFQyW1RhYmxlOiBPcmRlcnNdCmVuZApzdWJncmFwaCBOb1NRTApKW0pTT04gRG9jdW1lbnRdCmVuZApzdHlsZSBUMSBmaWxsOiNlZWYyZmYKc3R5bGUgSiBmaWxsOiNmMGZkZjQ=?theme=neutral',
            diagramExplanation: 'SQL databases use structured tables with predefined columns and foreign key relationships. NoSQL databases (like Document stores, Key-Value, Column-Family, or Graph) use flexible schemas, often trading strong consistency for high availability and partition tolerance.',
            articleUrl: 'https://aws.amazon.com/nosql/'
          },
          { 
            id: 'rdbms-patterns', 
            title: 'RDBMS Patterns (Sharding & Replication)',
            hook: 'When one filing cabinet gets too full, you buy a second one. Do you copy everything (Replication) or split it A-M and N-Z (Sharding)?',
            explanation: 'Replication (Master-Slave) improves read scalability and reliability by copying data to read replicas. Sharding (Data Partitioning) splits a large database into smaller, faster, more easily managed parts across multiple servers to improve write scalability.',
            practice: 'What is the "Celebrity Problem" (Hotspotting) in database sharding, and how do you mitigate it?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKV3JpdGUtLT5NYXN0ZXJbKE1hc3RlcildCk1hc3Rlci0uLT58UmVwbGljYXRlfFIxWyhSZXBsaWNhIDEpXQpNYXN0ZXItLi0+fFJlcGxpY2F0ZXxSMlsoUmVwbGljYSAyKV0KUmVhZC0tPlIxClJlYWQtLT5SMgpzdHlsZSBNYXN0ZXIgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'Sharding distributes data based on a Shard Key (e.g. User ID). A routing tier directs queries to the appropriate shard. If the Shard Key is poorly chosen, one shard may receive all the traffic, causing a hotspot.',
            articleUrl: 'https://aws.amazon.com/what-is/database-sharding/'
          },
          { 
            id: 'nosql-sql', 
            title: 'NoSQL Deep Dive',
            hook: 'Not all NoSQL is the same. A key-value store is like a coat check. A graph database is like mapping out a social network.',
            explanation: 'Key-Value (Redis, DynamoDB) for extreme speed. Document (MongoDB) for flexible schemas. Column-Family (Cassandra) for massive write-heavy time-series data. Graph (Neo4j) for deep relationship queries.',
            practice: 'If you are building the "People You May Know" feature for LinkedIn, which NoSQL database type would you choose?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKS1ZbS2V5LVZhbHVlXSAtLS0gRG9jW0RvY3VtZW50XQpDb2xbQ29sdW1uLUZhbWlseV0gLS0tIEdyYXBoW0dyYXBoXQpzdHlsZSBLViBmaWxsOiNlZWYyZmYKc3R5bGUgRG9jIGZpbGw6I2VlZjJmZgpzdHlsZSBDb2wgZmlsbDojZWVmMmZmCnN0eWxlIEdyYXBoIGZpbGw6I2VlZjJmZg==?theme=neutral',
            diagramExplanation: 'Document stores keep data in JSON-like structures. Key-Value stores map a unique string to a blob. Column-Family stores optimize for writing wide rows of data across distributed nodes. Graph databases optimize for traversing nodes and edges.',
            articleUrl: 'https://en.wikipedia.org/wiki/NoSQL'
          }
        ]
      },
      {
        dayNumber: 5,
        title: 'Distributed Data Rules',
        topics: [
          { 
            id: 'cap-theorem', 
            title: 'CAP Theorem',
            hook: 'You can only pick two: Having the right answer (Consistency), always getting an answer (Availability), or surviving a network outage (Partition Tolerance).',
            explanation: 'The CAP Theorem states that in a distributed data store, you must trade off Consistency and Availability when a network Partition occurs. Since networks always fail (P is given), you must choose between CP (consistent but might error) and AP (available but might return stale data).',
            practice: 'Does a standard relational database configured with synchronous replication favor CP or AP?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQygoQ29uc2lzdGVuY3kpKSAtLS0gQSgoQXZhaWxhYmlsaXR5KSkKQSAtLS0gUCgoUGFydGl0aW9uIFRvbGVyYW5jZSkpClAgLS0tIEMKc3R5bGUgQyBmaWxsOiNlZWYyZmYKc3R5bGUgQSBmaWxsOiNlZWYyZmYKc3R5bGUgUCBmaWxsOiNlZWYyZmY=?theme=neutral',
            diagramExplanation: 'The CAP triangle visually represents the trade-offs. Cassandra is typically configured as AP (highly available, eventually consistent). MongoDB is CP (strong consistency with a primary node, but loses availability during election). PostgreSQL is CA on a single node, but CP in a distributed setup.',
            articleUrl: 'https://en.wikipedia.org/wiki/CAP_theorem'
          },
          { 
            id: 'consistency-patterns', 
            title: 'Consistency Patterns',
            hook: 'If you post a status update, does it need to appear for everyone instantly, or is it okay if it takes 3 seconds to spread?',
            explanation: 'Strong Consistency guarantees that after a write, any subsequent read will return that updated value (often blocking until replicas are updated). Eventual Consistency guarantees that if no new updates are made, all replicas will eventually converge to the same value.',
            practice: 'Why is Eventual Consistency heavily used in modern distributed systems like Facebook or Twitter?',
            diagramUrl: 'https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCkNsaWVudC0+Pk1hc3RlcjogV3JpdGUoWD0xKQpNYXN0ZXItLT4+Q2xpZW50OiBPSwpNYXN0ZXItKVJlcGxpY2E6IEFzeW5jIFVwZGF0ZShYPTEpCk5vdGUgb3ZlciBSZXBsaWNhOiBFdmVudHVhbCBDb25zaXN0ZW5jeQ==?theme=neutral',
            diagramExplanation: 'Strong consistency uses Two-Phase Commit or synchronous replication, causing higher latency. Eventual consistency uses asynchronous replication, providing high throughput and low latency, but risks serving stale reads temporarily.',
            articleUrl: 'https://en.wikipedia.org/wiki/Eventual_consistency'
          },
          { 
            id: 'idempotency', 
            title: 'Idempotency in Distributed Systems',
            hook: 'If you click "Pay Now" twice because the site is slow, you shouldn\'t be charged twice. That\'s idempotency.',
            explanation: 'An idempotent operation produces the same result no matter how many times it is executed. In distributed systems where network retries are common, APIs must be designed idempotently (often using unique request IDs/Idempotency Keys) to prevent duplicate processing.',
            practice: 'Are HTTP GET and PUT methods inherently idempotent? What about POST?',
            diagramUrl: 'https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCkNsaWVudC0+PkFQSTogUE9TVCAvcGF5IChJZGVtcC1LZXk6IEExMikKQVBJLT4+UmVkaXM6IENoZWNrIEExMgpSZWRpcy0tPj5BUEk6IE5vdCBGb3VuZApBUEktPj5TdHJpcGU6IFByb2Nlc3MKQVBJLT4+UmVkaXM6IFNhdmUgQTEyIC0+IFN1Y2Nlc3MKQVBJLS0+PkNsaWVudDogU3VjY2Vzcw==?theme=neutral',
            diagramExplanation: 'A client sends an Idempotency-Key header. The server checks a fast datastore (like Redis) to see if that key was recently processed. If yes, it returns the cached response. If no, it processes the payment and caches the result.',
            articleUrl: 'https://docs.stripe.com/api/idempotent_requests'
          }
        ]
      },
      {
        dayNumber: 6,
        title: 'Reliability & Uptime',
        topics: [
          { 
            id: 'ha-patterns', 
            title: 'High Availability (HA) Patterns',
            hook: 'If the engine on an airplane fails, there is a backup engine ready to take over. HA systems are built with redundancy.',
            explanation: 'High Availability aims for 99.999% uptime. Patterns include Active-Passive (a standby server takes over if the primary fails via heartbeats) and Active-Active (both servers handle traffic, requiring complex data synchronization).',
            practice: 'What is a "split-brain" scenario in an Active-Passive database cluster?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKTEItLT58QWN0aXZlfFBbUHJpbWFyeV0KTEItLi0+fFN0YW5kYnl8U1tTZWNvbmRhcnldClAtLi0+fEhlYXJ0YmVhdHxTCnN0eWxlIFAgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'In Active-Passive, a Load Balancer routes all traffic to the Primary node. The Primary node replicates data to the Standby node. A monitoring service checks heartbeats. If the Primary dies, traffic is routed to the Standby.',
            articleUrl: 'https://en.wikipedia.org/wiki/High_availability'
          },
          { 
            id: 'fault-tolerance', 
            title: 'Fault Tolerance & Chaos Engineering',
            hook: 'Don\'t wait for a fire to test the sprinklers. Fault tolerance is building systems that survive partial failures.',
            explanation: 'Redundancy is having backups; fault tolerance is the system\'s ability to seamlessly switch to those backups without user disruption. Chaos Engineering (like Netflix\'s Chaos Monkey) intentionally breaks systems in production to verify fault tolerance mechanisms.',
            practice: 'How does Graceful Degradation differ from Fault Tolerance?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQ2xpZW50LS0+QVoxW3VzLWVhc3QtMWFdCkNsaWVudC0uLT58RmFpbG92ZXJ8QVoyW3VzLWVhc3QtMWJdCkFaMS0tPkRCMVsoREIgUHJpbWFyeSldCkFaMi0tPkRCMlsoREIgU3RhbmRieSldCnN0eWxlIEFaMSBmaWxsOiNlZWYyZmYsc3Ryb2tlOiM0MzM4Y2E=?theme=neutral',
            diagramExplanation: 'Fault isolation involves deploying services across multiple Availability Zones (AZs) or Regions. If an entire data center goes dark, traffic is automatically routed to a healthy AZ, maintaining availability.',
            articleUrl: 'https://en.wikipedia.org/wiki/Fault_tolerance'
          }
        ]
      },
      {
        dayNumber: 7,
        title: 'Communication & Flow',
        topics: [
          { 
            id: 'async-fundamentals', 
            title: 'Asynchronism & Message Queues',
            hook: 'Instead of waiting at a restaurant table for your food, you get a buzzer and sit down. Message queues decouple the order from the fulfillment.',
            explanation: 'Message Queues (RabbitMQ, SQS) and Event Streaming (Kafka) decouple services. A producer publishes a message to a queue, and a consumer processes it later. This handles traffic spikes gracefully and prevents a slow downstream service from failing the upstream caller.',
            practice: 'What is the difference between a Message Queue (like SQS) and an Event Streaming platform (like Kafka)?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKUHJvZFtQcm9kdWNlcl0tLT58TWVzc2FnZXxRW1tRdWV1ZSAvIFNRU11dClEtLT58Q29uc3VtZXxXb3JrMVtXb3JrZXJdClEtLT58Q29uc3VtZXxXb3JrMltXb3JrZXJdCnN0eWxlIFEgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'Producers send messages to a Broker. The Broker holds the messages in a Queue. Consumers pull messages from the Queue, process them, and send an ACK (acknowledgment). If a consumer crashes, the message remains in the queue for another worker.',
            articleUrl: 'https://aws.amazon.com/message-queue/'
          },
          { 
            id: 'api-protocols', 
            title: 'API Protocols (REST, RPC, GraphQL)',
            hook: 'REST is asking for an entire file. GraphQL is asking for exactly the three sentences you need. gRPC is calling a function on another computer as if it were local.',
            explanation: 'REST uses standard HTTP methods and is resource-based. GraphQL allows clients to specify exactly what data they want, preventing over-fetching. gRPC uses Protocol Buffers and HTTP/2 for ultra-fast, binary communication between internal microservices.',
            practice: 'Why is gRPC heavily favored for internal server-to-server microservice communication over REST?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKQ2xpZW50LS0+fEpTT058UkVTVApDbGllbnQtLT58QmluYXJ5fGdSUEMKQ2xpZW50LS0+fFF1ZXJ5fEdyYXBoUUwKc3R5bGUgZ1JQQyBmaWxsOiNlZWYyZmYsc3Ryb2tlOiM0MzM4Y2E=?theme=neutral',
            diagramExplanation: 'REST returns fixed JSON structures. GraphQL aggregates data from multiple sources via a single endpoint and query structure. gRPC serializes data into a highly compressed binary format, bypassing JSON parsing overhead.',
            articleUrl: 'https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them'
          }
        ]
      },
      {
        dayNumber: 8,
        title: 'Core Review & Mock Interview',
        isMockInterview: true,
        topics: [
          { 
            id: 'mock-interview-1', 
            title: 'Design Twitter (X) / News Feed',
            hook: 'It\'s time to put it all together. How do you design a system that handles 500 million tweets a day and delivers them to followers in real-time?',
            explanation: 'You must synthesize estimation, caching, database sharding (User DB vs Tweet DB), fan-out mechanisms (Push vs Pull models for celebrity followers), and load balancing into a cohesive architecture.',
            practice: 'Draw out the high-level architecture. Explain how the Fan-Out-On-Write approach differs from Fan-Out-On-Read for generating a user\'s timeline.',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKVXNlci0tPkxCCkxCLS0+QVBJCkFQSS0tPlR3ZWV0REIKQVBJLS0+UmVkaXNbKFRpbWVsaW5lIENhY2hlKV0KV29ya2VyLS0+fEZhbi1vdXR8UmVkaXMKc3R5bGUgUmVkaXMgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'The architecture involves a Write Path (Load Balancer -> Write API -> Redis/DB) and a Read Path (Load Balancer -> Read API -> Timeline Cache). A background Fan-Out worker pushes new tweets into the timeline caches of followers.',
            articleUrl: 'https://github.com/donnemartin/system-design-primer'
          }
        ]
      },
      {
        dayNumber: 9,
        title: 'LLM Basics',
        topics: [
          { 
            id: 'transformers', 
            title: 'Transformers & Attention',
            hook: 'Instead of reading a sentence word-by-word like a human, a Transformer looks at the entire sentence at once, figuring out which words are paying "attention" to each other.',
            explanation: 'The Transformer architecture uses Self-Attention mechanisms to weigh the importance of every token in a sequence contextually. This parallelization is what enabled models like GPT to train on massive datasets, unlike previous sequential RNNs.',
            practice: 'Explain the purpose of the "Attention" mechanism in the context of translating the word "bank" in "river bank" vs "bank account".',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKSW5wdXQtLT5FbWJlZFtFbWJlZGRpbmddCkVtYmVkLS0+UVtRdWVyeV0KRW1iZWQtLT5LW0tleV0KRW1iZWQtLT5WW1ZhbHVlXQpRICYgSyAtLT4gQXR0W1NlbGYtQXR0ZW50aW9uXQpBdHQgJiBWIC0tPiBPdXRbT3V0cHV0XQpzdHlsZSBBdHQgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'Self-attention calculates Query, Key, and Value matrices. It creates an attention map showing how strongly each word correlates with every other word in the sequence, allowing the model to understand deep contextual meaning.',
            articleUrl: 'https://jalammar.github.io/illustrated-transformer/'
          },
          { 
            id: 'embeddings', 
            title: 'Embeddings & Vector Spaces',
            hook: 'How does a computer know that "King" is related to "Queen"? It assigns them coordinates on a massive 3D map where similar concepts are grouped close together.',
            explanation: 'Embeddings are dense numerical vectors representing text, images, or audio. In this high-dimensional vector space, semantic similarity is measured by distance (e.g., Cosine Similarity). This is the foundation of semantic search and AI.',
            practice: 'How does generating an embedding differ from generating text with an LLM?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKVGV4dFtUZXh0XSAtLT4gTW9kZWxbRW1iZWRkaW5nIE1vZGVsXQpNb2RlbCAtLT4gVmVjWzAuMjEsIC0wLjQ1LCAwLjg4Li4uXQpzdHlsZSBWZWMgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'Words are mapped as points in a multi-dimensional space. The vector math `King - Man + Woman` results in a vector physically closest to the word `Queen`. This spatial mapping encodes semantic relationships.',
            articleUrl: 'https://en.wikipedia.org/wiki/Word_embedding'
          }
        ]
      },
      {
        dayNumber: 10,
        title: 'RAG & Context',
        topics: [
          { 
            id: 'rag-arch', 
            title: 'Retrieval-Augmented Generation (RAG)',
            hook: 'An LLM is like a genius who hasn\'t read the news since 2021. RAG is giving that genius an open book test with your private company documents.',
            explanation: 'RAG grounds LLM responses by first searching a database for relevant facts, then appending those facts to the prompt. This solves hallucination and allows models to answer questions on proprietary or real-time data without retraining.',
            practice: 'What are the main advantages of RAG over fine-tuning a model on your company data?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKVXNlci0tPlFbUXVlcnldClEtLT5FbWJlZApFbWJlZC0tPlZlY3RvckRCClZlY3RvckRCLS0+fENvbnRleHR8TExNClEtLT58UHJvbXB0fExMTQpMTE0tLT5BbnN3ZXIKc3R5bGUgVmVjdG9yREIgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: '1. User asks question. 2. Question is converted to a vector embedding. 3. Vector DB is queried for similar document chunks. 4. Retrieved chunks + original question are sent to the LLM. 5. LLM generates grounded answer.',
            articleUrl: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation'
          },
          { 
            id: 'vector-dbs', 
            title: 'Vector Databases',
            hook: 'A standard SQL database looks for exact keyword matches. A Vector DB looks for "vibes" and concepts that are mathematically similar.',
            explanation: 'Vector Databases (Pinecone, Milvus, pgvector) store and query embeddings. They use algorithms like HNSW (Hierarchical Navigable Small World) to perform Approximate Nearest Neighbor (ANN) searches across millions of vectors in milliseconds.',
            practice: 'Why can\'t you just use a standard B-Tree index in PostgreSQL to search for similar vectors?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKUXVlcnlbUXVlcnkgVmVjdG9yXSAtLT4gSE5TV1tITlNXIEdyYXBoIEluZGV4XQpITlNXIC0tPiBWMVtOZWFyZXN0IFZlY3RvciAxXQpITlNXIC0tPiBWMltOZWFyZXN0IFZlY3RvciAyXQpzdHlsZSBITlNXIGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'Vector searches do not look for exact matches. They calculate distance (Cosine or Euclidean) between a query vector and database vectors. ANN algorithms use multi-layered graphs to rapidly navigate to the closest cluster of vectors.',
            articleUrl: 'https://www.pinecone.io/learn/vector-database/'
          }
        ]
      },
      {
        dayNumber: 11,
        title: 'Deployment & Serving',
        topics: [
          { 
            id: 'prompt-engineering', 
            title: 'Prompt Engineering & Guardrails',
            hook: 'Programming an LLM is less like writing code and more like writing a highly specific job description for a new employee.',
            explanation: 'Advanced prompt techniques like Few-Shot prompting, Chain-of-Thought (CoT), and ReAct drastically improve model reasoning. Guardrails are secondary models or programmatic checks applied to inputs/outputs to prevent prompt injection and toxicity.',
            practice: 'Explain what a "System Prompt" is and how it differs from a User Prompt.',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKVXNlci0tPkdhdGVbR3VhcmRyYWlsIC8gR2F0ZXdheV0KR2F0ZS0tPnxTYWZlfExMTQpHYXRlLS0+fFRveGljfEJsb2NrW0Jsb2NrIFJlcXVlc3RdCnN0eWxlIEdhdGUgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'An LLM gateway inspects incoming prompts for malicious intent (Prompt Injection) using lightweight classifiers. If safe, it goes to the LLM. The output is similarly checked for toxicity or PII before returning to the user.',
            articleUrl: 'https://www.promptingguide.ai/'
          },
          { 
            id: 'inference-opt', 
            title: 'Inference Optimization',
            hook: 'Running a massive AI model is expensive. Quantization is like compressing a 4K video to 1080p—you lose a tiny bit of quality, but it runs 4x faster on a cheaper server.',
            explanation: 'Serving LLMs involves solving the memory bandwidth bottleneck. Techniques include Quantization (reducing precision from 16-bit to 8-bit or 4-bit), KV Caching (saving previous token computations), and vLLM/PagedAttention (optimizing memory allocation).',
            practice: 'What is the trade-off when applying 4-bit quantization to a 70B parameter model?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKUmVxLS0+QmF0Y2hbQ29udGludW91cyBCYXRjaGluZ10KQmF0Y2gtLT5LVltLViBDYWNoZSAvIFBhZ2VkQXR0ZW50aW9uXQpLVi0tPk1vZGVsW1F1YW50aXplZCBNb2RlbF0Kc3R5bGUgS1YgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'During text generation, models recompute states for all previous tokens. The KV Cache stores these states in GPU memory. PagedAttention divides the KV Cache into blocks, similar to OS virtual memory, reducing memory fragmentation and allowing higher batch sizes.',
            articleUrl: 'https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/'
          }
        ]
      },
      {
        dayNumber: 12,
        title: 'GenAI Architecture Integration',
        isMockInterview: true,
        topics: [
          { 
            id: 'mock-design-genai', 
            title: 'Design an AI-Powered Customer Support Bot',
            hook: 'Design a system that ingests millions of support tickets and manuals, and uses RAG to answer user questions securely on a public website.',
            explanation: 'This mock design combines Core System Design (Load balancers, rate limiting, async queues for document ingestion) with GenAI architecture (Embedding models, Vector DBs, LLM APIs).',
            practice: 'How do you handle access control in RAG? (i.e., ensuring the bot doesn\'t read a confidential internal HR document to answer a public customer question).',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQ2xpZW50LS0+QVBJCkFQSS0tPlJBR1tSQUcgUGlwZWxpbmVdClJBRy0tPlZlY0RCWyhQaW5lY29uZSldClJBRy0tPkxMTVtHUFQtNF0Kc3R5bGUgUkFHIGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'An ingestion pipeline chunks and embeds documents, storing metadata (like access levels) alongside vectors. During retrieval, a pre-filter is applied to the Vector DB query to ensure the user only retrieves chunks they are authorized to see.',
            articleUrl: 'https://cloud.google.com/use-cases/retrieval-augmented-generation'
          }
        ]
      },
      {
        dayNumber: 13,
        title: 'Distributed Algorithms',
        topics: [
          { 
            id: 'dist-consensus', 
            title: 'Distributed Consensus (Raft, Paxos)',
            hook: 'If five generals are planning an attack, how do they agree on the time if the messengers might get shot? This is the Byzantine Generals Problem.',
            explanation: 'Consensus algorithms allow a cluster of machines to agree on a single source of truth even if some machines fail. Raft is the most popular modern algorithm, using Leader Election and Log Replication to ensure strong consistency in systems like etcd or ZooKeeper.',
            practice: 'In the Raft consensus algorithm, what happens when the Leader node crashes?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQ1tDYW5kaWRhdGVdIC0tPnxSZXF1ZXN0IFZvdGV8IEYxW0ZvbGxvd2VyXQpDIC0tPnxSZXF1ZXN0IFZvdGV8IEYyW0ZvbGxvd2VyXQpDIC0uLT58V2luc3wgTFtMZWFkZXJdCnN0eWxlIEMgZmlsbDojZWVmMmZmLHN0cm9rZTojNDMzOGNh?theme=neutral',
            diagramExplanation: 'Nodes in Raft can be Leaders, Followers, or Candidates. If followers don\'t receive heartbeats from the Leader within a randomized timeout, they become Candidates and request votes. The first to get a majority becomes the new Leader.',
            articleUrl: 'https://raft.github.io/'
          },
          { 
            id: 'gossip', 
            title: 'Gossip Protocols',
            hook: 'How does a juicy rumor spread through an entire high school in one day? One person tells three, they each tell three... Gossip protocols work the exact same way.',
            explanation: 'In massive decentralized clusters (like Cassandra or Bitcoin), having a central coordinator is a bottleneck. Instead, nodes randomly select a few peers every second and exchange state information. State propagates exponentially fast.',
            practice: 'Why are Gossip protocols favored over a centralized registry for node failure detection in large clusters?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQSAtLS0gQgpBIC0tLSBDCkIgLS0tIEQKQyAtLS0gRApOb3RlIG92ZXIgQSxEOiBSYW5kb20gcGVlci10by1wZWVyIHN0YXRlIHNoYXJpbmcKc3R5bGUgQSBmaWxsOiNlZWYyZmYsc3Ryb2tlOiM0MzM4Y2E=?theme=neutral',
            diagramExplanation: 'Node A sends its state to Nodes B and C. In the next tick, B and C send their states to random other nodes. Within a predictable number of log(N) rounds, all N nodes in the cluster share the same information without centralized coordination.',
            articleUrl: 'https://en.wikipedia.org/wiki/Gossip_protocol'
          }
        ]
      },
      {
        dayNumber: 14,
        title: 'Advanced Traffic Management',
        topics: [
          { 
            id: 'rate-limiting', 
            title: 'Rate Limiting Algorithms',
            hook: 'An all-you-can-eat buffet will cut you off if you take too much crab at once. Rate Limiters protect APIs from being overwhelmed by too many requests from one user.',
            explanation: 'Rate limiting prevents abuse and ensures fair usage. Common algorithms include Token Bucket (allows bursts), Leaky Bucket (smooths out traffic), and Sliding Window Log (highly accurate but memory intensive). They are usually implemented in an API Gateway using Redis.',
            practice: 'Explain the Token Bucket algorithm. How does it handle a sudden burst of traffic?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggTFIKUmVxLS0+QnVja2V0CkJ1Y2tldC0tPnxUb2tlbiBBdmFpbGFibGV8QWNjZXB0CkJ1Y2tldC0tPnxFbXB0eXw0MjlbNDI5IFRvbyBNYW55IFJlcV0Kc3R5bGUgQnVja2V0IGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'A bucket holds a maximum number of tokens. Tokens are refilled at a constant rate. Each API request costs one token. If the bucket has tokens, the request is processed; if empty, it is dropped (429 Too Many Requests).',
            articleUrl: 'https://stripe.com/blog/rate-limiters'
          },
          { 
            id: 'circuit-breaker', 
            title: 'Circuit Breaker Pattern',
            hook: 'If you keep touching a hot stove, you will burn your hand. A circuit breaker stops you from trying until the stove cools down.',
            explanation: 'In microservices, if Service A calls Service B and B is down, A will hang, exhaust its threads, and crash. A Circuit Breaker monitors failures. If failures cross a threshold, it trips (opens) and immediately fails fast, giving Service B time to recover.',
            practice: 'What is the "Half-Open" state in a Circuit Breaker?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKQ2xvc2VkIC0tPnxFcnJvcnMgPiBUaHJlc2hvbGR8IE9wZW4KT3BlbiAtLT58VGltZW91dHwgSGFsZk9wZW4KSGFsZk9wZW4gLS0+fFN1Y2Nlc3N8IENsb3NlZApIYWxmT3BlbiAtLT58RmFpbHVyZXwgT3BlbgpzdHlsZSBPcGVuIGZpbGw6I2ZlZTJlMixzdHJva2U6I2VmNDQ0NA==?theme=neutral',
            diagramExplanation: 'States: CLOSED (normal, traffic flows), OPEN (failing, traffic blocked instantly to prevent cascading failure). After a timeout, it moves to HALF-OPEN (allows a few test requests). If they succeed, it closes. If they fail, it opens again.',
            articleUrl: 'https://martinfowler.com/bliki/CircuitBreaker.html'
          }
        ]
      },
      {
        dayNumber: 15,
        title: 'Geospatial Systems',
        topics: [
          { 
            id: 'geohashing', 
            title: 'Geohashing & Quadtrees',
            hook: 'How does Uber find the drivers nearest to you out of millions globally in under a second? They turn a 2D map into a 1D string.',
            explanation: 'Searching a massive SQL database using latitude/longitude math is too slow. Geohashing divides the world into a grid and assigns a string to each cell (e.g., 9q8yy). Nearby places share the same string prefix. Quadtrees represent the same concept hierarchically.',
            practice: 'If two locations share the first 5 characters of a Geohash, what does that imply about their proximity?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKUm9vdCAtLT4gMApSb290IC0tPiAxCjAgLS0+IDAwCjAgLS0+IDAxCk5vdGUgb3ZlciAwMCwwMTogU3BhdGlhbCBkaXZpc2lvbgpzdHlsZSBSb290IGZpbGw6I2VlZjJmZixzdHJva2U6IzQzMzhjYQ==?theme=neutral',
            diagramExplanation: 'The world map is divided into quadrants recursively. A Geohash string represents the path down the tree. A longer string represents a smaller, more precise area. Proximity searches are reduced to simple string prefix matching in a database.',
            articleUrl: 'https://en.wikipedia.org/wiki/Geohash'
          },
          { 
            id: 'proximity', 
            title: 'Proximity Services Architecture',
            hook: 'Designing Yelp or Uber requires storing locations and updating them in real-time. This is one of the hardest problems in System Design.',
            explanation: 'A proximity service uses a Redis GeoHash implementation or a custom Quadtree index for fast read-heavy spatial queries (Yelp). For high-write scenarios like live location tracking (Uber), WebSockets, memory-based grids, and asynchronous database flushes are used.',
            practice: 'Why is standard MySQL generally a poor choice for storing the live, second-by-second location updates of Uber drivers?',
            diagramUrl: 'https://mermaid.ink/img/Z3JhcGggVEQKRHJpdmVyIC0tPiBXU1tXZWJTb2NrZXRdCldTIC0tPiBSZWRpc1soUmVkaXMgR2VvSGFzaCldClJlZGlzIC0tPiBTZWFyY2hbUmlkZXIgU2VhcmNoXQpzdHlsZSBSZWRpcyBmaWxsOiNlZWYyZmYsc3Ryb2tlOiM0MzM4Y2E=?theme=neutral',
            diagramExplanation: 'Drivers emit locations via WebSockets. An ingestion gateway pushes these to an In-Memory Grid (Redis or custom C++ service) for instant spatial querying by Riders. A separate asynchronous worker persists the location history to a database like Cassandra.',
            articleUrl: 'https://redis.io/docs/latest/develop/interact/search-and-query/advanced-concepts/geo/'
          }
        ]
      }
    ]
  }
];
