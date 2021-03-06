import React from "react";
import { connect } from "react-redux";
import "../css/CodeSampleExplorer.css";
import { NavLink } from "react-router-dom";

class CodeSampleExplorer extends React.Component {
  render() {
    const { codeSamples, currentCodeSampleId } = this.props;
    const displayCodeSamples = codeSamples.map(
      ({ activeState: { characterCorrectness, currentCodeSample } }) => {
        const { id, title, contentLen, alias } = currentCodeSample;
        const { isComplete } = characterCorrectness;
        return (
          <div
            key={id}
            className={"codeSampleItem" + (isComplete ? " complete" : "")}
          >
            <NavLink to={`/code/${alias}`} activeClassName="active">
              {title}&nbsp;
              <span>[{contentLen}]</span>
            </NavLink>
          </div>
        );
      }
    );

    return (
      <section className="explorer">
        <h1>Today's Playlist:</h1>
        <div className="controls">
          <button
            className="prevCodeSample"
            onClick={e => this.controlsPrevHandler(e, currentCodeSampleId)}
          >
            Prev
          </button>
          <button
            className="resetCodeSample"
            onClick={e => this.controlsResetHandler(e, currentCodeSampleId)}
          >
            Revert
          </button>
          <button
            className="nextCodeSample"
            onClick={e => this.controlsNextHandler(e, currentCodeSampleId)}
          >
            Next
          </button>
        </div>
        {displayCodeSamples}
      </section>
    );
  }

  // controlsSelectHandler = (e, id) => {
  //   e.preventDefault();
  //   this.props.codeSampleExplorerHandler({ type: "DISPLAY_TARGET_SAMPLE", id });
  // };

  controlsResetHandler = (e, id) => {
    e.preventDefault();
    this.props.codeSampleExplorerHandler({ type: "RESET_SAMPLE", id });
  };

  controlsPrevHandler = (e, id) => {
    e.preventDefault();
    this.props.codeSampleExplorerHandler({ type: "DISPLAY_PREV_SAMPLE", id });
  };

  controlsNextHandler = (e, id) => {
    e.preventDefault();
    this.props.codeSampleExplorerHandler({ type: "DISPLAY_NEXT_SAMPLE", id });
  };
}

const mapStateToProps = state => ({ codeSamples: state.codeSamples });

export default connect(mapStateToProps)(CodeSampleExplorer);
