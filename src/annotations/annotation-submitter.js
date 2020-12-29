import React from "react";
import Addannotations from "./Addannotation.js";
export class AnnotationSubmitter extends React.Component {
  // state = {
  //  // annotationType: "",
  //   placeholder: "", //placeholder text for the input field
  // };
  // onChange = (e) =>
  //   this.setState({
  //     placeholder: e.target.placeholder,
  //   });

  submitHandler = (value, seconds) => {
    //adds different annotations based on selection
    var anno = "";
    switch (this.props.annotationType) {
      case "describing":
        anno = {
          "@context": "http://www.w3.org/ns/anno.jsonld",
          target: this.props.selection.map((elem) => {
            return { id: this.props.uri + "#" + elem.getAttribute("id") };
          }), //this takes the measure id selected by the user
          type: "Annotation",
          body: [{ type: "TextualBody", value }], //this takes the user input
          motivation: "describing",
          created: new Date().toISOString(),
          creator: this.props.creator,
        };
        //no set state nothing that goes up beyond this point
        return {
          anno,
        };

      case "linking":
        anno = {
          "@context": "http://www.w3.org/ns/anno.jsonld",
          target: this.props.selection.map((elem) => {
            return { id: this.props.uri + "#" + elem.getAttribute("id") };
          }), //this takes the measure id selected by the user
          type: "Annotation",
          body: [{ id: value }], //this takes the user URI
          motivation: "linking",
          created: new Date().toISOString(),
          creator: this.props.creator,
        };
        // console.log(anno);
        return {
          anno,
        };

      case "cueMedia":
        anno = {
          "@context": "http://www.w3.org/ns/anno.jsonld",
          target: this.props.selection.map((elem) => {
            return { id: this.props.uri + "#" + elem.getAttribute("id") };
          }), //this takes the measure id selected by the user
          type: "Annotation",
          body: [{ id: value + "#t=" + seconds }], //this takes the user URI
          motivation: "trompa:cueMedia",
          created: new Date().toISOString(),
          creator: this.props.creator,
        };
        console.log(anno);
        return {
          anno,
        };

      case "replying":
        anno = {
          "@context": "http://www.w3.org/ns/anno.jsonld",
          target: this.props.replyAnnotationTarget, //this takes the measure id selected by the user
          type: "Annotation",
          body: [{ type: "TextualBody", value }], //this takes the user input
          motivation: "replying",
          created: new Date().toISOString(),
          creator: this.props.creator,
        };
        //no set state nothing that goes up beyond this point
        return {
          anno,
        };

      default:
        console.log(
          "no annotation found, have you selected the annotation type?"
        );
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h3>Annotation type</h3>
          <label>
            <input
              type="radio"
              name="annotationType"
              value="describing"
              placeholder="Add your annotation..."
              onChange={this.props.onAnnoTypeChange}
            />
            Describing
          </label>
          <label>
            <input
              type="radio"
              value="linking"
              name="annotationType"
              placeholder="insert your URI link..."
              onChange={this.props.onAnnoTypeChange}
            />
            Linking
          </label>
          <label>
            <input
              type="radio"
              value="cueMedia"
              name="annotationType"
              placeholder="insert a media cue like: http://example.com/example.mp3#t=17 (where t = cue offset in seconds)"
              onChange={this.props.onAnnoTypeChange}
            />
            Cue Media
          </label>
          <div className="addAnnotations">
            <Addannotations
              annotationType={this.props.annotationType}
              submitUri={this.props.submitUri}
              placeholder={this.props.placeholder}
              submitHandler={this.submitHandler}
              onResponse={this.props.onResponse}
              onRefreshClick={this.props.onRefreshClick}
              buttonContent={this.props.buttonContent}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AnnotationSubmitter;
