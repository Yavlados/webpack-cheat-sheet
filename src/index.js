import * as $ from 'jquery'
import Post from '@modules/Post'
import '@styles/styles'
import  json from '@assets/temp'
import jpg from '@assets/1'


const post = new Post('Webpack Post Title', jpg)

console.log(post.toString(), post.getUpperCaseTitle())
$('pre').html(post.toString())
$('pre').on( 'click', () => console.log( $('body').text()))
console.log("Hello",   json    )