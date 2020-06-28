import * as $ from 'jquery'

const createAnalytics = ():Object => {
    let counter = 0 as number
    let isDestroyed = false as boolean
    const listener = ():number => counter++
    console.log(counter)
    $(document).on( 'click', listener)
    return{
        destroy(){
            $(document).off('click', listener)
            isDestroyed = true
        },
       getClicks() {
            if( isDestroyed ) return `Analytics is destroyed. Total clicks ${counter}`
            return counter
       }
    }
}

window["analytics"] = createAnalytics()