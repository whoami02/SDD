const fs = require('fs');

const diagrams = {
  'estimation': 'graph LR\nUser-->|10M/day|LB\nLB-->|120 QPS|Web\nWeb-->|Read 2KB|DB\nstyle Web fill:#eef2ff,stroke:#4338ca\nstyle DB fill:#eef2ff,stroke:#4338ca',
  'perf-scalability-1': 'graph TD\nsubgraph Vertical\nS1[Big Server CPU++]\nend\nsubgraph Horizontal\nS2[Server 1]\nS3[Server 2]\nS4[Server 3]\nend\nstyle S1 fill:#eef2ff,stroke:#4338ca',
  'perf-scalability-2': 'graph LR\nLB-->S1[Web]\nLB-->S2[Web]\nS1-->Cache[(Redis)]\nS2-->Cache\nstyle Cache fill:#eef2ff,stroke:#4338ca',
  'dns': 'sequenceDiagram\nClient->>Resolver: google.com?\nResolver->>Root: .\nRoot-->>Resolver: .com NS\nResolver->>TLD: .com\nTLD-->>Resolver: google NS\nResolver->>Google NS: google.com\nGoogle NS-->>Resolver: 142.250.190.46\nResolver-->>Client: 142.250.190.46',
  'lb-layer-4-7': 'graph TD\nClient-->L7[L7 Load Balancer]\nL7-->|/api|API[API Servers]\nL7-->|/images|IMG[Image Servers]\nstyle L7 fill:#eef2ff,stroke:#4338ca',
  'lb-algorithms': 'graph LR\nClient-->LB\nLB-->|Hash(IP) = Node B|NodeB\nLB-.->NodeA\nLB-.->NodeC\nstyle NodeB fill:#eef2ff,stroke:#4338ca',
  'cache-fundamentals': 'graph TD\nClient-->CDN\nCDN-->LB\nLB-->Web\nWeb-->Redis\nWeb-->DB\nstyle Redis fill:#eef2ff,stroke:#4338ca',
  'cache-strategies': 'graph LR\nApp-->|1. Check|Cache\nCache-.->|2. Miss|App\nApp-->|3. Fetch|DB\nApp-->|4. Write|Cache\nstyle Cache fill:#eef2ff,stroke:#4338ca',
  'cache-eviction': 'graph LR\nsubgraph LRU Cache\nHead[Newest] --- N1 --- N2 --- Tail[Oldest]\nend\nTail-.->|Evict|Trash\nstyle Tail fill:#fee2e2,stroke:#ef4444',
  'db-fundamentals': 'graph TD\nsubgraph SQL\nT1[Table: Users] --- T2[Table: Orders]\nend\nsubgraph NoSQL\nJ[JSON Document]\nend\nstyle T1 fill:#eef2ff\nstyle J fill:#f0fdf4',
  'rdbms-patterns': 'graph TD\nWrite-->Master[(Master)]\nMaster-.->|Replicate|R1[(Replica 1)]\nMaster-.->|Replicate|R2[(Replica 2)]\nRead-->R1\nRead-->R2\nstyle Master fill:#eef2ff,stroke:#4338ca',
  'nosql-sql': 'graph LR\nKV[Key-Value] --- Doc[Document]\nCol[Column-Family] --- Graph[Graph]\nstyle KV fill:#eef2ff\nstyle Doc fill:#eef2ff\nstyle Col fill:#eef2ff\nstyle Graph fill:#eef2ff',
  'cap-theorem': 'graph TD\nC((Consistency)) --- A((Availability))\nA --- P((Partition Tolerance))\nP --- C\nstyle C fill:#eef2ff\nstyle A fill:#eef2ff\nstyle P fill:#eef2ff',
  'consistency-patterns': 'sequenceDiagram\nClient->>Master: Write(X=1)\nMaster-->>Client: OK\nMaster-)Replica: Async Update(X=1)\nNote over Replica: Eventual Consistency',
  'idempotency': 'sequenceDiagram\nClient->>API: POST /pay (Idemp-Key: A12)\nAPI->>Redis: Check A12\nRedis-->>API: Not Found\nAPI->>Stripe: Process\nAPI->>Redis: Save A12 -> Success\nAPI-->>Client: Success',
  'ha-patterns': 'graph TD\nLB-->|Active|P[Primary]\nLB-.->|Standby|S[Secondary]\nP-.->|Heartbeat|S\nstyle P fill:#eef2ff,stroke:#4338ca',
  'fault-tolerance': 'graph TD\nClient-->AZ1[us-east-1a]\nClient-.->|Failover|AZ2[us-east-1b]\nAZ1-->DB1[(DB Primary)]\nAZ2-->DB2[(DB Standby)]\nstyle AZ1 fill:#eef2ff,stroke:#4338ca',
  'async-fundamentals': 'graph LR\nProd[Producer]-->|Message|Q[[Queue / SQS]]\nQ-->|Consume|Work1[Worker]\nQ-->|Consume|Work2[Worker]\nstyle Q fill:#eef2ff,stroke:#4338ca',
  'api-protocols': 'graph LR\nClient-->|JSON|REST\nClient-->|Binary|gRPC\nClient-->|Query|GraphQL\nstyle gRPC fill:#eef2ff,stroke:#4338ca',
  'mock-interview-1': 'graph TD\nUser-->LB\nLB-->API\nAPI-->TweetDB\nAPI-->Redis[(Timeline Cache)]\nWorker-->|Fan-out|Redis\nstyle Redis fill:#eef2ff,stroke:#4338ca',
  'transformers': 'graph TD\nInput-->Embed[Embedding]\nEmbed-->Q[Query]\nEmbed-->K[Key]\nEmbed-->V[Value]\nQ & K --> Att[Self-Attention]\nAtt & V --> Out[Output]\nstyle Att fill:#eef2ff,stroke:#4338ca',
  'embeddings': 'graph LR\nText[Text] --> Model[Embedding Model]\nModel --> Vec[0.21, -0.45, 0.88...]\nstyle Vec fill:#eef2ff,stroke:#4338ca',
  'rag-arch': 'graph TD\nUser-->Q[Query]\nQ-->Embed\nEmbed-->VectorDB\nVectorDB-->|Context|LLM\nQ-->|Prompt|LLM\nLLM-->Answer\nstyle VectorDB fill:#eef2ff,stroke:#4338ca',
  'vector-dbs': 'graph TD\nQuery[Query Vector] --> HNSW[HNSW Graph Index]\nHNSW --> V1[Nearest Vector 1]\nHNSW --> V2[Nearest Vector 2]\nstyle HNSW fill:#eef2ff,stroke:#4338ca',
  'prompt-engineering': 'graph LR\nUser-->Gate[Guardrail / Gateway]\nGate-->|Safe|LLM\nGate-->|Toxic|Block[Block Request]\nstyle Gate fill:#eef2ff,stroke:#4338ca',
  'inference-opt': 'graph TD\nReq-->Batch[Continuous Batching]\nBatch-->KV[KV Cache / PagedAttention]\nKV-->Model[Quantized Model]\nstyle KV fill:#eef2ff,stroke:#4338ca',
  'mock-design-genai': 'graph TD\nClient-->API\nAPI-->RAG[RAG Pipeline]\nRAG-->VecDB[(Pinecone)]\nRAG-->LLM[GPT-4]\nstyle RAG fill:#eef2ff,stroke:#4338ca',
  'dist-consensus': 'graph TD\nC[Candidate] -->|Request Vote| F1[Follower]\nC -->|Request Vote| F2[Follower]\nC -.->|Wins| L[Leader]\nstyle C fill:#eef2ff,stroke:#4338ca',
  'gossip': 'graph TD\nA --- B\nA --- C\nB --- D\nC --- D\nNote over A,D: Random peer-to-peer state sharing\nstyle A fill:#eef2ff,stroke:#4338ca',
  'rate-limiting': 'graph LR\nReq-->Bucket\nBucket-->|Token Available|Accept\nBucket-->|Empty|429[429 Too Many Req]\nstyle Bucket fill:#eef2ff,stroke:#4338ca',
  'circuit-breaker': 'graph TD\nClosed -->|Errors > Threshold| Open\nOpen -->|Timeout| HalfOpen\nHalfOpen -->|Success| Closed\nHalfOpen -->|Failure| Open\nstyle Open fill:#fee2e2,stroke:#ef4444',
  'geohashing': 'graph TD\nRoot --> 0\nRoot --> 1\n0 --> 00\n0 --> 01\nNote over 00,01: Spatial division\nstyle Root fill:#eef2ff,stroke:#4338ca',
  'proximity': 'graph TD\nDriver --> WS[WebSocket]\nWS --> Redis[(Redis GeoHash)]\nRedis --> Search[Rider Search]\nstyle Redis fill:#eef2ff,stroke:#4338ca',
};

let data = fs.readFileSync('src/data.ts', 'utf8');

for (const [id, diagram] of Object.entries(diagrams)) {
  const b64 = Buffer.from(diagram).toString('base64');
  const url = `https://mermaid.ink/img/${b64}?theme=neutral`;
  
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?diagramUrl:\\s*')[^']+(')`);
  data = data.replace(regex, `$1${url}$2`);
}

fs.writeFileSync('src/data.ts', data);
console.log("Updated data.ts");
