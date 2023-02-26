import * as TaskOption from 'fp-ts/TaskOption';
import { constant, pipe } from 'fp-ts/function';
import * as R from 'ramda';
import axios from 'axios';

const getCatImage = () => {
  return pipe(
    TaskOption.tryCatch(() =>
      axios.get<{ breed: Array<any>; id: string; width: number; height: number; url: string }[]>(
        'https://api.thecatapi.com/v1/images/search',
        {
          headers: {
            'x-api-key': process.env.CAT_API_KEY || '',
          },
        }
      )
    ),
    TaskOption.chain((res) => TaskOption.fromNullable(res.data.at(0)?.url)),
    TaskOption.match(constant('貓貓躲起來了，請重新引誘'), R.identity)
  );
};

export default getCatImage;
