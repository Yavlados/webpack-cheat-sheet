// async function start() {
//     return await Promise.resolve('async is working')
// }   // async/await syntax
//
// start().then( value => console.log(value) )
/*
    eslint-babel has some problems with async/await
 */
const asd = 123 //EsLint test

class Util{
    static id = Date.now() //new ECMA class syntax
}
console.log(asd)
console.log('Util Id:', Util.id)

import ('lodash').then( _ => {
    console.log('Loadash', _.random(0, 32, true))
})