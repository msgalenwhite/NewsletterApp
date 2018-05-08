import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class DropZoneComponent extends React.Component {
  constructor() {
    super();
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Submit some pictures to go with your entry!</p>
          </Dropzone>
        </div>
        <aside>
          <p>Included Pictures</p>
          <ul>
            {this.state.files.map(f =>
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            )}
          </ul>
        </aside>
      </section>
    );
  }
}

export default DropZoneComponent
