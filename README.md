# Rate Limit Keyv

## Back-end Support

- Redis
- MongoDB
- SQLite
- PostgreSQL
- MySQL
- Third-party storage adapters ([see Keyv docs](https://github.com/lukechilds/keyv#third-party-storage-adapters))

## Usage

### In Memory

```js
const RateLimit = require('express-rate-limit');
const Keyv = require('keyv');
const KeyvStore = require('rate-limit-keyv');
const express = require('express');
const app = express();

const limiter = new RateLimit({
  store: new KeyvStore(new Keyv({ namespace: 'rate-limit' }))
});

app.use(limiter);
```

### Redis

```js
const RateLimit = require('express-rate-limit');
const Keyv = require('keyv');
const KeyvStore = require('rate-limit-keyv');
const express = require('express');
const app = express();

const limiter = new RateLimit({
  store: new KeyvStore(new Keyv('redis://user:pass@localhost:6379', { namespace: 'rate-limit' }))
});

app.use(limiter);
```

### MongoDB

```js
const RateLimit = require('express-rate-limit');
const Keyv = require('keyv');
const KeyvStore = require('rate-limit-keyv');
const express = require('express');
const app = express();

const limiter = new RateLimit({
  store: new KeyvStore(new Keyv('mongodb://user:pass@localhost:27017/dbname', { namespace: 'rate-limit' }))
});

app.use(limiter);
```

### SQLite

```js
const RateLimit = require('express-rate-limit');
const Keyv = require('keyv');
const KeyvStore = require('rate-limit-keyv');
const express = require('express');
const app = express();

const limiter = new RateLimit({
  store: new KeyvStore(new Keyv('sqlite://path/to/dbname.sqlite', { namespace: 'rate-limit' }))
});

app.use(limiter);
```

### PostgreSQL

```js
const RateLimit = require('express-rate-limit');
const Keyv = require('keyv');
const KeyvStore = require('rate-limit-keyv');
const express = require('express');
const app = express();

const limiter = new RateLimit({
  store: new KeyvStore(new Keyv('postgresql://user:pass@localhost:5432/dbname', { namespace: 'rate-limit' }))
});

app.use(limiter);
```

### MySQL

```js
const RateLimit = require('express-rate-limit');
const Keyv = require('keyv');
const KeyvStore = require('rate-limit-keyv');
const express = require('express');
const app = express();

const limiter = new RateLimit({
  store: new KeyvStore(new Keyv('mysql://user:pass@localhost:3306/dbname', { namespace: 'rate-limit' }))
});

app.use(limiter);
```
