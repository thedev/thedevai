import * as React from "react"

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}

const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        Welcome to TheDev AI
        <br />
        <span style={codeStyles}>Gatsby Starter Project</span>
      </h1>
      <p style={paragraphStyles}>
        This is a Gatsby starter project configured for GitHub Pages deployment.
        <br />
        <br />
        Get started by editing the pages in <code style={codeStyles}>src/pages/</code>
      </p>
      <p style={paragraphStyles}>
        <strong>Features:</strong>
      </p>
      <ul>
        <li>⚡️ Gatsby 5</li>
        <li>⚛️ React 18</li>
        <li>📦 GitHub Pages ready</li>
        <li>🚀 Fast development setup</li>
      </ul>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>TheDev AI - Home</title>
