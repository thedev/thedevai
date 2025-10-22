import * as React from "react"

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
}

const paragraphStyles = {
  marginBottom: 48,
}

const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry, we couldn't find what you were looking for.
        <br />
        <br />
        <a href="/">Go home</a>
      </p>
    </main>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
