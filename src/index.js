import Post from './Post'
import './styles/styles.css'

const post = new Post('Webpack Post Title')

console.log(post.toString(), post.getUpperCaseTitle())