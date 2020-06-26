import React from 'react';

class TodoListFooter extends React.Component {

    state = {
        isHiden: true
    };


    onAllFilterClick = () => {this.props.changeFilter("All")};
    onCompletedFilterClick = () => {this.props.changeFilter("Completed")}
    onActiveFilterClick = () => {this.props.changeFilter("Active")};
    onShowFiltersClick = () => {this.setState({isHiden: false})};
    onHideFiltersClick = () => {this.setState({isHiden: true})};

    render = () => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "button";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "button";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "button";

        return (
            <div className="todoList-footer">
                {this.state.isHiden && <div>
                    <button
                        className={classForAll}
                        onClick={this.onAllFilterClick}
                    >All</button>
                    <button
                        className={classForCompleted}
                        onClick={this.onCompletedFilterClick}
                    >Completed</button>
                    <button
                        className={classForActive}
                        onClick={this.onActiveFilterClick}
                    >Active
                    </button>
                </div>}
                <div className={"showHideTask"}>
                    <button className="button" onClick={this.onHideFiltersClick}>show</button>
                    <button className="button" onClick={this.onShowFiltersClick}>hide</button>
                </div>
            </div>

        )
    }
}

export default TodoListFooter;
