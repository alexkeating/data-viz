import React from 'react';


class Editor extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <form>
                        <textarea className="form-control" name="editor" cols="30" rows="10"
                                  value={this.props.query} onChange={this.props.handleChange}/>
                        <br />
                        <button onClick={(e) => {
                            e.preventDefault();
                            this.props.sendRequest(this.props.query);
                        }
                        } className="btn btn-default pull-right">Submit
                        </button>
                    </form>
                    <button className="btn btn-default pull-left">Save</button>
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }
}

export default Editor;