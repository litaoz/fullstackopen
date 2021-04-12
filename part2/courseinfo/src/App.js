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
    <h1>{props.course}</h1>
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
    return (
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}

const App = () => {
  const course = {
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
  }
  return <Course course={course} />
}

export default App