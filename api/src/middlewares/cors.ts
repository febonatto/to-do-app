import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  maxAge: 10,
}

export default cors(corsOptions);
