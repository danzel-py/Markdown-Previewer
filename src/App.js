import './App.css';
import React from 'react';
import marked from 'marked';


class App extends React.Component{
  render(){
    return (
      <div id="app">
        <div id='title'>
          <div>
          <a href="https://reactjs.org"><img src="https://i.ibb.co/LY9JXWv/LOGO-bening-kotak.png" alt="LOGO-bening-kotak" height='30'border="0"></img></a>
          </div><div>Markdown Previewer</div></div>
        <Editor></Editor>
      </div>
    )
  }
}
class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editText : `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
      
Heres some code, \`<div></div>\`, between 2 backticks.
      
\`\`\`
// this is multi-line code:
      
function anotherExample(firstLine, lastLine) {
if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
return multiLineCode;
 }
}
\`\`\`
      
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.
      
There's also [links](https://www.freecodecamp.com), and
> Block Quotes!
      
 And if you want to get really crazy, even tables:
      
Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.
      
- And of course there are lists.
  - Some are bulleted.
    - With different indentation levels.
      - That look like this.
      
      
1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:
      
![React Logo w/ Text](https://goo.gl/Umyytc)`
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(e){
    this.setState({editText : e.target.value})
  }

  render(){
    const text = this.state.editText
    return(
      <div id='mainContainer'>
        <div id='editorContainer'>Editor
        <textarea id="editor" className='textContent' value={text} onChange={this.handleChange}></textarea>
        </div>
        <div id='previewerContainer'>Preview
        <Previewer textPreview = {text}/>
        </div>
      </div>
    )
  }
}

class Previewer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text : this.props.textPreview,
      markVersion : ''
    }
  }
  
  componentWillReceiveProps(nextProps) {
    // Any time props.textPreview changes, update state.
    if (nextProps.textPreview !== this.props.textPreview) {
      this.setState({
        text: nextProps.textPreview,
        markVersion : marked(nextProps.textPreview)
      })
    }
  }

  componentDidMount(){
    this.setState({
      markVersion : marked(this.props.textPreview)
    })
  }

  render(){
    return(
      <div id="preview" className='textContent' dangerouslySetInnerHTML={{ __html: this.state.markVersion}}>
      </div>
    )
  }
}

export default App;