import * as $ from 'jquery'
import Post from '@modules/Post'
import '@styles/styles'
import json from '@assets/temp'
import jpg from '@assets/1'
import './styles/less.less'
import './styles/scss.scss'
import './babel'

import React from 'react'
import {render} from 'react-dom'

const post = new Post('Webpack Post Title', jpg)

const App = () => (<div>
        <div className="container">
            <h1>Webpack Course</h1>
        </div>
        <hr />
        <div className="logo" />
        <pre />
        <div className="box">
            <h2>Less</h2>
        </div>
        <div className="card">
            <h2>SCSS/SASS</h2>
        </div>
    </div>
)
render(<App/>, document.getElementById('app'))

// console.log( post.toString(), post.UpperCaseTitle )
// $('pre').html(post.toString())
// console.log("Hello", json )