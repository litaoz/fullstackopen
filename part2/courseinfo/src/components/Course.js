import React from 'react'

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

  export default Course