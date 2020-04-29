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

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

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
                <span className="hideFooterButton" onClick={this.onHideFiltersClick}>show</span>
                <span className="hideFooterButton" onClick={this.onShowFiltersClick}>hide</span>
            </div>

        )
    }
}

export default TodoListFooter;
