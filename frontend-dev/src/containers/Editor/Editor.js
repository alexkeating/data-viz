import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';

class Editor extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <form>
                        <CodeMirror
                                      value={this.props.querystring} onChange={this.props.handleChange}
                                      options={{lineNumbers: true,readOnly: false, mode: 'text/x-sql'}}/>
                        <br />
                        <button onClick={(e) => {
                            e.preventDefault();
                            this.props.sendRequest(this.props.querystring);
                        }
                        } className="btn btn-default pull-right">Submit
                        </button>
                    </form>
                    <button onClick={this.props.saveQuerystring} className="btn btn-default pull-left">Save</button>
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }
}

export default Editor;