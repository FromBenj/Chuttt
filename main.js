import {lru, cleanLru, createM, copyM, testChuttt} from './js/logic.js';
import {get404Video} from './js/error-404.js'

cleanLru(lru);
createM();
await copyM();
await get404Video();
testChuttt();
