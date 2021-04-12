import React from 'react'


/* Component Structure
App
  Course
    Header
    Content
      Part
      Part
      ...
*/

const Course = (props) => {
  const {course} = props

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  /* props.course */
  return (
    <h2>{props.course}</h2>
  )
}

const Content = (props) => {
  const {parts} = props
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Part = (props) => {
  const {part} = props
  return (
    <p>
        {part.name} {part.exercises}
    </p>
  )
}

const Total = (props) => {
  const {parts} = props
  return (
    <p><b>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</b></p>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [{
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return(
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => 
        <Course course={course} />
      )}
    </div>
  )
}

export default App